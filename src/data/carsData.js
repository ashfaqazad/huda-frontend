const carsData = [
  // --- Vehicle 1: Hino Profia Truck ---
  {
    id: 1,
    title: { en: "Hino Profia Truck", ja: "日野プロフィアトラック" },
    price: 2100000,
    year: 2016,
    mileage: { en: "1,311,547 km", ja: "1,311,547 km" },
    img: "/Images/image-1.jpeg",
    status: "sold", // 👈 add this line

  },

  // --- Vehicle 2: Daihatsu Hijet Dump Truck ---
  {
    id: 2,
    title: { en: "Daihatsu Hijet Dump Truck", ja: "ダイハツ ハイゼット ダンプトラック" },
    price: 300000,
    year: 2009,
    mileage: { en: "N/A", ja: "該当なし" },
    img: "/Images/hijet-1.jpg",
  },

  // --- Vehicle 3: Komatsu PC20MR-1 Mini Excavator ---
  {
    id: 3,
    title: { en: "Komatsu PC20MR-1 Mini Excavator", ja: "コマツ PC20MR-1 ミニショベル" },
    price: 700000,
    year: 2005,
    mileage: { en: "N/A", ja: "該当なし" },
    img: "/Images/loder-1.jpeg",
  },
  // --- Vehicle 4: Hino Dutro 2005 ---
{
  id: 4,
  title: { en: "Hino Dutro 2005", ja: "日野デュトロ 2005年式" },
  price: 450000,
  year: 2005,
  mileage: { en: "371,414 km", ja: "371,414 km" },
  img: "/Images/dutro-1.jpg",
  status: "sold", // 👈 add this line

},


{
  id: 5,
  title: { en: "Komatsu PC75UU-1 Excavator", ja: "コマツ PC75UU-1 油圧ショベル" },
  price: 800000,
  year: null, // agar exact year pata ho to daal do
  mileage: { en: "3,500 hrs", ja: "3,500時間" },
  img: "/Images/Excavator-1.jpg",
},

{
  id: 6,
title: { en: "ISUZU Dump Truck", ja: "いすゞ ダンプトラック" },
price: 1800000,
year: 1996,
mileage: { en: "N/A", ja: "N/A" },
img: "/Images/truck-1.jpg",

},

];


export default carsData;