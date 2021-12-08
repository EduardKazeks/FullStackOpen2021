import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import AddBlog from './AddBlog'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setNewBlog('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
            title:<input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:<input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:<input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>

      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
