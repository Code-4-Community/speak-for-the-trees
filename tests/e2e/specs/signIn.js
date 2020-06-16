
describe('Sign in', () => {
  // const baseUrl = 'http://localhost:8080';
  // const landing = '/';

  // beforeEach(() => {
  //   cy.login();
  // });

  it('Loads the login page as root', () => {
    cy.visit('/');
    cy.contains('h1', 'Login');
  });
});
