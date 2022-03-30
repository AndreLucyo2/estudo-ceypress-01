export const format = (value) => {
    let formattedValue

    formattedValue = value.replace(',', '.')
    formattedValue = Number(formattedValue.split('$')[1].trim())

    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue

    return formattedValue
}

export const randomNumber = () => {
    return Math.floor(Math.random() * 101)
}

//Esta função cria dois objetos na memoria do navegador
export const prepareLocalStorage = (win) => {

    //win representa a janela do navegador, e acessa o local starage
    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
            description: "Mesada",
            amount: randomNumber() * 100,
            date: "29/03/2022"
        },
        {
            description: 'Suco Kapo',
            amount: - (randomNumber() * 100),
            date: "30/03/2022"
        }
    ])
    )

}