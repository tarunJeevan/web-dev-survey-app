/// <reference types='cypress' />

describe('Initial UX tests', () => {
    // it('sucessfully logs in', () => {
    //     cy.visit('https://pfwsurvey.biskilog.com/')

    //     // Click on login button
    //     cy.get('LOGIN').click()
    // })

    beforeEach(() => {
        cy.login()
    })

    it('checks the dashboard', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')

        // Check if Tarun Jeevan is logged in
        cy.getAllLocalStorage()

        // Does the Add button appear?
        cy.contains('Add')

        // Is .surveylist-container empty?
        cy.get('.surveylist-container').children().should('not.have.length', 0)
    })

    it('checks the navigation to survey creator', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')
        cy.get('.add-btn').click()

        // Check if this took the page to the right url
        cy.location('pathname').should('eq', '/creator')
    })

    it('check the survey preview', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')
        cy.get('.open-btn').first().click()

        // Check if this took the page to the right url
        cy.location('pathname').should('eq', '/survey')
    })

    it('checks logout functionality', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')

        // Try logout
        cy.get('#basic-navbar-nav') // TODO: Continue
    })
})