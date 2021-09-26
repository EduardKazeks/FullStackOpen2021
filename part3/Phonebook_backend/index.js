const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')
const cors = require('cors')
const baseUrl = '/api/persons'

const url =
  `mongodb+srv://test:test@cluster0.72qi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(
  morgan(':method :url :status :res[content-length] :body - :response-time ms')
)
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()} </p>`)
  })

  app.get(`${baseUrl}`, (req, res) => {
    Person.find({}).then(result => {
      res.json(result.filter(p => p.name))
    })
  })

  app.get(`${baseUrl}/:id`, (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
    .catch(error => next(error))
  })
 
  app.post(`${baseUrl}`, (request, response, next) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    if (body.name.length < 3) {
       return response.status(400).json({ 
             error: ' the name stored in the database has to be at least three characters long' 
            })
          }

    if (body.number.length < 8) {
      return response.status(400).json({
        error: 'the number stored in the database has to be at least 8 characters long'
      })
    }
    const person = new Person({
      name: body.name,
      number: body.number || false,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error)) 
  })

  app.get(`${baseUrl}/:id`, (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete(`${baseUrl}/:id`, (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })