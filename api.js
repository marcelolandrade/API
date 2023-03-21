
const option = {
     url: `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`,
     method: 'GET',
     headers: {
         'Accept': 'application/json',
         'Accept-Charset': 'utf-8'
     }

 }

//chama só a cotação do Dólar
let valorDoDolar = function(erro, res, body){

    let json = JSON.parse(body)
    cotacao = json.USDBRL['bid']
}
console.log(valorDoDolar)
// só a cotação do Euro
let valorDoEuro = function(erro, res, body){
    let json = JSON.parse(body)
    cotacao = json.EURBRL['bid']
}

// cotação do bitcoin
let valorDoBitcoin = function(erro, res, body){
    let json = JSON.parse(body)
    cotacao = json.BTCBRL['bid']
}

let valorEmReal    = 0

let moedaEstrangeira = ''
let moedaConvertida  = 0.00

// request(option, valorDoBitcoin)

// selecionar input com o numero digitado
let valorDigitado = document.querySelector('#valorEmReal')

// selecionar os elementos radios, criar um array
let moedaSelecionada = document.getElementsByName('moedaEstrangeira')

let aviso = document.querySelector('#aviso')

// selecionar os botoes
let btnConverter = document.querySelector('#btnConverter')
let btnLimpar    = document.querySelector('#btnLimpar')


// MENSAGEM EXIBIR VALORES MONETARIOS
function mensagemFormatada(moedaConvertida) {
    isNaN(valorEmReal) ? valorEmReal = 0 : ''
    aviso.textContent = moedaConvertida
}

/* VERIFICAR SE FOI DIGITADO ALGUM VALOR PARA PODER CONVERTER */
function bloquearBotao() {
    if(valorDigitado.value == 0 || valorDigitado == '' || valorDigitado == null) {
        btnConverter.setAttribute('disabled', 'disabled')
        btnConverter.style.background = '#ccc'
        btnConverter.style.cursor = 'not-allowed'
    }
}

// REATIVAR BOTAO
function ativarBotao() {
    if(valorDigitado.value > 0) {
        btnConverter.removeAttribute('disabled')
        btnConverter.style.background = '#ffc107'
        btnConverter.style.cursor = 'pointer'
    } else {
        console.log('Nao ativou')
    }
}

// VERIFICAR QUAL BOTAO RADIO ESTA MARCADO
// vincular a verificacao a um evento, click no botao Converter
btnConverter.addEventListener('click', function() {
    // FAZER o parseFloat dos valores monetarios (converter String para Float)
    valorEmReal = parseFloat(valorDigitado.value)

    for(let i = 0; i < moedaSelecionada.length; i++) {
        if(moedaSelecionada[i].checked) {
            moedaEstrangeira = moedaSelecionada[i].value
          
        }
    }


// CONVERSAO DE MOEDAS
// Operacao basica pegar moedaEstrangeira e dividir pelo valorEmReal
    switch(moedaEstrangeira) {
        
        case 'Dólar':
            moedaConvertida = valorEmReal / valorDoDolar
            mensagemFormatada(moedaConvertida.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
        break

        case 'Euro':
            moedaConvertida = valorEmReal / valorDoEuro
            mensagemFormatada(moedaConvertida.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }))
        break

        case 'Bitcoins':
            moedaConvertida = valorEmReal / valorDoBitcoin
            mensagemFormatada(parseFloat(moedaConvertida).toFixed(5))
        break
    
        default:
            aviso.textContent = 'Escolha uma moeda estrangeira'
    }
    isNaN(moedaConvertida) ? moedaConvertida = 0 : ''
})

btnLimpar.addEventListener('click', function() {
    valorDigitado.focus()
    valorDigitado.value = ''
    aviso.textContent = 'Digite o valor, escolha a moeda e converter'
    moedaSelecionada[0].checked = false
    moedaSelecionada[1].checked = false
    moedaSelecionada[2].checked = false
})