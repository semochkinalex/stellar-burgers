describe("Routes functionality", function () {
    before(function () {
      cy.visit("http://localhost:3000");
    });
  
    it("Default page", function () {
      cy.contains("Соберите бургер");
    });
  
    it("Feed page", function () {
      cy.get("a").contains("Лента заказов").click();
      cy.contains("Лента заказов");
    });
  
    it("Redirect to login page because of a protected route", function () {
      cy.get("a").contains("Личный профиль").click();
      cy.contains("Вход");
    });
  });