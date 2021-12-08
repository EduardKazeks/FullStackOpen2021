import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import BlogForm from './BlogForm'
import Blog from './Blog'

const user = {
	name: 'Pupkin',
	username: 'newEduard'
  }

const blog = {
	title: 'Component testing is done with react-testing-library',
	author: 'Local',
	url: 'http://gogo.ru',
	likes: 0,
	user
  }
  
  

  
test('renders content', () => {
	const component = render(
	  <Blog blog={blog}
		    user={user}
	  />
	)
  
	expect(component.container).toHaveTextContent(
	  'Component testing is done with react-testing-library'
	)
	// expect(component.container).toHaveTextContent(
	//   'Local'
	// )
	// expect(component.container).not.toHaveTextContent(
	//   'http://gogo.ru'
	// )
	// expect(component.container).not.toHaveTextContent(
	//   'Like'
	// )
  })

// test('clicking the  VIEW button contains URL and likes', async () => {

// 	const component = render(
// 	  <Blog blog={blog} user={user}/>
// 	)
  
// 	const button = component.getByText('view')
// 	fireEvent.click(button)
// 	expect(component.container).toHaveTextContent(
// 	  'http://gogo.ru'
// 	)
// 	expect(component.container).toHaveTextContent(
// 	  'Like'
// 	)
//   })

// test('the LIKE button clicked two times', async () => {
// 	const mockHandler = jest.fn()
  
// 	const component = render(
// 	  <Blog blog={blog} user={user} saveLikesHandler={mockHandler} />
// 	)
  
// 	const button = component.getByText('view')
// 	fireEvent.click(button)
  
// 	const likeButton = component.getByText('Like')
// 	fireEvent.click(likeButton)
// 	expect(mockHandler.mock.calls).toHaveLength(1)
// 	fireEvent.click(likeButton)
// 	expect(mockHandler.mock.calls).toHaveLength(2)
//   })

// test('<BlogForm /> updates parent state and calls onSubmit', () => {
// 	const createBlog = jest.fn()
  
// 	const component = render(
// 	  <BlogForm createBlog={createBlog} />
// 	)
  
// 	const author = component.container.querySelector('#author')
// 	const form = component.container.querySelector('form')
  
// 	fireEvent.change(author, {
// 	  target: { value: 'Salakka' }
// 	})
// 	fireEvent.submit(form)
  
// 	expect(createBlog.mock.calls).toHaveLength(1)
// 	expect(createBlog.mock.calls[0][0].author).toBe('Salakka' )
//   })
  