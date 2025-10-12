import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const allCars = [
  {
    id: 1,
    title: { en: "Hino Profia Truck", ja: "日野プロフィア トラック" },
    price: "¥2,100,000 (210万)",
    year: { en: "2016", ja: "平成28年" },
    mileage: { en: "1,311,547 km", ja: "1,311,547 km" },
    location: { en: "Osaka, Japan", ja: "大阪、日本" },
    transmission: { en: "Manual", ja: "マニュアル" },
    shaken: { en: "Valid (check document)", ja: "有効（書類を確認）" },
    kittsu: { en: "Available", ja: "記録簿あり" },
    condition: {
      en: "Very clean condition, no major issues, ready to use.",
      ja: "とてもきれいな状態で、大きな問題はなく、すぐに使用可能です。",
    },
    note: {
      en: "Feel free to contact, but only serious buyers. Time-wasters, please avoid.",
      ja: "購入を検討している方のみご連絡ください。冷やかしはご遠慮ください。",
    },
    images: [
      "/Images/image-2.jpeg",
      "/Images/image-3.jpeg",
      "/Images/image-4.jpeg",
      "/Images/image-5.jpeg",
      "/Images/image-6.jpg",
      "/Images/image-7.jpg",
      "/Images/image-8.jpg",
      "/Images/image-9.jpg",
      "/Images/image-10.jpg",
    ],
  },

  // --- ID: 2 Daihatsu Hijet Dump Truck ---
  {
    id: 2,
    title: { en: "Daihatsu Hijet Dump Truck", ja: "ダイハツ ハイゼット ダンプトラック" },
    price: "¥300,000 (30万)",
    year: { en: "2009 (Heisei 21)", ja: "平成21年" },
    mileage: { en: "-", ja: "-" },
    location: { en: "Nara, Japan", ja: "奈良、日本" },
    transmission: { en: "5-Speed Manual", ja: "5速マニュアル" },
    shaken: { en: "Expired (車検切れ)", ja: "車検切れ" },
    kittsu: { en: "Available", ja: "記録簿あり" },
    video: "/Videos/hijet.mp4",

    condition: {
      en: `
🚛 Daihatsu Hijet Dump Truck for Sale

📍 Location: Nara, Japan
💴 Price: 30万円 (300,000 yen)
📅 Year: 平成21年 (2009 model)
🔢 Chassis No.: S210P-0021788
⚙️ Model: GD-S210P
⛽ Fuel: Gasoline (Petrol)
🕹 Transmission: 5-Speed Manual
⚖️ Car Weight: 940 kg
🛻 Engine Capacity: 660cc
⚒ Type: Light Dump Truck (軽ダンプ)
📄 Shaken (Inspection): Expired (車検切れ)

⸻

🧰 Condition & Features
• Engine & gear in good working condition
• Dump system fully functional
• Manual 4WD system
• Some rust on the body (as seen in photos)
• Ideal for farm, construction, or export use
• Easy to maintain — parts available everywhere in Japan

⸻

📞 Contact
Serious buyers only please.
Feel free to contact for inspection or more details.
🚗 Local and export available.
  `,
      ja: `
🚛 ダイハツ ハイゼット ダンプトラック 販売中

📍 所在地: 奈良県、日本
💴 価格: 30万円（300,000円）
📅 年式: 平成21年（2009年式）
🔢 車台番号: S210P-0021788
⚙️ 型式: GD-S210P
⛽ 燃料: ガソリン
🕹 トランスミッション: 5速マニュアル
⚖️ 車両重量: 940kg
🛻 エンジン排気量: 660cc
⚒ タイプ: 軽ダンプトラック
📄 車検: 切れ（車検切れ）

⸻

🧰 コンディション・特徴
• エンジンとギアは良好な状態です。
• ダンプシステムは完全に動作します。
• マニュアル式4WDシステム搭載。
• ボディに一部サビあり（写真参照）。
• 農業・建設・輸出用途に最適。
• メンテナンスが容易で、日本全国で部品入手可能。

⸻

📞 お問い合わせ
購入希望者のみご連絡ください。
現車確認・詳細についてお気軽にお問い合わせください。
🚗 国内販売および輸出対応可能です。
  `,
    },
    images: [
      "/Images/hijet-1.jpg",
      "/Images/hijet-2.jpg",
      "/Images/hijet-3.jpg",
      "/Images/hijet-4.jpg",
      "/Images/hijet-5.jpg",
      "/Images/hijet-6.jpg",
      "/Images/hijet-7.jpg",
      "/Images/hijet-8.jpg",
      "/Images/hijet-9.jpg",
      "/Images/hijet-10.jpg",
      "/Images/hijet-11.jpg",
      "/Images/hijet-12.jpg",
      "/Images/hijet-13.jpg",
      "/Images/hijet-14.jpg",
      "/Images/hijet-15.jpg",
      "/Images/hijet-16.jpg",
      "/Images/hijet-17.jpg",
      "/Images/hijet-18.jpg",
    ],
  },

  // --- ID: 3 Komatsu PC20MR-1 Mini Excavator ---
  // {
  //   id: 3,
  //   title: { en: "Komatsu PC20MR-1 Mini Excavator", ja: "コマツ PC20MR-1 ミニショベル" },
  //   price: "¥700,000 (70万)",
  //   year: { en: "-", ja: "-" },
  //   mileage: { en: "-", ja: "-" },
  //   location: { en: "Nara, Japan", ja: "奈良、日本" },
  //   transmission: { en: "Hydraulic System", ja: "油圧システム" },
  //   shaken: { en: "N/A", ja: "なし" },
  //   kittsu: { en: "Available", ja: "記録簿あり" },
  //   video: "/Videos/loder.mp4",

  // },





  {
  id: 3,
  title: { 
    en: "Komatsu PC20MR-1 Mini Excavator", 
    ja: "コマツ PC20MR-1 ミニショベル" 
  },
  price: "¥700,000 (70万)",
  year: { en: "-", ja: "-" },
  mileage: { en: "-", ja: "-" },
  location: { en: "Nara, Japan", ja: "奈良、日本" },
  transmission: { en: "Hydraulic System", ja: "油圧システム" },
  shaken: { en: "N/A", ja: "なし" },
  kittsu: { en: "Available", ja: "記録簿あり" },
  video: "/Videos/loder.mp4",

  condition: {
    en: `
🚜 Komatsu PC20MR-1 Mini Excavator for Sale

📍 Location: Nara, Japan
💴 Price: 70万円 (700,000 yen)
🏗 Model: PC20MR-1
🔢 Serial No.: 12848
🏢 Manufacturer: Komatsu Ltd., Tokyo, Japan
⚙️ Engine Power: Approx. 20HP class
⚖️ Operating Weight: Around 2 tons
🔧 Condition: Used / Working Condition

⸻

🔍 Features
• Strong hydraulic power, smooth operation
• Blade & bucket both in working condition
• Compact size — ideal for small construction or farm work
• Rubber tracks in good shape
• Japanese domestic use (not imported)
• Easy to transport and maintain
• Clean and well-maintained body

⸻

🧰 Perfect For
✅ Farm use
✅ Construction sites
✅ Export to other countries
✅ Yard work or small-scale digging

⸻

📞 Contact
Serious buyers only please.
Feel free to inspect or ask for more details.
Local and export sales available.
    `,
    ja: `
🚜 コマツ PC20MR-1 ミニショベル 販売中

📍 所在地: 奈良県、日本
💴 価格: 70万円（700,000円）
🏗 型式: PC20MR-1
🔢 シリアル番号: 12848
🏢 メーカー: 株式会社コマツ（東京都、日本）
⚙️ エンジン出力: 約20馬力クラス
⚖️ 運転質量: 約2トン
🔧 状態: 中古／良好な動作状態

⸻

🔍 特徴
• 強力な油圧システムでスムーズな操作
• ブレードとバケットはどちらも動作良好
• コンパクトサイズで農作業や小規模建設に最適
• ゴムクローラーの状態良好
• 日本国内使用車（輸入車ではありません）
• 輸送やメンテナンスが容易
• クリーンで良く整備された外観

⸻

🧰 最適な用途
✅ 農作業
✅ 建設現場
✅ 海外輸出
✅ 庭作業や小規模掘削作業

⸻

📞 お問い合わせ
購入希望者のみご連絡ください。
現車確認・詳細についてお気軽にお問い合わせください。
🚗 国内販売および輸出対応可能です。
    `,
  },

  note: {
    en: "Strong hydraulics, smooth operation, ideal for farm or export.",
    ja: "油圧強力、スムーズな操作、農業・輸出に最適。",
  },

  images: [
    "/Images/loder-1.jpeg",
    "/Images/loder-2.jpeg",
    "/Images/loder-3.jpeg",
    "/Images/loder-4.jpeg",
    "/Images/loder-5.jpeg",
    "/Images/loder-6.jpeg",
    "/Images/loder-7.jpeg",
    "/Images/loder-8.jpeg",
    "/Images/loder-9.jpeg",
    "/Images/loder-10.jpeg",
    "/Images/loder-11.jpeg",
    "/Images/loder-12.jpeg",
    "/Images/loder-13.jpeg",
    "/Images/loder-14.jpeg",
    "/Images/loder-15.jpeg",
  ],

  specs: {
    en: "20HP Class, 2 Ton, Blade & Bucket Functional, Rubber Tracks",
    ja: "20馬力クラス, 約2トン, ブレード・バケット作動, ゴムキャタ良好",
  },

  description: {
    en: "Komatsu PC20MR-1 is a compact excavator ideal for small-scale construction and farm use. Smooth hydraulic performance and strong build quality.",
    ja: "PC20MR-1は小規模工事や農作業に適したコンパクトショベル。油圧性能が優れています。",
  },
}





];

export default function CarDetail() {
  const { t, i18n } = useTranslation();
  const { lng, id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";

  useEffect(() => {
    if (lng && ["en", "ja"].includes(lng)) i18n.changeLanguage(lng);
    else i18n.changeLanguage("ja");
  }, [lng, i18n]);

  const car = allCars.find((c) => c.id === parseInt(id));
  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          {t("no_car_found", { defaultValue: "Car not found" })}
        </p>
      </div>
    );
  }

  // ✅ Video Slider Logic
  const totalSlides = car.images.length + (car.video ? 1 : 0);
  const nextImage = () => setCurrentImage((p) => (p + 1) % totalSlides);
  const prevImage = () =>
    setCurrentImage((p) => (p - 1 + totalSlides) % totalSlides);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <html lang={currentLanguage} />
        <title>{car.title[currentLanguage]}</title>
      </Helmet>

      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <Link
            to={`/${currentLanguage}/cars`}
            className="inline-block mb-4 text-sm hover:underline"
          >
            ← {t("back_to_cars", { defaultValue: "Back to Cars" })}
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* ✅ Image + Video Slider */}
            <div className="relative">
              {currentImage < car.images.length ? (
                <img
                  src={car.images[currentImage]}
                  alt={car.title[currentLanguage]}
                  className="w-full h-100 object-cover rounded-xl shadow-lg transition-all duration-500"
                />
              ) : (
                <video
                  src={car.video}
                  controls
                  className="w-full h-100 object-cover rounded-xl shadow-lg"
                />
              )}

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
                {[...Array(totalSlides)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i === currentImage ? "bg-white" : "bg-gray-400"
                    }`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div>
              <h1 className="text-4xl font-bold mb-3">
                {car.title[currentLanguage]}
              </h1>
              <p className="text-2xl font-semibold text-green-200 mb-3">
                {car.price}
              </p>
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

      {/* Description */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              {t("car_description", { defaultValue: "Description" })}
            </h2>
            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
              {car.condition[currentLanguage]}
            </pre>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              {t("car_specs", { defaultValue: "Specifications" })}
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>• {car.specs?.[currentLanguage]}</li>
              <li>• {car.description?.[currentLanguage]}</li>
              <li>• {car.note?.[currentLanguage]}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}






















// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Helmet } from "react-helmet";

// const allCars = [
//   {
//     id: 1,
//     title: { en: "Hino Profia Truck", ja: "日野プロフィア トラック" },
//     price: "¥2,100,000 (210万)",
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
//     images: [
//       "/Images/image-2.jpeg",
//       "/Images/image-3.jpeg",
//       "/Images/image-4.jpeg",
//       "/Images/image-5.jpeg",
//       "/Images/image-6.jpg",
//       "/Images/image-7.jpg",
//       "/Images/image-8.jpg",
//       "/Images/image-9.jpg",
//       "/Images/image-10.jpg",
//     ],
//     specs: {
//       en: "Engine: Diesel, Transmission: Manual, Condition: Excellent, Record Book: Available",
//       ja: "エンジン: ディーゼル, トランスミッション: マニュアル, 状態: 良好, 記録簿: あり",
//     },
//     description: {
//       en: "A durable and powerful heavy-duty truck, perfect for logistics and transport. Maintained with proper inspection and ready for work.",
//       ja: "物流や輸送に最適な耐久性とパワーを備えた大型トラック。適切な点検を受け、すぐに使用可能です。",
//     },
//   },

//   // --- ID: 2 Daihatsu Hijet Dump Truck ---
//   {
//     id: 2,
//     title: { en: "Daihatsu Hijet Dump Truck", ja: "ダイハツ ハイゼット ダンプトラック" },
//     price: "¥300,000 (30万)",
//     year: { en: "2009 (Heisei 21)", ja: "平成21年" },
//     mileage: { en: "-", ja: "-" },
//     location: { en: "Nara, Japan", ja: "奈良、日本" },
//     transmission: { en: "5-Speed Manual", ja: "5速マニュアル" },
//     shaken: { en: "Expired (車検切れ)", ja: "車検切れ" },
//     kittsu: { en: "Available", ja: "記録簿あり" },

// condition: {
//   en: `
// 🚛 Daihatsu Hijet Dump Truck for Sale

// 📍 Location: Nara, Japan
// 💴 Price: 30万円 (300,000 yen)
// 📅 Year: 平成21年 (2009 model)
// 🔢 Chassis No.: S210P-0021788
// ⚙️ Model: GD-S210P
// ⛽ Fuel: Gasoline (Petrol)
// 🕹 Transmission: 5-Speed Manual
// ⚖️ Car Weight: 940 kg
// 🛻 Engine Capacity: 660cc
// ⚒ Type: Light Dump Truck (軽ダンプ)
// 📄 Shaken (Inspection): Expired (車検切れ)

// ⸻

// 🧰 Condition & Features
// • Engine & gear in good working condition
// • Dump system fully functional
// • Manual 4WD system
// • Some rust on the body (as seen in photos)
// • Ideal for farm, construction, or export use
// • Easy to maintain — parts available everywhere in Japan

// ⸻

// 📞 Contact
// Serious buyers only please.
// Feel free to contact for inspection or more details.
// 🚗 Local and export available.
//   `,
//   ja: `
// 🚛 ダイハツ ハイゼット ダンプトラック 販売中

// 📍 所在地: 奈良県、日本
// 💴 価格: 30万円（300,000円）
// 📅 年式: 平成21年（2009年式）
// 🔢 車台番号: S210P-0021788
// ⚙️ 型式: GD-S210P
// ⛽ 燃料: ガソリン
// 🕹 トランスミッション: 5速マニュアル
// ⚖️ 車両重量: 940kg
// 🛻 エンジン排気量: 660cc
// ⚒ タイプ: 軽ダンプトラック
// 📄 車検: 切れ（車検切れ）

// ⸻

// 🧰 コンディション・特徴
// • エンジンとギアは良好な状態です。
// • ダンプシステムは完全に動作します。
// • マニュアル式4WDシステム搭載。
// • ボディに一部サビあり（写真参照）。
// • 農業・建設・輸出用途に最適。
// • メンテナンスが容易で、日本全国で部品入手可能。

// ⸻

// 📞 お問い合わせ
// 購入希望者のみご連絡ください。
// 現車確認・詳細についてお気軽にお問い合わせください。
// 🚗 国内販売および輸出対応可能です。
//   `,
// },
//     note: {
//       en: "Ideal for farm or export use.",
//       ja: "農場または輸出に最適。",
//     },
//     images: [
//       "/Images/hijet-1.jpg",
//       "/Images/hijet-2.jpg",
//       "/Images/hijet-3.jpg",
//       "/Images/hijet-4.jpg",
//       "/Images/hijet-5.jpg",
//       "/Images/hijet-6.jpg",
//       "/Images/hijet-7.jpg",
//       "/Images/hijet-8.jpg",
//       "/Images/hijet-9.jpg",
//       "/Images/hijet-10.jpg",
//       "/Images/hijet-11.jpg",
//       "/Images/hijet-12.jpg",
//       "/Images/hijet-13.jpg",
//       "/Images/hijet-14.jpg",
//       "/Images/hijet-15.jpg",
//       "/Images/hijet-16.jpg",
//       "/Images/hijet-17.jpg",
//       "/Images/hijet-18.jpg",
//     ],
//     specs: {
//       en: "660cc Engine, 4WD, Manual, Light Dump Truck Type, Petrol",
//       ja: "660ccエンジン, 4WD, マニュアル, 軽ダンプ, ガソリン",
//     },
//     description: {
//       en: "Daihatsu Hijet Dump Truck — ideal for farms, construction, or export. Fully functional dump system, easy maintenance, and parts availability all over Japan.",
//       ja: "ダイハツハイゼットダンプトラック—農業、建設、輸出に最適。メンテナンス容易、部品入手可。",
//     },
//   },

//   // --- ID: 3 Komatsu PC20MR-1 Mini Excavator ---
//   {
//     id: 3,
//     title: { en: "Komatsu PC20MR-1 Mini Excavator", ja: "コマツ PC20MR-1 ミニショベル" },
//     price: "¥700,000 (70万)",
//     year: { en: "-", ja: "-" },
//     mileage: { en: "-", ja: "-" },
//     location: { en: "Nara, Japan", ja: "奈良、日本" },
//     transmission: { en: "Hydraulic System", ja: "油圧システム" },
//     shaken: { en: "N/A", ja: "なし" },
//     kittsu: { en: "Available", ja: "記録簿あり" },

// condition: {
//   en: `
// 🚜 Komatsu PC20MR-1 Mini Excavator for Sale

// 📍 Location: Nara, Japan
// 💴 Price: 70万円 (700,000 yen)
// 🏗 Model: PC20MR-1
// 🔢 Serial No.: 12848
// 🏢 Manufacturer: Komatsu Ltd., Tokyo, Japan
// ⚙️ Engine Power: Approx. 20HP class
// ⚖️ Operating Weight: Around 2 tons
// 🔧 Condition: Used / Working Condition

// ⸻

// 🔍 Features
// • Strong hydraulic power, smooth operation
// • Blade & bucket both in working condition
// • Compact size — ideal for small construction or farm work
// • Rubber tracks in good shape
// • Japanese domestic use (not imported)
// • Easy to transport and maintain
// • Clean and well-maintained body

// ⸻

// 🧰 Perfect For
// ✅ Farm use
// ✅ Construction sites
// ✅ Export to other countries
// ✅ Yard work or small-scale digging

// ⸻

// 📞 Contact
// Serious buyers only please.
// Feel free to inspect or ask for more details.
// Local and export sales available.
//   `,
//   ja: `
// 🚜 コマツ PC20MR-1 ミニショベル 販売中

// 📍 所在地: 奈良県、日本
// 💴 価格: 70万円（700,000円）
// 🏗 型式: PC20MR-1
// 🔢 シリアル番号: 12848
// 🏢 メーカー: 株式会社コマツ（東京都、日本）
// ⚙️ エンジン出力: 約20馬力クラス
// ⚖️ 運転質量: 約2トン
// 🔧 状態: 中古／良好な動作状態

// ⸻

// 🔍 特徴
// • 強力な油圧システムでスムーズな操作
// • ブレードとバケットはどちらも動作良好
// • コンパクトサイズで農作業や小規模建設に最適
// • ゴムクローラーの状態良好
// • 日本国内使用車（輸入車ではありません）
// • 輸送やメンテナンスが容易
// • クリーンで良く整備された外観

// ⸻

// 🧰 最適な用途
// ✅ 農作業
// ✅ 建設現場
// ✅ 海外輸出
// ✅ 庭作業や小規模掘削作業

// ⸻

// 📞 お問い合わせ
// 購入希望者のみご連絡ください。
// 現車確認・詳細についてお気軽にお問い合わせください。
// 🚗 国内販売および輸出対応可能です。
//   `,
// },


//     note: {
//       en: "Strong hydraulics, smooth operation, ideal for farm or export.",
//       ja: "油圧強力、スムーズな操作、農業・輸出に最適。",
//     },
//     images: [
//       "/Images/loder-1.jpeg",
//       "/Images/loder-2.jpeg",
//       "/Images/loder-3.jpeg",
//       "/Images/loder-4.jpeg",
//       "/Images/loder-5.jpeg",
//       "/Images/loder-6.jpeg",
//       "/Images/loder-7.jpeg",
//       "/Images/loder-8.jpeg",
//       "/Images/loder-9.jpeg",
//       "/Images/loder-10.jpeg",
//       "/Images/loder-11.jpeg",
//       "/Images/loder-12.jpeg",
//       "/Images/loder-13.jpeg",
//       "/Images/loder-14.jpeg",
//       "/Images/loder-15.jpeg",
//     ],
//     specs: {
//       en: "20HP Class, 2 Ton, Blade & Bucket Functional, Rubber Tracks",
//       ja: "20馬力クラス, 約2トン, ブレード・バケット作動, ゴムキャタ良好",
//     },
//     description: {
//       en: "Komatsu PC20MR-1 is a compact excavator ideal for small-scale construction and farm use. Smooth hydraulic performance and strong build quality.",
//       ja: "PC20MR-1は小規模工事や農作業に適したコンパクトショベル。油圧性能が優れています。",
//     },
//   },
// ];

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
//   {
//     id: 2,
//     title: { en: 'Toyota Dyna Truck', ja: 'トヨタ ダイナ トラック' },
//     price: '¥1,850,000 (185万)',
//     year: { en: '2017', ja: '平成29年' },
//     mileage: { en: '845,000 km', ja: '845,000 km' },
//     location: { en: 'Nagoya, Japan', ja: '名古屋、日本' },
//     transmission: { en: 'Automatic', ja: 'オートマチック' },
//     shaken: { en: 'Valid (until 2026)', ja: '有効（2026年まで）' },
//     kittsu: { en: 'Available', ja: '記録簿あり' },
//     condition: {
//       en: 'Reliable truck with great mileage and solid performance. Minor scratches only.',
//       ja: '信頼性が高く、走行距離も良好なトラック。軽微なキズのみ。',
//     },
//     note: {
//       en: 'Inspection and shipping available. Contact for details.',
//       ja: '検査および出荷対応可能。詳細はお問い合わせください。',
//     },
//     images: [
//       '/Images/hijet-1.jpg',
//       '/Images/hijet-2.jpg',
//       '/Images/hijet-3.jpg',
//       '/Images/hijet-4.jpg',
//       '/Images/hijet-5.jpg',
//       '/Images/hijet-6.jpg',
//       '/Images/hijet-7.jpg',
//       '/Images/hijet-8.jpg',
//       '/Images/hijet-9.jpg',
//       '/Images/hijet-10.jpg',
//       '/Images/hijet-11.jpg',
//       '/Images/hijet-12.jpg',
//       '/Images/hijet-13.jpg',
//       '/Images/hijet-14.jpg',
//       '/Images/hijet-15.jpg',
//       '/Images/hijet-16.jpg',
//       '/Images/hijet-17.jpg',
//       '/Images/hijet-18.jpg',

//     ],
//     specs: {
//       en: 'Engine: Diesel, Transmission: Automatic, Power: 4.0L, Condition: Very Good',
//       ja: 'エンジン: ディーゼル, トランスミッション: オートマチック, 排気量: 4.0L, 状態: 良好',
//     },
//     description: {
//       en: 'Toyota Dyna offers efficiency and strength for city and highway use. Perfect for medium-scale logistics and construction work.',
//       ja: 'トヨタ ダイナは、都市や高速道路での使用に効率的で力強いトラックです。中規模の物流や建設作業に最適です。',
//     },
//   },
//   {
//     id: 3,
//     title: { en: 'Isuzu Elf Truck', ja: 'いすゞ エルフトラック' },
//     price: '¥1,450,000 (145万)',
//     year: { en: '2015', ja: '平成27年' },
//     mileage: { en: '970,000 km', ja: '970,000 km' },
//     location: { en: 'Tokyo, Japan', ja: '東京、日本' },
//     transmission: { en: 'Manual', ja: 'マニュアル' },
//     shaken: { en: 'Valid (check document)', ja: '有効（書類を確認）' },
//     kittsu: { en: 'Available', ja: '記録簿あり' },
//     condition: {
//       en: 'Runs smoothly, well maintained, and fuel-efficient.',
//       ja: 'スムーズに走行し、整備が行き届いており、燃費も良好です。',
//     },
//     note: {
//       en: 'Ideal for delivery and small transport operations.',
//       ja: '配達や小規模輸送業務に最適です。',
//     },
//     images: [
//       '/Images/loder-1.jpeg',
//       '/Images/loder-2.jpeg',
//       '/Images/loder-3.jpeg',
//       '/Images/loder-4.jpeg',
//       '/Images/loder-5.jpeg',
//       '/Images/loder-6.jpeg',
//       '/Images/loder-7.jpeg',
//       '/Images/loder-8.jpeg',
//       '/Images/loder-9.jpeg',
//       '/Images/loder-10.jpeg',
//       '/Images/loder-11.jpeg',
//       '/Images/loder-12.jpeg',
//       '/Images/loder-13.jpeg',
//       '/Images/loder-14.jpeg',
//       '/Images/loder-15.jpeg',

//     ],
//     specs: {
//       en: 'Engine: Diesel, Transmission: Manual, Body Type: Flatbed, Condition: Good',
//       ja: 'エンジン: ディーゼル, トランスミッション: マニュアル, ボディタイプ: フラットベッド, 状態: 良好',
//     },
//     description: {
//       en: 'Isuzu Elf is one of Japan’s most popular light-duty trucks, known for efficiency and easy maintenance.',
//       ja: 'いすゞ エルフは、日本で最も人気のある小型トラックの一つで、効率性とメンテナンスの容易さで知られています。',
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

//       <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
//             ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
//           </Link>

//           <div className="grid md:grid-cols-2 gap-8 items-center">
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
//                 {car.images.map((_, index) => (
//                   <span
//                     key={index}
//                     className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
//                   ></span>
//                 ))}
//               </div>
//             </div>

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

//       <section className="py-16">
//         <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-3">
//               {t('car_description', { defaultValue: 'Description' })}
//             </h2>
//             <p className="text-gray-700 leading-relaxed">{car.description[currentLanguage]}</p>
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold mb-3">
//               {t('car_specs', { defaultValue: 'Specifications' })}
//             </h2>
//             <ul className="text-gray-700 space-y-2">
//               <li>• {car.specs[currentLanguage]}</li>
//               <li>• {car.condition[currentLanguage]}</li>
//               <li>• {car.note[currentLanguage]}</li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-12 text-center">
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">📞 Contact Us</h3>
//           <p className="text-lg text-gray-700 mb-3">+81 90-4616-2378</p>
//           <a
//             href="tel:+819046162378"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
//           >
//             <span role="img" aria-label="phone">📱</span> Call Now
//           </a>
//         </div>
//       </section>

//       <section className="py-16 bg-gray-100 text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">
//           {t('purchase_title', { defaultValue: 'Ready to Purchase?' })}
//         </h2>
//         <p className="text-gray-600 max-w-lg mx-auto mb-6">
//           {t('purchase_desc', { defaultValue: 'Contact us for inspection, shipping, and documentation.' })}
//         </p>
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






















// // // src/pages/CarDetail.jsx
// // import React, { useEffect, useState } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import { useTranslation } from 'react-i18next';
// // import { Helmet } from 'react-helmet';

// // const allCars = [
// //   {
// //     id: 1,
// //     title: { en: 'Hino Profia Truck', ja: '日野プロフィア トラック' },
// //     price: '¥2,100,000 (210万)',
// //     year: { en: '2016', ja: '平成28年' },
// //     mileage: { en: '1,311,547 km', ja: '1,311,547 km' },
// //     location: { en: 'Osaka, Japan', ja: '大阪、日本' },
// //     transmission: { en: 'Manual', ja: 'マニュアル' },
// //     shaken: { en: 'Valid (check document)', ja: '有効（書類を確認）' },
// //     kittsu: { en: 'Available', ja: '記録簿あり' },
// //     condition: {
// //       en: 'Very clean condition, no major issues, ready to use.',
// //       ja: 'とてもきれいな状態で、大きな問題はなく、すぐに使用可能です。',
// //     },
// //     note: {
// //       en: 'Feel free to contact, but only serious buyers. Time-wasters, please avoid.',
// //       ja: '購入を検討している方のみご連絡ください。冷やかしはご遠慮ください。',
// //     },
// //     images: [
// //       '/Images/image-2.jpeg',
// //       '/Images/image-3.jpeg',
// //       '/Images/image-4.jpeg',
// //       '/Images/image-5.jpeg',
// //       '/Images/image-6.jpg',
// //       '/Images/image-7.jpg',
// //       '/Images/image-8.jpg',
// //       '/Images/image-9.jpg',
// //       '/Images/image-10.jpg',
// //     ],
// //     specs: {
// //       en: 'Engine: Diesel, Transmission: Manual, Condition: Excellent, Record Book: Available',
// //       ja: 'エンジン: ディーゼル, トランスミッション: マニュアル, 状態: 良好, 記録簿: あり',
// //     },
// //     description: {
// //       en: 'A durable and powerful heavy-duty truck, perfect for logistics and transport. Maintained with proper inspection and ready for work.',
// //       ja: '物流や輸送に最適な耐久性とパワーを備えた大型トラック。適切な点検を受け、すぐに使用可能です。',
// //     },
// //   },
// // ];

// // export default function CarDetail() {
// //   const { t, i18n } = useTranslation();
// //   const { lng, id } = useParams();
// //   const [currentImage, setCurrentImage] = useState(0);

// //   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

// //   useEffect(() => {
// //     if (lng && ['en', 'ja'].includes(lng)) {
// //       i18n.changeLanguage(lng);
// //     } else {
// //       i18n.changeLanguage('ja');
// //     }
// //   }, [lng, i18n]);

// //   const car = allCars.find(c => c.id === parseInt(id));

// //   if (!car) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <p className="text-gray-600">{t('no_car_found', { defaultValue: 'Car not found' })}</p>
// //       </div>
// //     );
// //   }

// //   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

// //   // Image slider handlers
// //   const nextImage = () => {
// //     setCurrentImage((prev) => (prev + 1) % car.images.length);
// //   };
// //   const prevImage = () => {
// //     setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Helmet>
// //         <html lang={currentLanguage} />
// //         <title>{car.title[currentLanguage]}</title>
// //       </Helmet>

// //       {/* HERO SECTION with SLIDER */}
// //       <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
// //         <div className="container mx-auto px-6 lg:px-8">
// //           <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
// //             ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
// //           </Link>

// //           <div className="grid md:grid-cols-2 gap-8 items-center">
// //             {/* IMAGE SLIDER */}
// //             <div className="relative">
// //               <img
// //                 src={car.images[currentImage]}
// //                 alt={car.title[currentLanguage]}
// //                 className="w-full h-96 object-cover rounded-xl shadow-lg transition-all duration-500"
// //               />
// //               <button
// //                 onClick={prevImage}
// //                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
// //               >
// //                 ‹
// //               </button>
// //               <button
// //                 onClick={nextImage}
// //                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
// //               >
// //                 ›
// //               </button>
// //               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
// //                 {car.images.map((_, index) => (
// //                   <span
// //                     key={index}
// //                     className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
// //                   ></span>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* DETAILS */}
// //             <div>
// //               <h1 className="text-4xl font-bold mb-3">{car.title[currentLanguage]}</h1>
// //               <p className="text-2xl font-semibold text-green-200 mb-3">{car.price}</p>
// //               <p className="text-lg mb-1">📍 {car.location[currentLanguage]}</p>
// //               <p className="text-lg mb-1">🚘 {car.mileage[currentLanguage]}</p>
// //               <p className="text-lg mb-1">🗓️ {car.year[currentLanguage]}</p>
// //               <p className="text-lg mb-1">⚙️ {car.transmission[currentLanguage]}</p>
// //               <p className="text-lg mb-1">✅ Shaken: {car.shaken[currentLanguage]}</p>
// //               <p className="text-lg mb-1">📘 Kittsu: {car.kittsu[currentLanguage]}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* DESCRIPTION & SPECS */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
// //           <div>
// //             <h2 className="text-2xl font-bold mb-3">
// //               {t('car_description', { defaultValue: 'Description' })}
// //             </h2>
// //             <p className="text-gray-700 leading-relaxed">
// //               {car.description[currentLanguage]}
// //             </p>
// //           </div>
// //           <div>
// //             <h2 className="text-2xl font-bold mb-3">
// //               {t('car_specs', { defaultValue: 'Specifications' })}
// //             </h2>
// //             <ul className="text-gray-700 space-y-2">
// //               <li>• {car.specs[currentLanguage]}</li>
// //               <li>• {car.condition[currentLanguage]}</li>
// //               <li>• {car.note[currentLanguage]}</li>
// //             </ul>
// //           </div>
// //         </div>

// //         {/* 📞 CALL OWNER SECTION */}
// //         <div className="mt-12 text-center">
// //           <h3 className="text-2xl font-bold text-gray-800 mb-2">📞 Contact Us</h3>
// //           <p className="text-lg text-gray-700 mb-3">+81 90-4616-2378</p>
// //           <a
// //             href="tel:+819012345678"
// //             className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
// //           >
// //             <span role="img" aria-label="phone">📱</span> Call Now
// //           </a>
// //         </div>
// //       </section>

// //       {/* CTA SECTION */}
// //       <section className="py-16 bg-gray-100 text-center">
// //         <h2 className="text-3xl font-bold text-gray-800 mb-4">
// //           {t('purchase_title', { defaultValue: 'Ready to Purchase?' })}
// //         </h2>
// //         <p className="text-gray-600 max-w-lg mx-auto mb-6">
// //           {t('purchase_desc', {
// //             defaultValue: 'Contact us for inspection, shipping, and documentation.',
// //           })}
// //         </p>
// //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //           <a
// //             href="https://wa.me/1234567890"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
// //           >
// //             {t('contact_whatsapp', { defaultValue: 'Contact via WhatsApp' })}
// //           </a>
// //           <Link
// //             to={getLink('/contact')}
// //             className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
// //           >
// //             {t('contact_form', { defaultValue: 'Send Inquiry' })}
// //           </Link>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

























// // // // src/pages/CarDetail.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import { useParams, Link } from 'react-router-dom';
// // // import { useTranslation } from 'react-i18next';
// // // import { Helmet } from 'react-helmet';

// // // const allCars = [
// // //   {
// // //     id: 1,
// // //     title: { en: 'Hino Profia Truck', ja: '日野プロフィア トラック' },
// // //     price: '¥2,100,000 (210万)',
// // //     year: { en: '2016', ja: '平成28年' },
// // //     mileage: { en: '1,311,547 km', ja: '1,311,547 km' },
// // //     location: { en: 'Osaka, Japan', ja: '大阪、日本' },
// // //     transmission: { en: 'Manual', ja: 'マニュアル' },
// // //     shaken: { en: 'Valid (check document)', ja: '有効（書類を確認）' },
// // //     kittsu: { en: 'Available', ja: '記録簿あり' },
// // //     condition: {
// // //       en: 'Very clean condition, no major issues, ready to use.',
// // //       ja: 'とてもきれいな状態で、大きな問題はなく、すぐに使用可能です。',
// // //     },
// // //     note: {
// // //       en: 'Feel free to contact, but only serious buyers. Time-wasters, please avoid.',
// // //       ja: '購入を検討している方のみご連絡ください。冷やかしはご遠慮ください。',
// // //     },
// // //     images: [
// // //       '/Images/image-2.jpeg',
// // //       '/Images/image-3.jpeg',
// // //       '/Images/image-4.jpeg',
// // //       '/Images/image-5.jpeg',
// // //       '/Images/image-6.jpg',
// // //       '/Images/image-7.jpg',
// // //       '/Images/image-8.jpg',
// // //       '/Images/image-9.jpg',
// // //       '/Images/image-10.jpg',
// // //     ],
// // //     specs: {
// // //       en: 'Engine: Diesel, Transmission: Manual, Condition: Excellent, Record Book: Available',
// // //       ja: 'エンジン: ディーゼル, トランスミッション: マニュアル, 状態: 良好, 記録簿: あり',
// // //     },
// // //     description: {
// // //       en: 'A durable and powerful heavy-duty truck, perfect for logistics and transport. Maintained with proper inspection and ready for work.',
// // //       ja: '物流や輸送に最適な耐久性とパワーを備えた大型トラック。適切な点検を受け、すぐに使用可能です。',
// // //     },
// // //   },
// // // ];

// // // export default function CarDetail() {
// // //   const { t, i18n } = useTranslation();
// // //   const { lng, id } = useParams();
// // //   const [currentImage, setCurrentImage] = useState(0);

// // //   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

// // //   useEffect(() => {
// // //     if (lng && ['en', 'ja'].includes(lng)) {
// // //       i18n.changeLanguage(lng);
// // //     } else {
// // //       i18n.changeLanguage('ja');
// // //     }
// // //   }, [lng, i18n]);

// // //   const car = allCars.find(c => c.id === parseInt(id));

// // //   if (!car) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <p className="text-gray-600">{t('no_car_found', { defaultValue: 'Car not found' })}</p>
// // //       </div>
// // //     );
// // //   }

// // //   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

// // //   // Image slider handlers
// // //   const nextImage = () => {
// // //     setCurrentImage((prev) => (prev + 1) % car.images.length);
// // //   };
// // //   const prevImage = () => {
// // //     setCurrentImage((prev) => (prev - 1 + car.images.length) % car.images.length);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <Helmet>
// // //         <html lang={currentLanguage} />
// // //         <title>{car.title[currentLanguage]}</title>
// // //       </Helmet>

// // //       {/* HERO SECTION with SLIDER */}
// // //       <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
// // //         <div className="container mx-auto px-6 lg:px-8">
// // //           <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
// // //             ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
// // //           </Link>

// // //           <div className="grid md:grid-cols-2 gap-8 items-center">
// // //             {/* IMAGE SLIDER */}
// // //             <div className="relative">
// // //               <img
// // //                 src={car.images[currentImage]}
// // //                 alt={car.title[currentLanguage]}
// // //                 className="w-full h-96 object-cover rounded-xl shadow-lg transition-all duration-500"
// // //               />
// // //               <button
// // //                 onClick={prevImage}
// // //                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
// // //               >
// // //                 ‹
// // //               </button>
// // //               <button
// // //                 onClick={nextImage}
// // //                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
// // //               >
// // //                 ›
// // //               </button>
// // //               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
// // //                 {car.images.map((_, index) => (
// // //                   <span
// // //                     key={index}
// // //                     className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
// // //                   ></span>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* DETAILS */}
// // //             <div>
// // //               <h1 className="text-4xl font-bold mb-3">{car.title[currentLanguage]}</h1>
// // //               <p className="text-2xl font-semibold text-green-200 mb-3">{car.price}</p>
// // //               <p className="text-lg mb-1">📍 {car.location[currentLanguage]}</p>
// // //               <p className="text-lg mb-1">🚘 {car.mileage[currentLanguage]}</p>
// // //               <p className="text-lg mb-1">🗓️ {car.year[currentLanguage]}</p>
// // //               <p className="text-lg mb-1">⚙️ {car.transmission[currentLanguage]}</p>
// // //               <p className="text-lg mb-1">✅ Shaken: {car.shaken[currentLanguage]}</p>
// // //               <p className="text-lg mb-1">📘 Kittsu: {car.kittsu[currentLanguage]}</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* DESCRIPTION & SPECS */}
// // //       <section className="py-16">
// // //         <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
// // //           <div>
// // //             <h2 className="text-2xl font-bold mb-3">{t('car_description', { defaultValue: 'Description' })}</h2>
// // //             <p className="text-gray-700 leading-relaxed">
// // //               {car.description[currentLanguage]}
// // //             </p>
// // //           </div>
// // //           <div>
// // //             <h2 className="text-2xl font-bold mb-3">{t('car_specs', { defaultValue: 'Specifications' })}</h2>
// // //             <ul className="text-gray-700 space-y-2">
// // //               <li>• {car.specs[currentLanguage]}</li>
// // //               <li>• {car.condition[currentLanguage]}</li>
// // //               <li>• {car.note[currentLanguage]}</li>
// // //             </ul>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* CTA SECTION */}
// // //       <section className="py-16 bg-gray-100 text-center">
// // //         <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('purchase_title', { defaultValue: 'Ready to Purchase?' })}</h2>
// // //         <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('purchase_desc', { defaultValue: 'Contact us for inspection, shipping, and documentation.' })}</p>
// // //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //           <a
// // //             href="https://wa.me/1234567890"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
// // //           >
// // //             {t('contact_whatsapp', { defaultValue: 'Contact via WhatsApp' })}
// // //           </a>
// // //           <Link
// // //             to={getLink('/contact')}
// // //             className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
// // //           >
// // //             {t('contact_form', { defaultValue: 'Send Inquiry' })}
// // //           </Link>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }























// // // // src/pages/CarDetail.jsx
// // // import React, { useEffect } from 'react';
// // // import { useParams, Link } from 'react-router-dom';
// // // import { useTranslation } from 'react-i18next';
// // // import { Helmet } from 'react-helmet';

// // // const allCars = [
// // //   {
// // //     id: 1,
// // //     title: { en: 'Toyota Corolla', ja: 'トヨタ カローラ' },
// // //     price: 3500000,
// // //     year: 2018,
// // //     mileage: { en: '80,000 km', ja: '80,000 km' },
// // //     img: '/Images/Corolla.jpg',
// // //     description: { en: 'A comfortable and reliable sedan perfect for daily commutes. Fuel-efficient and spacious interior.', ja: '毎日の通勤に最適な快適で信頼性の高いセダン。燃費が良く、広々としたインテリア。' },
// // //     specs: { en: 'Engine: 1.8L, Transmission: Automatic, Fuel: Petrol', ja: 'エンジン: 1.8L, トランスミッション: 自動, 燃料: ガソリン' },
// // //   },
// // //   {
// // //     id: 2,
// // //     title: { en: 'Nissan Skyline', ja: '日産スカイライン' },
// // //     price: 7200000,
// // //     year: 2016,
// // //     mileage: { en: '60,000 km', ja: '60,000 km' },
// // //     img: '/Images/Nissan.jpg',
// // //     description: { en: 'Sporty and powerful coupe with excellent handling. Ideal for performance enthusiasts.', ja: '優れたハンドリングのスポーティでパワフルなクーペ。パフォーマンス愛好家に最適。' },
// // //     specs: { en: 'Engine: 3.0L Twin Turbo, Transmission: Manual, Fuel: Petrol', ja: 'エンジン: 3.0Lツインターボ, トランスミッション: マニュアル, 燃料: ガソリン' },
// // //   },
// // //   {
// // //     id: 3,
// // //     title: { en: 'Honda Civic', ja: 'ホンダ シビック' },
// // //     price: 4200000,
// // //     year: 2019,
// // //     mileage: { en: '45,000 km', ja: '45,000 km' },
// // //     img: '/Images/Civic.avif',
// // //     description: { en: 'Efficient city car with modern features and great fuel economy.', ja: '現代的な機能と優れた燃費を備えた効率的なシティカー。' },
// // //     specs: { en: 'Engine: 1.5L Turbo, Transmission: CVT, Fuel: Petrol', ja: 'エンジン: 1.5Lターボ, トランスミッション: CVT, 燃料: ガソリン' },
// // //   },
// // //   {
// // //     id: 4,
// // //     title: { en: 'Suzuki Swift', ja: 'スズキ スイフト' },  // Corrected ja title
// // //     price: 2500000,
// // //     year: 2020,
// // //     mileage: { en: '30,000 km', ja: '30,000 km' },  // Matched en
// // //     img: '/Images/Swift.avif',
// // //     description: { en: 'Compact hatchback with agile handling and low running costs. Perfect for urban driving.', ja: '機敏なハンドリングと低ランニングコストのコンパクトハッチバック。都市部運転に最適。' },  // Customized for Suzuki
// // //     specs: { en: 'Engine: 1.2L, Transmission: Manual, Fuel: Petrol', ja: 'エンジン: 1.2L, トランスミッション: マニュアル, 燃料: ガソリン' },
// // //   },
// // //   {
// // //     id: 5,
// // //     title: { en: 'Mazda Demio', ja: 'マツダ デミオ' },  // Corrected ja title
// // //     price: 2100000,
// // //     year: 2017,
// // //     mileage: { en: '92,000 km', ja: '92,000 km' },  // Corrected to match en
// // //     img: '/Images/Mazda.jpg',
// // //     description: { en: 'Stylish subcompact with premium feel and efficient engine. Great for city use.', ja: 'プレミアム感のあるスタイリッシュなサブコンパクト。効率的なエンジンで都市部に最適。' },  // Customized for Mazda
// // //     specs: { en: 'Engine: 1.3L, Transmission: Automatic, Fuel: Petrol', ja: 'エンジン: 1.3L, トランスミッション: 自動, 燃料: ガソリン' },
// // //   },
// // // ];

// // // export default function CarDetail() {
// // //   const { t, i18n } = useTranslation();
// // //   const { lng, id } = useParams();  // Extract lng and id from URL

// // //   // Normalize language
// // //   const currentLanguage = i18n.language.startsWith('ja') ? 'ja' : 'en';

// // //   // Language set from URL
// // //   useEffect(() => {
// // //     if (lng && ['en', 'ja'].includes(lng)) {
// // //       i18n.changeLanguage(lng);
// // //     } else {
// // //       i18n.changeLanguage('ja');
// // //     }
// // //   }, [lng, i18n]);

// // //   // Find car by ID
// // //   const car = allCars.find(c => c.id === parseInt(id));

// // //   if (!car) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <p className="text-gray-600">{t('no_car_found', { defaultValue: 'Car not found' })}</p>
// // //       </div>
// // //     );
// // //   }

// // //   // Helper for links
// // //   const getLink = (path) => `/${currentLanguage}${path === '/' ? '' : path}`;

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <Helmet>
// // //         <html lang={currentLanguage} />
// // //         <title>{car.title[currentLanguage] || car.title.en}</title>
// // //       </Helmet>
// // //       {/* Hero Image & Basic Info */}
// // //       <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
// // //         <div className="container mx-auto px-6 lg:px-8">
// // //           <Link to={getLink('/cars')} className="inline-block mb-4 text-sm hover:underline">
// // //             ← {t('back_to_cars', { defaultValue: 'Back to Cars' })}
// // //           </Link>
// // //           <div className="grid md:grid-cols-2 gap-8 items-center">
// // //             <img
// // //               src={car.img}
// // //               alt={car.title[currentLanguage] || car.title.en}
// // //               className="w-full h-96 object-cover rounded-xl shadow-lg"
// // //             />
// // //             <div>
// // //               <h1 className="text-4xl font-bold mb-4">{car.title[currentLanguage] || car.title.en}</h1>
// // //               <p className="text-3xl font-bold text-green-200 mb-4">
// // //                 {t('car_price', { price: car.price.toLocaleString() })}
// // //               </p>
// // //               <p className="text-lg mb-2">{t('car_year', { year: car.year })}</p>
// // //               <p className="text-lg">{car.mileage[currentLanguage] || car.mileage.en}</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Description & Specs */}
// // //       <section className="py-16">
// // //         <div className="container mx-auto px-6 lg:px-8">
// // //           <div className="grid md:grid-cols-2 gap-8">
// // //             <div>
// // //               <h2 className="text-2xl font-bold mb-4">{t('car_description', { defaultValue: 'Description' })}</h2>
// // //               <p className="text-gray-600 leading-relaxed">
// // //                 {car.description[currentLanguage] || car.description.en}
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <h2 className="text-2xl font-bold mb-4">{t('car_specs', { defaultValue: 'Specifications' })}</h2>
// // //               <ul className="space-y-2 text-gray-600">
// // //                 <li>• {car.specs[currentLanguage] || car.specs.en}</li>
// // //                 {/* Add more specs as needed */}
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* CTA Section */}
// // //       <section className="py-16 bg-gray-100 text-center">
// // //         <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('purchase_title', { defaultValue: 'Ready to Purchase?' })}</h2>
// // //         <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('purchase_desc', { defaultValue: 'Contact us for inspection, shipping, and documentation.' })}</p>
// // //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //           <a
// // //             href="https://wa.me/1234567890"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
// // //           >
// // //             {t('contact_whatsapp', { defaultValue: 'Contact via WhatsApp' })}
// // //           </a>
// // //           <Link
// // //             to={getLink('/contact')}
// // //             className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition"
// // //           >
// // //             {t('contact_form', { defaultValue: 'Send Inquiry' })}
// // //           </Link>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }
