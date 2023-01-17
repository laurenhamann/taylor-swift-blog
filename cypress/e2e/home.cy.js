describe('home page', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000")
  })
  it("loads all albums", () => {
    cy.get("main").find("li").should('have.length', 10)
  })

  context("Check Links", () => {
    it("search link", () => {
      cy.get("nav").find("a").click()
      cy.location("pathname").should("eq", "/search/")
    })
    it("1:album link", () => {
      cy.get("main").find("li").eq(0).click()
      cy.location("pathname").should("eq", "/Taylor%20Swift/")
    })
    it("2:album link", () => {
      cy.get("main").find("li").eq(1).click()
      cy.location("pathname").should("eq", "/Speak%20Now/")
    })
    it("3:album link", () => {
      cy.get("main").find("li").eq(2).click()
      cy.location("pathname").should("eq", "/1989/")
    })
    it("4:album link", () => {
      cy.get("main").find("li").eq(3).click()
      cy.location("pathname").should("eq", "/Reputation/")
    })
    it("5:album link", () => {
      cy.get("main").find("li").eq(4).click()
      cy.location("pathname").should("eq", "/Lover/")
    })
    it("6:album link", () => {
      cy.get("main").find("li").eq(5).click()
      cy.location("pathname").should("eq", "/Folklore/")
    })
    it("7:album link", () => {
      cy.get("main").find("li").eq(6).click()
      cy.location("pathname").should("eq", "/Evermore/")
    })
    it("8:album link", () => {
      cy.get("main").find("li").eq(7).click()
      cy.location("pathname").should("eq", "/Fearless/")
    })
    it("9:album link", () => {
      cy.get("main").find("li").eq(8).click()
      cy.location("pathname").should("eq", "/Red/")
    })
    it("10:album link", () => {
      cy.get("main").find("li").eq(9).click()
      cy.location("pathname").should("eq", "/Midnights/")
    })
  })
})