import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import homeData from "../data/homeData";



export default function Home() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const [query, setQuery] = useState("");
    const [cars] = useState(homeData);

  // const [cars] = useState(sampleCars);

  const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";

  useEffect(() => {
    if (lng && ["en", "ja"].includes(lng)) {
      i18n.changeLanguage(lng);
    } else {
      i18n.changeLanguage("ja");
    }
  }, [lng, i18n]);

  const getLink = (path) => `/${currentLanguage}${path === "/" ? "" : path}`;

  const filtered = cars.filter((c) => {
    const title = c.Title[currentLanguage] || c.Title.en;
    return title?.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-200 text-gray-800">
        {/* --- HERO --- */}
        <header className="relative">
          <div
            className="h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(10,10,10,0.45), rgba(10,10,10,0.45)), url('https://images.unsplash.com/photo-1502873780-1cb2f3f8a6c7?q=80&w=1600&auto=format&fit=crop')",
            }}
          >
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-2xl mx-auto dark:text-white flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                  {t("hero_title")}
                </h1>
                <p className="mt-4 text-sm sm:text-lg dark:text-white font-bold">
                  {t("hero_subtitle")}
                </p>

                {/* Search */}
                <div className="mt-6 w-full">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t("search_placeholder")}
                      className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <Link
                      to={getLink("/cars")}
                      className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                    >
                      {t("browse_cars")}
                    </Link>
                  </div>
                  <p className="mt-2 text-sm text-green-200">
                    {t("showing_results", {
                      query: query || t("showing_all"),
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- Featured Cars --- */}
        <main className="container mx-auto px-6 lg:px-8 mt-4">
          <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">{t("featured_cars")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


              {/* {(query ? filtered : cars).map((car) => (
                <article
                  key={car.id}
                  className="border rounded-lg overflow-hidden bg-white"
                >
                  <div className="relative">
                    <img
                      src={car.img}
                      alt={car.Title[currentLanguage] || car.Title.en}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded text-sm">
                      {car.year[currentLanguage] || car.year.en}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      {car.Title[currentLanguage] || car.Title.en}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {car.short[currentLanguage] || car.short.en}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-green-600 font-bold">
                          {car.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          {car.mileage[currentLanguage] || car.mileage.en}
                        </div>
                      </div>
                      <Link
                        to={getLink(`/cars/${car.id}`)}
                        className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        {t("view_car")}
                      </Link>
                    </div>
                  </div>
                </article>
              ))} */}


{(query ? filtered : cars).map((car) => {
  console.log("🚗 Car Data:", car);

  return (
    <article
      key={car.id}
      className="border rounded-lg overflow-hidden bg-white relative"
    >
      <div className="relative">
        <img
          src={car.img}
          alt={car.Title?.[currentLanguage] || car.Title?.en}
          className={`w-full h-80 object-cover transition-all duration-300 ${
            car.status === "sold" ? "opacity-70 grayscale" : ""
          }`}
        />

        {/* --- SOLD Badge --- */}
        {car.status === "sold" && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
            SOLD
          </div>
        )}

        <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded text-sm">
          {car.year?.[currentLanguage] || car.year?.en || car.year}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {car.Title?.[currentLanguage] || car.Title?.en}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          {car.short?.[currentLanguage] || car.short?.en || ""}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-green-600 font-bold">{car.price}</div>
            <div className="text-xs text-gray-500">
              {car.mileage?.[currentLanguage] || car.mileage?.en || car.mileage}
            </div>
          </div>

          {car.status === "sold" ? (
            <span className="inline-block px-3 py-2 bg-gray-400 text-white rounded text-sm cursor-not-allowed">
              Sold Out
            </span>
          ) : (
            <Link
              to={getLink(`/cars/${car.id}`)}
              className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              {t("view_car")}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
})}


            </div>

            
          </section>

          {/* --- CTA Banner --- */}
          <section className="mt-8 mb-6 bg-green-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{t("cta_title")}</h3>
              <p className="mt-1 text-sm">{t("cta_subtitle")}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <a
                href="https://wa.me/REPLACE_NUMBER"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white text-green-600 rounded font-semibold hover:bg-gray-100"
              >
                {t("cta_button")}
              </a>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}




















// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import Layout from "../components/Layout";

// const sampleCars = [
//   {
//     id: 1,
//     Title: { en: "Hino Profia Truck", ja: "日野プロフィア トラック" },
//     price: "¥2,100,000 (210万)",
//     img: "/Images/image-1.jpeg",
//     short: {
//       en: "A heavy-duty Japanese truck in excellent condition",
//       ja: "状態の良い日本製大型トラック",
//     },
//     year: { en: "2016", ja: "平成28年" },
//     mileage: { en: "1,311,547 km", ja: "1,311,547 km" },
//     location: { en: "Osaka, Japan", ja: "大阪、日本" },
//     transmission: { en: "Manual", ja: "マニュアル" },
//     shaken: { en: "Valid (check document)", ja: "有効（書類を確認）" },
//     kittsu: { en: "Available", ja: "記録簿あり" },
//     condition: {
//       en: "Very clean condition, no major issues, ready to use.",
//       ja: "とてもきれいな状態で、大きな問題はなく、すぐに使用可能です。",
//     },
//     note: {
//       en: "Feel free to contact, but only serious buyers. Time-wasters, please avoid.",
//       ja: "購入を検討している方のみご連絡ください。冷やかしはご遠慮ください。",
//     },
//   },
// ];

// export default function Home() {
//   const { t, i18n } = useTranslation();
//   const { lng } = useParams();
//   const [query, setQuery] = useState("");
//   const [cars] = useState(sampleCars);

//   // Normalize language
//   const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";

//   useEffect(() => {
//     if (lng && ["en", "ja"].includes(lng)) {
//       i18n.changeLanguage(lng);
//     } else {
//       i18n.changeLanguage("ja"); // Default Japanese
//     }
//   }, [lng, i18n]);

//   const getLink = (path) => `/${currentLanguage}${path === "/" ? "" : path}`;

//   const filtered = cars.filter((c) => {
//     const title = c.Title[currentLanguage] || c.Title.en;
//     return title?.toLowerCase().includes(query.trim().toLowerCase());
//   });

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-200 text-gray-800">
//         {/* --- HERO --- */}
//         <header className="relative">
//           <div
//             className="h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(10,10,10,0.45), rgba(10,10,10,0.45)), url('https://images.unsplash.com/photo-1502873780-1cb2f3f8a6c7?q=80&w=1600&auto=format&fit=crop')",
//             }}
//           >
//             <div className="container mx-auto px-6 lg:px-8">
//               <div className="max-w-2xl mx-auto dark:text-white flex flex-col items-center justify-center">
//                 <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
//                   {t("hero_title")}
//                 </h1>
//                 <p className="mt-4 text-sm sm:text-lg dark:text-white font-bold">
//                   {t("hero_subtitle")}
//                 </p>

//                 {/* Search */}
//                 <div className="mt-6 w-full">
//                   <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                     <input
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       placeholder={t("search_placeholder")}
//                       className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
//                     />
//                     <Link
//                       to={getLink("/cars")}
//                       className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//                     >
//                       {t("browse_cars")}
//                     </Link>
//                   </div>
//                   <p className="mt-2 text-sm text-green-200">
//                     {t("showing_results", {
//                       query: query || t("showing_all"),
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* --- Featured Car (single) --- */}
//         <main className="container mx-auto px-6 lg:px-8 mt-4">
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-6">{t("featured_cars")}</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {(query ? filtered : cars).map((car) => (
//                 <article
//                   key={car.id}
//                   className="border rounded-lg overflow-hidden bg-white"
//                 >
//                   <div className="relative">
//                     <img
//                       src={car.img}
//                       alt={car.Title[currentLanguage] || car.Title.en}
//                       className="w-full h-44 object-cover"
//                     />
//                     <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded text-sm">
//                       {car.year[currentLanguage] || car.year.en}
//                     </div>
//                   </div>

//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold">
//                       {car.Title[currentLanguage] || car.Title.en}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {car.short[currentLanguage] || car.short.en}
//                     </p>

//                     <div className="flex items-center justify-between mt-4">
//                       <div>
//                         <div className="text-green-600 font-bold">
//                           {car.price}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {car.mileage[currentLanguage] || car.mileage.en}
//                         </div>
//                       </div>
//                       <Link
//                         to={getLink(`/cars/${car.id}`)}
//                         className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                       >
//                         {t("view_car")}
//                       </Link>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </section>

//           {/* --- CTA Banner --- */}
//           <section className="mt-8 mb-6 bg-green-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
//             <div>
//               <h3 className="text-xl font-bold">{t("cta_title")}</h3>
//               <p className="mt-1 text-sm">{t("cta_subtitle")}</p>
//             </div>
//             <div className="mt-4 sm:mt-0">
//               <a
//                 href="https://wa.me/REPLACE_NUMBER"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="px-4 py-2 bg-white text-green-600 rounded font-semibold hover:bg-gray-100"
//               >
//                 {t("cta_button")}
//               </a>
//             </div>
//           </section>
//         </main>
//       </div>
//     </Layout>
//   );
// }



















// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import Layout from '../components/Layout';



// const sampleCars = [
//   {
//     id: 1,
//     Title: { en: 'Hino Profia Truck', ja: '日野プロフィア トラック' },
//     price: '¥2,100,000 (210万)',
//     img: '/Images/hino-profia.jpg',
//     short: {
//       en: 'A heavy-duty Japanese truck in excellent condition',
//       ja: '状態の良い日本製大型トラック',
//     },
//     year: { en: '2016', ja: '平成28年' },
//     mileage: { en: '1,311,547 km', ja: '1,311,547 km' },
//     location: { en: 'Osaka, Japan', ja: '大阪、日本' },
//     transmission: { en: 'Manual', ja: 'マニュアル' },
//     shaken: { en: 'Valid (check document)', ja: '有効（書類を確認）' },
//     kittsu: { en: 'Available', ja: '記録簿あり' },
//     condition: {
//       en: 'Very clean condition, no major issues, ready to use.',
//       ja: 'とてもきれいな状態で、大きな問題はなく、すぐに使用可能です。',
//     },
//     note: {
//       en: 'Feel free to contact, but only serious buyers. Time-wasters, please avoid.',
//       ja: '購入を検討している方のみご連絡ください。冷やかしはご遠慮ください。',
//     },
//   },
// ];


// export default function Home() {
//   const { t, i18n } = useTranslation();
//   const { lng } = useParams();
//   const [query, setQuery] = useState('');
//   const [cars] = useState(sampleCars);
//   // const [sort, setSort] = useState("latest");


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
//   const filtered = cars.filter((c) => {
//     const title = c.Title[currentLanguage] || c.Title.en; // Fallback to English if undefined
//     return title?.toLowerCase().includes(query.trim().toLowerCase());
//   });

//   return (
//     <Layout>
//     <div className="min-h-screen bg-gray-200 text-gray-800">

// {/* --- HERO --- */}
// <header className="relative">
//   <div
//     className="h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
//     style={{
//       backgroundImage:
//         "linear-gradient(rgba(10,10,10,0.45), rgba(10,10,10,0.45)), url('https://images.unsplash.com/photo-1502873780-1cb2f3f8a6c7?q=80&w=1600&auto=format&fit=crop')",
//     }}
//   >

//     <div className="container mx-auto px-6 lg:px-8">
//       {/* Centered content */}
//       <div className="max-w-2xl mx-auto dark:text-white flex flex-col items-center justify-center">
      

//       <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight whitespace-normal sm:whitespace-nowrap">
//         {t('hero_title')}
//       </h1>

//         {/* <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight whitespace-nowrap">
//           {t('hero_title')}
//         </h1>
//  */}
//         <p className="mt-4 text-sm sm:text-lg dark:text-white font-bold">
//           {t('hero_subtitle')}
//         </p>

//         {/* Search box */}
//         <div className="mt-6 w-full">

//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder={t('search_placeholder')}
//               className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <Link
//               to={getLink('/cars')}
//               className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//             >
//               {t('browse_cars')}
//             </Link>
//           </div>

//           <p className="mt-2 text-sm text-green-200">
//             {t('showing_results', { query: query || t('showing_all') })}
//           </p>
//         </div>
//       </div>
//     </div>




//   </div>
// </header>

//       {/* --- Featured Cars --- */}
//       <main className="container mx-auto px-6 lg:px-8 mt-4">
//         <section className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold">{t('featured_cars')}</h2>
//             <Link to={getLink('/cars')} className="text-sm text-green-600 hover:underline">
//               {t('view_all_cars')}
//             </Link>
//           </div>

//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {(query ? filtered : cars).map((car) => (
//               <article key={car.id} className="border rounded-lg overflow-hidden bg-white">
//                 <div className="relative">
//                   <img
//                     src={car.img}
//                     alt={car.Title[currentLanguage] || car.Title.en}
//                     className="w-full h-44 object-cover"
//                   />
//                   <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded">
//                     {t('car_year', { year: car.year })}
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{car.Title[currentLanguage] || car.Title.en}</h3>
//                   <p className="text-sm text-gray-600 mt-1">{car.short[currentLanguage] || car.short.en}</p>
//                   <div className="flex items-center justify-between mt-4">
//                     <div>
//                       <div className="text-green-600 font-bold">
//                         {t('car_price', { price: car.price.toLocaleString() })}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {t('car_mileage', { mileage: car.mileage[currentLanguage] || car.mileage.en })}
//                       </div>
//                     </div>
//                     <Link
//                       to={getLink(`/cars/${car.id}`)}
//                       className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                     >
//                       {t('view_car')}
//                     </Link>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* --- How it works --- */}
//         <section className="mt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h4 className="font-semibold mb-2">{t('how_it_works_browse')}</h4>
//               <p className="text-sm text-gray-600">{t('how_it_works_browse_desc')}</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h4 className="font-semibold mb-2">{t('how_it_works_inspect')}</h4>
//               <p className="text-sm text-gray-600">{t('how_it_works_inspect_desc')}</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h4 className="font-semibold mb-2">{t('how_it_works_shipping')}</h4>
//               <p className="text-sm text-gray-600">{t('how_it_works_shipping_desc')}</p>
//             </div>
//           </div>
//         </section>

//         {/* --- CTA Banner --- */}
//         <section className="mt-8 mb-6 bg-green-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
//           <div>
//             <h3 className="text-xl font-bold">{t('cta_title')}</h3>
//             <p className="mt-1 text-sm">{t('cta_subtitle')}</p>
//           </div>
//           <div className="mt-4 sm:mt-0">
//             <a
//               href="https://wa.me/REPLACE_NUMBER"
//               target="_blank"
//               rel="noreferrer"
//               className="px-4 py-2 bg-white text-green-600 rounded font-semibold hover:bg-gray-100"
//             >
//               {t('cta_button')}
//             </a>
//           </div>
//         </section>
//       </main>
//     </div>
//     </Layout>
//   );
// }














// // // src/pages/Home.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Link, useParams } from 'react-router-dom';
// // import { useTranslation } from 'react-i18next';

// // const sampleCars = [
// //   {
// //     id: 1,
// //     Title: { en: 'Toyota Corolla', ja: 'トヨタ カローラ' },
// //     price: 3500000,
// //     img: '/Images/Corolla.jpg',
// //     short: { en: 'A comfortable sedan', ja: '快適なセダン' },
// //     year: 2018,
// //     mileage: { en: '80,000 km', ja: '80,000 km' },
// //   },
// //   {
// //     id: 2,
// //     Title: { en: 'Nissan Skyline', ja: '日産スカイライン' },
// //     price: 7200000,
// //     img: '/Images/Nissan.jpg',
// //     short: { en: 'Sporty & reliable', ja: 'スポーティで信頼性が高い' },
// //     year: 2016,
// //     mileage: { en: '60,000 km', ja: '60,000 km' },
// //   },
// //   {
// //     id: 3,
// //     Title: { en: 'Honda Civic', ja: 'ホンダ シビック' },
// //     price: 4200000,
// //     img: '/Images/Civic.avif',
// //     short: { en: 'Efficient city car', ja: '効率的なシティカー' },
// //     year: 2019,
// //     mileage: { en: '45,000 km', ja: '45,000 km' },
// //   },
// // ];

// // export default function Home() {
// //   const { t, i18n } = useTranslation();
// //   const { lng } = useParams();
// //   const [query, setQuery] = useState('');
// //   const [cars] = useState(sampleCars);

// //   // Normalize language to 'en' or 'ja'
// //   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

// //   // Language set kar URL se
// //   useEffect(() => {
// //     if (lng && ['en', 'ja'].includes(lng)) {
// //       i18n.changeLanguage(lng);
// //     } else {
// //       i18n.changeLanguage('ja'); // Default to Japanese
// //     }
// //   }, [lng, i18n]);

// //   // Safe filtering to avoid undefined errors
// //   const filtered = cars.filter((c) => {
// //     const title = c.Title[currentLanguage] || c.Title.en; // Fallback to English if undefined
// //     return title?.toLowerCase().includes(query.trim().toLowerCase());
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-200 text-gray-800">
// //       {/* --- HERO --- */}
// //       <header className="relative">
// //         <div
// //           className="h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center"
// //           style={{
// //             backgroundImage:
// //               "linear-gradient(rgba(10,10,10,0.45), rgba(10,10,10,0.45)), url('https://images.unsplash.com/photo-1502873780-1cb2f3f8a6c7?q=80&w=1600&auto=format&fit=crop')",
// //           }}
// //         >
// //           <div className="container mx-auto px-6 lg:px-8">
// //             <div className="max-w-2xl text-white">
// //               <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
// //                 {t('hero_title')}
// //               </h1>
// //               <p className="mt-4 text-sm sm:text-lg text-gray-200">
// //                 {t('hero_subtitle')}
// //               </p>

// //               {/* Search box */}
// //               <div className="mt-6">
// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                   <input
// //                     value={query}
// //                     onChange={(e) => setQuery(e.target.value)}
// //                     placeholder={t('search_placeholder')}
// //                     className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
// //                   />
// //                   <Link
// //                     to="/cars"
// //                     className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
// //                   >
// //                     {t('browse_cars')}
// //                   </Link>
// //                 </div>
// //                 <p className="mt-2 text-sm text-green-200">
// //                   {t('showing_results', { query: query || t('showing_all') })}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* --- Featured Cars --- */}
// //       <main className="container mx-auto px-6 lg:px-8 mt-4">
// //         <section className="bg-white rounded-xl shadow-lg p-6">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-2xl font-bold">{t('featured_cars')}</h2>
// //             <Link to="/cars" className="text-sm text-green-600 hover:underline">
// //               {t('view_all_cars')}
// //             </Link>
// //           </div>

// //           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {(query ? filtered : cars).map((car) => (
// //               <article key={car.id} className="border rounded-lg overflow-hidden bg-white">
// //                 <div className="relative">
// //                   <img
// //                     src={car.img}
// //                     alt={car.Title[currentLanguage] || car.Title.en}
// //                     className="w-full h-44 object-cover"
// //                   />
// //                   <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded">
// //                     {t('car_year', { year: car.year })}
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   <h3 className="text-lg font-semibold">{car.Title[currentLanguage] || car.Title.en}</h3>
// //                   <p className="text-sm text-gray-600 mt-1">{car.short[currentLanguage] || car.short.en}</p>
// //                   <div className="flex items-center justify-between mt-4">
// //                     <div>
// //                       <div className="text-green-600 font-bold">
// //                         {t('car_price', { price: car.price.toLocaleString() })}
// //                       </div>
// //                       <div className="text-xs text-gray-500">
// //                         {t('car_mileage', { mileage: car.mileage[currentLanguage] || car.mileage.en })}
// //                       </div>
// //                     </div>
// //                     <Link
// //                       to={`/cars/${car.id}`}
// //                       className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
// //                     >
// //                       {t('view_car')}
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         </section>

// //         {/* --- How it works --- */}
// //         <section className="mt-8">
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <div className="bg-white p-6 rounded-lg shadow">
// //               <h4 className="font-semibold mb-2">{t('how_it_works_browse')}</h4>
// //               <p className="text-sm text-gray-600">{t('how_it_works_browse_desc')}</p>
// //             </div>
// //             <div className="bg-white p-6 rounded-lg shadow">
// //               <h4 className="font-semibold mb-2">{t('how_it_works_inspect')}</h4>
// //               <p className="text-sm text-gray-600">{t('how_it_works_inspect_desc')}</p>
// //             </div>
// //             <div className="bg-white p-6 rounded-lg shadow">
// //               <h4 className="font-semibold mb-2">{t('how_it_works_shipping')}</h4>
// //               <p className="text-sm text-gray-600">{t('how_it_works_shipping_desc')}</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* --- CTA Banner --- */}
// //         <section className="mt-8 bg-green-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
// //           <div>
// //             <h3 className="text-xl font-bold">{t('cta_title')}</h3>
// //             <p className="mt-1 text-sm">{t('cta_subtitle')}</p>
// //           </div>
// //           <div className="mt-4 sm:mt-0">
// //             <a
// //               href="https://wa.me/REPLACE_NUMBER"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="px-4 py-2 bg-white text-green-600 rounded font-semibold hover:bg-gray-100"
// //             >
// //               {t('cta_button')}
// //             </a>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }


















// // // src/pages/Home.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Link, useParams } from 'react-router-dom';
// // import { useTranslation } from 'react-i18next';
// // import axios from 'axios';

// // const sampleCars = [
// //   {
// //     id: 1,
// //     Title: { en: 'Toyota Corolla', ja: 'トヨタ カローラ' },
// //     price: 3500000,
// //     img: '/Images/Corolla.jpg',
// //     short: { en: 'A comfortable sedan', ja: '快適なセダン' },
// //     year: 2018,
// //     mileage: { en: '80,000 km', ja: '80,000 km' },
// //   },
// //   {
// //     id: 2,
// //     Title: { en: 'Nissan Skyline', ja: '日産スカイライン' },
// //     price: 7200000,
// //     img: '/Images/Nissan.jpg',
// //     short: { en: 'Sporty & reliable', ja: 'スポーティで信頼性が高い' },
// //     year: 2016,
// //     mileage: { en: '60,000 km', ja: '60,000 km' },
// //   },
// //   {
// //     id: 3,
// //     Title: { en: 'Honda Civic', ja: 'ホンダ シビック' },
// //     price: 4200000,
// //     img: '/Images/Civic.avif',
// //     short: { en: 'Efficient city car', ja: '効率的なシティカー' },
// //     year: 2019,
// //     mileage: { en: '45,000 km', ja: '45,000 km' },
// //   },
// // ];

// // export default function Home() {
// //   const { t, i18n } = useTranslation();
// //   const { lng } = useParams(); // URL se language le (e.g., /ja, /en)
// //   const [query, setQuery] = useState('');
// //   // Strapi se data fetch karne ke liye state (optional for now)
// //   const [cars, setCars] = useState(sampleCars);

// //   // Language set kar URL se
// //   useEffect(() => {
// //     if (lng && ['en', 'ja'].includes(lng)) {
// //       i18n.changeLanguage(lng);
// //     }
// //   }, [lng, i18n]);

// //   // Strapi se data fetch (uncomment jab ready ho)
// //   /*
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:1337/api/cars?locale=${i18n.language}`);
// //         setCars(response.data.data.map(item => ({
// //           id: item.id,
// //           Title: { en: item.attributes.title_en, ja: item.attributes.title_ja },
// //           price: item.attributes.price,
// //           img: item.attributes.img,
// //           short: { en: item.attributes.short_en, ja: item.attributes.short_ja },
// //           year: item.attributes.year,
// //           mileage: { en: item.attributes.mileage_en, ja: item.attributes.mileage_ja },
// //         })));
// //       } catch (error) {
// //         console.error('Error fetching cars:', error);
// //       }
// //     };
// //     fetchData();
// //   }, [i18n.language]);
// //   */

// //   const filtered = cars.filter((c) =>
// //     c.Title[i18n.language].toLowerCase().includes(query.trim().toLowerCase())
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-200 text-gray-800">
// //       {/* --- HERO --- */}
// //       <header className="relative">
// //         <div
// //           className="h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center"
// //           style={{
// //             backgroundImage:
// //               "linear-gradient(rgba(10,10,10,0.45), rgba(10,10,10,0.45)), url('https://images.unsplash.com/photo-1502873780-1cb2f3f8a6c7?q=80&w=1600&auto=format&fit=crop')",
// //           }}
// //         >
// //           <div className="container mx-auto px-6 lg:px-8">
// //             <div className="max-w-2xl text-white">
// //               <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
// //                 {t('hero_title')}
// //               </h1>
// //               <p className="mt-4 text-sm sm:text-lg text-gray-200">
// //                 {t('hero_subtitle')}
// //               </p>

// //               {/* Search box */}
// //               <div className="mt-6">
// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                   <input
// //                     value={query}
// //                     onChange={(e) => setQuery(e.target.value)}
// //                     placeholder={t('search_placeholder')}
// //                     className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
// //                   />
// //                   <Link
// //                     to="/cars"
// //                     className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
// //                   >
// //                     {t('browse_cars')}
// //                   </Link>
// //                 </div>
// //                 <p className="mt-2 text-sm text-green-200">
// //                   {t('showing_results', { query: query || t('showing_all') })}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* --- Featured Cars --- */}
// //       <main className="container mx-auto px-6 lg:px-8 mt-4">
// //         <section className="bg-white rounded-xl shadow-lg p-6">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-2xl font-bold">{t('featured_cars')}</h2>
// //             <Link to="/cars" className="text-sm text-green-600 hover:underline">
// //               {t('view_all_cars')}
// //             </Link>
// //           </div>

// //           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {(query ? filtered : cars).map((car) => (
// //               <article key={car.id} className="border rounded-lg overflow-hidden bg-white">
// //                 <div className="relative">
// //                   <img
// //                     src={car.img}
// //                     alt={car.Title[i18n.language]}
// //                     className="w-full h-44 object-cover"
// //                   />
// //                   <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded">
// //                     {t('car_year', { year: car.year })}
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   <h3 className="text-lg font-semibold">{car.Title[i18n.language]}</h3>
// //                   <p className="text-sm text-gray-600 mt-1">{car.short[i18n.language]}</p>
// //                   <div className="flex items-center justify-between mt-4">
// //                     <div>
// //                       <div className="text-green-600 font-bold">
// //                         {t('car_price', { price: car.price.toLocaleString() })}
// //                       </div>
// //                       <div className="text-xs text-gray-500">
// //                         {t('car_mileage', { mileage: car.mileage[i18n.language] })}
// //                       </div>
// //                     </div>
// //                     <Link
// //                       to={`/cars/${car.id}`}
// //                       className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
// //                     >
// //                       {t('view_car')}
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         </section>

// //         {/* --- How it works --- */}
// //         <section className="mt-8">
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <div className="bg-white p-6 rounded-lg shadow">
// //               <h4 className="font-semibold mb-2">{t('how_it_works_browse')}</h4>
// //               <p className="text-sm text-gray-600">{t('how_it_works_browse_desc')}</p>
// //             </div>
// //             <div className="bg-white p-6 rounded-lg shadow">
// //               <h4 className="font-semibold mb-2">{t('how_it_works_inspect')}</h4>
// //               <p className="text-sm text-gray-600">{t('how_it_works_inspect_desc')}</p>
// //             </div>
// //             <div className="bg-white p-6 rounded-lg shadow">
// //               <h4 className="font-semibold mb-2">{t('how_it_works_shipping')}</h4>
// //               <p className="text-sm text-gray-600">{t('how_it_works_shipping_desc')}</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* --- CTA Banner --- */}
// //         <section className="mt-8 bg-green-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
// //           <div>
// //             <h3 className="text-xl font-bold">{t('cta_title')}</h3>
// //             <p className="mt-1 text-sm">{t('cta_subtitle')}</p>
// //           </div>
// //           <div className="mt-4 sm:mt-0">
// //             <a
// //               href="https://wa.me/REPLACE_NUMBER"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="px-4 py-2 bg-white text-green-600 rounded font-semibold hover:bg-gray-100"
// //             >
// //               {t('cta_button')}
// //             </a>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }


























// // // // src/pages/Home.jsx
// // // import React, { useState } from "react";
// // // import { Link } from "react-router-dom";
// // // // If you have a Navbar component, uncomment the next line and ensure the path is correct
// // // // import Navbar from "../components/Navbar";

// // // const sampleCars = [
// // //   {
// // //     id: 1,
// // //     Title: "Toyota Corolla",
// // //     price: 3500000,
// // //     img: "/Images/Corolla.jpg",
// // //     short: "A comfortable sedan",
// // //     year: 2018,
// // //     mileage: "80,000 km",
// // //   },
// // //   {
// // //     id: 2,
// // //     Title: "Nissan Skyline",
// // //     price: 7200000,
// // //     img: "/Images/Nissan.jpg",
// // //     short: "Sporty & reliable",
// // //     year: 2016,
// // //     mileage: "60,000 km",
// // //   },
// // //   {
// // //     id: 3,
// // //     Title: "Honda Civic",
// // //     price: 4200000,
// // //     img: "/Images/Civic.avif",
// // //     short: "Efficient city car",
// // //     year: 2019,
// // //     mileage: "45,000 km",
// // //   },
// // // ];

// // // export default function Home() {
// // //   const [query, setQuery] = useState("");

// // //   const filtered = sampleCars.filter((c) =>
// // //     c.Title.toLowerCase().includes(query.trim().toLowerCase())
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-200 text-gray-800">
// // //       {/* If you use Navbar, uncomment below */}
// // //       {/* <Navbar /> */}

// // //       {/* --- HERO --- */}
// // //       <header className="relative">
// // //         <div
// // //           className="h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center"
// // //           style={{
// // //             backgroundImage:
// // //               "linear-gradient(rgba(10,10,10,0.45), rgba(10,10,10,0.45)), url('https://images.unsplash.com/photo-1502873780-1cb2f3f8a6c7?q=80&w=1600&auto=format&fit=crop')",
// // //           }}
// // //         >
// // //           <div className="container mx-auto px-6 lg:px-8">
// // //             <div className="max-w-2xl text-white">
// // //               <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
// // //                 Find your dream car from Japan
// // //               </h1>
// // //               <p className="mt-4 text-sm sm:text-lg text-gray-200">
// // //                 Direct purchase from auctions & dealers. Transparent inspections,
// // //                 shipment support and fast documentation.
// // //               </p>

// // //               {/* Search box */}
// // //               <div className="mt-6">
// // //                 <div className="flex flex-col sm:flex-row gap-3">
// // //                   <input
// // //                     value={query}
// // //                     onChange={(e) => setQuery(e.target.value)}
// // //                     placeholder="Search by model (e.g. Corolla, Civic)..."
// // //                     className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
// // //                   />
// // //                   <Link
// // //                     to="/cars"
// // //                     className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
// // //                   >
// // //                     Browse Cars
// // //                   </Link>
// // //                 </div>
// // //                 <p className="mt-2 text-sm text-green-200">
// // //                   Showing results for: <span className="font-medium">{query || "all"}</span>
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* --- Featured Cars --- */}
// // //       <main className="container mx-auto px-6 lg:px-8 mt-4">
// // //         <section className="bg-white rounded-xl shadow-lg p-6">
// // //           <div className="flex items-center justify-between">
// // //             <h2 className="text-2xl font-bold">Featured Cars</h2>
// // //             <Link to="/cars" className="text-sm text-green-600 hover:underline">
// // //               View all cars
// // //             </Link>
// // //           </div>

// // //           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {(query ? filtered : sampleCars).map((car) => (
// // //               <article key={car.id} className="border rounded-lg overflow-hidden bg-white">
// // //                 <div className="relative">
// // //                   <img
// // //                     src={car.img}
// // //                     alt={car.Title}
// // //                     className="w-full h-44 object-cover"
// // //                   />
// // //                   <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded">
// // //                     {car.year}
// // //                   </div>
// // //                 </div>
// // //                 <div className="p-4">
// // //                   <h3 className="text-lg font-semibold">{car.Title}</h3>
// // //                   <p className="text-sm text-gray-600 mt-1">{car.short}</p>
// // //                   <div className="flex items-center justify-between mt-4">
// // //                     <div>
// // //                       <div className="text-green-600 font-bold">PKR {car.price.toLocaleString()}</div>
// // //                       <div className="text-xs text-gray-500">Mileage: {car.mileage}</div>
// // //                     </div>
// // //                     <Link
// // //                       to={`/cars/${car.id}`}
// // //                       className="inline-block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
// // //                     >
// // //                       View
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               </article>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* --- How it works --- */}
// // //         <section className="mt-8">
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //             <div className="bg-white p-6 rounded-lg shadow">
// // //               <h4 className="font-semibold mb-2">1. Browse Cars</h4>
// // //               <p className="text-sm text-gray-600">Search by make, model or price and shortlist cars you like.</p>
// // //             </div>
// // //             <div className="bg-white p-6 rounded-lg shadow">
// // //               <h4 className="font-semibold mb-2">2. Inspect & Buy</h4>
// // //               <p className="text-sm text-gray-600">We assist with inspection reports and bidding at auction.</p>
// // //             </div>
// // //             <div className="bg-white p-6 rounded-lg shadow">
// // //               <h4 className="font-semibold mb-2">3. Shipping & Docs</h4>
// // //               <p className="text-sm text-gray-600">Door-to-door shipping and paperwork handled for you.</p>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* --- CTA Banner --- */}
// // //         <section className="mt-8 bg-green-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
// // //           <div>
// // //             <h3 className="text-xl font-bold">Need help buying a car from Japan?</h3>
// // //             <p className="mt-1 text-sm">Our experts will guide you through auctions, export and shipping.</p>
// // //           </div>
// // //           <div className="mt-4 sm:mt-0">
// // //             <a href="https://wa.me/REPLACE_NUMBER" target="_blank" rel="noreferrer"
// // //                className="px-4 py-2 bg-white text-green-600 rounded font-semibold hover:bg-gray-100">
// // //               Contact via WhatsApp
// // //             </a>
// // //           </div>
// // //         </section>

        
// // //       </main>
// // //     </div>
// // //   );
// // // }
