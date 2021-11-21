const url = 'localhost:3000';
const hostname = 'host';

beforeEach(() => {
  cy.visit(url);
});

describe('Open the application', () => {
  it('Opened successfully', () => {
    cy.contains('MAIN MENU');
    cy.contains('JOIN');
    cy.contains('HOST');
  });
});

describe('Add a question', () => {
  it('Can add a question to test database', () => {
    cy.contains('Add Question').click();
    cy.get('#questionInput')
      .type('test question 1')
      .should('have.value', 'test question 1');
    cy.get('#answer1').type('test answer 1');
    cy.get('#answer2').type('test answer 2');
    cy.get('#answer3').type('test answer 3');
    cy.get('#answer4').type('test answer 4');
    cy.get('#correctAnswer').click();
    cy.contains('Answer 1').click();
    cy.get('#difficulty').click();
    cy.contains('Medium').click();
    cy.contains('Submit').click();
    cy.contains('Question added!');
  });
});

describe('Host a game', () => {
  it('Hosting successfully', () => {
    cy.contains('HOST').click();
    cy.get('input').type(hostname).should('have.value', hostname);
    cy.contains('HOST').click();
    cy.url().should('include', '/game');
    cy.contains('START').click();
    cy.contains('test answer 1').click();
    cy.wait(25000);
    cy.contains('test answer 2').click();
    cy.contains('Position');
    cy.contains('Player');
    cy.contains('Points');
    cy.contains(hostname);
  });
});
