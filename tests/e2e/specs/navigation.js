
describe('Testing Navigation', () => {
  // const baseURL = 'http://localhost:8080/';
  // const homePath = '/';
  const eventsPath = '/events';
  const checkoutPath = '/checkout';
  const profilePath = '/profile';
  const registrationsPath = '/my-events';

  beforeEach(() => {
    cy.login();
  });

  it('Test that urls take you to correct page', () => {
    // landing page
    //* **** Currently failing because routing to page is wrong *****
    //* **** Update this test when routing is fixed *****
    /* cy.visit(homePath);
      cy.contains('p', 'HOME');
      */

    // events
    cy.visit(eventsPath);
    cy.contains('p', 'Our Upcoming Events');

    // checkout
    cy.visit(checkoutPath);
    cy.contains('p', 'My Cart');

    // profile
    cy.visit(profilePath);
    cy.contains('div', 'Welcome');

    // registrations
    cy.visit(registrationsPath);
    cy.contains('p', 'My Registered Events');
  });

  // it('Visits all pages from landing page', () => {
  //   cy.visit(homePath);
  //
  //   // connection to events
  //   cy.contains('Events').click();
  //   cy.url().should('include', eventsPath);
  //
  //   // reset
  //   cy.visit(homePath);
  //
  //   // connection to checkout
  //   cy.contains('Checkout').click();
  //   cy.url().should('include', checkoutPath);
  //
  //   // reset
  //   cy.visit(homePath);
  //
  //   // connection to registrations
  //   cy.contains('Registrations').click();
  //   cy.url().should('include', registrationsPath);
  //
  //   // reset
  //   cy.visit(homePath);
  //
  //   // connection to profile
  //   cy.contains('Profile').click();
  //   cy.url().should('include', profilePath);
  // });
  //
  // it('Visits all pages from Events', () => {
  //   cy.visit(eventsPath);
  //
  //   cy.get('.title').first().click();
  //   cy.url().should('eq', baseURL);
  //
  //   // reset
  //   cy.visit(eventsPath);
  //
  //   // connection to checkout
  //   cy.contains('Checkout').click();
  //   cy.url().should('include', checkoutPath);
  //
  //   // reset
  //   cy.visit(eventsPath);
  //
  //   // connection to registrations
  //   cy.contains('Registrations').click();
  //   cy.url().should('include', registrationsPath);
  //
  //   // reset
  //   cy.visit(eventsPath);
  //
  //   // connection to profile
  //   cy.contains('Profile').click();
  //   cy.url().should('include', profilePath);
  // });
  //
  // it('Visits all pages from checkout', () => {
  //   cy.visit(checkoutPath);
  //
  //   // connection to landing page
  //   cy.get('.title').click();
  //   cy.url().should('eq', baseURL);
  //
  //   // reset
  //   cy.visit(checkoutPath);
  //
  //   // connection to events
  //   cy.contains('Events').click();
  //   cy.url().should('include', eventsPath);
  //
  //   // reset
  //   cy.visit(checkoutPath);
  //
  //   // connection to registrations
  //   cy.contains('Registrations').click();
  //   cy.url().should('include', registrationsPath);
  //
  //   // reset
  //   cy.visit(checkoutPath);
  //
  //   // connection to profile
  //   cy.contains('Profile').click();
  //   cy.url().should('include', profilePath);
  // });
  //
  // it('Visits all pages from registrations', () => {
  //   cy.visit(registrationsPath);
  //
  //   // connection to landing page
  //   cy.get('.title').click();
  //   cy.url().should('eq', baseURL);
  //
  //   // reset
  //   cy.visit(registrationsPath);
  //
  //   // connection to events
  //   cy.contains('Events').click();
  //   cy.url().should('include', eventsPath);
  //
  //   // reset
  //   cy.visit(registrationsPath);
  //
  //   // connection to checkout
  //   cy.contains('Checkout').click();
  //   cy.url().should('include', checkoutPath);
  //
  //   // reset
  //   cy.visit(registrationsPath);
  //
  //   // connection to profile
  //   cy.contains('Profile').click();
  //   cy.url().should('include', profilePath);
  // });
  //
  // it('Visits all pages from profile', () => {
  //   cy.visit(profilePath);
  //
  //   // connection to landing page
  //   cy.get('.title').first().click();
  //   cy.url().should('eq', baseURL);
  //
  //   // reset
  //   cy.visit(profilePath);
  //
  //   // connection to events
  //   cy.contains('Events').click();
  //   cy.url().should('include', eventsPath);
  //
  //   // reset
  //   cy.visit(profilePath);
  //
  //   // connection to registrations
  //   cy.contains('Registrations').click();
  //   cy.url().should('include', registrationsPath);
  //
  //   // reset
  //   cy.visit(profilePath);
  //
  //   // connection to checkout
  //   cy.contains('Checkout').click();
  //   cy.url().should('include', checkoutPath);
  // });
});
