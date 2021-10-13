describe('Burger constructor functionality and making orders', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('Can make a burger via drag and drop', function() {
        cy.get('a li img').first().parent().trigger('dragstart');

        cy.get('div').contains('Выбирайте ингредиенты и составьте себе бургер').trigger('drop');
    
        cy.contains('Оформить заказ');
    });

    it('Redirect to login page because there is no authorization', function () {
        cy.contains('Оформить заказ').trigger('click');

        cy.contains('Вход')
    })
});