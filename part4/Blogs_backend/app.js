const http = require('http')
const express = require('express')
// const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)
// const blogsRouter = require('./models/person')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
const Blog = mongoose.model('Blog', blogSchema)

const url =
  `mongodb+srv://test:test@cluster0.72qi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })



app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app