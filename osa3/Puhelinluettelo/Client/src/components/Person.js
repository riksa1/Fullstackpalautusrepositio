import React from "react";
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
              personService
                .delete(id)
                .then((result) => {
                  setPersons((persons) =>
                    persons.filter((person) => person.id !== id)
                  );
                  if (errorStatus === false) {
                    setSuccessMessage(`Deleted ${name}!`);
                    setTimeout(() => {
                      setSuccessMessage(null);
                    }, 5000);
                  }
                })
                .catch((error) => {
                  errorStatus = true;
                  setErrorMessage(
                    `Information of ${name} has already been removed from the server`
                  );
                  setTimeout(() => {
                    setErrorMessage(null);
                  }, 5000);
                });
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
