import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import carsData from "../data/carsData";

export default function Cars() {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");

  // Normalize language
  const currentLanguage = i18n.language.startsWith("ja") ? "ja" : "en";

  // URL se language set karo
  useEffect(() => {
    if (lng && ["en", "ja"].includes(lng)) {
      i18n.changeLanguage(lng);
    } else {
      i18n.changeLanguage("ja"); // Default to Japanese
    }
  }, [lng, i18n]);

  // Helper for links
  const getLink = (path) => `/${currentLanguage}${path === "/" ? "" : path}`;

  // Filter + Sort
  const filtered = carsData
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
            {/* Search */}
            <input
              type="text"
              placeholder={t("search_car_placeholder", {
                defaultValue: "Search vehicles...",
              })}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
            />

            {/* Sorting */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
            >
              <option value="latest">
                {t("sort_latest", { defaultValue: "Latest" })}
              </option>
              <option value="price-low">
                {t("sort_price_low", { defaultValue: "Price: Low to High" })}
              </option>
              <option value="price-high">
                {t("sort_price_high", { defaultValue: "Price: High to Low" })}
              </option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition duration-200 relative"
              >
                {/* Image wrapper */}
                <div className="relative">
                  <img
                    src={car.img}
                    alt={car.title[currentLanguage] || car.title.en}
                    className={`w-full h-80 object-cover rounded-t-xl transition duration-300 ${car.status === "sold" ? "grayscale opacity-70" : ""
                      }`}
                  />


                  {/* SOLD badge */}
                  {car.status === "sold" && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white Medium font-bold px-6 py-2 rounded-full shadow-lg tracking-wide">
                      SOLD
                    </span>
                  )}
                </div>

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

                  {/* View / Sold Out Button */}
                  {car.status === "sold" ? (
                    <button
                      disabled
                      className="inline-block mt-3 px-3 py-2 bg-gray-400 text-white rounded cursor-not-allowed text-sm"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <Link
                      to={getLink(`/cars/${car.id}`)}
                      className="inline-block mt-3 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      {t("view_details", { defaultValue: "View Details" })}
                    </Link>
                  )}
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
