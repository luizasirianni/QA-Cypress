describe('Testes de usabilidade homepage', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/')
    })

    
    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it(`registra novo usuario ${usuario.userName}`, () => {
            cy.registroUsuario(usuario.email, usuario.fullName, usuario.userName, usuario.password);
        })
    })
})

