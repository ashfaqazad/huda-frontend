

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Helmet } from "react-helmet";


// export default function CarDetail() {
//   const { t, i18n } = useTranslation();
//   const { lng, id } = useParams();
//   const [currentImage, setCurrentImage] = useState(0);
//   const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";

//   useEffect(() => {
//     if (lng && ["en", "ja"].includes(lng)) i18n.changeLanguage(lng);
//     else i18n.changeLanguage("ja");
//   }, [lng, i18n]);

//   const car = allCars.find((c) => c.id === parseInt(id));
//   if (!car) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-600">{t("no_car_found", { defaultValue: "Car not found" })}</p>
//       </div>
//     );
//   }

//   const getLink = (path) => `/${currentLanguage}${path === "/" ? "" : path}`;
//   const nextImage = () => setCurrentImage((p) => (p + 1) % car.images.length);
//   const prevImage = () => setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <html lang={currentLanguage} />
//         <title>{car.title[currentLanguage]}</title>
//       </Helmet>

//       {/* Header Section */}
//       <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Link to={getLink("/cars")} className="inline-block mb-4 text-sm hover:underline">
//             ← {t("back_to_cars", { defaultValue: "Back to Cars" })}
//           </Link>

//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             {/* Image Slider */}
//             <div className="relative">
//               <img
//                 src={car.images[currentImage]}
//                 alt={car.title[currentLanguage]}
//                 className="w-full h-150 object-cover rounded-xl shadow-lg transition-all duration-500"
//               />
//               <button
//                 onClick={prevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
//               >
//                 ›
//               </button>
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {car.images.map((_, i) => (
//                   <span
//                     key={i}
//                     className={`w-3 h-3 rounded-full ${i === currentImage ? "bg-white" : "bg-gray-400"}`}
//                   ></span>
//                 ))}
//               </div>
//             </div>

//             {/* Basic Details */}
//             <div>
//               <h1 className="text-4xl font-bold mb-3">{car.title[currentLanguage]}</h1>
//               <p className="text-2xl font-semibold text-green-200 mb-3">{car.price}</p>
//               <p className="text-lg mb-1">📍 {car.location[currentLanguage]}</p>
//               <p className="text-lg mb-1">🚘 {car.mileage[currentLanguage]}</p>
//               <p className="text-lg mb-1">🗓️ {car.year[currentLanguage]}</p>
//               <p className="text-lg mb-1">⚙️ {car.transmission[currentLanguage]}</p>
//               <p className="text-lg mb-1">✅ Shaken: {car.shaken[currentLanguage]}</p>
//               <p className="text-lg mb-1">📘 Kittsu: {car.kittsu[currentLanguage]}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Description + Specs */}
//       <section className="py-16">
//         <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-3">{t("car_description", { defaultValue: "Description" })}</h2>
//             <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
//               {car.condition[currentLanguage]}
//             </pre>
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold mb-3">{t("car_specs", { defaultValue: "Specifications" })}</h2>
//             <ul className="text-gray-700 space-y-2">
//               <li>• {car.specs[currentLanguage]}</li>
//               <li>• {car.description[currentLanguage]}</li>
//               <li>• {car.note[currentLanguage]}</li>
//             </ul>
//           </div>
//         </div>

//         {/* Contact */}
//         <div className="mt-12 text-center">
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">📞 Contact Us</h3>
//           <p className="text-lg text-gray-700 mb-3">+81 90-4616-2378</p>
//           <a
//             href="tel:+819046162378"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
//           >
//             📱 Call Now
//           </a>
//         </div>


//       </section>

//       {/* Purchase CTA */}
//       <section className="py-16 bg-gray-100 text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">
//           {t("purchase_title", { defaultValue: "Ready to Purchase?" })}
//         </h2>
//         <p className="text-gray-600 max-w-lg mx-auto mb-6">
//           {t("purchase_desc", { defaultValue: "Contact us for inspection, shipping, and documentation." })}
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="https://wa.me/1234567890"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
//           >
//             {t("contact_whatsapp", { defaultValue: "Contact via WhatsApp" })}
//           </a>
//           <Link
//             to={getLink("/contact")}
//             className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
//           >
//             {t("contact_form", { defaultValue: "Send Inquiry" })}
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }























// // // src/components/CarList.js
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const CarList = () => {
// //   const [cars, setCars] = useState([]);
// //   const STRAPI_URL = "http://localhost:1337";
  



// //   // useEffect(() => {
// //   //   const getCars = async () => {
// //   //     try {
// //   //       const res = await axios.get(`${STRAPI_URL}/api/cars?populate=*`);
// //   //       setCars(res.data.data || []); // Always set empty array if no data
// //   //       console.log(res.data)

// //   //     } catch (error) {
// //   //       console.error("Error fetching cars:", error);
// //   //     }
// //   //   };

// //   //   getCars();
// //   // }, []);

// // useEffect(() => {
// //   const getCars = async () => {
// //     try {
// //       console.log("Fetching cars..."); // Debug start
// //       const res = await axios.get(`${STRAPI_URL}/api/cars?populate=*`);
// //       console.log("API Response:", res); // Full response check
// //       setCars(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching cars:", error);
// //     }
// //   };

// //   getCars();
// // }, []);




// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {cars.length > 0 ? (
// //         cars.map((car) => {
// //           const { name, model, price, image } = car.attributes;
// //           const imageUrl = image?.data
// //             ? `${STRAPI_URL}${image.data.attributes.url}`
// //             : null;

// //           return (
// //             <div
// //               key={car.id}
// //               className="border p-4 rounded shadow bg-white hover:shadow-lg transition-shadow"
// //             >
// //               <h3 className="text-xl font-semibold mb-2">
// //                 {name} - {model}
// //               </h3>
// //               <p className="mb-2 font-medium text-gray-700">
// //                 Price: Rs. {price}
// //               </p>

// //               {imageUrl ? (
// //                 <img
// //                   src={imageUrl}
// //                   alt={name}
// //                   className="w-full h-48 object-cover rounded"
// //                 />
// //               ) : (
// //                 <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500 rounded">
// //                   No Image here and there 
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })
// //       ) : (
// //         <p className="text-gray-500 text-center col-span-full">
// //           Loading cars...
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CarList;












// // // // src/components/CarList.js
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const CarList = () => {
// // //   const [cars, setCars] = useState([]);

// // //   useEffect(() => {
// // //     const getCars = async () => {
// // //       try {
// // //         const res = await axios.get('http://localhost:1337/api/cars?populate=*');
// // //         setCars(res.data.data); // Strapi v4+ returns data in data.data
// // //       } catch (error) {
// // //         console.error("Error fetching cars:", error);
// // //       }
// // //     };

// // //     getCars();
// // //   }, []);

// // //   return (

// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //   {cars.map((car) => (
// // //     <div key={car.id} className="border p-4 rounded shadow">
// // //       <h3 className="text-xl font-semibold mb-2">
// // //         {car.attributes.name} - {car.attributes.model}
// // //       </h3>
// // //       <p className="mb-2">Price: Rs. {car.attributes.price}</p>
// // //       {car.attributes.image?.data && (
// // //         <img
// // //           src={`http://localhost:1337${car.attributes.image.data.attributes.url}`}
// // //           alt={car.attributes.name}
// // //           className="w-full h-auto"
// // //         />
// // //       )}
// // //     </div>
// // //   ))}
// // // </div>

// // //     // <div>
// // //     //   <h2>Available Cars</h2>
// // //     //   <ul>
// // //     //     {cars.map((car) => (
// // //     //       <li key={car.id}>
// // //     //         <h3>{car.attributes.name} - {car.attributes.model}</h3>
// // //     //         <p>Price: ${car.attributes.price}</p>
// // //     //         {car.attributes.image && car.attributes.image.data && (
// // //     //           <img
// // //     //             src={`http://localhost:1337${car.attributes.image.data.attributes.url}`}
// // //     //             alt={car.attributes.name}
// // //     //             width="200"
// // //     //           />
// // //     //         )}
// // //     //       </li>
// // //     //     ))}
// // //     //   </ul>
// // //     // </div>
// // //   );
// // // };

// // // export default CarList;
