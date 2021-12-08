import React from 'react'
import PropTypes from 'prop-types'


 const AddBlog = async ({
    event,
    createBlog,
    title,
    author,
    url,
    setNewBlog
 }) => {
    event.preventDefault()
    createBlog({
    title,
    author,
    url
    })
    setNewBlog('')
  }

  AddBlog.propTypes = {
    createBlog: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    setNewBlog: PropTypes.func.isRequired
  }

export default AddBlog