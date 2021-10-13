describe('Burger constructor functionality and making orders', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('Can open ingredient popup', function() {
        cy.get('a li img').first().click();
    
        cy.contains('Калории, ккал');
    });

    it("When the page refreshes, we don't see the popup", function() {
        cy.reload();
        cy.contains('Соберите бургер').should('not.exist');
    })

    // it('Redirect to login page because there is no authorization', function () {
    //     cy.contains('Оформить заказ').trigger('click');

    //     cy.contains('Вход')
    // })
});