describe('Verify that we can build the code and see the login page', () => {
  it('shows login', () => {
    cy.visit('/');
    cy.contains('p', 'The Sajni Center');
  });
});
