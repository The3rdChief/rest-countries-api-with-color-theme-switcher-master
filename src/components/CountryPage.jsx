import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CountryPage = () => {
  const [country, setCountry] = useState([]);
  const [borderNames, setBorderNames] = useState({});
  const { name } = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const data = await response.json();

        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountry();
  }, [name]);

  useEffect(() => {
    if (country[0]?.borders) {
      const fetchBordersNames = async () => {
        const bordersData = {};
        for (let border of country[0].borders) {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${border}`
          );
          const data = await res.json();
          bordersData[border] = data[0]?.name?.common; // Store border country names in the object
        }
        setBorderNames(bordersData); // Update the state with the borders' names
      };

      fetchBordersNames();
    }
  }, [country]);

  return (
    <>
      <div className="mx-auto w-11/12 max-w-6xl py-10 space-y-12">
        <Link to="/">
          <button className="py-2 px-6 bg-elements shadow-md rounded-sm flex items-center gap-3">
            <ion-icon name="arrow-back-outline"></ion-icon>
            <span>Back</span>
          </button>
        </Link>
        {country && country.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-x-16">
            <img
              src={country[0]?.flags.svg}
              alt={country[0]?.flags.alt}
              className="h-64 lg:h-full object-cover"
            />
            <article className="py-10 space-y-6">
              <h3 className="text-2xl font-bold">{country[0]?.name?.common}</h3>
              <ul className="[&>li]:font-light [&>li>strong]:font-semibold space-y-2">
                {country[0]?.name?.nativeName && (
                  <li>
                    <strong>Native Name:</strong>{" "}
                    {Object.values(country[0].name.nativeName)[0]?.official}
                  </li>
                )}

                {country[0]?.population && (
                  <li>
                    <strong>Population:</strong> {country[0]?.population}
                  </li>
                )}

                {country[0]?.region && (
                  <li>
                    <strong>Region:</strong> {country[0]?.region}
                  </li>
                )}

                {country[0]?.subregion && (
                  <li>
                    <strong>Subregion:</strong> {country[0]?.subregion}
                  </li>
                )}

                {country[0]?.capital && (
                  <li>
                    <strong>Capital:</strong> {country[0]?.capital[0]}
                  </li>
                )}

                {country[0]?.tld && (
                  <li>
                    <strong>Top Level Domain:</strong> {country[0]?.tld[0]}
                  </li>
                )}

                {country[0]?.currencies && (
                  <li>
                    <strong>Currencies:</strong>{" "}
                    {Object.values(country[0].currencies)[0]?.name}
                  </li>
                )}

                {country[0]?.languages && (
                  <li>
                    <strong>Languages:</strong>{" "}
                    {Object.values(country[0].languages)[0]}
                  </li>
                )}
              </ul>

              {country[0]?.borders && (
                <div className="flex items-center flex-wrap gap-2">
                  <strong className="min-w-max">Border Countries:</strong>
                  <div className="flex gap-4 flex-wrap">
                    {country[0]?.borders.map((border, idx) => (
                      <div key={idx}>
                        {border && borderNames[border] && (
                          <Link
                            to={`/countries/${borderNames[border]}`}
                            className="px-4 py-1 bg-elements rounded-sm shadow-md"
                          >
                            {borderNames[border]}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        )}
      </div>
    </>
  );
};

export default CountryPage;
