/// <reference types='cypress' />

describe('Initial UX tests', () => {
    beforeEach(() => {
        cy.login().then((result) => {
            const token = result.multiFactor.user.accessToken
            const username = result.multiFactor.user.displayName

            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
        })
    })

    afterEach(() => {
        cy.logout()
        localStorage.clear()
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

    it('checks the survey preview', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')
        cy.get('.open-btn').first().click()

        // Check if this took the page to the right url
        cy.location('pathname').should('eq', '/survey')
    })

    it('check header brand navigation', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')

        // Check if the header brand logo navigates to the home page
        cy.get('.d-inline-block.align-top').click()
        cy.location('pathname').should('eq', '/')
    })

    it('checks header home link navigation', () => {
        cy.visit('https://pfwsurvey.biskilog.com/dashboard')

        // Check if the header 'home' link navigates to the home page
        cy.get('.me-auto').contains('Home').click()
        cy.location('pathname').should('eq', '/')
    })
})