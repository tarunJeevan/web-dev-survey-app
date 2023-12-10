/// <reference types='cypress' />

describe('Initial UX tests', () => {
    // it('sucessfully logs in', () => {
    //     cy.visit('http://localhost:3000')

    //     // Click on login button
    //     cy.get('LOGIN').click()
    // })

    it('checks the dashboard', () => {
        cy.login()
        // cy.visit('http://localhost:3000/dashboard')

        // // Check if Tarun Jeevan is logged in
        // cy.getAllLocalStorage()

        // // Does the Add button appear?
        // cy.contains('Add')

        // // Is .surveylist-container empty?
        // cy.get('.surveylist-container').children().should('not.have.length', 0)
    })
})