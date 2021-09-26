const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
      return sum + blog.likes
    }
      return blogs.reduce(
        reducer, 0
      )
  }

  const favoriteBlog = (blogs) => {
    const reducer = (bestBlog,blog) => {
      if (bestBlog.likes === undefined || blog.likes) {
        bestBlog = blog
      }
      return bestBlog
    }
    return blogs.reduce(reducer, {})
  } 

  const mostBlogs = (blogs) => {
    const authorsReducer = (authors, blog) => {
      const currentValue = authors[blog.author] ? authors[blog.author] : 0
      authors[blog.author] = currentValue + 1
      return authors
    }
  
    const authors = blogs.reduce(authorsReducer, {})
  
    let bestAuthor = {}
    let maxBlogs = 0
    Object.keys(authors).forEach( author => {
      if (authors[author] > maxBlogs) {
        bestAuthor = {
          author: author,
          blogs: authors[author]
        }
        maxBlogs = authors[author]
      }
    })
    return bestAuthor
  }

  const mostLikes = (blogs) => {
    const authorsReducer = (authors, blog) => {
      const currentValue = authors[blog.author] ? authors[blog.author] : 0
      authors[blog.author] = currentValue + blog.likes
      return authors
    }
  
    const authors = blogs.reduce(authorsReducer, {})
  
    let bestAuthor = {}
    let maxLikes = 0
    Object.keys(authors).forEach( author => {
      if (authors[author] > maxLikes) {
        bestAuthor = {
          author: author,
          likes: authors[author]
        }
        maxLikes = authors[author]
      }
    })
  
    return bestAuthor
  }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }