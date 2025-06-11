describe('App end-to-end', () => {
  it('redirects unauthenticated user', () => {
    cy.log('Visiting dashboard directly')
    cy.visit('/dashboard')
    cy.url().should('include', '/login')
  })

  it('logs in and shows dashboard', () => {
    cy.log('Visiting login page')
    cy.intercept('GET', '**/users/1', { fixture: 'user.json' }).as('getUser')
    cy.visit('/login')
    cy.get('input[aria-label="Email"]').type('user@example.com')
    cy.get('input[aria-label="Password"]').type('secret')
    cy.get('button').click()
    cy.wait('@getUser')
    cy.contains('Cypress User').should('be.visible')
  })
})
// If the test times out, increase `defaultCommandTimeout` in cypress.config.js
