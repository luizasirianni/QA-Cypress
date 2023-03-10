
<reference types="cypress" />
describe('Login de usuarios', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
            statusCode: 400 //cria um objeto de teste (mock) pra forçar o post retornar status 400
        }).as('stubPost') //alias para essa interceptação
        //incluir no metodo de fazer login válido pra aguardar esse intercept
    })

    it('fazer login de usuario valido', () => {
        cy.login(Cypress.env('userName'), Cypress.env('password')) //verificar arquivo gui_commands.js e e2e.js
        cy.wait('@stubPost') //aguarda o intercept 
        cy.contains('a', '(Logout)').should('be.visible');
    })

    it('fazer login de usuario invalido', () => {
        cy.login('luiza', 'a1b2c3')
        //tambem pode ser usado para o botao:
        //cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password');
        })
    })

    it('fazer LOGOUT de usuario', () => {
        cy.get('input[formcontrolname="userName"]').type('flavio');
        cy.get('input[formcontrolname="password"]').type('123');
        cy.get('button[type="submit"]').click();
        cy.contains('a', '(Logout)').click();
        cy.url().should('be.equal', 'https://alura-fotos.herokuapp.com/#/home');
    })
})