/// <reference types='cypress' />

import { SurveyTaker } from './SurveyTaker'

describe('<SurveyTaker />', () => {
  beforeEach(() => {
    cy.mount(<SurveyTaker />)
  })

  it('checks the UI', () => {
    cy.get('.survey-displayer').should('not.be.empty')
  })
})