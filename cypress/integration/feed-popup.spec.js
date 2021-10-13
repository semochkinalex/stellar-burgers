describe('Feed popup', function() {
    before(function() {
      cy.visit('http://localhost:3000/feed');
    });
  
    it('Can open ingredient popup', function() {
        cy.get('a li').first().click();
    
        cy.contains('Выполнен'); // Может некорректо показывать тест, так как могут быть другие статусы. Нет якоря, на который можно опираться
    });

    it("When the page refreshes, we don't see the popup", function() {
        cy.reload();
        cy.contains('В работе').should('not.exist'); 
    })
});