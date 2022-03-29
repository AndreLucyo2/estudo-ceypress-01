//Carregar mais dados e funções no inlesence do cypress, tipo um help com 
/// <reference types = "Cypress" />


context('Dev Fianaças agilizar', () => {


    //Hooks:
    // Trechos de codigo que executam antes e depois do teste
    // before -> antes de todos os teste
    // beforeeach -> antes de cada teste 
    // after -> depois de todos os testes
    // afterEach -> depois de cada teste

    beforeEach(() => {

        cy.visit('https://devfinance-agilizei.netlify.app/#');

        //Diz para o cypress que a lista inicia com zero elementos
        cy.get('#data-table tbody tr').should('have.length', 0);

    });


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
        cy.get('#data-table tbody tr').should('have.length', 1);//apos o rodar o teste a tabela deve conter 1 registro

        //Validar se os tipos de dados... 

    });

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

        // - adicionar as asserções que a gente precisa
        cy.get('#data-table tbody tr').should('have.length', 1);//apos o rodar o teste a tabela deve conter 1 registro

        //Validar se os tipos de dados... 

    });

    ////////////////////////////////
    //remover entradas e saidas 
    // - enteder o fluxo manualmente
    // - mapear os elementos que vamos interagir
    // - descrever as interações com o cypress
    // - adicionar as asserções que precisamos
    it('Remover entradas e saidas', () => {

        const entrada = 'Mesada1'
        const saida = 'KinderOvo'

        //Cria uma transação de entrada
        cy.get('#transaction .button').click();//Mepeado pelo Id e pela classe
        cy.get('#description').type(entrada);//Mepeado pelo Id 
        cy.get('[name=amount]').type(100);//mapeado por atributos
        cy.get('[type=date]').type('2021-05-12');//mapeado por atributos
        cy.get('button').contains('Salvar').click();//tipo do elemento que contem ...

        //Cria uma transação de saida
        cy.get('#transaction .button').click();//Mepeado pelo Id e pela classe
        cy.get('#description').type(saida);//Mepeado pelo Id 
        cy.get('[name=amount]').type(-35);//mapeado por atributos
        cy.get('[type=date]').type('2021-05-12');//mapeado por atributos
        cy.get('button').contains('Salvar').click();//tipo do elemento que contem ...

        //Estrategia 1 para o seletor: voltar par ao elemento pai, e avançar até o td img com o atributo...
        cy.get('td.description')               //refina e filtra o componente que vai buscar o texto
            .contains(entrada)               // busca o elemento pelo texto
            .parent()                        // a pasrtir do elemento pai
            .find('img[onclick*=remove]')    //Descobre o elemento
            .click();


        //Estrategia 2 para o seletor: buscar todos os irmãos
        cy.get('td.description')         // refina e filtra o componente que vai buscar o texto
            .contains(saida)               // busca o elemento pelo texto
            .siblings()                      // a partir do elemento irmão
            .find('img[onclick*=remove]')    // Descobre o elemento img com atributo especifico
            .click();



    });


    ////////////////////////////////
    // - capturar as linhas com as transações
    // - Formatar esses valores das linhas com
    // - capturar o texto do totales
    // - comparar o comatorio de entradas e despesas com o total calculado.
    it.only('Validar Salvo com diversas transações', () => {

        const entrada = 'Mesada1'
        const saida = 'KinderOvo'

        //Cria uma transação de entrada
        cy.get('#transaction .button').click();//Mepeado pelo Id e pela classe
        cy.get('#description').type(entrada);//Mepeado pelo Id 
        cy.get('[name=amount]').type(100);//mapeado por atributos
        cy.get('[type=date]').type('2021-05-12');//mapeado por atributos
        cy.get('button').contains('Salvar').click();//tipo do elemento que contem ...

        //Cria uma transação de saida
        cy.get('#transaction .button').click();//Mepeado pelo Id e pela classe
        cy.get('#description').type(saida);//Mepeado pelo Id 
        cy.get('[name=amount]').type(-35);//mapeado por atributos
        cy.get('[type=date]').type('2021-05-12');//mapeado por atributos
        cy.get('button').contains('Salvar').click();//tipo do elemento que contem ...

        //--------------------------------------------------------------------------------
        cy.get('#data-table tbody tr')            //Seleciona a tabela
            .each(($el, index, $list) => {        //faz o laço nas linhas da tabela
                cy.log(index)                     //Printa o indice
            })





    });



});