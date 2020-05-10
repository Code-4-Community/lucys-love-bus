
// This command logs you in as either a GP (General Participant), PF (Participating Family) or Admin
// ** Right now just logs you in as an example user **
Cypress.Commands.add("login", () => {
    
    //a user with PF capabilities
    const userPF = {
        email: 'user@example.com',
        password: 'secret'
    }

    cy.visit('/');

    cy.get('input[placeholder="Email Address"]').type(userPF.email);
    cy.get('input[placeholder="Password"]').type(userPF.password);
    
    cy.get('.auth-container > button').click();

    cy.wait(1000);

});
