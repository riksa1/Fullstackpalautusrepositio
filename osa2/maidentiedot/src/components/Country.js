import React from "react";

const Country = ({ country, setSearch }) => {
  return (
    <>
      {country.name.common}{" "}
      <button onClick={() => setSearch(country.name.common.toLowerCase())}>
        {"Show"}
      </button>
      <br />
    </>
  );
};

export default Country;
