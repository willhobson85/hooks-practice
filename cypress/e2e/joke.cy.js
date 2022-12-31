describe('Joke', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })
  
  it('should have a title for the joke section', () => {
    cy.get(':nth-child(4) > h3')
      .contains('Joke of the session')
  })

  //Upon refactor, write tests for joke and punchline
})