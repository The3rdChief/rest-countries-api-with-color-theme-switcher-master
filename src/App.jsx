import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesSection from "./components/CountriesSection";
import CountryPage from "./components/CountryPage";

function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const systemTheme = prefersDark.matches ? "dark" : "lite";
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme || systemTheme;

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  const updateTheme = () => {
    setTheme(theme === "lite" ? "dark" : "lite");
  };

  return (
    <>
      <div className="min-h-dvh bg-mainBg text-primary font-nunito transition-colors duration-200 [&_*]:transition-colors [&_*]:duration-200">
        <BrowserRouter>
          <Header theme={theme} updater={updateTheme} />
          <Routes>
            <Route exact path="/" element={<CountriesSection />} />
            <Route path="/countries/:name" element={<CountryPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

const Header = ({ theme, updater }) => {
  return (
    <header className="w-full bg-elements z-20 px-4 py-6 sm:px-8 flex items-center justify-between shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold">Where in the world?</h1>
      {/* toggle button */}
      <button
        onClick={() => {
          updater();
        }}
        className="[&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div>ion-icon]:text-2xl [&>div>ion-icon]:sm:text-xl [&>div>span]:hidden [&>div>span]:sm:inline-block"
      >
        {theme === "lite" ? (
          <div>
            <ion-icon name="moon-outline"></ion-icon> <span>Dark Mode</span>
          </div>
        ) : (
          <div>
            <ion-icon name="sunny"></ion-icon>
            <span>Light Mode</span>
          </div>
        )}
      </button>
    </header>
  );
};

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  updater: PropTypes.func.isRequired,
};

export default App;
