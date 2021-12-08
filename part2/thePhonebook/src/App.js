import React, { useEffect, useState } from 'react'
import personsService from './services/persons'
import SuccessNotification from './persons/SuccessNotification'
import ErrorNotification from './persons/ErrorNotification'

const Name = ({ person, deleteContact }) => {
  return (
    <div>
      {person.name} {person.number} {person.filterName}
      <button onClick={() => deleteContact(person)}> Delete </button>
    </div>
  )
}

const Filter = (p) => {
  return (
    <div>
      <form>
        filter shown with{" "}
        <input value={p.filterName}
          onChange={p.handleFilterNameChange}
        />
      </form>
    </div>
  )
}

const Persons = (p, deleteContact) => {
  return (
    <div>
      {p.persons.map((person, index) =>
        person.name.includes(p.filterName) ?
          (<Name key={index} person={person} filterName={p.filterName} deleteContact={p.deleteContact} />
          ) : null
      )}
    </div>
  )
}

const PersonForm = (p) => {
  return (
    <form onSubmit={p.addName}>
      <div>
        name: <input value={p.newName}
          onChange={p.handleNameChange} />
        <br />
        <div>
          number: <input value={p.newNumber}
            onChange={p.handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  const ErrorSetTimeOut = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(persons.filter((person) => person.name === newName));
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const personFilter = persons.filter(person => person.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (personFilter.length > 0) {
      const person = personFilter[0]
      if (window.confirm(`${person.name} is alredy added to phonebook, replace the old number with a new one?`)) {
        console.log(`deleting note id: ${person.id}`);
        personsService.update(person.id, newPerson).then((response) => {
          console.log(response.data);
          setPersons([...persons.filter((p) => p.id !== person.id), response.data]);
        });
      }
      return
    }

    personsService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        console.log(response.data)
        setSuccessMessage(
          `Added ${newName} `
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        if( error.response ) {
          ErrorSetTimeOut(error.response.data.error)
          console.warn(error.response.data.error); // => the response payload 
        }
      })
  }

  const deleteContact = (person) => {
    if (window.confirm(`Delete ${person.name}? `)) {
      console.log(`deleting note id: ${person.id}`);
      personsService.remove(person.id).then((deletionResponse) => {
        console.log(deletionResponse);
        setPersons(persons.filter((p) => p.id !== person.id));
      })
        .catch(error => {
          ErrorSetTimeOut('Information of' + person.name + 'has already been removed from server')
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterName={filterName}
        deleteContact={deleteContact} />
      <Footer />
    </div>
  )
}

export default App