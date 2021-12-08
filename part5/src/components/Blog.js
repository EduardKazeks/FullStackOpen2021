import React, { useState }  from 'react'

const Blog = ({ blog, user, saveLikesHandler, handleDelete }) => {
  console.log(blog)
  const [viewVisible, setViewVisible] = useState(false)
  const hideWhenVisible = { display: viewVisible ? 'none' : '' }
  const showWhenVisible = { display: viewVisible ? '' : 'none' }

  const likeBtn = async () => {
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    saveLikesHandler(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
		  <div style=
          {hideWhenVisible}>
		  {blog.title}
		  {blog.author}
          <button onClick={() => setViewVisible(true)}>view</button>
        </div>
        <div style=
          {showWhenVisible}>
          {blog.title}
          {blog.author}
		 <button onClick={() => setViewVisible(false)}>hide</button>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
		  <button onClick={likeBtn}>Like</button>
		  </div>
          <div>{blog.username}</div>
          <div>
		  {user.username === blog.user.username ?
              <button onClick={() => handleDelete(blog)}>remove</button>
              : null}
		  </div>
        	</div>
      </div>
    </div>
  )}
export default Blog