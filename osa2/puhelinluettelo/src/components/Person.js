import React, { useState } from "react";
import personService from "./api";

const Person = ({
  name,
  number,
  id,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  return (
    <>
      <p>
        {name} {number}{" "}
        <button
          onClick={async () => {
            if (window.confirm(`Delete ${name}?`)) {
              var errorStatus = false;
              await personService.delete(id).catch((error) => {
                errorStatus = true;
                console.log(errorStatus);
                setErrorMessage(
                  `Information of ${name} has already been removed from the server`
                );
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              });
              setPersons((persons) =>
                persons.filter((person) => person.id !== id)
              );
              console.log(errorStatus);
              if (errorStatus === false) {
                setSuccessMessage(`Deleted ${name}!`);
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 5000);
              }
            }
          }}
        >
          delete
        </button>
      </p>
    </>
  );
};

export default Person;
