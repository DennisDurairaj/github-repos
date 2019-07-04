/// <reference types="cypress" />

describe("Repos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("When page opens", () => {
    it("should focus on search input", () => {
      cy.get('input[type="text"]').should("be.focused");
    });
  });

  context("When there are no items", () => {
    it("should not display list", () => {
      cy.get("li").should("not.exist");
    });
  });

  context("Fetch user repos successfully", () => {
    beforeEach(() => {
      cy.get('input[type="text"]')
        .click()
        .type("typicode");
      cy.get('Button[type="submit"]').click();
    });
    it("should display list of repos", () => {
      cy.get("li").should("exist");
    });
    it("should not display error", () => {
      cy.get(".error").should("not.exist");
    });
  });

  context("Fetch user repos failure", () => {
    const searchUser = "dennisdurairaj001";
    beforeEach(() => {
      cy.get('input[type="text"]')
        .click()
        .type(`${searchUser}`);
      cy.get('Button[type="submit"]').click();
      cy.server();
      cy.route({
        url: `https://api.github.com/users/${searchUser}`,
        method: "GET",
        status: 404,
        response: {}
      });
    });

    it("should display error", () => {
      cy.get(".error").should("exist");
    });
    it("should not display list", () => {
      cy.get("li").should("not.exist");
    });
  });
});
