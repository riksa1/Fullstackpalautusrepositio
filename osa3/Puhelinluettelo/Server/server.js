require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status - :response-time ms :body'))
app.use(express.static('build'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then((person) => {
      if (person === undefined) {
        res.send('Person with that id does not exist')
      } else {
        res.json(person)
      }
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res, next) => {
  var today = new Date()
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  var dateTime = date + ' ' + time
  Person.find({})
    .then((people) => {
      res.send(
        `Phonebook has info for ${people.length} people<br/><br/>${dateTime}`
      )
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (name === undefined || number === undefined) {
    return res.status(400).json({
      error: 'content missing',
    })
  } else {
    const person = new Person({
      name: name,
      number: number,
    })

    person
      .save()
      .then((savedNote) => {
        res.status(200).json(savedNote)
      })
      .catch((error) => next(error))
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body
  const person = {
    name: name,
    number: number,
  }
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
