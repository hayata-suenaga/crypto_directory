const BASE_URL = "http://localhost:3000/";
// Fall back text when description for an exchange is not available
const DESCRIPTION_NOT_FOUND = "Description not available";

describe("Crypto Directory Test", () => {
  beforeEach(() => {
    // Create a server for stubbing network requests
    cy.server();

    // Stub a network response to the endpoint for the list of exchanges
    cy.intercept(
      "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1",
      {
        fixture: "ten-exchanges",
      }
    ).as("ten-exchanges");
  });

  describe("Directory Page", () => {
    beforeEach(() => {
      // Stub a network response to the endpoint for the list of exchanges
      cy.intercept(
        "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1",
        {
          fixture: "ten-exchanges",
        }
      ).as("ten-exchanges");

      cy.visit(BASE_URL);
      cy.wait("@ten-exchanges");
    });

    it("Displays ten exchange cards", () => {
      cy.get(".card").should("have.length", 10);
    });

    it("Navigates to the exchange detail page when card is clicked", () => {
      cy.get(".card").contains("Binance").click();
      cy.url().should("include", "exchanges/binance");
    });
  });

  describe("Exchange Detail Page", () => {
    beforeEach(() => {
      // Stub a network request to the endpoint for an individual exchange (binance)
      cy.intercept("https://api.coingecko.com/api/v3/exchanges/binance", {
        fixture: "binance",
      }).as("binance");

      cy.visit(BASE_URL + "exchanges/binance");
    });

    it("Shows loading indicator when fetching data", () => {
      cy.get(".loading-indicator");
    });

    it("Contains right number of social media links", () => {
      cy.url().should("include", "exchanges/binance");
    });

    it("Displays the name of the exchange", () => {
      cy.get(".headline").contains("Binance");
    });

    it("Displays the right image", () => {
      cy.get("img").should("have.attr", "src").should("include", "binance");
    });

    it("Contains three info cards", () => {
      cy.get(".info-card").should("have.length", 3);
    });

    it("Displays a fallback text when description is not available", () => {
      cy.get("p").contains(DESCRIPTION_NOT_FOUND);
    });

    it("Navigates back to the Directory Page when the anchor tag is clicked", () => {
      cy.contains("Back to Home").click();
      cy.url().should("eq", BASE_URL);
    });
  });

  describe("Loading indicator", () => {
    beforeEach(() => {
      // Delay the stubbed responses
      cy.intercept(
        "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1",
        {
          delay: 1000,
          fixture: "ten-exchanges",
        }
      ).as("slow-ten-exchanges");

      cy.intercept("https://api.coingecko.com/api/v3/exchanges/binance", {
        delay: 1000,
        fixture: "binance",
      }).as("slow-binance");
    });

    it("Appears on Directory Page when fetching data", () => {
      cy.visit(BASE_URL);
      cy.get(".loading-indicator");
    });

    it("Appears on Exchange Detail Page when fetching data ", () => {
      cy.visit(BASE_URL + "exchanges/binance");
      cy.get(".loading-indicator");
    });
  });

  describe("Error message", () => {
    beforeEach(() => {
      cy.intercept(
        "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1",
        {
          statusCode: 500,
        }
      ).as("error-ten-exchanges");

      cy.intercept("https://api.coingecko.com/api/v3/exchanges/binance", {
        statusCode: 500,
      }).as("error-binance");
    });

    it("Appears on Directory Page when data fetching fails", () => {
      cy.visit(BASE_URL);
      cy.wait("@error-ten-exchanges");
      cy.get(".error-msg");
    });

    it("Appears on Exchange Detail Page when data fetching fails", () => {
      cy.visit(BASE_URL + "exchanges/binance");
      cy.wait("@error-binance");
      cy.get(".error-msg");
    });
  });
});
