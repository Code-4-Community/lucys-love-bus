describe('Verify that we can build the code and see the login page', () => {
  it('shows login', () => {
    cy.visit('/');
    cy.contains('p', 'The Sajni Center');
  });
  // just testing Cypress

  it('Test that urls take you to correct page', () => {
    const eventsPath = '/upcoming-events';

    cy.visit(eventsPath);
    cy.screenshot();
    cy.contains('p', 'Our Upcoming Events');
  });
});
