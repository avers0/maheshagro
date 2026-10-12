# Updating product prices

The product page reads `public/products.csv`. To refresh it after changing the source workbook, run this from the project directory:

```powershell
npm run products:refresh -- "C:\Users\91888\Downloads\all_product_data.xlsx"
npm run build
```

The import includes every active product's name, category, brand, selling price, and MRP. It does not publish stock quantities or item codes. A zero selling price appears as “Ask for price” on the website. The workbook's `Show Online` flag is retained in the CSV for reference, but does not hide products; use `--approved-only` if that policy changes.

The refresh stops if a price is invalid or a selling price exceeds its MRP, leaving the previous CSV intact. Correct the source sheet and rerun the command.

Verified product photos live in `public/product-images/`, with their product matches and source pages recorded in `scripts/product-images.json`. The import uses that manifest first, then retains any additional image paths already assigned in `public/products.csv` when name, category, and brand still match. This keeps images intact during price updates. To add another photo, save it under `public/product-images/` and add a manifest entry with the exact catalogue name, category, brand, image path, source page, and verification note. Do not use a brand logo or a different pack size as a product photo. Check reuse rights before publishing third-party imagery commercially.

Check `http://localhost:4321/products/` after refreshing. The public website changes only after the updated site is deployed. Prices on the page are labelled as listed prices, and customers are asked to confirm the latest price and availability.
