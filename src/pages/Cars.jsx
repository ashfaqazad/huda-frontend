import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const allCars = [
  // --- Vehicle 1: Hino Profia Truck ---
  {
    id: 1,
    title: { en: "Hino Profia Truck", ja: "日野プロフィアトラック" },
    price: 2100000,
    year: 2016,
    mileage: { en: "1,311,547 km", ja: "1,311,547 km" },
    img: "/Images/image-1.jpeg",
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
},

];

export default function Cars() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");

  // Normalize language
  const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";

  // Language set kar URL se
  useEffect(() => {
    if (lng && ["en", "ja"].includes(lng)) {
      i18n.changeLanguage(lng);
    } else {
      i18n.changeLanguage("ja"); // Default to Japanese
    }
  }, [lng, i18n]);

  // Helper for language-prefixed link
  const getLink = (path) => `/${currentLanguage}${path === "/" ? "" : path}`;

  const filtered = allCars
    .filter((c) => {
      const title = c.title[currentLanguage] || c.title.en;
      return title?.toLowerCase().includes(query.trim().toLowerCase());
    })
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "latest") return b.year - a.year;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {t("cars_title", { defaultValue: "Available Vehicles" })}
          </h1>

          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3">
            {/* Search Box */}
            <input
              type="text"
              placeholder={t("search_car_placeholder", { defaultValue: "Search vehicles..." })}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
            />

            {/* Sorting Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
            >
              <option value="latest">{t("sort_latest", { defaultValue: "Latest" })}</option>
              <option value="price-low">{t("sort_price_low", { defaultValue: "Price: Low to High" })}</option>
              <option value="price-high">{t("sort_price_high", { defaultValue: "Price: High to Low" })}</option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition duration-200"
              >
                <img
                  src={car.img}
                  alt={car.title[currentLanguage] || car.title.en}
                  className="w-full h-80 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    {car.title[currentLanguage] || car.title.en}
                  </h2>
                  <div className="text-green-600 font-bold mt-1">
                    ¥{car.price.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {t("car_year", { year: car.year })} •{" "}
                    {car.mileage[currentLanguage] || car.mileage.en}
                  </div>

                  <Link
                    to={getLink(`/cars/${car.id}`)}
                    className="inline-block mt-3 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    {t("view_details", { defaultValue: "View Details" })}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">
            {t("no_cars_found", { defaultValue: "No vehicles found." })}
          </p>
        )}
      </div>
    </div>
  );
}














// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const allCars = [
//   {
//     id: 1,
//     title: { en: 'Hino Profia Truck', ja: '日野プロフィアトラック' },
//     price: 9500000,
//     year: 2021,
//     mileage: { en: '25,000 km', ja: '25,000 km' },
//     img: '/Images/image-1.jpeg',
//   },
// ];

// export default function Cars() {
//   const { t, i18n } = useTranslation();
//   const { lng } = useParams();
//   const [query, setQuery] = useState('');
//   const [sort, setSort] = useState('latest');

//   // Normalize language
//   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

//   // Language set kar URL se
//   useEffect(() => {
//     if (lng && ['en', 'ja'].includes(lng)) {
//       i18n.changeLanguage(lng);
//     } else {
//       i18n.changeLanguage('ja'); // Default to Japanese
//     }
//   }, [lng, i18n]);

//   // Helper for language-prefixed link
//   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

//   const filtered = allCars
//     .filter((c) => {
//       const title = c.title[currentLanguage] || c.title.en;
//       return title?.toLowerCase().includes(query.trim().toLowerCase());
//     })
//     .sort((a, b) => {
//       if (sort === 'price-low') return a.price - b.price;
//       if (sort === 'price-high') return b.price - a.price;
//       if (sort === 'latest') return b.year - a.year;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 lg:px-8 py-10">
//         {/* Heading */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">{t('cars_title')}</h1>

//           <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3">
//             {/* Search Box */}
//             <input
//               type="text"
//               placeholder={t('search_car_placeholder')}
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
//             />
//             {/* Sorting Dropdown */}
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
//             >
//               <option value="latest">{t('sort_latest')}</option>
//               <option value="price-low">{t('sort_price_low')}</option>
//               <option value="price-high">{t('sort_price_high')}</option>
//             </select>
//           </div>
//         </div>

//         {/* Cars Grid */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white rounded-xl shadow hover:shadow-xl transition duration-200"
//               >
//                 <img
//                   src={car.img}
//                   alt={car.title[currentLanguage] || car.title.en}
//                   className="w-full h-48 object-cover rounded-t-xl"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold">{car.title[currentLanguage] || car.title.en}</h2>
//                   <div className="text-green-600 font-bold mt-1">
//                     {t('car_price', { price: car.price.toLocaleString() })}
//                   </div>
//                   <div className="text-gray-500 text-sm">
//                     {t('car_year', { year: car.year })} • {car.mileage[currentLanguage] || car.mileage.en}
//                   </div>

//                   <Link
//                     to={getLink(`/cars/${car.id}`)} // CarDetail page link
//                     className="inline-block mt-3 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                   >
//                     {t('view_details')}
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center text-lg">{t('no_cars_found')}</p>
//         )}
//       </div>
//     </div>
//   );
// }
























// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const allCars = [
//   {
//     id: 1,
//     title: { en: 'Toyota Corolla', ja: 'トヨタ カローラ' },
//     price: 3500000,
//     year: 2018,
//     mileage: { en: '80,000 km', ja: '80,000 km' },
//     img: '/Images/Corolla.jpg',
//   },
//   {
//     id: 2,
//     title: { en: 'Nissan Skyline', ja: '日産スカイライン' },
//     price: 7200000,
//     year: 2016,
//     mileage: { en: '60,000 km', ja: '60,000 km' },
//     img: '/Images/Nissan.jpg',
//   },
//   {
//     id: 3,
//     title: { en: 'Honda Civic', ja: 'ホンダ シビック' },
//     price: 4200000,
//     year: 2019,
//     mileage: { en: '45,000 km', ja: '45,000 km' },
//     img: '/Images/Civic.avif',
//   },
//   {
//     id: 4,
//     title: { en: 'Mazda Demio', ja: 'マツダ デミオ' },
//     price: 2100000,
//     year: 2017,
//     mileage: { en: '92,000 km', ja: '92,000 km' },
//     img: '/Images/Mazda.jpg',
//   },
//   {
//     id: 5,
//     title: { en: 'Suzuki Swift', ja: 'スズキ スイフト' },
//     price: 2500000,
//     year: 2020,
//     mileage: { en: '30,000 km', ja: '30,000 km' },
//     img: '/Images/Swift.avif',
//   },
// ];

// export default function Cars() {
//   const { t, i18n } = useTranslation();
//   const { lng } = useParams();
//   const [query, setQuery] = useState('');
//   const [sort, setSort] = useState('latest');

//   // Normalize language to 'en' or 'ja'
//   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

//   // Language set kar URL se
//   useEffect(() => {
//     if (lng && ['en', 'ja'].includes(lng)) {
//       i18n.changeLanguage(lng);
//     } else {
//       i18n.changeLanguage('ja'); // Default to Japanese
//     }
//   }, [lng, i18n]);

//   // Helper to generate language-prefixed links
//   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

//   // Safe filtering to avoid undefined errors
//   const filtered = allCars
//     .filter((c) => {
//       const title = c.title[currentLanguage] || c.title.en;
//       return title?.toLowerCase().includes(query.trim().toLowerCase());
//     })
//     .sort((a, b) => {
//       if (sort === 'price-low') return a.price - b.price;
//       if (sort === 'price-high') return b.price - a.price;
//       if (sort === 'latest') return b.year - a.year;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 lg:px-8 py-10">
//         {/* Heading */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">{t('cars_title')}</h1>


//           <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3">
//             {/* Search Box */}
//             <input
//               type="text"
//               placeholder={t('search_car_placeholder')}
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
//             />
//             {/* Sorting Dropdown */}
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
//             >
//               <option value="latest">{t('sort_latest')}</option>
//               <option value="price-low">{t('sort_price_low')}</option>
//               <option value="price-high">{t('sort_price_high')}</option>
//             </select>
//           </div>



//         </div>

//         {/* Cars Grid */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white rounded-xl shadow hover:shadow-xl transition duration-200"
//               >
//                 <img
//                   src={car.img}
//                   alt={car.title[currentLanguage] || car.title.en}
//                   className="w-full h-48 object-cover rounded-t-xl"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold">{car.title[currentLanguage] || car.title.en}</h2>
//                   <div className="text-green-600 font-bold mt-1">
//                     {t('car_price', { price: car.price.toLocaleString() })}
//                   </div>
//                   <div className="text-gray-500 text-sm">
//                     {t('car_year', { year: car.year })} • {car.mileage[currentLanguage] || car.mileage.en}
//                   </div>

//                 <Link
//                   to={getLink(`/cars/${car.id}`)}
//                   className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                 >
//                   {t('view_details')}
//                 </Link>


//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center text-lg">{t('no_cars_found')}</p>
//         )}
//       </div>
//     </div>
//   );
// }




















// // src/pages/Cars.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// // const allCars = [
// //   {
// //     id: 1,
// //     title: "Toyota Corolla",
// //     price: 3500000,
// //     year: 2018,
// //     mileage: "80,000 km",
// //     img: "/Images/Corolla.jpg",
// //   },
// //   {
// //     id: 2,
// //     title: "Nissan Skyline",
// //     price: 7200000,
// //     year: 2016,
// //     mileage: "60,000 km",
// //     img: "/Images/Nissan.jpg",
// //   },
// //   {
// //     id: 3,
// //     title: "Honda Civic",
// //     price: 4200000,
// //     year: 2019,
// //     mileage: "45,000 km",
// //     img: "/Images/Civic.avif",
// //   },
// //   {
// //     id: 4,
// //     title: "Mazda Demio",
// //     price: 2100000,
// //     year: 2017,
// //     mileage: "92,000 km",
// //     img: "/Images/Mazda.jpg",
// //   },
// //   {
// //     id: 5,
// //     title: "Suzuki Swift",
// //     price: 2500000,
// //     year: 2020,
// //     mileage: "30,000 km",
// //     img: "/Images/Swift.avif",
// //   },
// // ];

// const allCars = [
//   {
//     id: 1,
//     title: { en: 'Toyota Corolla', ja: 'トヨタ カローラ' },
//     price: 3500000,
//     year: 2018,
//     mileage: { en: '80,000 km', ja: '80,000 km' },
//     img: '/Images/Corolla.jpg',
//   },
//   {
//     id: 2,
//     title: { en: 'Nissan Skyline', ja: '日産スカイライン' },
//     price: 7200000,
//     year: 2016,
//     mileage: { en: '60,000 km', ja: '60,000 km' },
//     img: '/Images/Nissan.jpg',
//   },
//   {
//     id: 3,
//     title: { en: 'Honda Civic', ja: 'ホンダ シビック' },
//     price: 4200000,
//     year: 2019,
//     mileage: { en: '45,000 km', ja: '45,000 km' },
//     img: '/Images/Civic.avif',
//   },
//   {
//     id: 4,
//     title: { en: 'Mazda Demio', ja: 'マツダ デミオ' },
//     price: 2100000,
//     year: 2017,
//     mileage: { en: '92,000 km', ja: '92,000 km' },
//     img: '/Images/Mazda.jpg',
//   },
//   {
//     id: 5,
//     title: { en: 'Suzuki Swift', ja: 'スズキ スイフト' },
//     price: 2500000,
//     year: 2020,
//     mileage: { en: '30,000 km', ja: '30,000 km' },
//     img: '/Images/Swift.avif',
//   },
// ];



// export default function Cars() {
//   const [query, setQuery] = useState("");
//   const [sort, setSort] = useState("latest");

//   const filtered = allCars
//     .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
//     .sort((a, b) => {
//       if (sort === "price-low") return a.price - b.price;
//       if (sort === "price-high") return b.price - a.price;
//       if (sort === "latest") return b.year - a.year;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 lg:px-8 py-10">
//         {/* Heading */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Available Cars</h1>
//           <div className="mt-4 md:mt-0 flex gap-3">
//             {/* Search Box */}
//             <input
//               type="text"
//               placeholder="Search car..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
//             />
//             {/* Sorting Dropdown */}
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
//             >
//               <option value="latest">Sort by Latest</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Cars Grid */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white rounded-xl shadow hover:shadow-xl transition duration-200"
//               >
//                 <img
//                   src={car.img}
//                   alt={car.title}
//                   className="w-full h-48 object-cover rounded-t-xl"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold">{car.title}</h2>
//                   <div className="text-green-600 font-bold mt-1">
//                     PKR {car.price.toLocaleString()}
//                   </div>
//                   <div className="text-gray-500 text-sm">
//                     Year: {car.year} • {car.mileage}
//                   </div>
//                   <Link
//                     to={`/cars/${car.id}`}
//                     className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center text-lg">No cars found.</p>
//         )}
//       </div>
//     </div>
//   );
// }













// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // // Change localhost to your deployed backend URL when deploying
// // const STRAPI_URL = "http://localhost:1337";

// // export default function Cars() {
// //   const [cars, setCars] = useState([]);

// //   useEffect(() => {
// //     const getCars = async () => {
// //       try {
// //         const res = await axios.get(`${STRAPI_URL}/api/cars?populate=*`);
// //         console.log("Cars Data:", res.data.data);
// //         setCars(res.data.data || []);
// //       } catch (error) {
// //         console.error("Error fetching cars:", error);
// //       }
// //     };

// //     getCars();
// //   }, []);

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-6">🚗 Car Listing</h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {cars.length > 0 ? (
// //           cars.map((car) => {
// //             console.log("Single Car:", car);
// //             console.log("Car Image Object:", car.image);

// //             return (
// //               <div key={car.id} className="border rounded-lg shadow p-4">

                

// //                 <img
// //                   src={
// //                     car.image?.formats?.small?.url
// //                       ? `${STRAPI_URL}${car.image.formats.small.url}`
// //                       : car.image?.url
// //                         ? `${STRAPI_URL}${car.image.url}`
// //                         : "https://via.placeholder.com/300x200?text=No+Image"
// //                   }
// //                   alt={car.Title || "Car Image"}
// //                   className="w-full h-48 object-cover rounded-md mb-4 mx-auto"
// //                 />



// //                 <h2 className="text-xl font-semibold">
// //                   {car.Title || "No Title"}

// //                 </h2>
// //                 <p className="text-gray-700">
// //                   {car.description?.[0]?.children?.[0]?.text ||
// //                     "No Description"}
// //                 </p>
// //                 <p className="text-green-600 font-bold mt-2">
// //                   {car.price ? `PKR ${car.price}` : "Price Not Available"}
// //                 </p>
// //               </div>
// //             );
// //           })
// //         ) : (
// //           <p>No cars available.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

