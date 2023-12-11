import { Dashboard } from './Dashboard'

describe('<Dashboard />', () => {
  it('renders', () => {
    cy.mount(<Dashboard />)

    // Add button should appear
    cy.contains('Add').should('have.class', 'add-btn')

    // surveylist-container should not be empty
    cy.get('.surveylist-container').children().should('not.have.length', 0)
  })
})