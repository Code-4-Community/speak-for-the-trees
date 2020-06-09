
describe('Sign in', () => {
  // const baseUrl = 'http://localhost:8080';
  // const landing = '/';

  beforeEach(() => {
    cy.login();
  });

  it('Signs in as new user', () => {
    cy.contains('h1', 'Welcome back, User!');
  });
});
