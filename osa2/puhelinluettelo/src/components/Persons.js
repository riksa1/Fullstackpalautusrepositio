import React from "react";
import Person from "./Person";

const Persons = ({
  persons,
  search,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(search))
        .map((person) => (
          <Person
            name={person.name}
            number={person.number}
            id={person.id}
            key={person.name}
            setPersons={setPersons}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        ))}
    </>
  );
};

export default Persons;
