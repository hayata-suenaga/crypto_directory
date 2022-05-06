describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    // Create a server for stubbing network requests
    cy.server();

    // Stub a network request to the endpoint for an individual exchange (binance)
    cy.intercept("https://api.coingecko.com/api/v3/exchanges/binance", {
      fixture: "binance",
    }).as("binance");

    // Stub a network response to the endpoint for the list of exchanges
    cy.intercept(
      "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1",
      {
        fixture: "ten-exchanges",
      }
    ).as("ten-exchanges");
  });

  it("Visits the kitchen sink", () => {
    cy.wait("@ten-exchanges");
    cy.get(".card").should("have.length", 10);
  });
});
