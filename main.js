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