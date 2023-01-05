describe('Login e registro de usuarios', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/')
    })

    
    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it(`registra novo usuario ${usuario.userName}`, () => {
            cy.registroUsuario(usuario.email, usuario.fullName, usuario.userName, usuario.password);
        })
    })
    
    
    it('verifica mensagens validacao', () => {
        cy.contains('a', 'Register now').click(); //procura o link que é representado na tag 'a' do html e se contem 'Register now' ele clica
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible'); //verifica se a mensagem aparece
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagens de email invalido', () => {
        cy.registroUsuario('exemplo', 'exemplo', 'abcde', '12345678');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible'); //verifica se a mensagem aparece
    })

    it('verifica mensagem de senha com menos de 8 caract', () => {
        cy.registroUsuario('exemplo@abc.com', 'exemplo', 'abcde', '1238');
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');    
    })

    it('verifica letra maiuscula no username', () => {
        cy.registroUsuario('exemplo@abc.com', 'exemplo', 'ABcde', '12345678');
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');    
    })

    it('fazer login de usuario valido', () => {
        cy.login('flavio', '123') //verificar arquivo gui_commands.js e e2e.js
        //tambem pode ser usado para o botao:
        //cy.get('button[type="submit"]').click();
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

