import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Input from "./components/Input";
import personService from "./components/api";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNewName = (e) => {
    e.preventDefault();
    var found = false;
    for (var i = 0, len = persons.length; i < len; i++) {
      if (persons[i].name === newName) {
        found = true;
        break;
      }
    }
    if (found === true) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        var person = persons.find((person) => person.name === newName);
        personService
          .update(person.id, {
            name: newName,
            number: newNumber,
            id: person.id,
          })
          .then((result) => {
            var newPersons = persons.map((person) =>
              person.name === newName
                ? {
                    name: newName,
                    number: newNumber,
                    id: person.id,
                  }
                : person
            );
            setPersons([...newPersons]);
            setSuccessMessage(`Updated ${newName}!`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            if (error.response.data) {
              setErrorMessage(error.response.data.error);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
          });
      }
    } else if (newName !== "") {
      var newNameObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newNameObject)
        .then((result) => {
          setPersons([
            ...persons,
            { name: newName, number: newNumber, id: result.data.id },
          ]);
          setSuccessMessage(`Added ${newName}!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          }
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Input
        name="filter shown with"
        newValue={search}
        handleValueChange={handleSearchChange}
      />
      <form onSubmit={addNewName}>
        <Input
          name="name"
          newValue={newName}
          handleValueChange={handleNameChange}
        />
        <Input
          name="number"
          newValue={newNumber}
          handleValueChange={handleNumberChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
