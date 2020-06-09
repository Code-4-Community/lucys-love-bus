describe('Verify that we can build the code and see the login page', () => {
  it('shows login', () => {
    cy.visit('/');
    cy.contains('p', 'The Sajni Center: A space of hope and healing. We are excited to invite you and your family to view the wide selection of group interactive therapies that we offer.');
  });
});
