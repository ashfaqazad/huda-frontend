// src/pages/CarDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const allCars = [
  {
    id: 1,
    title: { en: 'Hino Profia Truck', ja: '日野プロフィア トラック' },
    price: '¥2,100,000 (210万)',
    year: { en: '2016', ja: '平成28年' },
    mileage: { en: '1,311,547 km', ja: '1,311,547 km' },
    location: { en: 'Osaka, Japan', ja: '大阪、日本' },
    transmission: { en: 'Manual', ja: 'マニュアル' },
    shaken: { en: 'Valid (check document)', ja: '有効（書類を確認）' },
    kittsu: { en: 'Available', ja: '記録簿あり' },
    condition: {
      en: 'Very clean condition, no major issues, ready to use.',
      ja: 'とてもきれいな状態で、大きな問題はなく、すぐに使用可能です。',
    },
    note: {
      en: 'Feel free to contact, but only serious buyers. Time-wasters, please avoid.',
      ja: '購入を検討している方のみご連絡ください。冷やかしはご遠慮ください。',
    },
    images: [
      '/Images/image-2.jpeg',
      '/Images/image-3.jpeg',
      '/Images/image-4.jpeg',
      '/Images/image-5.jpeg',
      '/Images/image-6.jpg',
      '/Images/image-7.jpg',
      '/Images/image-8.jpg',
      '/Images/image-9.jpg',
      '/Images/image-10.jpg',
    ],
    specs: {
      en: 'Engine: Diesel, Transmission: Manual, Condition: Excellent, Record Book: Available',
      ja: 'エンジン: ディーゼル, トランスミッション: マニュアル, 状態: 良好, 記録簿: あり',
    },
    description: {
      en: 'A durable and powerful heavy-duty truck, perfect for logistics and transport. Maintained with proper inspection and ready for work.',
      ja: '物流や輸送に最適な耐久性とパワーを備えた大型トラック。適切な点検を受け、すぐに使用可能です。',
    },
  },
];

export default function CarDetail() {
  const { t, i18n } = useTranslation();
  const { lng, id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);

  const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

  useEffect(() => {
    if (lng && ['en', 'ja'].includes(lng)) {
      i18n.changeLanguage(lng);
    } else {
      i18n.changeLanguage('ja');
    }
  }, [lng, i18n]);

  const car = allCars.find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">{t('no_car_found', { defaultValue: 'Car not found' })}</p>
      </div>
    );
  }

  const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

  // Image slider handlers
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % car.images.length);
  };
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <html lang={currentLanguage} />
        <title>{car.title[currentLanguage]}</title>
      </Helmet>

      {/* HERO SECTION with SLIDER */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
            ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* IMAGE SLIDER */}
            <div className="relative">
              <img
                src={car.images[currentImage]}
                alt={car.title[currentLanguage]}
                className="w-full h-96 object-cover rounded-xl shadow-lg transition-all duration-500"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {car.images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
                  ></span>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div>
              <h1 className="text-4xl font-bold mb-3">{car.title[currentLanguage]}</h1>
              <p className="text-2xl font-semibold text-green-200 mb-3">{car.price}</p>
              <p className="text-lg mb-1">📍 {car.location[currentLanguage]}</p>
              <p className="text-lg mb-1">🚘 {car.mileage[currentLanguage]}</p>
              <p className="text-lg mb-1">🗓️ {car.year[currentLanguage]}</p>
              <p className="text-lg mb-1">⚙️ {car.transmission[currentLanguage]}</p>
              <p className="text-lg mb-1">✅ Shaken: {car.shaken[currentLanguage]}</p>
              <p className="text-lg mb-1">📘 Kittsu: {car.kittsu[currentLanguage]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION & SPECS */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              {t('car_description', { defaultValue: 'Description' })}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {car.description[currentLanguage]}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">
              {t('car_specs', { defaultValue: 'Specifications' })}
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>• {car.specs[currentLanguage]}</li>
              <li>• {car.condition[currentLanguage]}</li>
              <li>• {car.note[currentLanguage]}</li>
            </ul>
          </div>
        </div>

        {/* 📞 CALL OWNER SECTION */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">📞 Contact Us</h3>
          <p className="text-lg text-gray-700 mb-3">+81 90-1234-5678</p>
          <a
            href="tel:+819012345678"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <span role="img" aria-label="phone">📱</span> Call Now
          </a>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t('purchase_title', { defaultValue: 'Ready to Purchase?' })}
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">
          {t('purchase_desc', {
            defaultValue: 'Contact us for inspection, shipping, and documentation.',
          })}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            {t('contact_whatsapp', { defaultValue: 'Contact via WhatsApp' })}
          </a>
          <Link
            to={getLink('/contact')}
            className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
          >
            {t('contact_form', { defaultValue: 'Send Inquiry' })}
          </Link>
        </div>
      </section>
    </div>
  );
}

























// // src/pages/CarDetail.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Helmet } from 'react-helmet';

// const allCars = [
//   {
//     id: 1,
//     title: { en: 'Hino Profia Truck', ja: '日野プロフィア トラック' },
//     price: '¥2,100,000 (210万)',
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
//     images: [
//       '/Images/image-2.jpeg',
//       '/Images/image-3.jpeg',
//       '/Images/image-4.jpeg',
//       '/Images/image-5.jpeg',
//       '/Images/image-6.jpg',
//       '/Images/image-7.jpg',
//       '/Images/image-8.jpg',
//       '/Images/image-9.jpg',
//       '/Images/image-10.jpg',
//     ],
//     specs: {
//       en: 'Engine: Diesel, Transmission: Manual, Condition: Excellent, Record Book: Available',
//       ja: 'エンジン: ディーゼル, トランスミッション: マニュアル, 状態: 良好, 記録簿: あり',
//     },
//     description: {
//       en: 'A durable and powerful heavy-duty truck, perfect for logistics and transport. Maintained with proper inspection and ready for work.',
//       ja: '物流や輸送に最適な耐久性とパワーを備えた大型トラック。適切な点検を受け、すぐに使用可能です。',
//     },
//   },
// ];

// export default function CarDetail() {
//   const { t, i18n } = useTranslation();
//   const { lng, id } = useParams();
//   const [currentImage, setCurrentImage] = useState(0);

//   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

//   useEffect(() => {
//     if (lng && ['en', 'ja'].includes(lng)) {
//       i18n.changeLanguage(lng);
//     } else {
//       i18n.changeLanguage('ja');
//     }
//   }, [lng, i18n]);

//   const car = allCars.find(c => c.id === parseInt(id));

//   if (!car) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-600">{t('no_car_found', { defaultValue: 'Car not found' })}</p>
//       </div>
//     );
//   }

//   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

//   // Image slider handlers
//   const nextImage = () => {
//     setCurrentImage((prev) => (prev + 1) % car.images.length);
//   };
//   const prevImage = () => {
//     setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <html lang={currentLanguage} />
//         <title>{car.title[currentLanguage]}</title>
//       </Helmet>

//       {/* HERO SECTION with SLIDER */}
//       <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
//             ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
//           </Link>

//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             {/* IMAGE SLIDER */}
//             <div className="relative">
//               <img
//                 src={car.images[currentImage]}
//                 alt={car.title[currentLanguage]}
//                 className="w-full h-96 object-cover rounded-xl shadow-lg transition-all duration-500"
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
//                 {car.images.map((_, index) => (
//                   <span
//                     key={index}
//                     className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
//                   ></span>
//                 ))}
//               </div>
//             </div>

//             {/* DETAILS */}
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

//       {/* DESCRIPTION & SPECS */}
//       <section className="py-16">
//         <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-3">{t('car_description', { defaultValue: 'Description' })}</h2>
//             <p className="text-gray-700 leading-relaxed">
//               {car.description[currentLanguage]}
//             </p>
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-3">{t('car_specs', { defaultValue: 'Specifications' })}</h2>
//             <ul className="text-gray-700 space-y-2">
//               <li>• {car.specs[currentLanguage]}</li>
//               <li>• {car.condition[currentLanguage]}</li>
//               <li>• {car.note[currentLanguage]}</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-16 bg-gray-100 text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('purchase_title', { defaultValue: 'Ready to Purchase?' })}</h2>
//         <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('purchase_desc', { defaultValue: 'Contact us for inspection, shipping, and documentation.' })}</p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="https://wa.me/1234567890"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
//           >
//             {t('contact_whatsapp', { defaultValue: 'Contact via WhatsApp' })}
//           </a>
//           <Link
//             to={getLink('/contact')}
//             className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
//           >
//             {t('contact_form', { defaultValue: 'Send Inquiry' })}
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }























// // src/pages/CarDetail.jsx
// import React, { useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Helmet } from 'react-helmet';

// const allCars = [
//   {
//     id: 1,
//     title: { en: 'Toyota Corolla', ja: 'トヨタ カローラ' },
//     price: 3500000,
//     year: 2018,
//     mileage: { en: '80,000 km', ja: '80,000 km' },
//     img: '/Images/Corolla.jpg',
//     description: { en: 'A comfortable and reliable sedan perfect for daily commutes. Fuel-efficient and spacious interior.', ja: '毎日の通勤に最適な快適で信頼性の高いセダン。燃費が良く、広々としたインテリア。' },
//     specs: { en: 'Engine: 1.8L, Transmission: Automatic, Fuel: Petrol', ja: 'エンジン: 1.8L, トランスミッション: 自動, 燃料: ガソリン' },
//   },
//   {
//     id: 2,
//     title: { en: 'Nissan Skyline', ja: '日産スカイライン' },
//     price: 7200000,
//     year: 2016,
//     mileage: { en: '60,000 km', ja: '60,000 km' },
//     img: '/Images/Nissan.jpg',
//     description: { en: 'Sporty and powerful coupe with excellent handling. Ideal for performance enthusiasts.', ja: '優れたハンドリングのスポーティでパワフルなクーペ。パフォーマンス愛好家に最適。' },
//     specs: { en: 'Engine: 3.0L Twin Turbo, Transmission: Manual, Fuel: Petrol', ja: 'エンジン: 3.0Lツインターボ, トランスミッション: マニュアル, 燃料: ガソリン' },
//   },
//   {
//     id: 3,
//     title: { en: 'Honda Civic', ja: 'ホンダ シビック' },
//     price: 4200000,
//     year: 2019,
//     mileage: { en: '45,000 km', ja: '45,000 km' },
//     img: '/Images/Civic.avif',
//     description: { en: 'Efficient city car with modern features and great fuel economy.', ja: '現代的な機能と優れた燃費を備えた効率的なシティカー。' },
//     specs: { en: 'Engine: 1.5L Turbo, Transmission: CVT, Fuel: Petrol', ja: 'エンジン: 1.5Lターボ, トランスミッション: CVT, 燃料: ガソリン' },
//   },
//   {
//     id: 4,
//     title: { en: 'Suzuki Swift', ja: 'スズキ スイフト' },  // Corrected ja title
//     price: 2500000,
//     year: 2020,
//     mileage: { en: '30,000 km', ja: '30,000 km' },  // Matched en
//     img: '/Images/Swift.avif',
//     description: { en: 'Compact hatchback with agile handling and low running costs. Perfect for urban driving.', ja: '機敏なハンドリングと低ランニングコストのコンパクトハッチバック。都市部運転に最適。' },  // Customized for Suzuki
//     specs: { en: 'Engine: 1.2L, Transmission: Manual, Fuel: Petrol', ja: 'エンジン: 1.2L, トランスミッション: マニュアル, 燃料: ガソリン' },
//   },
//   {
//     id: 5,
//     title: { en: 'Mazda Demio', ja: 'マツダ デミオ' },  // Corrected ja title
//     price: 2100000,
//     year: 2017,
//     mileage: { en: '92,000 km', ja: '92,000 km' },  // Corrected to match en
//     img: '/Images/Mazda.jpg',
//     description: { en: 'Stylish subcompact with premium feel and efficient engine. Great for city use.', ja: 'プレミアム感のあるスタイリッシュなサブコンパクト。効率的なエンジンで都市部に最適。' },  // Customized for Mazda
//     specs: { en: 'Engine: 1.3L, Transmission: Automatic, Fuel: Petrol', ja: 'エンジン: 1.3L, トランスミッション: 自動, 燃料: ガソリン' },
//   },
// ];

// export default function CarDetail() {
//   const { t, i18n } = useTranslation();
//   const { lng, id } = useParams();  // Extract lng and id from URL

//   // Normalize language
//   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

//   // Language set from URL
//   useEffect(() => {
//     if (lng && ['en', 'ja'].includes(lng)) {
//       i18n.changeLanguage(lng);
//     } else {
//       i18n.changeLanguage('ja');
//     }
//   }, [lng, i18n]);

//   // Find car by ID
//   const car = allCars.find(c => c.id === parseInt(id));

//   if (!car) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-600">{t('no_car_found', { defaultValue: 'Car not found' })}</p>
//       </div>
//     );
//   }

//   // Helper for links
//   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <html lang={currentLanguage} />
//         <title>{car.title[currentLanguage] || car.title.en}</title>
//       </Helmet>
//       {/* Hero Image & Basic Info */}
//       <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
//             ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
//           </Link>
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <img
//               src={car.img}
//               alt={car.title[currentLanguage] || car.title.en}
//               className="w-full h-96 object-cover rounded-xl shadow-lg"
//             />
//             <div>
//               <h1 className="text-4xl font-bold mb-4">{car.title[currentLanguage] || car.title.en}</h1>
//               <p className="text-3xl font-bold text-green-200 mb-4">
//                 {t('car_price', { price: car.price.toLocaleString() })}
//               </p>
//               <p className="text-lg mb-2">{t('car_year', { year: car.year })}</p>
//               <p className="text-lg">{car.mileage[currentLanguage] || car.mileage.en}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Description & Specs */}
//       <section className="py-16">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h2 className="text-2xl font-bold mb-4">{t('car_description', { defaultValue: 'Description' })}</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {car.description[currentLanguage] || car.description.en}
//               </p>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold mb-4">{t('car_specs', { defaultValue: 'Specifications' })}</h2>
//               <ul className="space-y-2 text-gray-600">
//                 <li>• {car.specs[currentLanguage] || car.specs.en}</li>
//                 {/* Add more specs as needed */}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gray-100 text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('purchase_title', { defaultValue: 'Ready to Purchase?' })}</h2>
//         <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('purchase_desc', { defaultValue: 'Contact us for inspection, shipping, and documentation.' })}</p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="https://wa.me/1234567890"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
//           >
//             {t('contact_whatsapp', { defaultValue: 'Contact via WhatsApp' })}
//           </a>
//           <Link
//             to={getLink('/contact')}
//             className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
//           >
//             {t('contact_form', { defaultValue: 'Send Inquiry' })}
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
