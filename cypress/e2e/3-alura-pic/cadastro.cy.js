<reference types="cypress" />
describe('Testes de usabilidade homepage', () => {

    beforeEach(() => {
        cy.visit('/')
    })

        it('verifica mensagens de email invalido', () => {
            cy.registroUsuario('exemplo', 'exemplo', 'abcde', '12345678');
            cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible'); //verifica se a mensagem 'Invalid e-mail' aparece
        })

        it('verifica mensagens validacao', () => {
            cy.contains('a', 'Register now').click(); //procura o link que é representado na tag 'a' do html e se contem 'Register now' ele clica
            cy.contains('button', 'Register').click();
            cy.contains('ap-vmessage', 'Email is required!').should('be.visible'); //verifica se a mensagem 'Email is required' aparece
            cy.contains('button', 'Register').click();
            cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
            cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
            cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        })

        it('verifica mensagem de senha com menos de 8 caract', () => {
            cy.registroUsuario('exemplo@abc.com', 'exemplo', 'abcde', '1238');
            cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');    
        })

        it('verifica letra maiuscula no username', () => {
            cy.registroUsuario('exemplo@abc.com', 'exemplo', 'ABcde', '12345678');
            cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');    
        })
})