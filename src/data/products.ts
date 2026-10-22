export interface Product {
  id: number;
  name: string;
  category: 'Organic Fruits' | 'Farm Vegetables' | 'Artisan Dairy & Eggs' | 'Bakery & Fresh Bakes' | 'Gourmet Pantry' | 'Cold-Pressed Drinks';
  price: number;
  originalPrice: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeColor?: string;
  image: string;
  farmOrigin: string;
  harvestInfo: string;
  organicCert: string;
  description: string;
  storageTip: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    highlights: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Kashmiri Honeycrisp Apples",
    category: "Organic Fruits",
    price: 189,
    originalPrice: 229,
    unit: "4 pcs · approx 600g",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Dawn Picked",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Shopian High Orchards, Kashmir",
    harvestInfo: "Plucked 24 hrs ago at 2,100m elevation",
    organicCert: "Zero Pesticide Certified",
    description: "Crisp, sweet, bursting with natural aromatic juice. Hand-graded for maximum sugar content and snappy crunch.",
    storageTip: "Refrigerate in the crisper drawer to preserve crisp snap for up to 3 weeks.",
    nutrition: {
      calories: "52 kcal / 100g",
      protein: "0.3g",
      carbs: "14g",
      highlights: "Rich in Vitamin C, Quercetin & soluble pectin fiber"
    },
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Devgad Ratnagiri Alphonso Mangoes",
    category: "Organic Fruits",
    price: 649,
    originalPrice: 799,
    unit: "Box of 6 · GI Tagged",
    rating: 5.0,
    reviewsCount: 318,
    badge: "Reserve Batch",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Coastal Groves, Ratnagiri, MH",
    harvestInfo: "Naturally tree-ripened on straw haybeds",
    organicCert: "Authentic GI-Tagged Certified",
    description: "The gold standard of mangoes. Unmatched floral aroma, velvety fiberless saffron pulp, and royal sweetness.",
    storageTip: "Keep at room temperature until fragrant; chill for 1 hour before serving.",
    nutrition: {
      calories: "60 kcal / 100g",
      protein: "0.8g",
      carbs: "15g",
      highlights: "Exceptional Vitamin A and beta-carotene"
    },
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Organic Hass Avocados",
    category: "Organic Fruits",
    price: 249,
    originalPrice: 299,
    unit: "Pack of 2 · Ready to Eat",
    rating: 4.8,
    reviewsCount: 89,
    badge: "Fresh Import",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Kodaikanal Valley Farms",
    harvestInfo: "Harvested at peak oil content",
    organicCert: "100% Organically Cultivated",
    description: "Buttery, nutty, and velvety smooth Hass avocados. Perfect for guacamole, artisan sourdough toast, or green smoothies.",
    storageTip: "Ripen on counter; once slightly yielding to pressure, store in fridge.",
    nutrition: {
      calories: "160 kcal / 100g",
      protein: "2.0g",
      carbs: "8.5g",
      highlights: "Heart-healthy Monounsaturated Fats & Potassium"
    },
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "Organic Ruby Strawberries",
    category: "Organic Fruits",
    price: 179,
    originalPrice: 220,
    unit: "250g punnet",
    rating: 4.9,
    reviewsCount: 164,
    badge: "Hydroponic",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Mahabaleshwar Highland Terraces",
    harvestInfo: "Morning harvest, air-cushioned transit",
    organicCert: "Chemical Residue Free",
    description: "Deep scarlet, intensely fragrant berries grown in climate-controlled mountain terraces with clean spring water.",
    storageTip: "Do not wash until ready to eat. Keep dry in refrigerator.",
    nutrition: {
      calories: "32 kcal / 100g",
      protein: "0.7g",
      carbs: "7.7g",
      highlights: "Packed with Anthocyanins & Vitamin C"
    },
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Tender Crown Broccoli",
    category: "Farm Vegetables",
    price: 79,
    originalPrice: 99,
    unit: "1 head · approx 450g",
    rating: 4.8,
    reviewsCount: 95,
    badge: "Direct From Soil",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Ooty Nilgiri Hills, TN",
    harvestInfo: "Cut at 5:30 AM this morning",
    organicCert: "Certified Organic Farming",
    description: "Tight, deep-emerald florets with crisp succulent stalks. Steams to vibrant tenderness with clean sweetness.",
    storageTip: "Wrap loosely in damp towel and store in crisper.",
    nutrition: {
      calories: "34 kcal / 100g",
      protein: "2.8g",
      carbs: "6.6g",
      highlights: "Potent Sulforaphane & Dietary Fiber"
    },
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Heirloom Vine Tomatoes",
    category: "Farm Vegetables",
    price: 65,
    originalPrice: 85,
    unit: "500g cluster on vine",
    rating: 4.9,
    reviewsCount: 210,
    badge: "Sun-Ripened",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Nashik Sun Valley Farms",
    harvestInfo: "Naturally ripened on parent vine",
    organicCert: "NPOP Organic Standards",
    description: "Brimming with savory umami and bright sweet acidity. Kept on the vine to maintain maximum natural essential oils.",
    storageTip: "Never refrigerate! Keep stem-down at room temperature.",
    nutrition: {
      calories: "18 kcal / 100g",
      protein: "0.9g",
      carbs: "3.9g",
      highlights: "High in Lycopene antioxidant and bioflavonoids"
    },
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: "Rainbow Bell Peppers Trio",
    category: "Farm Vegetables",
    price: 119,
    originalPrice: 149,
    unit: "Pack of 3 (Red, Yellow, Green)",
    rating: 4.7,
    reviewsCount: 78,
    badge: "Hydroponic",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Pune Precision Greenhouse",
    harvestInfo: "Picked at peak pigmentation",
    organicCert: "Residue Free Tested",
    description: "Thick-walled, crisp, and naturally sweet. Excellent for roasting, sautéing, or crisp crudités platters.",
    storageTip: "Keep in the vegetable drawer in perforated bag.",
    nutrition: {
      calories: "26 kcal / 100g",
      protein: "1.0g",
      carbs: "6.0g",
      highlights: "300% Daily Vitamin C intake per serving"
    },
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: "Baby Spinach & Wild Rocket",
    category: "Farm Vegetables",
    price: 49,
    originalPrice: 65,
    unit: "200g washed & spun box",
    rating: 4.8,
    reviewsCount: 130,
    badge: "Washed & Ready",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Lonavala Hydro Greens",
    harvestInfo: "Harvested today, pre-chilled to 4°C",
    organicCert: "Triple Water-Washed Organic",
    description: "Tender, peppery wild rocket blended with tender young baby spinach leaves. Zero grit, 100% ready for tossing.",
    storageTip: "Store in original sealed container with a paper towel beneath lid.",
    nutrition: {
      calories: "23 kcal / 100g",
      protein: "2.9g",
      carbs: "3.6g",
      highlights: "Iron, Folate & Lutein powerhouse"
    },
    inStock: true,
    featured: false
  },
  {
    id: 9,
    name: "Farm Fresh A2 Desi Cow Milk",
    category: "Artisan Dairy & Eggs",
    price: 85,
    originalPrice: 95,
    unit: "1 Litre · Glass Bottle",
    rating: 5.0,
    reviewsCount: 420,
    badge: "Single Origin",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Gir Heritage Cow Sanctuary, Gujarat",
    harvestInfo: "Milked at 4:30 AM, cold-bottled instantly",
    organicCert: "Pure A2 Beta-Casein Certified",
    description: "Raw unadulterated whole milk from grass-fed indigenous Gir cows. Non-homogenized with rich natural cream top.",
    storageTip: "Keep below 4°C. Boil within 24 hours of delivery.",
    nutrition: {
      calories: "65 kcal / 100ml",
      protein: "3.4g",
      carbs: "4.8g",
      highlights: "Gentle A2 digestion protein & natural calcium"
    },
    inStock: true,
    featured: true
  },
  {
    id: 10,
    name: "Free-Range Pasture Golden Eggs",
    category: "Artisan Dairy & Eggs",
    price: 135,
    originalPrice: 160,
    unit: "Pack of 6 · Herb-Fed",
    rating: 4.9,
    reviewsCount: 275,
    badge: "Free Range",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Coorg Open Meadows",
    harvestInfo: "Gathered daily from free-foraging hens",
    organicCert: "Antibiotic & Hormone Free",
    description: "Luminous amber yolks with tall, firm whites. Hens forage freely on clover, marigolds, and organic grains.",
    storageTip: "Store in carton pointy-end down in refrigerator.",
    nutrition: {
      calories: "72 kcal / egg",
      protein: "6.3g",
      carbs: "0.4g",
      highlights: "High Omega-3 fatty acids and Choline"
    },
    inStock: true,
    featured: false
  },
  {
    id: 11,
    name: "Artisanal Aged Clothbound Cheddar",
    category: "Artisan Dairy & Eggs",
    price: 349,
    originalPrice: 420,
    unit: "200g wedge · 12-Month Aged",
    rating: 4.9,
    reviewsCount: 112,
    badge: "Artisanal Reserve",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Pondicherry Artisan Creamery",
    harvestInfo: "Cave-matured for 365 days",
    organicCert: "Traditional Vegetarian Rennet",
    description: "Crumbly, complex, with crystalline calcium lactate crunches and rich nutty butterscotch depth.",
    storageTip: "Wrap in wax paper followed by loose plastic foil in cheese drawer.",
    nutrition: {
      calories: "402 kcal / 100g",
      protein: "25g",
      carbs: "1.3g",
      highlights: "Dense bioavailable Calcium and Vitamin B12"
    },
    inStock: true,
    featured: false
  },
  {
    id: 12,
    name: "Stone-Ground Wild Yeast Sourdough",
    category: "Bakery & Fresh Bakes",
    price: 145,
    originalPrice: 175,
    unit: "550g rustic boule",
    rating: 4.9,
    reviewsCount: 198,
    badge: "Baked at 4 AM",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Nityokart Wood-Fired Hearth Bakery",
    harvestInfo: "Fermented for 36 hours slow-rise",
    organicCert: "100% Ancient Emmer Wheat",
    description: "Blistered mahogany crust with an open, custard-like crumb and deeply complex fermented tang.",
    storageTip: "Keep cut-side down on wooden board. Freeze slices for toasted perfection.",
    nutrition: {
      calories: "220 kcal / 100g",
      protein: "8.5g",
      carbs: "45g",
      highlights: "Prebiotic gut-friendly fermented grain"
    },
    inStock: true,
    featured: true
  },
  {
    id: 13,
    name: "French Pure Butter Brioche Loaf",
    category: "Bakery & Fresh Bakes",
    price: 165,
    originalPrice: 199,
    unit: "400g sliced loaf",
    rating: 4.8,
    reviewsCount: 88,
    badge: "Gold Medal Bake",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Nityokart French Oven Masters",
    harvestInfo: "Folded with 84% butterfat cultured butter",
    organicCert: "No Preservatives or Emulsifiers",
    description: "Featherlight, pillowy golden crumb with decadent sweetness. Makes divine French toast or gourmet burgers.",
    storageTip: "Store tightly sealed at room temperature for up to 4 days.",
    nutrition: {
      calories: "320 kcal / 100g",
      protein: "7.0g",
      carbs: "48g",
      highlights: "Crafted with grass-fed cultured cream butter"
    },
    inStock: true,
    featured: false
  },
  {
    id: 14,
    name: "First Cold-Pressed Extra Virgin Olive Oil",
    category: "Gourmet Pantry",
    price: 890,
    originalPrice: 1050,
    unit: "500ml Dark UV Glass Bottle",
    rating: 5.0,
    reviewsCount: 340,
    badge: "Single Estate",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Rajasthan Olive Groves & Estate",
    harvestInfo: "Early green harvest, cold extracted < 22°C",
    organicCert: "Acidity < 0.2% Super Premium",
    description: "Peppery finish with notes of freshly cut grass, green almond, and artichoke. Cold-pressed within 3 hours of harvest.",
    storageTip: "Store in a cool, dark cupboard away from direct stove heat.",
    nutrition: {
      calories: "120 kcal / 15ml",
      protein: "0g",
      carbs: "0g",
      highlights: "Super high Polyphenols (650+ mg/kg)"
    },
    inStock: true,
    featured: true
  },
  {
    id: 15,
    name: "Raw Forest Wildflower Honey",
    category: "Gourmet Pantry",
    price: 395,
    originalPrice: 480,
    unit: "350g Hexagonal Glass Jar",
    rating: 4.9,
    reviewsCount: 215,
    badge: "Unfiltered Raw",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Sundarbans Biosphere Reserve",
    harvestInfo: "Ethically hand-harvested by local beekeepers",
    organicCert: "100% Pure, Unpasteurized & Raw",
    description: "Dense, aromatic honey infused with natural pollen grains and forest enzymes. Never micro-filtered or heat-treated.",
    storageTip: "Store at room temp. Natural crystallization is a mark of purity.",
    nutrition: {
      calories: "64 kcal / tbsp",
      protein: "0.1g",
      carbs: "17g",
      highlights: "Live enzymes, antioxidants & pollen nutrients"
    },
    inStock: true,
    featured: false
  },
  {
    id: 16,
    name: "Cold-Pressed Valencia Blood Orange Juice",
    category: "Cold-Pressed Drinks",
    price: 125,
    originalPrice: 150,
    unit: "350ml Glass Flask",
    rating: 4.9,
    reviewsCount: 180,
    badge: "Zero Added Sugar",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Punjab Citrus Belt",
    harvestInfo: "Hydraulic cold-pressed this morning",
    organicCert: "100% Pure Crushed Fruit",
    description: "Vibrant ruby-orange juice extracted without heat or oxidation. Packed with natural citrus oils and live vitamins.",
    storageTip: "Consume within 48 hours of delivery. Keep refrigerated.",
    nutrition: {
      calories: "45 kcal / 100ml",
      protein: "0.7g",
      carbs: "10g",
      highlights: "Pure Vitamin C, Folate and Bioflavonoids"
    },
    inStock: true,
    featured: true
  },
  {
    id: 17,
    name: "Alkaline Green Detox Elixir",
    category: "Cold-Pressed Drinks",
    price: 139,
    originalPrice: 165,
    unit: "350ml Glass Flask",
    rating: 4.8,
    reviewsCount: 94,
    badge: "Raw Cold Pressed",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Nityokart Micro-Press Bar",
    harvestInfo: "Celery, Green Apple, Cucumber, Lemon & Ginger",
    organicCert: "Zero Water Added Guarantee",
    description: "Crisp and invigorating alkaline surge. Gently cold-pressed to preserve cellular vitality and deep hydration.",
    storageTip: "Keep cold below 3°C and shake lightly before drinking.",
    nutrition: {
      calories: "38 kcal / 100ml",
      protein: "1.1g",
      carbs: "8.2g",
      highlights: "Electrolyte-rich Potassium, Magnesium & Chlorophyll"
    },
    inStock: true,
    featured: false
  },
  {
    id: 18,
    name: "Single-Estate Arabica Roast Coffee",
    category: "Gourmet Pantry",
    price: 460,
    originalPrice: 550,
    unit: "250g Whole Beans · Medium Roast",
    rating: 5.0,
    reviewsCount: 220,
    badge: "Micro-Lot Reserve",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    farmOrigin: "Chikmagalur Cloud Mist Estate",
    harvestInfo: "Shade-grown at 1,400m, washed process",
    organicCert: "Rainforest Alliance Certified",
    description: "Tasting notes of dark caramel, roasted hazelnut, and wild berries. Roasted in small batches every Tuesday.",
    storageTip: "Store whole beans in airtight canister in cool dark pantry.",
    nutrition: {
      calories: "2 kcal / cup",
      protein: "0.2g",
      carbs: "0g",
      highlights: "Chlorogenic acids & pure natural caffeine"
    },
    inStock: true,
    featured: false
  }
];

export const CATEGORIES = [
  'All',
  'Organic Fruits',
  'Farm Vegetables',
  'Artisan Dairy & Eggs',
  'Bakery & Fresh Bakes',
  'Gourmet Pantry',
  'Cold-Pressed Drinks'
] as const;

export type CategoryType = (typeof CATEGORIES)[number];
