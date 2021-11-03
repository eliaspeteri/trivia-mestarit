describe('Open the application', () => {
  it('Opened successfully', () => {
    cy.visit('localhost:3000');

    cy.contains('MAIN MENU');
    cy.contains('JOIN');
    cy.contains('HOST');
    cy.get('');
  });
});
