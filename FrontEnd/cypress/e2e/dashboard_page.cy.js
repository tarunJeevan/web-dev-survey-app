// TODO: Need to log in before running the tests. Figure out how to get Microsoft OAuth working

describe('Dashboard tests', () => {
    it('checks the dashboard', () => {
        cy.visit('http://localhost:3000/dashboard')

        // Check if Tarun Jeevan is logged in
        cy.getAllLocalStorage({ log: true })

        // Does the Add button appear?
        cy.contains('Add')

        // Is .surveylist-container empty?
        cy.get('.surveylist-container').children().should('not.have.length', 0)
    })
})