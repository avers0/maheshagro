type Language = "hi" | "en";

const preferenceKey = "maheshagro-language";

const hindi: Record<string, string> = {
  "About Us": "हमारे बारे में",
  "Why Us": "हमें क्यों चुनें",
  "Why Choose Us": "हमें क्यों चुनें",
  "Products": "उत्पाद",
  "Testimonials": "ग्राहकों की राय",
  "Licenses": "लाइसेंस",
  "Locations": "हमारे केंद्र",
  "Awards": "पुरस्कार",
  "Contact": "संपर्क",
  "WhatsApp Chat": "व्हाट्सऐप पर बात करें",
  "Growing Together, Harvesting Success.": "साथ बढ़ें, समृद्ध फसल पाएं।",
  "Empowering Farmers for a Prosperous Harvest": "समृद्ध फसल के लिए किसानों को सशक्त बनाना",
  "Leading agriculture retail partner providing 100% genuine seeds, fertilizers, and expert guidance to maximize your yield since 1973.": "1973 से किसानों की भरोसेमंद कृषि साझेदार—असली बीज, उर्वरक और बेहतर उपज के लिए विशेषज्ञ सलाह।",
  "Innovation First": "नवाचार सबसे पहले",
  "To empower farmers with innovative tools and technology that enhance productivity, sustainability, and efficiency.": "किसानों को ऐसे नए साधन और तकनीक देना जो उत्पादकता, टिकाऊ खेती और कार्यक्षमता बढ़ाएं।",
  "Learn More": "और जानें",
  "Trusted Brand Partners": "विश्वसनीय ब्रांड साझेदार",
  "Who We Are at Mahesh Agro": "महेश एग्रो के बारे में",
  "Farmer First": "किसान पहले",
  "Harvesting Success Together": "मिलकर सफलता की फसल उगाएं",
  "Mahesh Agro Service Centre (MASC) is a premier agricultural retail and consultancy firm dedicated to empowering farmers with high-quality inputs and scientific expertise. Founded in 1973, we provide genuine seeds, fertilizers, and pesticides from top global brands, ensuring maximum productivity and sustainability for every farm.": "महेश एग्रो सर्विस सेंटर (MASC) किसानों को गुणवत्तापूर्ण कृषि सामग्री और वैज्ञानिक सलाह देने वाला कृषि रिटेल एवं परामर्श केंद्र है। 1973 से हम भरोसेमंद ब्रांडों के असली बीज, उर्वरक और कीटनाशक उपलब्ध करा रहे हैं।",
  "Established 1973": "स्थापना 1973",
  "Years of Trust": "भरोसे के वर्ष",
  "Five decades of practical guidance, genuine inputs, and dependable service for farmers.": "पांच दशकों से किसानों के लिए उपयोगी सलाह, असली कृषि सामग्री और भरोसेमंद सेवा।",
  "Growing community": "बढ़ता किसान परिवार",
  "Customers Served": "किसानों की सेवा",
  "Trusted by farmers for high-quality inputs and expert advice when it matters most.": "महत्वपूर्ण समय पर गुणवत्तापूर्ण कृषि सामग्री और विशेषज्ञ सलाह के लिए किसानों का भरोसा।",
  "Why Choose Us": "हमें क्यों चुनें",
  "Legacy of Excellence": "उत्कृष्ट सेवा की परंपरा",
  "Empowering farmers across the region since 1973 with dedicated service.": "1973 से पूरे क्षेत्र के किसानों को समर्पित सेवा के साथ सशक्त बना रहे हैं।",
  "Genuine Products": "असली उत्पाद",
  "100% authentic seeds and chemicals directly from trusted manufacturers.": "विश्वसनीय निर्माताओं से सीधे मिले 100% असली बीज और कृषि रसायन।",
  "Expert Guidance": "विशेषज्ञ सलाह",
  "Personalized advice from experienced consultants to maximize your yield.": "उपज बढ़ाने के लिए अनुभवी सलाहकारों से आपकी जरूरत के अनुसार मार्गदर्शन।",
  "Community Trust": "किसानों का भरोसा",
  "Serving 100000+ farmers across the region with dedication and care.": "पूरे क्षेत्र में 100000+ किसानों को समर्पण और देखभाल के साथ सेवा।",
  "Award Winning": "पुरस्कारों से सम्मानित",
  "Recognized by leading brands like Chambal, Corteva, and Bayer for excellence.": "चंबल, कोर्टेवा और बायर जैसे अग्रणी ब्रांडों से उत्कृष्टता के लिए सम्मानित।",
  "Agricultural expertise": "कृषि विशेषज्ञता",
  "Our Products": "हमारे उत्पाद",
  "Quality Agricultural Inputs": "गुणवत्तापूर्ण कृषि सामग्री",
  "From seeds to fertilizers and pesticides — everything your farm needs, sourced from trusted global brands.": "बीज से लेकर उर्वरक और कीटनाशक तक—खेती के लिए जरूरी सामग्री, भरोसेमंद ब्रांडों से।",
  "Seeds": "बीज",
  "Fertilizers": "उर्वरक",
  "Pesticides": "कीटनाशक",
  "Tools": "कृषि उपकरण",
  "Hybrid & open-pollinated varieties": "हाइब्रिड और उन्नत किस्में",
  "Macro & micronutrient solutions": "मुख्य और सूक्ष्म पोषक तत्व",
  "Insecticides, fungicides & herbicides": "कीटनाशक, फफूंदनाशक और खरपतवारनाशक",
  "Sprayers, irrigation & more": "स्प्रेयर, सिंचाई के साधन और अन्य",
  "Browse All Products": "सभी उत्पाद देखें",
  "What Farmers Say": "किसान क्या कहते हैं",
  "Licensed & Certified": "लाइसेंस और प्रमाणन",
  "Licenses & Certifications": "लाइसेंस और प्रमाणपत्र",
  "Fully licensed agriculture retail partner operating under all regulatory guidelines.": "सभी नियामक दिशानिर्देशों के अनुसार काम करने वाला लाइसेंस प्राप्त कृषि रिटेल केंद्र।",
  "Ask About Our Licenses": "लाइसेंस के बारे में पूछें",
  "Our Presence": "हमारी मौजूदगी",
  "Our ": "हमारे ",
  "Take a look at our specialized outlets and service centers.": "हमारे कृषि केंद्रों और सेवा केंद्रों की झलक देखें।",
  "Mahesh Agro outlet exterior": "महेश एग्रो केंद्र का बाहरी दृश्य",
  "Mahesh Agro store interior": "महेश एग्रो दुकान के अंदर का दृश्य",
  "Mahesh Agro products and team": "महेश एग्रो के उत्पाद और टीम",
  "Mahesh Agro farmers and products": "महेश एग्रो के किसान और उत्पाद",
  "Mahesh Agro service center": "महेश एग्रो सेवा केंद्र",
  "Recognition": "सम्मान",
  "Awards & Achievements": "पुरस्कार और उपलब्धियां",
  "Recognized by industry leaders for excellence in agriculture retail and service.": "कृषि रिटेल और सेवा में उत्कृष्टता के लिए उद्योग के अग्रणी संस्थानों से सम्मानित।",
  "Talk To Our Team": "हमारी टीम से बात करें",
  "Let’s grow better, together.": "आइए, मिलकर बेहतर खेती करें।",
  "Call, WhatsApp, or send a message for genuine products and practical agricultural guidance.": "असली उत्पाद और उपयोगी कृषि सलाह के लिए कॉल करें, व्हाट्सऐप करें या संदेश भेजें।",
  "Call us": "कॉल करें",
  "Email us": "ईमेल करें",
  "Visit us": "यहां आएं",
  "Ready to Grow with Us?": "हमारे साथ आगे बढ़ें",
  "Contact our experts today for personalized crop recommendations and genuine product guidance.": "फसल के लिए सुझाव और असली उत्पादों की जानकारी हेतु आज ही हमारे विशेषज्ञों से संपर्क करें।",
  "Find the right inputs for your farm": "अपने खेत के लिए सही कृषि सामग्री चुनें",
  "Explore product categories and talk with our team about options for your crop. We can help you confirm details and availability.": "उत्पाद श्रेणियां देखें और अपनी फसल के विकल्पों के बारे में हमारी टीम से बात करें। हम जानकारी और उपलब्धता की पुष्टि में मदद करेंगे।",
  "Explore categories": "श्रेणियां देखें",
  "Ask our team": "हमारी टीम से पूछें",
  "Browse by need": "जरूरत के अनुसार देखें",
  "Start with the type of product you need. Our team can help you narrow down the options.": "अपनी जरूरत के उत्पाद से शुरुआत करें। विकल्प चुनने में हमारी टीम मदद करेगी।",
  "Ask about options": "विकल्पों के बारे में पूछें",
  "Find a product": "उत्पाद खोजें",
  "Browse products and listed prices. Confirm the latest price and availability with our team before buying.": "उत्पाद और दिए गए दाम देखें। खरीदने से पहले ताजा कीमत और उपलब्धता हमारी टीम से पक्का करें।",
  "All products": "सभी उत्पाद",
  "All brands": "सभी ब्रांड",
  "Crop protection": "फसल सुरक्षा",
  "Spray equipment": "छिड़काव उपकरण",
  "Loading products…": "उत्पाद लोड हो रहे हैं…",
  "We couldn’t load the catalogue": "उत्पाद सूची लोड नहीं हो सकी",
  "Please try again or contact our team for product details.": "कृपया फिर कोशिश करें या उत्पादों की जानकारी के लिए हमारी टीम से संपर्क करें।",
  "Try again": "फिर कोशिश करें",
  "Ask on WhatsApp": "व्हाट्सऐप पर पूछें",
  "Tell us what you need": "हमें बताएं आपको क्या चाहिए",
  "Our online listings are not available yet. Share your crop, product name, or preferred brand, and we’ll help you find current options.": "उत्पादों की ऑनलाइन सूची अभी उपलब्ध नहीं है। अपनी फसल, उत्पाद या पसंदीदा ब्रांड बताएं—हम मौजूदा विकल्प खोजने में मदद करेंगे।",
  "Product category": "उत्पाद श्रेणी",
  "Crop, product, or brand": "फसल, उत्पाद या ब्रांड",
  "e.g. wheat seed or preferred brand": "जैसे गेहूं का बीज या पसंदीदा ब्रांड",
  "Your location": "आपका स्थान",
  "(optional)": "(वैकल्पिक)",
  "Village or town": "गांव या कस्बा",
  "Send enquiry on WhatsApp": "व्हाट्सऐप पर पूछताछ भेजें",
  "Or call +91 91660 29301": "या कॉल करें +91 91660 29301",
  "Search products and brands": "उत्पाद और ब्रांड खोजें",
  "Search products or brands": "उत्पाद या ब्रांड खोजें",
  "Filter by brand": "ब्रांड के अनुसार छांटें",
  "product": "उत्पाद",
  "products": "उत्पाद",
  "found": "मिले",
  "No matching products": "कोई मिलता-जुलता उत्पाद नहीं मिला",
  "Try another search or ask our team for help.": "दूसरे शब्द से खोजें या मदद के लिए हमारी टीम से पूछें।",
  "Clear filters": "फिल्टर हटाएं",
  "Ask for price": "कीमत पूछें",
  "MRP": "अधिकतम खुदरा मूल्य",
  "Enquire on WhatsApp": "व्हाट्सऐप पर पूछताछ करें",
  "Enquire": "पूछें",
  "Enquire about": "इसके बारे में पूछें",
  "Previous": "पिछला",
  "Page": "पृष्ठ",
  "of": "में से",
  "Product pages": "उत्पाद पृष्ठ",
  "Contact Us": "संपर्क करें",
  "Get in Touch": "हमसे जुड़ें",
  "Call Us Directly": "सीधे कॉल करें",
  "Chat with Experts": "विशेषज्ञों से बात करें",
  "Email Support": "ईमेल सहायता",
  "Our Address": "हमारा पता",
  "Visit Our Store": "हमारे केंद्र पर आएं",
  "View Branches": "केंद्र देखें",
  "Send a Message": "संदेश भेजें",
  "Full Name": "पूरा नाम",
  "Phone Number": "फोन नंबर",
  "Message": "संदेश",
  "Send via WhatsApp": "व्हाट्सऐप से भेजें",
  "Mandi Prices": "मंडी भाव",
  "Stay updated with today's agricultural commodity prices at local mandis.": "स्थानीय मंडियों में कृषि जिंसों के आज के भाव जानें।",
  "Search commodity or market...": "फसल या मंडी खोजें...",
  "Search commodity or market": "फसल या मंडी खोजें",
  "Commodity": "जिंस",
  "Variety": "किस्म",
  "Market": "मंडी",
  "Price": "भाव",
  "No results found.": "कोई परिणाम नहीं मिला।",
  "*Prices are indicative. Please contact us for current market rates.": "*ये सांकेतिक भाव हैं। ताजा मंडी भाव के लिए संपर्क करें।",
  "Wheat": "गेहूं",
  "Mustard": "सरसों",
  "Soybean": "सोयाबीन",
  "Cotton": "कपास",
  "Bajra": "बाजरा",
  "Paddy": "धान",
  "Jaipur Mandi": "जयपुर मंडी",
  "Kota Mandi": "कोटा मंडी",
  "Sangaria Mandi": "संगरिया मंडी",
  "Weather Forecast": "मौसम पूर्वानुमान",
  "Check current weather conditions and farming advisories for your region.": "अपने क्षेत्र का मौसम और खेती संबंधी सलाह देखें।",
  "Select Location": "स्थान चुनें",
  "Humidity": "नमी",
  "Wind Speed": "हवा की गति",
  "Farming Tip:": "खेती की सलाह:",
  "Partly Cloudy": "आंशिक बादल",
  "High humidity today — watch out for fungal diseases. Consider preventive fungicide application.": "आज नमी अधिक है—फफूंद जनित रोगों पर ध्यान दें। बचाव के लिए फफूंदनाशक उपयोग पर विचार करें।",
  "High temperature alert — ensure adequate irrigation and avoid spraying pesticides in peak heat.": "तापमान अधिक है—पर्याप्त सिंचाई करें और तेज गर्मी में कीटनाशक का छिड़काव न करें।",
  "Good conditions for field activities. Ideal for sowing and spraying.": "खेत के काम के लिए मौसम अनुकूल है। बुवाई और छिड़काव के लिए अच्छा समय।",
  "Fertilizer Calculator": "उर्वरक कैलकुलेटर",
  "Calculate the ideal fertilizer quantities for your crop and field size.": "अपनी फसल और खेत के आकार के अनुसार उर्वरक की मात्रा जानें।",
  "Crop Type": "फसल का प्रकार",
  "Area": "क्षेत्रफल",
  "Unit": "इकाई",
  "Acres": "एकड़",
  "Hectare": "हेक्टेयर",
  "Recommended for": "के लिए अनुशंसित मात्रा",
  "kg": "किलोग्राम",
  "*Recommendations are general guidelines. Actual requirements may vary based on soil test results.": "*ये सामान्य सुझाव हैं। वास्तविक जरूरत मिट्टी की जांच के अनुसार अलग हो सकती है।",
  "Branches": "हमारे केंद्र",
  "Visit our physical stores for personalized consultation and genuine products.": "व्यक्तिगत सलाह और असली उत्पादों के लिए हमारे केंद्र पर आएं।",
  "WhatsApp": "व्हाट्सऐप",
  "Call Now": "अभी कॉल करें",
  "Page Not Found": "पृष्ठ नहीं मिला",
  "The page you're looking for doesn't exist or has been moved.": "आप जिस पृष्ठ को ढूंढ रहे हैं, वह मौजूद नहीं है या कहीं और चला गया है।",
  "Go Home": "मुखपृष्ठ पर जाएं",
  "Browse Products": "उत्पाद देखें",
  "Privacy Policy": "गोपनीयता नीति",
  "How we collect, use, and protect your information.": "हम आपकी जानकारी कैसे लेते, उपयोग करते और सुरक्षित रखते हैं।",
  "Terms & Conditions": "नियम और शर्तें",
  "Trust & Transparency": "भरोसा और पारदर्शिता",
  "Our commitment to your security and the ethical standards of our agricultural partnership.": "आपकी सुरक्षा और हमारी कृषि साझेदारी के नैतिक मानकों के प्रति हमारी प्रतिबद्धता।",
  "Legal Information": "कानूनी जानकारी",
  "Last Updated: April 2026": "अंतिम अपडेट: अप्रैल 2026",
  "Weather": "मौसम",
  "Mandi": "मंडी",
  "Calculator": "कैलकुलेटर",
  "Developed by": "निर्माता",

  // Heritage redesign
  "Deoli's trusted farm store since 1973": "1973 से देवली के किसानों का भरोसा",
  "Visit our store": "हमारी दुकान पर आएं",
  "Open now": "अभी खुला है",
  "Closed now": "अभी बंद है",
  "Open daily": "रोज़ खुला",
  "9:00 AM - 8:00 PM": "सुबह 9 बजे – रात 8 बजे",
  "Directions": "रास्ता देखें",
  "Rooted on the Jaipur–Kota road since 1973": "1973 से जयपुर–कोटा रोड पर, किसानों के साथ",
  "Brand Partners": "ब्रांड साझेदार",
  "Contact Experts": "विशेषज्ञों से बात करें",
  "Why farmers keep coming back": "किसान बार-बार हमारे पास क्यों आते हैं",
  "Everything for the season, under one roof": "हर मौसम की हर ज़रूरत, एक ही जगह",
  "What's in season": "इस मौसम की फसलें",
  "Plan your inputs before sowing starts.": "बुवाई शुरू होने से पहले अपनी ज़रूरतों की तैयारी करें।",
  "In season now": "अभी का मौसम",
  "October – March": "अक्टूबर – मार्च",
  "June – September": "जून – सितंबर",
  "Rabi": "रबी",
  "Kharif": "खरीफ",
  "Wheat, mustard, gram and barley": "गेहूं, सरसों, चना और जौ",
  "Cotton, bajra, soybean and moong": "कपास, बाजरा, सोयाबीन और मूंग",
  "Ask us on WhatsApp": "व्हाट्सऐप पर हमसे पूछें",
  "what your field needs this season.": "— इस मौसम में आपके खेत को क्या चाहिए।",
  "Pesticide License": "कीटनाशक लाइसेंस",
  "Fertilizer License": "उर्वरक लाइसेंस",
  "Seeds License": "बीज लाइसेंस",
  "Come visit us": "हमसे मिलने आएं",
  "Mahesh Agro Service Centre - Daulta": "महेश एग्रो सर्विस सेंटर - दौलता",
  "RTO Office, Jaipur-Kota Road, Madhosinghpura (Daulta), Tonk (Raj.)": "आरटीओ ऑफिस, जयपुर-कोटा रोड, माधोसिंहपुरा (दौलता), टोंक (राज.)",
  "Mahesh Agro Service Centre - Nehru Market": "महेश एग्रो सर्विस सेंटर - नेहरू मार्केट",
  "Opp. Sabzi Mandi, Mamta Circle, Deoli, Tonk (Raj.) 304804": "सब्ज़ी मंडी के सामने, ममता सर्किल, देवली, टोंक (राजस्थान) 304804",
  "The trophy shelf": "हमारे सम्मान",
  "Best Performance Award": "सर्वश्रेष्ठ प्रदर्शन पुरस्कार",
  "Mark of Excellence Award": "मार्क ऑफ़ एक्सीलेंस पुरस्कार",
  "Highest PHN Business Award": "सर्वाधिक PHN व्यवसाय पुरस्कार",
  "Platinum Award for Highest Sales": "सर्वाधिक बिक्री के लिए प्लैटिनम पुरस्कार",
  "Certificate of Appreciation for Trust": "भरोसे के लिए प्रशंसा प्रमाणपत्र",
  "State Level Award": "राज्य स्तरीय पुरस्कार",
  "IPL Award Ceremony": "IPL पुरस्कार समारोह",
  "Mahesh Agro Service Centre, Daulta": "महेश एग्रो सर्विस सेंटर, दौलता",
  "Daulta, Rajasthan": "दौलता, राजस्थान",
  "Sowing soon? Talk to us first.": "बुवाई करने वाले हैं? पहले हमसे बात करें।",
  "Mahesh Agro": "महेश एग्रो",
  "Empowering farmers since 1973 with genuine agricultural inputs and expert consultation for a prosperous harvest.": "1973 से असली कृषि सामग्री और विशेषज्ञ सलाह के साथ किसानों की समृद्ध फसल में भागीदार।",
  "Quick Links": "मुख्य लिंक",
  "Farmer Tools": "किसान उपकरण",
  "Visit Us": "हमसे मिलें",
  "Made with": "प्यार से बनाया",
  "This field is still fallow": "यह खेत अभी खाली है",
  "Options for the crops you grow": "आपकी फसलों के लिए विकल्प",
  "Crop nutrition and soil inputs": "फसल पोषण और मिट्टी के लिए सामग्री",
  "Pesticides and crop care": "कीटनाशक और फसल सुरक्षा",
  "Tools for applying crop inputs": "छिड़काव और प्रयोग के उपकरण",
  "Call +91 91660 29301": "कॉल करें +91 91660 29301",
  "Calculate Fertilizer Needs": "खाद की ज़रूरत निकालें",
  "Rice/Paddy": "धान",
  "Sprayers": "स्प्रे मशीन",
  "Our product list is still growing": "हमारी उत्पाद सूची अभी बढ़ रही है",
  "Not every product is listed here yet, and prices may differ from what you see. Please call or WhatsApp us to confirm stock and the latest price before you order.": "अभी सभी उत्पाद यहाँ नहीं दिखाए गए हैं, और कीमतें यहाँ दिखी कीमतों से अलग हो सकती हैं। ऑर्डर करने से पहले उपलब्धता और ताज़ा कीमत के लिए हमें कॉल या व्हाट्सऐप करें।",
  "Director Club Sales Award": "डायरेक्टर क्लब बिक्री पुरस्कार",
  "Master of Solution & Promising Star awards": "मास्टर ऑफ़ सॉल्यूशन और प्रॉमिसिंग स्टार पुरस्कार",
  "Mahesh Agro Service Centre storefront": "महेश एग्रो सर्विस सेंटर की दुकान",
  "Mahesh Agro Service Centre at Nehru Market, Deoli": "नेहरू मार्केट, देवली में महेश एग्रो सर्विस सेंटर",
  "18 and 20 litre spray machines": "18 और 20 लीटर की स्प्रे मशीनें",
  "Browse seeds": "बीज देखें",
  "Browse fertilizers": "उर्वरक देखें",
  "Browse crop protection": "फसल सुरक्षा उत्पाद देखें",
  "Browse sprayers": "स्प्रे मशीनें देखें",
  "Next": "अगला",
};

const textOriginals = new WeakMap<Text, string>();
const textApplied = new WeakMap<Text, string>();
const attributeOriginals = new WeakMap<Element, Map<string, string>>();
const translatableAttributes = ["aria-label", "title", "placeholder", "alt"];

function translateText(node: Text, language: Language) {
  const current = node.nodeValue ?? "";
  // If something else (e.g. a Preact island) changed the text since we last wrote it, that is the new original.
  if (!textOriginals.has(node) || current !== textApplied.get(node)) textOriginals.set(node, current);
  const source = textOriginals.get(node) ?? current;
  const key = source.trim();
  const translation = language === "hi" ? hindi[key] : undefined;
  let next = source;
  if (translation !== undefined) {
    const leading = source.match(/^\s*/)?.[0] ?? "";
    const trailing = source.match(/\s*$/)?.[0] ?? "";
    next = `${leading}${translation}${trailing}`;
  }
  if (node.nodeValue !== next) node.nodeValue = next;
  textApplied.set(node, next);
}

function translateElement(element: Element, language: Language) {
  let originals = attributeOriginals.get(element);
  if (!originals) {
    originals = new Map();
    attributeOriginals.set(element, originals);
  }
  for (const attribute of translatableAttributes) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;
    const source = originals.get(attribute) ?? current;
    if (!originals.has(attribute)) originals.set(attribute, source);
    const translated = language === "hi" ? hindi[source] : undefined;
    if (translated !== undefined && current !== translated) element.setAttribute(attribute, translated);
    else if (translated === undefined && current !== source) element.setAttribute(attribute, source);
  }
}

function translateTree(root: Node, language: Language) {
  if (root instanceof Text) {
    translateText(root, language);
    return;
  }
  if (!(root instanceof Element)) return;
  if (root.matches("script,style,noscript,textarea,[data-language-static]")) return;
  translateElement(root, language);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script,style,noscript,textarea,[data-language-static]")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (walker.nextNode()) translateText(walker.currentNode as Text, language);
  root.querySelectorAll("*").forEach(element => translateElement(element, language));
}

function storeLanguage(language: Language) {
  try {
    localStorage.setItem(preferenceKey, language);
  } catch {
    // Keep the selected language for this page even when storage is blocked.
  }
}

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dir = "ltr";
  translateTree(document.body, language);
  document.querySelectorAll<HTMLButtonElement>("[data-language-toggle]").forEach(button => {
    const label = button.querySelector<HTMLElement>("[data-language-label]");
    if (label) label.textContent = language === "hi" ? "English" : "हिन्दी";
    else button.textContent = language === "hi" ? "English" : "हिन्दी";
    button.setAttribute("aria-label", language === "hi" ? "Switch language to English" : "भाषा हिंदी में बदलें");
    button.title = language === "hi" ? "Switch language to English" : "भाषा हिंदी में बदलें";
  });
  document.documentElement.dataset.language = language;
}

export function initLanguage() {
  let savedLanguage: Language | null = null;
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (saved === "hi" || saved === "en") savedLanguage = saved;
  } catch {
    // Hindi remains the default for this visit.
  }
  let language: Language = savedLanguage ?? "hi";
  applyLanguage(language);

  const dialog = document.getElementById("language-dialog") as HTMLDialogElement | null;
  if (!savedLanguage && dialog) {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  const chooseLanguage = (next: Language) => {
    language = next;
    storeLanguage(next);
    applyLanguage(next);
    if (dialog?.open) dialog.close();
  };

  document.querySelectorAll<HTMLButtonElement>("[data-language-choice]").forEach(button => {
    button.addEventListener("click", () => chooseLanguage(button.dataset.languageChoice === "en" ? "en" : "hi"));
  });
  document.addEventListener("click", event => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>("[data-language-toggle]");
    if (button) chooseLanguage(language === "hi" ? "en" : "hi");
  });
  dialog?.addEventListener("cancel", () => storeLanguage(language));
  window.addEventListener("storage", event => {
    if (event.key === preferenceKey && (event.newValue === "hi" || event.newValue === "en")) {
      language = event.newValue;
      applyLanguage(language);
    }
  });

  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "characterData" && record.target instanceof Text) translateText(record.target, language);
      if (record.type === "attributes" && record.target instanceof Element) translateElement(record.target, language);
      record.addedNodes.forEach(node => translateTree(node, language));
    }
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: translatableAttributes,
  });
}
