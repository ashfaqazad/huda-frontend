import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import i18n from './i18n';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

// Language Preserver Component
const LanguagePreserver = ({ children }) => {
  const location = useLocation();
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lng = pathSegments[1];

    if (!initialized) {
      if (lng && ['ja', 'en'].includes(lng)) {
        i18n.changeLanguage(lng); // URL ke hisaab se language
        setInitialized(true);
      } else {
        i18n.changeLanguage('ja'); // Default Japanese
        window.history.replaceState({}, document.title, '/ja' + location.pathname);
        setInitialized(true);
      }
    }
  }, [location, initialized]);

  return children;
};

export default function App() {
  return (
    <Router>
      <LanguagePreserver>
        <div>
          <Navbar />
          <Routes>
            {/* Pages with language param */}
            <Route path="/:lng" element={<Home />} />
            <Route path="/:lng/cars" element={<Cars />} />
            <Route path="/:lng/cars/:id" element={<CarDetail />} />
            <Route path="/:lng/about" element={<About />} />
            <Route path="/:lng/contact" element={<Contact />} />

            {/* Fallback for root */}
            <Route path="/" element={<Navigate to="/ja" replace />} />

            {/* Catch-all invalid routes */}
            <Route path="*" element={<Navigate to="/ja" replace />} />
          </Routes>
          <Footer />
        </div>
      </LanguagePreserver>
    </Router>
  );
}
























// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Cars from './pages/Cars';
// import CarDetail from './pages/CarDetail';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Footer from './components/Footer';
// import i18n from './i18n';

// // Language Preserver Component to handle initial load
// // const LanguagePreserver = ({ children }) => {
// //   const location = useLocation();
// //   const [initialized, setInitialized] = React.useState(false);

// //   React.useEffect(() => {
// //     const pathSegments = location.pathname.split('/');
// //     const lng = pathSegments[1];
// //     if (lng && ['ja', 'en'].includes(lng) && !initialized) {
// //       // Only set language if not already initialized
// //       window.history.replaceState({}, document.title, `/${lng}${location.pathname.slice(3)}`);
// //       setInitialized(true);
// //     } else if (!initialized) {
// //       window.history.replaceState({}, document.title, '/en' + location.pathname);
// //       setInitialized(true);
// //     }
// //   }, [location, initialized]);

// //   return children;
// // };


// const LanguagePreserver = ({ children }) => {
//   const location = useLocation();
//   const [initialized, setInitialized] = React.useState(false);

//   React.useEffect(() => {
//     const pathSegments = location.pathname.split('/');
//     const lng = pathSegments[1];

//     if (!initialized) {
//       if (lng && ['ja', 'en'].includes(lng)) {
//         i18n.changeLanguage(lng); // 🔹 Set i18n language from route
//         setInitialized(true);
//       } else {
//         i18n.changeLanguage('ja'); // 🔹 Default Japanese
//         window.history.replaceState({}, document.title, '/ja' + location.pathname);
//         setInitialized(true);
//       }
//     }
//   }, [location, initialized]);

//   return children;
// };


// export default function App() {
//   return (
//     <Router>
//       <LanguagePreserver>
//         <div>
//           <Navbar />
//           <Routes>
//             {/* Default Home with language param */}
//             <Route path="/:lng" element={<Home />} />
//             {/* Other pages with language param */}
//             <Route path="/:lng/cars" element={<Cars />} />
//             <Route path="/:lng/cars/:id" element={<CarDetail />} />
//             <Route path="/:lng/about" element={<About />} />
//             <Route path="/:lng/contact" element={<Contact />} />
//             {/* Fallback for root to preserve current language or default to /en */}
//             <Route path="/" element={<Navigate to="/en" replace />} />
//             {/* Fallback for non-language routes to preserve current language */}
//             <Route path="/cars" element={<Navigate to="/:lng/cars" replace />} />
//             <Route path="/cars/:id" element={<Navigate to="/:lng/cars/:id" replace />} />
//             <Route path="/about" element={<Navigate to="/:lng/about" replace />} />
//             <Route path="/contact" element={<Navigate to="/:lng/contact" replace />} />
//             {/* Catch-all for invalid routes */}
//             <Route path="*" element={<Navigate to="/en" replace />} />
//           </Routes>
//           <Footer />
//         </div>
//       </LanguagePreserver>
//     </Router>
//   );
// }




















// // // src/App.jsx
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Cars from './pages/Cars';
// // import CarDetail from './pages/CarDetail';  // New import for CarDetail
// // import Navbar from './components/Navbar';
// // import Home from './pages/Home';
// // import About from './pages/About';
// // import Contact from './pages/Contact';
// // import Footer from './components/Footer';

// // export default function App() {
// //   return (
// //     <Router>
// //       <div>
// //         <Navbar />
// //         <Routes>
// //           {/* Default Home with language param */}
// //           <Route path="/:lng" element={<Home />} />
// //           {/* Other pages with language param */}
// //           <Route path="/:lng/cars" element={<Cars />} />
// //           <Route path="/:lng/cars/:id" element={<CarDetail />} />  {/* Updated to CarDetail for individual car details */}
// //           <Route path="/:lng/about" element={<About />} />
// //           <Route path="/:lng/contact" element={<Contact />} />
// //           {/* Fallback for root to Japanese */}
// //           <Route path="/" element={<Navigate to="/ja" replace />} />
// //           {/* Fallback for non-language routes to Japanese */}
// //           <Route path="/cars" element={<Navigate to="/ja/cars" replace />} />
// //           <Route path="/cars/:id" element={<Navigate to="/ja/cars/:id" replace />} />  {/* Updated fallback to include :id */}
// //           <Route path="/about" element={<Navigate to="/ja/about" replace />} />
// //           <Route path="/contact" element={<Navigate to="/ja/contact" replace />} />
// //           {/* Catch-all for invalid routes */}
// //           <Route path="*" element={<Navigate to="/ja" replace />} />
// //         </Routes>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

















// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import Cars from './pages/Cars';
// // // import Navbar from './components/Navbar';
// // // import Home from './pages/Home';
// // // import About from './pages/About';
// // // import Contact from './pages/Contact';
// // // import Footer from './components/Footer';

// // // export default function App() {
// // //   return (
// // //     <Router>
// // //       <div>
// // //         <Navbar />
// // //         <Routes>
// // //           {/* Default Home with language param */}
// // //           <Route path="/:lng" element={<Home />} />
// // //           {/* Other pages with language param */}
// // //           <Route path="/:lng/cars" element={<Cars />} />
// // //           <Route path="/:lng/about" element={<About />} />
// // //           <Route path="/:lng/contact" element={<Contact />} />
// // //           {/* Fallback for root to Japanese */}
// // //           <Route path="/" element={<Navigate to="/ja" replace />} />
// // //           {/* Fallback for non-language routes to Japanese */}
// // //           <Route path="/cars" element={<Navigate to="/ja/cars" replace />} />
// // //           <Route path="/about" element={<Navigate to="/ja/about" replace />} />
// // //           <Route path="/contact" element={<Navigate to="/ja/contact" replace />} />
// // //           {/* Catch-all for invalid routes */}
// // //           <Route path="*" element={<Navigate to="/ja" replace />} />
// // //         </Routes>
// // //         <Footer />
// // //       </div>
// // //     </Router>
// // //   );
// // // }



















// // // // // src/App.js
// // // // import React from 'react';
// // // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // // import Cars from './pages/Cars';
// // // // import Navbar from './components/Navbar';
// // // // import Home from './pages/Home';
// // // // import About from './pages/About';
// // // // import Contact from './pages/Contact';
// // // // import Footer from './components/Footer';

// // // // export default function App() {
// // // //   return (
// // // //     <Router>
// // // //       <div>
// // // //         <Navbar />
// // // //         <Routes>
// // // //           {/* Default Home with language param */}
// // // //           <Route path="/:lng" element={<Home />} />
// // // //           {/* Other pages with language param */}
// // // //           <Route path="/:lng/cars" element={<Cars />} />
// // // //           <Route path="/:lng/about" element={<About />} />
// // // //           <Route path="/:lng/contact" element={<Contact />} />
// // // //           {/* Fallback root to Japanese Home */}
// // // //           <Route path="/" element={<Home />} />
// // // //           {/* Optional: Direct paths without lang fallback to Japanese */}
// // // //           <Route path="/cars" element={<Home />} />  {/* Redirect to /ja/cars later if needed */}
// // // //           <Route path="/about" element={<Home />} />
// // // //           <Route path="/contact" element={<Home />} />
// // // //         </Routes>
// // // //         <Footer />
// // // //       </div>
// // // //     </Router>
// // // //   );
// // // // }














// // // // // import React from 'react';
// // // // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // // // import Cars from './pages/Cars';
// // // // // import Navbar from './components/Navbar';
// // // // // import Home from './pages/Home';
// // // // // import About from './pages/About';
// // // // // import Contact from './pages/Contact';
// // // // // import Footer from './components/Footer';

// // // // // export default function App() {
// // // // //   return (
// // // // //     <Router>
// // // // //       <div>
// // // // //         <Navbar />
// // // // //         <Routes>
// // // // //           <Route path="/:lng" element={<Home />} />
// // // // //           <Route path="/" element={<Home />} />
// // // // //           <Route path="/cars" element={<Cars />} />
// // // // //           <Route path="/about" element={<About />} />
// // // // //           <Route path="/contact" element={<Contact />} />
// // // // //         </Routes>
// // // // //         <Footer />
// // // // //       </div>
// // // // //     </Router>
// // // // //   );
// // // // // }



















// // // // // // // src/App.js
// // // // // // import React from 'react';
// // // // // // import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// // // // // // import { useTranslation } from 'react-i18next';
// // // // // // import Cars from './pages/Cars';
// // // // // // import Navbar from './components/Navbar';
// // // // // // import Home from './pages/Home';
// // // // // // import About from './pages/About';
// // // // // // import Contact from './pages/Contact';
// // // // // // import Footer from './components/Footer';

// // // // // // function AppContent() {
// // // // // //   const { t, i18n } = useTranslation();
// // // // // //   const navigate = useNavigate();

// // // // // //   const changeLanguage = (lng) => {
// // // // // //     i18n.changeLanguage(lng);
// // // // // //     navigate(`/${lng}`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       {/* Language Switcher */}
// // // // // //       <div className="fixed top-4 right-4 z-50">
// // // // // //         <button
// // // // // //           onClick={() => changeLanguage('en')}
// // // // // //           className="px-3 py-1 bg-gray-200 text-gray-800 rounded mr-2"
// // // // // //         >
// // // // // //           English
// // // // // //         </button>
// // // // // //         <button
// // // // // //           onClick={() => changeLanguage('ja')}
// // // // // //           className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
// // // // // //         >
// // // // // //           日本語
// // // // // //         </button>
// // // // // //       </div>
// // // // // //       {/* Navbar, Routes, aur Footer */}
// // // // // //       <Navbar />
// // // // // //       <Routes>
// // // // // //         <Route path="/:lng" element={<Home />} />
// // // // // //         <Route path="/" element={<Home />} />
// // // // // //         <Route path="/cars" element={<Cars />} />
// // // // // //         <Route path="/about" element={<About />} />
// // // // // //         <Route path="/contact" element={<Contact />} />
// // // // // //       </Routes>
// // // // // //       <Footer />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // function App() {
// // // // // //   return (
// // // // // //     <Router>
// // // // // //       <AppContent />
// // // // // //     </Router>
// // // // // //   );
// // // // // // }

// // // // // // export default App;


















// // // // // // // // src/App.js
// // // // // // // import React from 'react';
// // // // // // // import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// // // // // // // import { useTranslation } from 'react-i18next';
// // // // // // // import Cars from './pages/Cars';
// // // // // // // import Navbar from './components/Navbar';
// // // // // // // import Home from './pages/Home';
// // // // // // // import About from './pages/About';
// // // // // // // import Contact from './pages/Contact';
// // // // // // // import Footer from './components/Footer';

// // // // // // // function AppContent() {
// // // // // // //   const { t, i18n } = useTranslation();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const changeLanguage = (lng) => {
// // // // // // //     i18n.changeLanguage(lng);
// // // // // // //     navigate(`/${lng}`); // URL mein language add kar
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       {/* Language Switcher */}
// // // // // // //       <div className="fixed top-4 right-4 z-50">
// // // // // // //         <button
// // // // // // //           onClick={() => changeLanguage('en')}
// // // // // // //           className="px-3 py-1 bg-gray-200 text-gray-800 rounded mr-2"
// // // // // // //         >
// // // // // // //           English
// // // // // // //         </button>
// // // // // // //         <button
// // // // // // //           onClick={() => changeLanguage('ja')}
// // // // // // //           className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
// // // // // // //         >
// // // // // // //           日本語
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //       {/* Navbar, Routes, aur Footer */}
// // // // // // //       <Navbar />
// // // // // // //       <Routes>
// // // // // // //         <Route path="/:lng" element={<Home />} />
// // // // // // //         <Route path="/" element={<Home />} />
// // // // // // //         <Route path="/cars" element={<Cars />} />
// // // // // // //         <Route path="/about" element={<About />} />
// // // // // // //         <Route path="/contact" element={<Contact />} />
// // // // // // //       </Routes>
// // // // // // //       <Footer />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // function App() {
// // // // // // //   return (
// // // // // // //     <Router>
// // // // // // //       <AppContent />
// // // // // // //     </Router>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default App;





















// // // // // // // // // src/App.js
// // // // // // // // import React from 'react';
// // // // // // // // import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// // // // // // // // import { useTranslation } from 'react-i18next';
// // // // // // // // import Cars from "./pages/Cars";
// // // // // // // // import Navbar from "./components/Navbar";
// // // // // // // // // import CarList from "./components/CarList";
// // // // // // // // import Home from "./pages/Home"; // Add this
// // // // // // // // import About from "./pages/About";
// // // // // // // // import Contact from "./pages/Contact";
// // // // // // // // import Footer from "./components/Footer";





// // // // // // // // function AppContent() {
// // // // // // // //   const { t, i18n } = useTranslation();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const changeLanguage = (lng) => {
// // // // // // // //     i18n.changeLanguage(lng);
// // // // // // // //     navigate(`/${lng}`); // URL mein language add kar
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       {/* Language Switcher */}
// // // // // // // //       <div className="fixed top-4 right-4 z-50">
// // // // // // // //         <button
// // // // // // // //           onClick={() => changeLanguage('en')}
// // // // // // // //           className="px-3 py-1 bg-gray-200 text-gray-800 rounded mr-2"
// // // // // // // //         >
// // // // // // // //           English
// // // // // // // //         </button>
// // // // // // // //         <button
// // // // // // // //           onClick={() => changeLanguage('ja')}
// // // // // // // //           className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
// // // // // // // //         >
// // // // // // // //           日本語
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //       {/* Routes */}
// // // // // // // //       {/* <Routes>
// // // // // // // //         <Route path="/:lng" element={<Home />} />
// // // // // // // //         <Route path="/" element={<Home />} />
// // // // // // // //       </Routes> */}



// // // // // // // //       <Router>
// // // // // // // //         <Navbar />
// // // // // // // //          <Routes>
// // // // // // // //           <Route path="/:lng" element={<Home />} />
// // // // // // // //            <Route path="/" element={<Home />} />
// // // // // // // //           <Route path="/cars" element={<Cars />} />
// // // // // // // //           <Route path="/about" element={<About />} />
// // // // // // // //            <Route path="/contact" element={<Contact />} />
// // // // // // // //            {/* <Route path="/carlist" element={<CarList />} /> */}
// // // // // // // //          </Routes>
// // // // // // // //          <Footer />
// // // // // // // //        </Router>

// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // function App() {
// // // // // // // //   return (
// // // // // // // //     <Router>
// // // // // // // //       <AppContent />
// // // // // // // //     </Router>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default App;























// // // // // // // // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // // // // // // // // import Cars from "./pages/Cars";
// // // // // // // // // import Navbar from "./components/Navbar";
// // // // // // // // // // import CarList from "./components/CarList";
// // // // // // // // // import Home from "./pages/Home"; // Add this
// // // // // // // // // import About from "./pages/About";
// // // // // // // // // import Contact from "./pages/Contact";
// // // // // // // // // import Footer from "./components/Footer";


// // // // // // // // // function App() {
// // // // // // // // //   return (
// // // // // // // // //     <>
// // // // // // // // //       <Router>
// // // // // // // // //     <Navbar />
// // // // // // // // //         <Routes>
// // // // // // // // //           <Route path="/" element={<Home />} />
// // // // // // // // //           <Route path="/cars" element={<Cars />} />
// // // // // // // // //           <Route path="/about" element={<About />} />
// // // // // // // // //           <Route path="/contact" element={<Contact />} />


          
// // // // // // // // //           {/* <Route path="/carlist" element={<CarList />} /> */}

// // // // // // // // //         </Routes>
// // // // // // // // //         <Footer />
// // // // // // // // //       </Router>
// // // // // // // // //     </>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default App;



















// // // // // // // // // // src/App.js
// // // // // // // // // import React from 'react';
// // // // // // // // // import CarList from './components/CarList';
// // // // // // // // // import Cars from './components/Cars';

// // // // // // // // // function App() {
// // // // // // // // //   return (
// // // // // // // // //     <div className="App">
// // // // // // // // //       <h1>🚗 Car Website</h1>
// // // // // // // // //       <CarList />
// // // // // // // // //       <Cars />
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default App;
