import { useState, useEffect } from "react";
import axios from "axios";
import Countryinformation from "./components/Countryinformation";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [currentCountries, setCurrentCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  const searching = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    var result = countries.filter((countrie) =>
      countrie.name.common.toLowerCase().includes(search.toLowerCase())
    );
    if (result.length === 1) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${result[0].capital[0]}&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
    setCurrentCountries([...result]);
  }, [search, countries, api_key]);

  return (
    <div>
      find countries <input value={search} onChange={searching} />
      <br />
      <br />
      {currentCountries.length === 1 ? (
        <Countryinformation
          country={currentCountries[0].name.common}
          capitals={currentCountries[0].capital}
          area={currentCountries[0].area}
          languages={currentCountries[0].languages}
          img={currentCountries[0].flags.png}
          weather={weather}
        />
      ) : (
        currentCountries.map((country) => (
          <Country
            country={country}
            setSearch={setSearch}
            key={country.name.common}
          />
        ))
      )}
    </div>
  );
};

export default App;
