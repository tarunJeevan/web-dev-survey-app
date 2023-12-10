import React from 'react'
import { Dashboard } from './Dashboard'

describe('<Dashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />)

    // Does the Add button appear?
    cy.contains('Add').should('have.class', 'add-btn')

    // Is .surveylist-container empty?
    cy.get('.surveylist-container').children().should('not.have.length', 0)
  })
})