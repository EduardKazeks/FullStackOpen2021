import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const compareFn = (blog1, blog2) => {
  return blog2.likes - blog1.likes
}

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const handleDelete = async (blog) => {
    if (window.confirm('Remove ' + blog.title  + ' by ' + blog.author)) {
      await blogService.remove(blog.id)
        .then(response => {
          console.log(response)
        })

      fetchBlogs()
    }
  }

  const fetchBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareFn) )
    )
  }

  useEffect(() => {
    if (user !== null)
      fetchBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const saveLikesHandler = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, updatedBlog)
    fetchBlogs()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setSuccessMessage(
          `A new blog ${blog.title} by ${blog.author} added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="Sig in">
        <Notification message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable></div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <Notification message={errorMessage} />
		      <SuccessNotification message={successMessage} />
          <p>{user.username} logged-in <button type="button" onClick={logout}>logout</button></p>
          {blogForm()}
        </div>
      }
      {user !== null && blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          saveLikesHandler={saveLikesHandler}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App