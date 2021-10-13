describe('Should successfuly login', () => {
    before(() => {
      cy.visit('http://localhost:3000/login')
    })
  
    it('Successfuly login into a precreated account', () => {
      cy.get('[type="email"]')
        .type('example@gmail.com')

      cy.get('[type="password"]')
            .type('qwerty')

      cy.get('button').click()

      cy.contains('Соберите бургер')
    })
  })