const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpZCI6IjYxYTIwNjU2MjkzNzI1NDQ3NDAzZjhjNCIsImlhdCI6MTYzODAwODQxNywiZXhwIjoxNjY5NTQ0NDE3fQ.Q8MSMmBZeFkIJLJ58uTRKoKcwB1xUjCX6Q_ZRN02oLw"

test('Get blogs', async () => {
  const response = await api.get('/api/blogs').set({ Authorization: token }).expect(200)

  expect(response.body).toHaveLength(2)
})
  
test('id detected', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: token }).expect(200)
  
    expect(response.body[0].id).toBeDefined();
  })

test('add new blog', async () => {        
  const newBlog = {
    "title": "bestseller",
    "author": "Sokolov",
    "url": "lala.com",
    "likes": 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: token })
    .expect(201)

  const getResponse = await api.get('/api/blogs').set({ Authorization: token }).expect(200)
  expect(getResponse.body).toHaveLength(3)
})

test('add new blog 401', async () => {
	
	const getUserId = async () => {
		const users = await User.find({})
		return users[0].id
	}
	const userId = await getUserId()
	const newBlog = {
	  "title": "bestseller",
	  "author": "Sokolov",
	  "url": "lala.com",
	  "likes": 0,
	  "userId": userId
	}
	await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(401)
  })

  test('empty likes string', async () => {
  
    const newBlog =  {
      "title": "bestseller",
      "author": "Sokolov",
      "url": "lala.com",
      "likes": ""
    }
    const postResponse = await api.post('/api/blogs').send(newBlog).set({ Authorization: token }).expect(201)
    expect(postResponse.body.likes).toBe(0)
  })

test('title and url are not defined', async () => {
    const newBlog =  {
      "author": "Sokolov",
      "url": "lala.com",
      "likes": 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const newBlog2 =  {
      "title": "lalaland",
      "author": "Sokolov",
      "url": "",
      "likes": 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })

test('Get blogs returns 401 if token is missing', async () => {
  await api.get('/api/blogs').expect(401)
})

  afterAll(() => {
    mongoose.connection.close()
  })


