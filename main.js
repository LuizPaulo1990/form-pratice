const nomeImput = document.getElementById('name');
//essa função recebe parametro tecla e compara se a tecla apertada é igual a algum elemento da string numerais ou seja compara se a tecla a pertada é um número, se for um numero ela apaga o numero para que nome não tenha numero nele e retorna false
function retiraNumeral(tecla) {
  let numerais = '0123456789';
  for (let i = 0; i < numerais.length; i++) {
    if (numerais[i] == tecla) {
      nomeImput.value = nomeImput.value.substring(0, nomeImput.value.length - 1);
      return false;
    }
  }

}
function validaNome(event) {
  //caso a função retiraNumeral recebendo como paramêtro evento.key for falso ele para a função validaNome
  if (retiraNumeral(event.key) == false) {
    return;
  };
  // impedir que a primeira letra seja um espaço!
  if (nomeImput.value.length == 1) {
    nomeImput.value = nomeImput.value.trim();
  }
  //console.log(event);
  let nome = nomeImput.value;
  //console.log(nomeImput.value.length);
  // verifica se tem espaço entre nome e sobre nome, caso não tenha muda a cor da borda para vermelha e envia erro para console avisando que nome e sobre nome são obrigatórios
  if (nome.indexOf(' ') == -1 && event.type == 'change') {
    nomeImput.style.borderColor = 'red';
    console.error('Nome e sobrenome são obrigatórios')
    return;
  } else {
    nomeImput.style.borderColor = 'rgb(118, 118, 118)';
  }
  //Coloca a primera letra em maiúsculo e as demais em letra minúscula
  nome = nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
  //se existir dois espaços ele subistitui um por uma string vazia fazendo com que só fique um espaço
  while (nome.indexOf('  ') != -1) {
    nome = nome.replace('  ', ' ');
  }
  //caso o espaço não tenha sua primeira aparição igual a sua ultima, variavel nome recebe uma substring que vai do index 0 até ultimo index antes da ultima vez que espaço apareceu,assim fazendo com que não possa ter espaço depois do nome
  while (nome.indexOf(' ') != nome.lastIndexOf(' ')) {
    nome = nome.substring(0, nome.lastIndexOf(' '))
  }
  //faz com que o sobre nome comece com a letra maiúscula
  nome = nome.substring(0, nome.indexOf(' ') + 1) + nome.charAt(nome.indexOf(' ') + 1).toUpperCase() + nome.substring(nome.indexOf(' ') + 2)


  nomeImput.value = nome;
}

nomeImput.addEventListener('keyup', validaNome);
nomeImput.addEventListener('change', validaNome);

/*
  1 - email pode ter numeros e letras;
  2- email tem que ter um @;
  3- email precisa ter caracteris antes e depois do @;
  4- não pode ter mais de um @;
  5- email obrigatoriamente precisa ter pelo menos um . após o @ ;
  6 - depois do ultimo ponto ele tem que ter pelo menos 2 caracteres;
  7 - email tem que começar com uma LETRA;
  8 - não pode ter mais de 20 caracteres;
  9 - não pode ter espaço entre seus caracteres;

*/

const emailTexto = document.getElementById('email');
const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
let primeiroCaracter = false;

function validaEmail(event) {
  let email = emailTexto.value;
  // se não tiver @ no email ele da um erro avisando que todo email precisa ter @
  if (email.indexOf('@') == -1 && event.type == 'change') {
    console.error('email precisa de @!');
    return;
  }
  // se o @ estiver indice 0 na string significa que ele é primeiro caracter do email e retorna erro falando que ele não pode ser primeiro caracter
  if (email.indexOf('@') == 0 && event.type == 'change') {
    console.error('@ não pode ser o primeiro caracter!');
    return;
  }

  //verifica se o @ é o ultimo caracter na string do email e se for retorna erro falando que @ não pode ser ultimo caracter
  if (email.lastIndexOf('@') == email.length - 1 && event.type == 'change') {
    console.error('o @ não pode ser o ultimo caracter no email!');
    return;
  }
  // verifica se tem dois @ sendo que email só pode possuir um então retorna um erro
  if (email.indexOf('@') != email.lastIndexOf('@') && event.type == 'change') {
    console.error('o email não pode possuir dois @!');
    return;
  }
  // pega o valor do indice do @ e compara com valor do indice do ultimo ponto digitado se for maior significa que não tem ponto depois do email e retorna erro
  if (email.indexOf('@') > email.lastIndexOf('.') && event.type == 'change') {
    console.error('O email tem que ter . depois do @!');
    return;
  }
  //checa se tem pelo menos 2 caracteres depois do ponto caso não retorna um erro
  if (email.lastIndexOf('.') > email.length - 3 && event.type == 'change') {
    console.error('email precisa ter pelo menos 2 caracteres depois do .');
  }

  //cria um loop para checar se o que está escrito na posição index 0 ou seja no inicio do email é uma letra, se for a variavel primeiroCaracter recebe valor de true e depois o loop encerra
  for (let i = 0; i < alfabeto.length; i++) {
    if (email.charAt(0).toLowerCase() == alfabeto.charAt(i)) {
      primeiroCaracter = true;
      break;
    }
  }
  //se a variavel primeiroCaracter for igual a false e evento que função receber for do tipo 'change', retorna um erro no console indicando que o email precisa começar com uma letra
  if (primeiroCaracter == false && event.type == 'change') {
    console.error('o email precisa começar com uma letra do alfabeto!');
  }
  //se  o tamanho do email for maior que 20 ou seja se tiver mais de 20 caracteres no email, ele atribui ao valor da variavel 'emailTexto' para o valor da substring da variavel 'email' que vai do indice 0 até o 20 fazendo com que tudo depois do indice 20 seja apagado
  if (email.length > 20 && event.type == 'keyup') {
    emailTexto.value = email.substring(0, 21);
  }
  //se estiver algum espaço no email e o evento chamado for 'keyup' ele retira o espaço
  if (email.indexOf(' ') != -1 && event.type == 'keyup') {
    emailTexto.value = email.replace(' ', '');
  }
  //console.log(email);
}

emailTexto.addEventListener('change', validaEmail);
emailTexto.addEventListener('keyup', validaEmail);

/*
1- só pode ter numeros, (), espaço, - ;
2- a ordem de cada caracter;
3-só pode ter um de cada (), espaço e -;
4-só pode ter no maximo 9 números e no minimo 8;
5- todo celular começa com 9;
6-todos os telefones tem que ter o código regional;

*/


const inputTelefone = document.getElementById('phone');
const caracteresValidos = '1234567890'

function checaUltimoCaracterDigitado(numero) {
  for (let i = 0; i < caracteresValidos.length; i++) {
    if (numero.charAt(numero.length - 1) == caracteresValidos.charAt(i)) {
      return true;
    }
  }
  return false
}

function apagaCaracterInvalido(numero, verificado) {
  if (verificado == false && numero.length > 0) {
    inputTelefone.value = numero.replace(numero.charAt(numero.length - 1), '');
  }
  return inputTelefone.value;
}

function formataNumero(numero) {
  if (numero.charAt(0) != '(' && numero.length > 0) {
    inputTelefone.value = '(' + numero.charAt(0);
  }

  if (numero.charAt(3) != ')' && numero.length == 4) {
    inputTelefone.value = numero.substring(0, 3) + ') ' + numero.charAt(3);
  }


  if (numero.charAt(9) != '-' && numero.length == 10) {
    inputTelefone.value = numero.substring(0, 9) + '-' + numero.charAt(9);
  }
  return inputTelefone.value;
}

function checaCaracterEspecial(numero) {
  const caracteresEspeciais = ['(', ')', '-', ' '];
  for (let i = 0; i < caracteresEspeciais.length; i++) {
    if (numero.indexOf(caracteresEspeciais[i]) != numero.lastIndexOf(caracteresEspeciais[i])) {
      inputTelefone.value = numero.substring(0, numero.length - 1);
    }
  }
  return inputTelefone.value;
}

function verificaQuantidadeNumeros(numero, contador) {
  for (let i = 0; i < caracteresValidos.length; i++) {
    for (let k = 0; k < numero.length; k++) {
      if (caracteresValidos.charAt(i) == numero.charAt(k)) {
        contador++;
      }
    }
  }
  return contador;
}

function naoPermiteDigitarMaisQueOnzeNumeros(contador, numero) {
  if (contador > 11) {
    inputTelefone.value = numero.substring(0, numero.length - 1);

  }
  return inputTelefone.value;
}

function tratarErrosNumeroTelefone(banana, uva, maca) {
  if (banana < 10 && uva == 'change') {
    console.error('numero incompleto');
  }

  if (maca.charAt(5) != '9' && uva == 'change' && banana == 11) {
    console.error('numero de celular começa com 9');
  }
}

function formataNumeroCelular(joao, maria){
  if (joao == 11) {
    inputTelefone.value = maria.substring(0, 9) + maria.charAt(10) + maria.charAt(9) + maria.substring(11)
  }
  return inputTelefone.value;
}

function validaTelefone(event) {
  let numeroVerificado = false;
  let contador = 0;
  let numeroTelefone = inputTelefone.value;

  numeroVerificado = checaUltimoCaracterDigitado(numeroTelefone);

  numeroTelefone = apagaCaracterInvalido(numeroTelefone, numeroVerificado);

  numeroTelefone = formataNumero(numeroTelefone);

  numeroTelefone = checaCaracterEspecial(numeroTelefone);

  contador = verificaQuantidadeNumeros(numeroTelefone, contador);

  numeroTelefone = naoPermiteDigitarMaisQueOnzeNumeros(contador, numeroTelefone);

  tratarErrosNumeroTelefone(contador, event.type, numeroTelefone);

  numeroTelefone = formataNumeroCelular(contador, numeroTelefone);

}

inputTelefone.addEventListener('keyup', validaTelefone);
inputTelefone.addEventListener('change', validaTelefone);

/*
  1- obrigatóriamente ele tem que ter 11 digitos.
  2- os ultimos 2 digitos são números de validação do cpf.
  3- cada digito desses ultimos 2 digitos tem sua validação.
  4- validação do 1 digito, 059305307-93, vc pega o valor 10 e começa a multiplicar no primeiro numero do cpf e diminui a cada numero o 10 -1 ou seja, 0x10, 5x9, 9x8 .... até o valor do 10 estar em 2. 
  4.1- soma o resultado de todas essas multiplicações.
  4.2- pegar resultado e multiplicar por 10 e dividir por 11.
  4.3- o resultado dessa ultima operação tem que ser resto igual ao primeiro digito validador.
  4.4- se o resto for 10 ou 11 o digito tem que ser 0.
  4.5- caso esse primeiro digito não seja valido, o cpf ja está  errado e ja pode parar o código.
  5- caso a condição do passo 4 seja verdadeira, vamos repetir a mesma coisa, porém com os 10 primeiros números do cpf e começando  por 11 e multiplicando pelo primeiro digito de forma decrescente,ou seja, 11x0 , 10x5, 9x9 parando quando valor de 11 estiver no 2.
  5.1-o resultado dessa ultima operação tem que ser resto igual ao primeiro digito validador.
  5.2- se o resto for 10 ou 11 o digito tem que ser 0.


*/
const inputCpf = document.getElementById('cpf');
function validaCpf(){

}










































































































const pessoasList = document.getElementById('pessoas-list');
const criarPessoaForm = document.getElementById('criar-pessoa-form');

function getPessoas() {
  fetch('http://localhost:3000/pessoas')
    .then((response) => response.json())
    .then((data) => {
      pessoasList.innerHTML = '';
      data.forEach((pessoa) => {
        const li = document.createElement('li');
        li.innerText = `ID: ${pessoa.id}, Nome: ${pessoa.name}, Email: ${pessoa.email}, Telefone: ${pessoa.phone}, CPF: ${pessoa.cpf}`;
        pessoasList.appendChild(li);
      });
    });
}

criarPessoaForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  };

  fetch('http://localhost:3000/pessoas', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const li = document.createElement('li');
      li.innerText = `ID: ${data.id}, Nome: ${data.name}, Email: ${data.email}, Telefone: ${data.phone}, CPF: ${data.cpf}`;
      pessoasList.appendChild(li);
    });
});

getPessoas();