describe('album overview page', () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/Taylor%20Swift/")
    })
    context("Album 1 Overview", () => {
        it("Blog 1 Link", () => {
            cy.getByData("post-link").eq(0).find("h2").click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/overview/")
        })
        it("Blog 2 Link", () => {
            cy.getByData("post-link").eq(1).find("h2").click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/overview/quotes/")
        })
        it("Song 1 Link", () => {
            cy.getByData("song-link").eq(0).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/tim-mcgraw/")
            cy.get("h1").contains("Tim")
        })
        it("Song 2 Link", () => {
            cy.getByData("song-link").eq(1).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/picture-to-burn/")
            cy.get("h1").contains("Picture")
        })
        it("Song 3 Link", () => {
            cy.getByData("song-link").eq(2).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/teardrops-on-my-guitar/")
            cy.get("h1").contains("Teardrops")
        })
        it("Song 4 Link", () => {
            cy.getByData("song-link").eq(3).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/a-place-in-this-world/")
            cy.get("h1").contains("A Place")
        })
        it("Song 5 Link", () => {
            cy.getByData("song-link").eq(4).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/cold-as-you/")
            cy.get("h1").contains("Cold")
        })
        it("Song 6 Link", () => {
            cy.getByData("song-link").eq(5).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/the-outside/")
            cy.get("h1").contains("The Outside")
        })
        it("Song 7 Link", () => {
            cy.getByData("song-link").eq(6).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/tied-together-with-a-smile/")
            cy.get("h1").contains("Tied Together")
        })
        it("Song 8 Link", () => {
            cy.getByData("song-link").eq(7).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/stay-beautiful/")
            cy.get("h1").contains("Stay Beautiful")
        })
        it("Song 9 Link", () => {
            cy.getByData("song-link").eq(8).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/shouldve-said-no/")
            cy.get("h1").contains("Said No")
        })
        it("Song 10 Link", () => {
            cy.getByData("song-link").eq(9).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/marys-song/")
            cy.get("h1").contains("Song")
        })
        it("Song 11 Link", () => {
            cy.getByData("song-link").eq(10).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/our-song/")
            cy.get("h1").contains("Our Song")
        })
        it("Song 12 Link", () => {
            cy.getByData("song-link").eq(11).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/id-lie/")
            cy.get("h1").contains("Lie")
        })
        it("Song 13 Link", () => {
            cy.getByData("song-link").eq(12).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/im-only-me-when-im-with-you/")
            cy.get("h1").contains("Only Me")
        })
        it("Song 14 Link", () => {
            cy.getByData("song-link").eq(13).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/invisible/")
            cy.get("h1").contains("Invisible")
        })
        it("Song 15 Link", () => {
            cy.getByData("song-link").eq(14).find('a').click()
            cy.location("pathname").should("eq", "/Taylor%20Swift/song-list/a-perfectly-good-heart/")
            cy.get("h1").contains("A Perfectly")
        })
    })
})