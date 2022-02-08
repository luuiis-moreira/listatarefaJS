const input = document.querySelector('.input-tarefa');
const btnAdd = document.querySelector('.btn-tarefa');
const ulTarefas = document.querySelector('.tarefas');
let textoInput;


btnAdd.addEventListener('click', () => {
    textoInput = input.value.trim();
    if (textoInput === '') {
        inputVazio();

    } else {
        criarTarefa(textoInput);
        inputAdd();
    }
});

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        textoInput = input.value.trim();
        if (textoInput === '') {
            inputVazio();
        } else {
            criarTarefa(textoInput);
            inputAdd();
        };
    };
});

function criarTarefa(texto) {
    const li = criaLi();
    li.innerText = texto
    ulTarefas.appendChild(li)
    limpaInput();
    criaBtnAPagar(li);
    salvarTarefa();
};

function criaLi() {
    const li = document.createElement('li');
    return li;
};

function criaBtnAPagar(li) {
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    li.appendChild(btnApagar);
}

function limpaInput() {
    input.value = '';
    input.focus();
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apagar')) {
        e.target.parentElement.remove();
        salvarTarefa();
        inputRemovido();
    }
})

function inputVazio() {
    input.style.outlineColor = 'red'
    input.setAttribute('placeholder', 'Digite uma tarefa');
    input.focus();
}

function inputAdd() {
    input.style.outlineColor = 'green';
    input.setAttribute('placeholder', 'Tarefa adicionada');
    input.focus();
}

function inputRemovido() {
    input.style.outlineColor = 'blue';
    input.setAttribute('placeholder', 'Tarefa removida');
    input.focus();
};

function salvarTarefa() {
    const listaTarefas = [];
    const liTarefas = ulTarefas.querySelectorAll('li');
    for (let tarefa of liTarefas) {
        listaTarefas.push(tarefa.innerText.slice(0, -7));
    };
    const listaJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas3', listaJSON);
};

function addTarefaSalva() {
    const listaSTRING = localStorage.getItem('tarefas3');
    const listaJSON = JSON.parse(listaSTRING);

    for (let tarefa of listaJSON) {
        criarTarefa(tarefa);
    };
};
addTarefaSalva();