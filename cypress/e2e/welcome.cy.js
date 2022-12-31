describe('Welcome', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })
  
  it('should welcome you', () => {
    cy.get('h1')
      .contains('Hello')
  })
})