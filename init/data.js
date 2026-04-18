const sampleList = [
{
  title: "Cozy Mountain Cabin",
  description: "A warm and inviting cabin nestled in the mountains.",
  price: 150,
  location: "Aspen, CO",
  category: ["mountains","trending"],
  geometry: { type: "Point", coordinates: [-106.8175, 39.1911] },
  images: [
    { url: "/images/cabin1.jpg", filename: "cabin1.jpg" },
    { url: "/images/cabin2.jpg", filename: "cabin2.jpg" }
  ]
},
{
  title:"Modern City Apartment",
  description:"A sleek apartment located in the heart of the city.",
  price:200,
  location:"New York, NY",
  category:["city","rooms"],
  geometry: { type: "Point", coordinates: [-74.0060, 40.7128] },
  images:[
    { url:"/images/apartment1.jpg", filename:"apartment1.jpg" },
    { url:"/images/apartment2.jpg", filename:"apartment2.jpg" }
  ]
},
{
  title:"Charming Country Cottage",
  description:"A quaint cottage surrounded by beautiful countryside.",
  price:120,
  location:"Nashville, TN",
  category:["forest","trending"],
  geometry: { type: "Point", coordinates: [-86.7816, 36.1627] },
  images:[
    { url:"/images/cottage1.jpg", filename:"cottage1.jpg" },
    { url:"/images/cottage2.jpg", filename:"cottage2.jpg" }
  ]
},
{
  title:"Luxurious Downtown Condo",
  description:"A high-end condo with top-notch amenities in downtown.",
  price:300,
  location:"Chicago, IL",
  category:["city","rooms"],
  geometry: { type: "Point", coordinates: [-87.6298, 41.8781] },
  images:[
    { url:"/images/condo1.jpg", filename:"condo1.jpg" },
    { url:"/images/condo2.jpg", filename:"condo2.jpg" }
  ]
},
{
  title:"Spacious Suburban Home",
  description:"A large family home in a quiet suburban neighborhood.",
  price:220,
  location:"Austin, TX",
  category:["rooms"],
  geometry: { type: "Point", coordinates: [-97.7431, 30.2672] },
  images:[
    { url:"/images/suburban1.jpg", filename:"suburban1.jpg" },
    { url:"/images/suburban2.jpg", filename:"suburban2.jpg" }
  ]
},
{
  title:"Rustic Farmhouse",
  description:"A traditional farmhouse with modern comforts.",
  price:180,
  location:"Lancaster, PA",
  category:["forest","trending"],
  geometry: { type: "Point", coordinates: [-76.3055, 40.0379] },
  images:[
    { url:"/images/farmhouse1.jpg", filename:"farmhouse1.jpg" },
    { url:"/images/farmhouse2.jpg", filename:"farmhouse2.jpg" }
  ]
},
{
  title:"Beachfront Villa",
  description:"A stunning villa with direct access to the beach.",
  price:350,
  location:"Miami, FL",
  category:["beach","resorts"],
  geometry: { type: "Point", coordinates: [-80.1918, 25.7617] },
  images:[
    { url:"/images/villa1.jpg", filename:"villa1.jpg" },
    { url:"/images/villa2.jpg", filename:"villa2.jpg" }
  ]
},
{
  title:"Historic Townhouse",
  description:"A beautifully restored townhouse with historic charm.",
  price:275,
  location:"Boston, MA",
  category:["city"],
  geometry: { type: "Point", coordinates: [-71.0589, 42.3601] },
  images:[
    { url:"/images/townhouse1.jpg", filename:"townhouse1.jpg" },
    { url:"/images/townhouse2.jpg", filename:"townhouse2.jpg" }
  ]
},
{
  title:"Eco-Friendly Tiny Home",
  description:"A compact and sustainable tiny home perfect for minimalists.",
  price:100,
  location:"Portland, OR",
  category:["forest","trending"],
  geometry: { type: "Point", coordinates: [-122.6765, 45.5152] },
  images:[
    { url:"/images/tinyhome1.jpg", filename:"tinyhome1.jpg" },
    { url:"/images/tinyhome2.jpg", filename:"tinyhome2.jpg" }
  ]
},
{
  title:"Luxury Penthouse Suite",
  description:"An opulent penthouse with panoramic city views.",
  price:500,
  location:"Los Angeles, CA",
  category:["city","rooms"],
  geometry: { type: "Point", coordinates: [-118.2437, 34.0522] },
  images:[
    { url:"/images/penthouse1.jpg", filename:"penthouse1.jpg" },
    { url:"/images/penthouse2.jpg", filename:"penthouse2.jpg" }
  ]
},
{
  title:"Secluded Forest Retreat",
  description:"A private retreat surrounded by nature in the forest.",
  price:160,
  location:"Burlington, VT",
  category:["forest"],
  geometry: { type: "Point", coordinates: [-73.2121, 44.4759] },
  images:[
    { url:"/images/forest1.jpg", filename:"forest1.jpg" },
    { url:"/images/forest2.jpg", filename:"forest2.jpg" }
  ]
},
{
  title:"Urban Loft",
  description:"A trendy loft in a vibrant urban neighborhood.",
  price:210,
  location:"Seattle, WA",
  category:["city","rooms"],
  geometry: { type: "Point", coordinates: [-122.3321, 47.6062] },
  images:[
    { url:"/images/loft1.jpg", filename:"loft1.jpg" },
    { url:"/images/loft2.jpg", filename:"loft2.jpg" }
  ]
},
{
  title:"Island Bungalow",
  description:"A charming bungalow on a tropical island.",
  price:230,
  location:"Honolulu, HI",
  category:["beach","resorts"],
  geometry: { type: "Point", coordinates: [-157.8583, 21.3069] },
  images:[
    { url:"/images/bungalow1.jpg", filename:"bungalow1.jpg" },
    { url:"/images/bungalow2.jpg", filename:"bungalow2.jpg" }
  ]
},
{
  title:"Ski Chalet",
  description:"A cozy chalet located near popular ski resorts.",
  price:280,
  location:"Vail, CO",
  category:["mountains","arctic"],
  geometry: { type: "Point", coordinates: [-106.3738, 39.6403] },
  images:[
    { url:"/images/ski1.jpg", filename:"ski1.jpg" },
    { url:"/images/ski2.jpg", filename:"ski2.jpg" }
  ]
},
{
  title:"Lakefront Cabin",
  description:"A peaceful cabin with stunning lake views.",
  price:170,
  location:"Lake Tahoe, CA",
  category:["mountains","trending"],
  geometry: { type: "Point", coordinates: [-120.0324, 39.0968] },
  images:[
    { url:"/images/lakefront1.jpg", filename:"lakefront1.jpg" },
    { url:"/images/lakefront2.jpg", filename:"lakefront2.jpg" }
  ]
},
{
  title:"Countryside Villa",
  description:"A spacious villa surrounded by rolling hills and vineyards.",
  price:320,
  location:"Napa Valley, CA",
  category:["forest","villas"],
  geometry: { type: "Point", coordinates: [-122.2869, 38.5025] },
  images:[
    { url:"/images/countryside1.jpg", filename:"countryside1.jpg" },
    { url:"/images/countryside2.jpg", filename:"countryside2.jpg" }
  ]
},
{
  title:"City Center Studio",
  description:"A compact studio apartment in the city center.",
  price:130,
  location:"San Francisco, CA",
  category:["city","rooms"],
  geometry: { type: "Point", coordinates: [-122.4194, 37.7749] },
  images:[
    { url:"/images/studio1.jpg", filename:"studio1.jpg" },
    { url:"/images/studio2.jpg", filename:"studio2.jpg" }
  ]
},
{
  title:"Tropical Treehouse",
  description:"A unique treehouse experience in a tropical setting.",
  price:240,
  location:"Costa Rica",
  category:["forest","trending"],
  geometry: { type: "Point", coordinates: [-84.0907, 9.9281] },
  images:[
    { url:"/images/treehouse1.jpg", filename:"treehouse1.jpg" },
    { url:"/images/treehouse2.jpg", filename:"treehouse2.jpg" }
  ]
},
{
  title:"Historic Castle",
  description:"A majestic castle with a rich history and stunning architecture.",
  price:600,
  location:"Edinburgh, Scotland",
  category:["trending","villas"],
  geometry: { type: "Point", coordinates: [-3.1883, 55.9533] },
  images:[
    { url:"/images/castle1.jpg", filename:"castle1.jpg" },
    { url:"/images/castle2.jpg", filename:"castle2.jpg" }
  ]
},
{
  title:"Modern Beachfront Apartment",
  description:"A stylish apartment with breathtaking views of the beach.",
  price:260,
  location:"Santa Monica, CA",
  category:["beach","rooms"],
  geometry: { type: "Point", coordinates: [-118.4912, 34.0195] },
  images:[
    { url:"/images/beachfront1.jpg", filename:"beachfront1.jpg" },
    { url:"/images/beachfront2.jpg", filename:"beachfront2.jpg" }
  ]
},
{
  title:"Chic Boutique Hotel Room",
  description:"A fashionable room in a trendy boutique hotel.",
  price:290,
  location:"San Diego, CA",
  category:["rooms","city"],
  geometry: { type: "Point", coordinates: [-117.1611, 32.7157] },
  images:[
    { url:"/images/hotel1.jpg", filename:"hotel1.jpg" },
    { url:"/images/hotel2.jpg", filename:"hotel2.jpg" }
  ]
},
{
  title:"Mountain View Ranch",
  description:"A sprawling ranch with stunning mountain views.",
  price:400,
  location:"Bozeman, MT",
  category:["mountains","trending"],
  geometry: { type: "Point", coordinates: [-111.0429, 45.6770] },
  images:[
    { url:"/images/ranch1.jpg", filename:"ranch1.jpg" },
    { url:"/images/ranch2.jpg", filename:"ranch2.jpg" }
  ]
},
{
  title:"Seaside Cottage",
  description:"A charming cottage just steps from the sea.",
  price:210,
  location:"Cape Cod, MA",
  category:["beach","trending"],
  geometry: { type: "Point", coordinates: [-70.2962, 41.6688] },
  images:[
    { url:"/images/seaside1.jpg", filename:"seaside1.jpg" },
    { url:"/images/seaside2.jpg", filename:"seaside2.jpg" }
  ]
},
{
  title:"Vineyard Estate",
  description:"A luxurious estate located in the heart of wine country.",
  price:450,
  location:"Sonoma, CA",
  category:["villas","trending"],
  geometry: { type: "Point", coordinates: [-122.4580, 38.2919] },
  images:[
    { url:"/images/vineyard1.jpg", filename:"vineyard1.jpg" },
    { url:"/images/vineyard2.jpg", filename:"vineyard2.jpg" }
  ]
},
{
  title:"Coastal Farmhouse",
  description:"A beautiful farmhouse located along the coast.",
  price:280,
  location:"Charleston, SC",
  category:["beach","forest"],
  geometry: { type: "Point", coordinates: [-79.9311, 32.7765] },
  images:[
    { url:"/images/coastal1.jpg", filename:"coastal1.jpg" },
    { url:"/images/coastal2.jpg", filename:"coastal2.jpg" }
  ]
}
];

module.exports = { data: sampleList };