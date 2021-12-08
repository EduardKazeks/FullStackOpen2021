const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response, next) => { 
  if (!request.token) {
    return response.status(401).json({ 
      error: 'invalid token'
    })
  }

  logger.info(request.token)
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(exception) {
    next(exception)
  }

  
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  logger.info(blogs)
  return response.json(blogs.map(blog => blog.toJSON()))
})


// blogsRouter.get('/:id', async (request, response, next) => {
//   const blog = await Blog.findById(request.params.id)
//   if (blog) {
//     response.json(blog)
//   } else {
//     response.status(404).end()
//   }
// })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({ 
      error: 'title is not defined ' + JSON.stringify(body)
    })
  }
  if (body && !body.url) {
    return response.status(400).json({ 
      error: 'url is not defined '  + JSON.stringify(body)
    })
  }

  if (!request.token) {
    return response.status(401).json({ 
      error: 'invalid token'
    })
  }

  let decodedToken = ""
  try { 
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(exception) {
    next(exception)
  }

  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  logger.info(body)
  const user = await User.findById(decodedToken.id)
  try { 

	if (!user) {
		return response.status(400).json({ error: 'missing user' })
	}

	blog = new Blog({
		"title": body.title,
		"author": body.author,
		"url": body.url,
		"likes": body.likes || 0,
		"user" : user._id
	})
  } catch(exception) {
    next(exception)
  }

  try { 
    const savedBlog = await blog.save()
    logger.info(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    logger.info(user)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ 
      error: 'invalid token'
    })
  }

  let decodedToken = ""
  try { 
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(exception) {
    next(exception)
  }

  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if ( blog == null){
    return response.status(404).end()
  }
  if ( blog.user && blog.user.toString() !== decodedToken.id.toString() ) {
    return response.status(401).json({
		error: 'invalid user',
		//blogUserId: blog.user.toString(),
		//userId: decodedToken.id.toString()
	})
  }
  try { 
     await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put(`/:id`, async (request, response, next) => {
  const body = request.body

  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter