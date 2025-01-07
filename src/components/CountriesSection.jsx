/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CountriesSection = () => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectRef = useRef(null);

  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setRegions(new Set(data.map((res) => res.region)));
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleFilter = () => {
    const selectedRegion = selectRef.current.value;

    if (selectedRegion !== "all") {
      setIsFiltered(true);
      setFilteredCountries(
        countries.filter((country) => country.region === selectedRegion)
      );
    } else {
      setIsFiltered(false);
      setCountries(countries);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);

    if (e.target.value !== "") {
      setIsFiltered(true);
      selectRef.current.value = "filter";
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setIsFiltered(false);
      setCountries(countries);
    }
  };

  return (
    <>
      <main className="mx-auto w-11/12 max-w-6xl py-10 space-y-12">
        <header className="flex flex-wrap items-start justify-between gap-x-44 gap-y-8">
          <div className="relative overflow-clip rounded-sm shadow-sm [&>ion-icon]:absolute [&>ion-icon]:top-1/2 [&>ion-icon]:left-4 [&>ion-icon]:-translate-y-1/2">
            <input
              type="text"
              name="search"
              placeholder="Search for a country..."
              value={searchInput}
              onChange={(e) => {
                handleSearch(e);
              }}
              className="placeholder:text-input py-3 pl-10 pr-20 w-full bg-elements text-primary font-nunito"
            />
            <ion-icon name="search-outline"></ion-icon>
          </div>

          {regions && (
            <div className="relative [&>ion-icon]:absolute [&>ion-icon]:top-1/2 [&>ion-icon]:right-3 [&>ion-icon]:-translate-y-1/2">
              <select
                ref={selectRef}
                onChange={() => {
                  handleFilter();
                }}
                defaultValue="filter"
                className="bg-elements text-primary font-nunito py-2 px-4 pr-12 appearance-none cursor-pointer rounded-sm shadow-sm w-full"
              >
                <option value="filter" disabled>
                  Filter by Region
                </option>
                <option value="all">All</option>
                {Array.from(regions).map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
          )}
        </header>

        <section className="grid w-full relative grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {error && (
            <p className="text-center text-red-600">
              OOPS! Something went wrong
            </p>
          )}
          {!isFiltered &&
            countries?.map((country, index) => {
              return (
                <Link key={index} to={`/countries/${country.name.common}`}>
                  <CountryCard country={country} />
                </Link>
              );
            })}

          {isFiltered &&
            filteredCountries?.map((country, index) => {
              return (
                <Link key={index} to={`/countries/${country.name.common}`}>
                  <CountryCard country={country} />
                </Link>
              );
            })}
        </section>
      </main>
    </>
  );
};

const CountryCard = ({ country }) => {
  return (
    <>
      <article className="flex flex-col items-center bg-elements rounded-md shadow-md overflow-clip">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="h-40 w-full object-cover"
        />
        <div className="w-full px-5 py-7 space-y-4">
          <h3 className="font-bold text-lg leading-5">{country.name.common}</h3>

          <div className="text-sm">
            <h4>
              <strong>Population:</strong> {country.population}
            </h4>
            <h4>
              <strong>Region:</strong> {country.region}
            </h4>
            <h4>
              <strong>Capital:</strong> {country.capital}
            </h4>
          </div>
        </div>
      </article>
    </>
  );
};

export default CountriesSection;
