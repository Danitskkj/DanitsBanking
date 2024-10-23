const form = document.getElementById('formDeposito');
const nomeBeneficiario = document.getElementById('nomeCompleto');
let formValido = false;
let saldoAtual = 10000.00;

function validarNome(nomeCompleto) {
    let nomeCompArray = nomeCompleto.split(' ');
    return nomeCompArray.length >= 2;
}

function diminuirSaldo(saldoAtual, valorDeposito) {
    let novoSaldo = (saldoAtual - valorDeposito);
    const caixaSaldo = document.querySelector('#saldo');
    caixaSaldo.innerHTML = `<b>Saldo: R$ ${novoSaldo.toFixed(2)}</b>`; 
    return novoSaldo;  
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const numeroContaBeneficiario = document.getElementById('numConta');
    const valorDepositoElement = document.getElementById('valor');
    const valorDeposito = parseFloat(valorDepositoElement.value);
    const mensagemSucesso = `↓ <b>R$${valorDeposito.toFixed(2)}</b> depositado para <b>${nomeBeneficiario.value}</b> Nº conta: <b>${numeroContaBeneficiario.value}</b> <br><br>`;

    formValido = validarNome(nomeBeneficiario.value);
    if (formValido) {
        const containerMensagemSucesso = document.querySelector('.sucess-message');
        containerMensagemSucesso.innerHTML = mensagemSucesso + containerMensagemSucesso.innerHTML;
        containerMensagemSucesso.style.display = 'block';

        saldoAtual = diminuirSaldo(saldoAtual, valorDeposito);  

        // Limpar os campos
        nomeBeneficiario.value = '';
        numeroContaBeneficiario.value = '';
        valorDepositoElement.value = '';
    } else {
        document.querySelector('.error-name').style.display = 'block';
        nomeBeneficiario.style.border = '1px solid red';
    }
});

nomeBeneficiario.addEventListener('keyup', function(e) {
    formValido = validarNome(e.target.value);
    if (!formValido) {
        nomeBeneficiario.classList.add('error');
        document.querySelector('.error-name').style.display = 'block';
    } else {
        nomeBeneficiario.classList.remove('error');
        document.querySelector('.error-name').style.display = 'none';
    }
});
