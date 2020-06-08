// This command logs you in as a regular user
Cypress.Commands.add('login', () => {
  // landing url
  const landing = '/';

  // a user with PF capabilities
  const userPF = {
    fname: 'User',
    lname: 'Resu',
    user: 'user',
    email: 'user@example.com',
    password: 'secret1234',
  };

  cy.visit(landing);

  cy.get('input[placeholder="EMAIL"]').type(userPF.email);
  cy.get('input[placeholder="PASSWORD"]').type(userPF.password);

  cy.get('.auth-submit').click();

  cy.wait(1000);
});
