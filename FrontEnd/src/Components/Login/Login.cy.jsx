/// <reference types='cypress' />

import { Login } from './Login'

describe('<Login />', () => {
  it('checks the images', () => {
    cy.mount(<Login />)
    cy.get('.mx-auto.d-block')
    cy.contains('LOGIN')
  })
})