<reference types="cypress" />
describe('Testes de usabilidade homepage', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    
    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it(`registra novo usuario ${usuario.userName}`, () => {
            cy.registroUsuario(usuario.email, usuario.fullName, usuario.userName, usuario.password);
        })
    })
})

