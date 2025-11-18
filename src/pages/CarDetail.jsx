import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import detailData from "../data/detailData";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";


export default function CarDetail() {
  const { t, i18n } = useTranslation();
  const { lng, id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";


    useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (lng && ["en", "ja"].includes(lng)) i18n.changeLanguage(lng);
    else i18n.changeLanguage("ja");
  }, [lng, i18n]);

  const car = detailData.find((c) => c.id === parseInt(id));
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
                  className="w-full h-100 object-contain rounded-xl shadow-lg transition-all duration-500"
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
              <li>{car.specs?.[currentLanguage]}</li>
              <li>{car.description?.[currentLanguage]}</li>
              <li>{car.note?.[currentLanguage]}</li>
            </ul>
          </div>
        </div>

                {/* Contact */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">📞 Contact Us</h3>
          <p className="text-lg text-gray-700 mb-3">+81 90-4616-2378</p>
          <a
            href="tel:+819046162378"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            📱 Call Now
          </a>
        </div>



      </section>
    </div>
  );
}



