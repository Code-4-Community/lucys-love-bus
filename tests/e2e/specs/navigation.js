
describe('Testing Navigation', () => {
  it('Test that urls take you to correct page', () => {
    // landing page
    cy.visit('/');
    cy.contains('h4', 'Welcome!');

    /* //events
    cy.visit('/events');
    cy.contains('span', 'Page 1');

    //login
    cy.visit('/login');
    cy.contains('span', 'Sign in to your account');

    //checkout
    cy.visit('/checkout');
    cy.contains('h1', 'My Cart');
    */
  });

  /* it('Visits all pages from landing page', () => {
    cy.visit('/');

    cy.contains('About Us').click();
    cy.url().should('include', '/about-us');

    //reset
    cy.visit('/');

    //connection to events
    cy.contains('Events').click();
    cy.url().should('include', '/events');

    //reset
    cy.visit('/');

    //connection to Log In
    cy.contains('Log In').click();
    cy.url().should('include', '/login');

    //reset
    cy.visit('/');

    //connection to checkout
    cy.contains('Checkout').click();
    cy.url().should('include', '/checkout');
  });

  it('Visits all pages from About Us', () => {
    cy.visit('/about-us');

    //connection to landing page
    cy.get('.title').click();
    cy.url().should('eq', 'http://localhost:8080/');

    //reset
    cy.visit('/about-us');

    //connection to events
    cy.contains('Events').click();
    cy.url().should('include', '/events');

    //reset
    cy.visit('/about-us');

    //connection to Log In
    cy.contains('Log In').click();
    cy.url().should('include', '/login');

    //reset
    cy.visit('/about-us');

    //connection to checkout
    cy.contains('Checkout').click();
    cy.url().should('include', '/checkout');

  });

  it('Visits all pages from Events', () => {
    cy.visit('/events');

    cy.get('.title').click();
    cy.url().should('eq', 'http://localhost:8080/');

    //reset
    cy.visit('/events');

    //connection to About Us
    cy.contains('About Us').click();
    cy.url().should('include', '/about-us');

    //reset
    cy.visit('/events');

    //connection to Log In
    cy.contains('Log In').click();
    cy.url().should('include', '/login');

    //reset
    cy.visit('/events');

    //connection to checkout
    cy.contains('Checkout').click();
    cy.url().should('include', '/checkout');

  });

  it('Visits all pages from login', () => {
    cy.visit('/login');

    //connection to landing page
    cy.get('.title').click();
    cy.url().should('eq', 'http://localhost:8080/');

    //reset
    cy.visit('/login');

    //connection to events
    cy.contains('About Us').click();
    cy.url().should('include', '/about-us');

    //reset
    cy.visit('/login');

    //connection to Events
    cy.contains('Events').click();
    cy.url().should('include', '/events');

    //reset
    cy.visit('/login');

    //connection to checkout
    cy.contains('Checkout').click();
    cy.url().should('include', '/checkout');

  });

  it('Visits all pages from checkout', () => {
    cy.visit('/checkout');

    //connection to landing page
    cy.get('.title').click();
    cy.url().should('eq', 'http://localhost:8080/');

    //reset
    cy.visit('/checkout');

    //connection to events
    cy.contains('About Us').click();
    cy.url().should('include', '/about-us');

    //reset
    cy.visit('/checkout');

    //connection to Log In
    cy.contains('Log In').click();
    cy.url().should('include', '/login');

    //reset
    cy.visit('/checkout');

    //connection to events
    cy.contains('Events').click();
    cy.url().should('include', '/events');

  });
  */
});
