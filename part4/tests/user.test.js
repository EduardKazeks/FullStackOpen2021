const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({username: 'userTest'})
})

test('add new user', async () => {

    const getResponse = await api.get('/api/users').expect(200)
    const numberOfUsers = getResponse.body.length

    const newUser = {
        username: 'userTest',
        password: 'salainen'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

    const responeAnswer = await api.get('/api/users').expect(200)
    expect(responeAnswer.body).toHaveLength(numberOfUsers + 1)
})

test('add invalid user', async () => {
    const newUser = {
        username: 'root1',
        name: 'Linda Blow',
        password: 'aa',
    }

    const postResponse = await api.post('/api/users').send(newUser).expect(400)
    expect(postResponse.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `root1`")
})

afterAll(() => {
    mongoose.connection.close()
})