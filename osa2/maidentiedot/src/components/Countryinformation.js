import React from "react";

const Countryinformation = ({
  country,
  capitals,
  area,
  languages,
  img,
  weather,
}) => {
  var languages_arr = [];
  for (var key in languages) {
    languages_arr.push(languages[key]);
  }

  return (
    <>
      <h3>{country}</h3>
      <p>{`capital ${capitals}`}</p>
      <p>{`area ${area}`}</p>
      <h3>Languages: </h3>
      <ul>
        {languages_arr.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={img} alt="" />
      <h2>{`Weather in ${capitals}`}</h2>
      <p>{`temperature ${
        weather.length !== 0
          ? Math.round(((weather.main.temp - 273.15) * 10) / 10)
          : 0
      } Celcius`}</p>
      <img
        src={`http://openweathermap.org/img/wn/${
          weather.length !== 0 ? weather.weather[0].icon : "10d"
        }@2x.png`}
        alt=""
      />
      <p>{`wind ${weather.length !== 0 ? weather.wind.speed : 0} m/s`}</p>
      <br />
    </>
  );
};

export default Countryinformation;
