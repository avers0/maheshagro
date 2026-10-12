"""Export Mahesh Agro product listings from an XLSX workbook or pasted TSV.

By default, all active rows are exported with selling prices so the owner can
refresh the website after changing the source sheet. The source's Show Online
column is retained in the CSV but does not hide prices. Stock is never exported.
Use --approved-only to honor Show Online = Yes, or --directory for names only.
Use --check to review counts without changing the public catalogue.
"""

import argparse
import csv
import json
import re
import xml.etree.ElementTree as ET
import zipfile
from decimal import Decimal, InvalidOperation
from pathlib import Path


NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
FIELDS = ["name", "category", "brand", "selling_price", "mrp", "image", "description", "show_online", "listing_type"]


def product_key(name, category, brand):
    return tuple(" ".join(value.split()).casefold() for value in (name, category, brand))


def existing_images(output):
    if not output.exists():
        return {}
    images = {}
    with output.open(encoding="utf-8-sig", newline="") as file:
        for row in csv.DictReader(file):
            image = (row.get("image") or "").strip()
            if not image:
                continue
            key = product_key(row.get("name", ""), row.get("category", ""), row.get("brand", ""))
            if key in images and images[key] != image:
                raise ValueError(f"Conflicting images for {row.get('name', '')} in {output}")
            images[key] = image
    return images


def sourced_images():
    manifest = Path(__file__).with_name("product-images.json")
    if not manifest.exists():
        return {}
    images = {}
    for entry in json.loads(manifest.read_text(encoding="utf-8")):
        key = product_key(entry["name"], entry["category"], entry["brand"])
        image = entry["image"]
        if key in images:
            raise ValueError(f"Duplicate product image mapping: {entry['name']}")
        asset = Path(__file__).parent.parent / "public" / image.lstrip("/")
        if not asset.is_file():
            raise FileNotFoundError(f"Missing product image: {asset}")
        images[key] = image
    return images


def cell_text(cell):
    inline = cell.find("x:is", NS)
    if inline is not None:
        return "".join(node.text or "" for node in inline.findall(".//x:t", NS)).strip()
    value = cell.find("x:v", NS)
    return (value.text or "").strip() if value is not None else ""


def sheet_rows(workbook):
    with zipfile.ZipFile(workbook) as archive:
        root = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
    for row in root.findall(".//x:sheetData/x:row", NS):
        values = {}
        for cell in row.findall("x:c", NS):
            column = re.match(r"[A-Z]+", cell.attrib.get("r", ""))
            if column:
                values[column.group()] = cell_text(cell)
        yield values


def text_rows(source):
    rows = []
    for line in source.read_text(encoding="utf-8-sig").splitlines():
        if not re.match(r"^\d+\t", line):
            continue
        parts = line.split("\t")
        if len(parts) < 13:
            raise ValueError(f"Incomplete pasted product row: {line[:40]}")
        rows.append({"F": parts[4], "G": parts[5], "H": parts[6], "I": parts[7], "J": parts[8], "M": parts[11], "N": parts[12]})
    if not rows:
        raise ValueError("No product rows found in pasted text")
    return rows


def source_rows(source):
    if source.suffix.lower() == ".txt":
        return text_rows(source)
    rows = list(sheet_rows(source))
    headers = rows[2]
    expected = {"E": "Item Code", "F": "Category", "G": "Brand", "H": "Name", "I": "MRP", "J": "Selling Price", "M": "Status", "N": "Show Online"}
    for column, name in expected.items():
        if " ".join(headers.get(column, "").split()).lower() != name.lower():
            raise ValueError(f"Unexpected workbook header in column {column}: expected {name}")
    return rows[3:]


def clean_price(value, name, label):
    value = value.strip().replace(",", "")
    if not value:
        return ""
    try:
        amount = Decimal(value)
    except InvalidOperation as error:
        raise ValueError(f"Invalid {label} for {name}: {value}") from error
    if not amount.is_finite() or amount < 0:
        raise ValueError(f"Invalid {label} for {name}: {value}")
    return f"{amount:.2f}"


def export(source, output, directory=False, approved_only=False, check_only=False):
    rows = source_rows(source)
    images = existing_images(output)
    images.update(sourced_images())

    records = []
    not_marked_online = 0
    for row in rows:
        if row.get("M", "").casefold() != "active":
            continue
        online = row.get("N", "").casefold() == "yes"
        if not online:
            not_marked_online += 1
        if approved_only and not online:
            continue
        name = row.get("H", "").strip()
        if not name:
            continue
        selling_price = "" if directory else clean_price(row.get("J", ""), name, "selling price")
        mrp = "" if directory else clean_price(row.get("I", ""), name, "MRP")
        if selling_price and mrp and Decimal(mrp) > 0 and Decimal(selling_price) > Decimal(mrp):
            raise ValueError(f"Selling price exceeds MRP for {name}")
        records.append({
            "name": name,
            "category": row.get("F", "").strip(),
            "brand": row.get("G", "").strip(),
            "selling_price": selling_price,
            "mrp": mrp,
            "image": images.get(product_key(name, row.get("F", ""), row.get("G", "")), ""),
            "description": "",
            "show_online": "yes" if online else "no",
            "listing_type": "directory" if directory else ("approved" if online else "catalogue"),
        })

    print(f"Selected: {len(records)}; active rows marked Show Online = No: {not_marked_online}; images retained: {sum(bool(record['image']) for record in records)}")
    if check_only:
        return
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(records)
    print(f"Exported {len(records)} product listings to {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="XLSX workbook or pasted TSV text")
    parser.add_argument("--output", type=Path, default=Path("public/products.csv"))
    parser.add_argument("--directory", action="store_true", help="Export names, brands, and categories without prices")
    parser.add_argument("--approved-only", action="store_true", help="Include only active rows marked Show Online = Yes")
    parser.add_argument("--check", action="store_true", help="Report counts without writing a CSV")
    args = parser.parse_args()
    export(args.source, args.output, args.directory, args.approved_only, args.check)
