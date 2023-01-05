<reference types="cypress" />
const cypressConfig = require("../../../cypress.config")

describe('Buscar fotos e dados', ()=> {

    it('buscar fotos flavio', ()=>{

        const tempoEsperado = Math.random() * 2000;
        cy.request({
            method: 'GET',
            url: 'https://apialurapic.herokuapp.com/flavio/photos'
        }).then((res) => {
            expect(res.status).to.be.equal(200) //espera que o código HTTP seja 200 
            expect(res.body).is.not.empty //espera que o array de fotos não esteja vazio
            expect(res.body[0]).to.have.property('description') //espera que o array na posicao 0 tenha descrição
            expect(res.body[0].description).to.be.equal('Farol iluminado') //espera que a descrição do array na posição 0 seja 'Farol iluminado'
            //expect(res.duration).to.be.lte(tempoEsperado); //espera que o tempo seja menor que o tempo esperado
        })
    }) 

    it('login flavio', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://apialurapic.herokuapp.com/user/login',
            body: Cypress.env()
            
        }).then((res) => {
            expect(res.status).to.be.equal(200) //espera que o código HTTP seja 200 
            expect(res.body).is.not.empty //espera que o body não esteja vazio
            expect(res.body).to.have.property('id') //espera que o body retorne um id
            expect(res.body.id).to.be.equal(1) //espera que o id gerado seja = 1
            expect(res.body).to.have.property('email') //espera que o body retorne um email
            expect(res.body.email).to.be.equal("flavio@alurapic.com.br") //espera que o email seja flavio@alurapic...
            
        })
    }) 
})