describe('Blog app', () => {
	beforeEach(function() {
		//cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')
	  })

	  it('Sigin form is shown', function() {   // exercise 5.17
		//cy.contains('Login to application')
	  })

	  describe('Sigin',function() {
		it('succeeds with correct credentials', function() {    // exercise 5.18
			cy.contains('Sig in').click()
			cy.get('#username').type('newEduard')
			cy.get('#password').type('admin')
			cy.get('#login-button').click()
		})
	
		it('fails with wrong credentials', function() {   // exercise 5.18
			cy.contains('Sig in').click()
			cy.get('#username').type('WronUserName')
			cy.get('#password').type('WrongPassword')
			cy.get('#login-button').click()
		
			cy.get('.error')
			.should('contain', 'Wrong username or password')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid')
		})

	})
	describe('When logged in', function() {
		beforeEach(function() {
			cy.visit('http://localhost:3000')
			cy.contains('Sig in').click()
			cy.get('#username').type('newEduard')
			cy.get('#password').type('admin')
			cy.get('#login-button').click()
		})
		it('A blog can be created', function() {       // 5.19
			cy.contains('new blog').click()
			cy.get('#title').type('a blog created by cypress')
			cy.contains('create').click()
			// cy.contains('a blog created by cypress')
		})

		it('checks that users can like a blog', function () {                        // exercise 5.20  
			cy.contains('bestsellerSokolov').parent().find('button').as('theLikeButton')
			cy.get('@theLikeButton').should('contain', 'Like')
		  })
		 
		it('checks that user who create blog, can delete it', function () {      // exercise 5.21
			cy.contains('bestsellerSokolov').parent().find('button').as('remove')
			cy.get('@remove').should('contain', 'remove')
		})
	  })

	// describe('and a blog exists', function () {          //  exercise 5.19
	// 	describe('and several blogs exist', function () {
	// 	  beforeEach(function () {
	// 		cy.createBlog({ title: 'first blog', author: 'devTools2021' })
	// 		cy.createBlog({ title: 'second blog', author: 'devTools2021' })
	// 		cy.createBlog({ title: 'third blog', author: 'devTools2021' })
	// 	  })
	// 	})

  }) 