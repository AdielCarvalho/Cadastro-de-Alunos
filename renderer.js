//1. Variáveis Globais
// Array que armazenará todos os alunos
let alunos = [];

//Variável para controlar se estamos editando um aluno
let editando = false;

//2. Funções de Armazenamento (LocalStorage)

//Salva os alunos no LocalStorage do navegador
//LocalStorage permite armazenar dados que persistem mesmo após fechar o aplicativo
function salvarNoStorage(){
    //Converte o array de alunos para texto JSON e Salva
    localStorage.setItem('alunos',JSON.stringify(alunos));
}

//Carrega os alunos salvos no LocalStorage
//Execulta quando o aplicativo inicia
function carregarDoStorage() {
    //Busca os dados salvos
    const dadosSalvos = localStorage.getItem('alunos');

    //Se existem dados salvos, converte de texto JSON para array
    if (dadosSalvos){
        alunos = JSON.parse(dadosSalvos);
        console.log('Dados carregados do LocalStorage', alunos);
    } else {
        //Se não existem dados, inicializa array vazio
        alunos=[]
        console.log('Nenhum dado encontrado no LocalStorage');
    }
}

//3. Funções do CRUD
//CREAT - Adiciona um novo aluno ao sistema
//@param {Object} aluno - Objeto contendo os dados do aluno

function adicionarAluno(aluno){
    //Gera um Id único usando timestamp (data/hora atual em milissegundos)
    aluno.id = Date.now();

    //Adiciona o aluno no array
    alunos.push(aluno);

    //Salva no LocalStorage
    salvarNoStorage();

    console.log('Aluno Adicionado: ', aluno)
}

//READ - Retorna todos os alunos cadastrados
//@returns {Array} Array com todos os alunos

function listarAlunos() {
    return alunos;
}

//4. Funções de interface (UI)

//Renderiza a tabela de alunos na tela
//Atualiza o HTML da tabela com os dados atuais

function renderizarTabela(){
    //pega a referência do elemento tbody da tabela
    const tbody = document.getElementById('tabelaAlunos');

    //Limpa o conteúdo atual da tabela
    tbody.innerHTML= '';

    //Busca todos os alunos
    const todosAlunos = listarAlunos();

    //Se não há alunos cadastrados
    if (todosAlunos.length===0){
        tbody.innerHTML = `
        <tr>
            <td colspan='5' class="no-data">Nenhum aluno cadastrado ainda.</td>
        </tr>
        `;
        return;
    }

    //Para cada aluno cria uma linha na tabela
    todosAlunos.forEach(aluno=> {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
           <td>${aluno.nome}</td>
           <td>${aluno.matricula}</td>
           <td>${aluno.email}</td>
           <td>${aluno.idade}</td>
        `;
        tbody.appendChild(tr);
    });

    console.log('Tabela renderizada com', todosAlunos.length, 'aluno(s)');
}

//5.Eventos e Inicialização
//Evento de submit do formulário
//Execultado quando o usuário clica em "Salvar" ou "Atualizar"

document.getElementById('formAluno').addEventListener('submit', function(e){
    //Previne o comportamento padrão do formulário (Recarregar a página)
    e.preventDefault();

    //Captura os valores dos campos
    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('nome').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = parseInt(document.getElementById('idade').value);

    //Validações básicas
    if(!nome|| !matricula || !email || !idade) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    //Cria objeto com os dados do aluno
    const aluno= {
        nome: nome,
        matricula: matricula,
        email: email,
        idade: idade
    };

    //Verifica se está editando ou adicionando
    if(editando && id){
        //Atualiza aluno existente
        atualizarAluno(parseInt(id),aluno);
        alert('Aluno atualizado com sucesso!');
    } else {
        //Adiciona novo aluno
        adicionarAluno(aluno);
        alert('Aluno cadastrado com sucesso!');
    }

    //Limpa o formulário e atualiza a tabela
    limparFormulario();
    renderizarTabela();
});

//Inicialização do aplicativo
//Executado quando a página carrega

window.addEventListener('DOMContentLoaded', function(){
    console.log('=== Sistema de Cadastro de Alunos v2.0 ===');
    console.log('Aplicativo iniciado!');

    //Carrega os dados salvos
    carregarDoStorage();

    //Renderiza a tabela inicial
    renderizarTabela();

    console.log('Sistema pronto para uso!')
})

