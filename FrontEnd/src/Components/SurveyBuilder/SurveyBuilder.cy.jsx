/// <reference types="cypress" />

import { SurveyBuilder } from './SurveyBuilder'

describe('<SurveyBuilder />', () => {
  beforeEach(() => {
    cy.mount(<SurveyBuilder />)
  })
  
  it('checks the UI', () => {
    cy.get('.survey-container').should('not.be.empty')
  })
})