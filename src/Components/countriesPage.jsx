import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CountriesPage.css";

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data); // Initialize filtered list
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching countries");
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(term)
      )
    );
  };

  // Navigate to weather page for the searched country
  const searchWeatherByCountry = () => {
    const matchedCountry = countries.find(
      (country) => country.name.common.toLowerCase() === searchTerm.toLowerCase()
    );

    if (matchedCountry) {
      const capital = matchedCountry.capital?.[0] || "N/A";
      navigate(`/weather/${matchedCountry.name.common}/${capital}`);
    } else {
      alert("Country not found!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="countries-container">
      <h1>Countries</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button" onClick={searchWeatherByCountry}>
          Search Weather
        </button>
      </div>

      <table className="countries-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>check Weather</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.cca2}>
              <td>{country.name.common}</td>
              <td>{country.capital?.[0] || "N/A"}</td>
              <td>
                {country.capital ? (
                  <button
                    className="weather-button"
                    onClick={() =>
                      navigate(`/weather/${country.name.common}/${country.capital[0]}`)
                    }
                  >
                    View Weather
                  </button>
                ) : (
                  "No Capital"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesPage;
