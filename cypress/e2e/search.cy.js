describe("search process", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/search/")
    })
    it("search string", () => {
        cy.get("input").type("love")
        cy.get("button").click()
        cy.get("h2").contains("love")
        cy.getByData("result").eq(0).click()
    })
    it("search number", () => {
        cy.get("input").type("22")
        cy.get("button").click()
        cy.get("h2").contains("22")
        cy.getByData("result").eq(0).click()
    })
    it("search no results", () => {
        cy.get("input").type("null")
        cy.get("button").click()
        cy.get("h2").contains("null")
        cy.getByData("result").should("not.exist")
    })
})