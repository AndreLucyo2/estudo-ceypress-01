//Carregar mais dados e funções no inlesence do cypress, tipo um help com 
/// <reference types = "Cypress" />

//Importa as funções do arquivo utils.js
import { format, prepareLocalStorage } from '../support/utils'

//-----------------------------------------------------------------------------
//Hooks:
// Trechos de codigo que executam antes e depois do teste
// before -> antes de todos os teste
// beforeeach -> antes de cada teste 
// after -> depois de todos os testes
// afterEach -> depois de cada teste
context('Dev Fianaças agilizar', () => {

    beforeEach(() => {

        cy.visit('https://devfinance-agilizei.netlify.app/#', {
            //Executa antes do carregamento da pagina: O teste ja inicia com dados   
            onBeforeLoad: (win) => {
                //Executa a função que ja cria as inserções, a lista ja iniciará com 2 registros na momoria
                prepareLocalStorage(win)
            }
        })
    });

    //-----------------------------------------------------------------------------
    //CENARIO: Cadastrar entradas
    it('Cadastrar ENTRADAS', () => {
        // - Entender o fluxo manualmente na tela - Interagir com a tela como usuario

        //ver hooks

        // - Mapear os elementos que vamos interagir: conforme inspeção no seletor
        // - adicionar as interações como o Cypress
        cy.get('#transaction .button').click();//Mepeado pelo Id e pela classe
        cy.get('#description').type('Salario');//Mepeado pelo Id 
        cy.get('[name=amount]').type(12);//mapeado por atributos
        cy.get('[type=date]').type('2021-05-12');//mapeado por atributos
        cy.get('button').contains('Salvar').click();//tipo do elemento que contem ...

        // - adicionar as asserções que a gente precisa
        cy.get('#data-table tbody tr').should('have.length', 3);//apos o rodar o teste a tabela deve conter 3 registro

        //Validar se os tipos de dados... 

    });

    //-----------------------------------------------------------------------------
    //CENARIO: Cadastrar saidas
    it('Cadastrar SAIDAS', () => {
        // - Entender o fluxo manualmente na tela - Interagir com a tela como usuario

        //ver cobr hooks

        // - Mapear os elementos que vamos interagir: conforme inspeção no seletor
        // - adicionar as interações como o Cypress
        cy.get('#transaction .button').click();//Mepeado pelo Id e pela classe
        cy.get('#description').type('Salario');//Mepeado pelo Id 
        cy.get('[name=amount]').type(-12);//mapeado por atributos
        cy.get('[type=date]').type('2021-05-12');//mapeado por atributos
        cy.get('button').contains('Salvar').click();//tipo do elemento que contem ...

        // - adicionar as asserções que a gente precisa : ja inicará com 2 registros
        cy.get('#data-table tbody tr').should('have.length', 3);//apos o rodar o teste a tabela deve conter 3 registro

        //Validar se os tipos de dados... 

    });

    //-----------------------------------------------------------------------------
    //remover entradas e saidas 
    // - enteder o fluxo manualmente
    // - mapear os elementos que vamos interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que precisamos
    it('Remover entradas e saidas', () => {

        //Estrategia 1 para o seletor: voltar par ao elemento pai, e avançar até o td img com o atributo...
        cy.get('td.description')               //refina e filtra o componente que vai buscar o texto
            .contains('Mesada')               // busca o elemento pelo texto
            .parent()                        // a pasrtir do elemento pai
            .find('img[onclick*=remove]')    //Descobre o elemento
            .click();

        //Estrategia 2 para o seletor: buscar todos os irmãos
        cy.get('td.description')         // refina e filtra o componente que vai buscar o texto
            .contains('Suco Kapo')               // busca o elemento pelo texto
            .siblings()                      // a partir do elemento irmão
            .find('img[onclick*=remove]')    // Descobre o elemento img com atributo especifico
            .click();

    });


    //-----------------------------------------------------------------------------
    // - capturar as linhas com as transações
    // - Formatar esses valores das linhas com
    // - Capturar o textos dessas colunas com valores
    // - somar os valores de entradas e saidas
    // - capturar o texto do total
    // - comparar o comatorio de entradas e despesas com o total calculado.
    it('Validar Salvo com diversas transações', () => {

        let incomes = 0
        let expenses = 0

        //--------------------------------------------------------------------------------
        cy.get('#data-table tbody tr').each(($el, index, $list) => {        //faz o laço nas linhas da tabela
            cy.log(index)//Printa o indice

            cy.get($el).find('td.income, td.expense')    //obtem o elemento
                .invoke('text').then(text => {           //obtem a função java script do navegador e guarda em uma variavel

                    //cy.log(text)   //printa o conteudo obtido  https://www.youtube.com/watch?v=lNn10W6ijP0&list=PLnUo-Rbc3jjztMO4K8b-px4NE-630VNKY&index=9
                    //cy.log(format(text))

                    //-----------------------
                    //captura os valores da linha
                    if (text.includes('-')) {
                        expenses = expenses + format(text)
                    } else {
                        incomes = incomes + format(text)
                    }

                    //Mostra os valor 
                    cy.log('Entradas:', incomes)
                    cy.log('Entradas:', expenses)
                })
        })

        cy.get('#totalDisplay').invoke('text').then(text => {

            //Pega o valor da tela e formata:
            let formatedTotalDisplay = format(text)
            //Calcula o valor conforme as linhas da tabela:
            let expectedTotal = incomes + expenses
            //Regra: Espera que os valores da tela seja igual ao calculado:
            expect(formatedTotalDisplay).to.eq(expectedTotal)

        })

    });

});