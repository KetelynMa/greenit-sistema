async function entrarSistema() {

    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    if (email === "" || senha === "") {
        alert("Preencha o e-mail e a senha.");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            document.querySelector(".container").style.display = "none";
            document.getElementById("painel").style.display = "flex";
        } else {
            alert("E-mail ou senha inválidos.");
        }

    } catch (erro) {
        console.log(erro);
        alert("Erro ao realizar login.");
    }
}

function mostrarCadastro() {
    document.getElementById("login").style.display = "none";
    document.getElementById("cadastro").style.display = "block";
}

function voltarLogin() {
    document.getElementById("cadastro").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function esqueceuSenha() {
    alert("Informe seu e-mail para redefinir a senha.");
}

function abrirTela(nomeTela) {

    const telas = document.querySelectorAll(".tela");

    telas.forEach((tela) => {
        tela.style.display = "none";
    });

    document.getElementById(nomeTela).style.display = "block";
}

/* CADASTRAR USUÁRIO */

async function cadastrarUsuario() {

    const nome = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    try {

        const resposta = await fetch(
            "https://recliner-nugget-residence.ngrok-free.dev/usuarios",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            }
        );

        const resultado = await resposta.text();

        alert(resultado);

        voltarLogin();

    } catch (erro) {

        console.log(erro);

        alert("Erro ao cadastrar usuário");
    }
}

/* CADASTRAR EMPRESA */

async function cadastrarEmpresa() {

    const dados = {

        razao_social: document.getElementById("razaoSocial").value,
        nome_empresa: document.getElementById("nomeEmpresa").value,
        cnpj: document.getElementById("cnpjEmpresa").value,
        porte: document.getElementById("porteEmpresa").value,
        setor: document.getElementById("setorEmpresa").value,
        cidade: document.getElementById("cidadeEmpresa").value,
        estado: document.getElementById("estadoEmpresa").value,
        colaboradores: document.getElementById("colaboradoresEmpresa").value,
        responsavel_ti: document.getElementById("responsavelEmpresa").value,
        email_responsavel: document.getElementById("emailResponsavel").value,
        telefone_responsavel: document.getElementById("telefoneResponsavel").value
    };

    try {

        const resposta = await fetch(
            "https://recliner-nugget-residence.ngrok-free.dev/empresas",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            }
        );

        const resultado = await resposta.text();

        alert(resultado);
        
        document.querySelector(".form-empresa").style.display = "none";
        
        const perfil = document.getElementById("perfilEmpresa");
        
        perfil.style.display = "block";
        
        perfil.innerHTML = `
            <div class="card-empresa">
              <h2>Empresa cadastrada com sucesso</h2>

              <p><strong>Razão social:</strong> ${dados.razao_social}</p>
              <p><strong>Nome fantasia:</strong> ${dados.nome_empresa}</p>
              <p><strong>CNPJ:</strong> ${dados.cnpj}</p>
              <p><strong>Porte:</strong> ${dados.porte}</p>
              <p><strong>Setor:</strong> ${dados.setor}</p>
              <p><strong>Cidade:</strong> ${dados.cidade}</p>
              <p><strong>Estado:</strong> ${dados.estado}</p>
              <p><strong>Colaboradores:</strong> ${dados.colaboradores}</p>
              <p><strong>Responsável TI:</strong> ${dados.responsavel_ti}</p
              <p><strong>E-mail:</strong> ${dados.email_responsavel}</p>
              <p><strong>Telefone:</strong> ${dados.telefone_responsavel}</p>
              </div>
              
              `;

    } catch (erro) {

        console.log(erro);

        alert("Erro ao cadastrar empresa");
    }
}

/* MATURIDADE */

function CalcularMaturidade() {

    const respostas = document.querySelectorAll(".resposta");

    let total = 0;

    respostas.forEach((resposta) => {
        total += Number(resposta.value);
    });

    let nivel = "";
    let descricao = "";
    let melhorias = [];

    if (total >= 5 && total <= 10) {

        nivel = "Nível 1 - Inexistente";

        descricao = "A empresa não possui práticas estruturadas de Green IT.";

        melhorias = [
            "Criar políticas básicas.",
            "Iniciar campanhas de conscientização.",
            "Mapear consumo energético."
        ];

    } else if (total >= 11 && total <= 15) {

        nivel = "Nível 2 - Básico";

        descricao = "A empresa possui iniciativas pontuais.";

        melhorias = [
            "Padronizar práticas.",
            "Criar indicadores básicos."
        ];

    } else if (total >= 16 && total <= 18) {

        nivel = "Nível 3 - Intermediário";

        descricao = "A empresa possui processos definidos.";

        melhorias = [
            "Automatizar monitoramento.",
            "Expandir sustentabilidade."
        ];

    } else if (total >= 19 && total <= 21) {

        nivel = "Nível 4 - Avançado";

        descricao = "A empresa possui práticas robustas.";

        melhorias = [
            "Buscar certificações.",
            "Expandir inovação sustentável."
        ];

    } else {

        nivel = "Nível 5 - Excelente";

        descricao = "A empresa é referência em Green IT.";

        melhorias = [
            "Manter melhoria contínua.",
            "Atuar como benchmark."
        ];
    }

    document.getElementById("resultadoMaturidade").innerHTML = `
        <div class="resultado-card">
            <h2>Resultado da Avaliação</h2>
            <p><strong>Pontuação:</strong> ${total}</p>
            <p><strong>Classificação:</strong> ${nivel}</p>
            <p><strong>Descrição:</strong> ${descricao}</p>
        </div>
    `;

    document.getElementById("scoreDashboard").innerText = total;
    document.getElementById("nivelDashboard").innerText = nivel;

    const porcentagem = (total / 25) * 100;

    document.getElementById("barraMaturidade").style.width =
        porcentagem + "%";

    document.getElementById("conteudoMelhorias").innerHTML = `
        <div class="card-melhoria">
            <h2>Recomendações</h2>
            <ul>
                ${melhorias.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>
    `;
}

/* ATIVOS */

let ativos = [];

function cadastrarAtivo() {

    const nome = document.getElementById("nomeAtivo").value;
    const tipo = document.getElementById("tipoAtivo").value;
    const consumo = document.getElementById("consumoAtivo").value;
    const idade = document.getElementById("idadeAtivo").value;
    const status = document.getElementById("statusAtivo").value;

    ativos.push({
        nome,
        tipo,
        consumo,
        idade,
        status
    });

    atualizarListaAtivos();
}

function atualizarListaAtivos() {

    const lista = document.getElementById("listaAtivos");

    lista.innerHTML = "";

    ativos.forEach((ativo) => {

        lista.innerHTML += `
            <div class="card-ativo">

                <h2>${ativo.nome}</h2>

                <p><strong>Tipo:</strong> ${ativo.tipo}</p>

                <p><strong>Consumo:</strong> ${ativo.consumo} W</p>

                <p><strong>Tempo de uso:</strong> ${ativo.idade} anos</p>

                <p><strong>Status:</strong> ${ativo.status}</p>

            </div>
        `;
    });
}

/* EXPORTAR FUNÇÕES */

window.entrarSistema = entrarSistema;
window.mostrarCadastro = mostrarCadastro;
window.voltarLogin = voltarLogin;
window.cadastrarUsuario = cadastrarUsuario;
window.cadastrarEmpresa = cadastrarEmpresa;
window.abrirTela = abrirTela;
window.cadastrarAtivo = cadastrarAtivo;
window.CalcularMaturidade = CalcularMaturidade;

/* BOTÃO MATURIDADE */

document.addEventListener("click", function (evento) {

    if (evento.target.id === "btnCalcularMaturidade") {
        CalcularMaturidade();
    }

});
/* QUIZ GREEN IT */

function corrigirQuiz() {

    const respostas =
        document.querySelectorAll(".quizResposta");

    let pontuacao = 0;

    respostas.forEach((resposta) => {

        pontuacao += Number(resposta.value);
    });

    let mensagem = "";

    if (pontuacao == 3) {

        mensagem =
            "Excelente! Você possui ótimos conhecimentos sobre Green IT.";

    } else if (pontuacao == 2) {

        mensagem =
            "Bom desempenho! Continue evoluindo em sustentabilidade tecnológica.";

    } else {

        mensagem =
            "Você precisa reforçar seus conhecimentos sobre Green IT.";
    }

    document.getElementById("resultadoQuiz").innerHTML = `

        <div class="resultado-quiz">

            <h2>
                Resultado do Quiz
            </h2>

            <p>
                <strong>Pontuação:</strong>
                ${pontuacao}/3
            </p>

            <p>
                ${mensagem}
            </p>

        </div>
    `;
}

window.corrigirQuiz = corrigirQuiz;

let dimensaoAtual = 0;

const dimensoes = [
    {
        titulo: "Governança e Diretrizes de TI Verde",
        perguntas: [
            "A empresa possui um documento formal que estabelece objetivos ambientais para o departamento de TI?",
            "A sustentabilidade é um critério de peso nas reuniões de planejamento orçamentário e expansão tecnológica da empresa?",
            "Existe um responsável ou comitê encarregado de monitorar o cumprimento das metas de sustentabilidade na TI?"
        ]
    },
    {
        titulo: "Eficiência Energética e Infraestrutura de TI",
        perguntas: [
            "No último ano, houve substituição de equipamentos antigos por novos com certificações como Energy Star ou EPEAT?",
            "Os computadores e periféricos estão configurados com perfis de baixo consumo ou suspensão automática após inatividade?",
            "Qual a porcentagem de servidores físicos que já foram virtualizados ou migrados para nuvem?"
        ]
    },
    {
        titulo: "Monitoramento e Gestão do Consumo Energético",
        perguntas: [
            "A TI possui acesso a relatórios de consumo de energia específicos para o CPD, servidores ou softwares de gestão de energia?",
            "A empresa realiza revisões trimestrais ou semestrais sobre os gastos energéticos da TI para identificar picos ou anomalias?",
            "A organização utiliza algum indicador de eficiência, como PUE, para avaliar sua infraestrutura?"
        ]
    },
    {
        titulo: "Gestão do Ciclo de Vida dos Ativos de TI",
        perguntas: [
            "O processo de compras da empresa exige critérios ambientais dos fornecedores de hardware?",
            "Existe um programa de manutenção preventiva e upgrade para estender a vida útil dos ativos antes de comprar novos?",
            "A empresa possui contrato ou parceria formal com empresas de logística reversa e reciclagem de lixo eletrônico?"
        ]
    },
    {
        titulo: "Cultura Organizacional e Conscientização",
        perguntas: [
            "Foi realizado algum workshop, palestra ou treinamento sobre práticas de TI Verde para os colaboradores nos últimos 12 meses?",
            "A empresa utiliza canais internos para incentivar hábitos sustentáveis, como desligar monitores ao final do expediente?",
            "Existe um canal aberto para que os funcionários sugiram melhorias ou novas ideias voltadas à sustentabilidade tecnológica?"
        ]
    }
];

function montarOpcoesNivel() {
   return `
    <option value="" selected disabled>
        Selecione o nível
    </option>

    <option value="0">
        0 - NÃO SE APLICA / NÃO CONHEÇO
    </option>

    <option value="1">
        1 - INEXISTENTE
    </option>

    <option value="2">
        2 - REATIVO
    </option>

    <option value="3">
        3 - FUNCIONAL
    </option>

    <option value="4">
        4 - ESTRATÉGICO
    </option>

    <option value="5">
        5 - SUSTENTÁVEL
    </option>
`;

}

function carregarDimensao() {

    const dimensao = dimensoes[dimensaoAtual];

    let perguntasHTML = "";

    dimensao.perguntas.forEach((pergunta, index) => {
        perguntasHTML += `
            <div class="questao-dimensao">
                <h3>${index + 1}. ${pergunta}</h3>

                <select class="respostaDimensao">
                    ${montarOpcoesNivel()}
                </select>
            </div>
        `;
    });

    document.getElementById("avaliacaoDimensao").innerHTML = `
        <div class="card-dimensao">

            <h2>${dimensao.titulo}</h2>

            ${perguntasHTML}

            <div class="questao-dimensao">
                <h3>Observações da dimensão</h3>

                <textarea class="observacaoDimensao"
                    placeholder="Descreva práticas existentes, desafios ou iniciativas em andamento..."></textarea>
            </div>

            <div class="botoes-dimensao">

                <button type="button" onclick="voltarDimensao()">
                    Voltar
                </button>

                <button type="button" onclick="proximaDimensao()">
                    ${dimensaoAtual === dimensoes.length - 1 ? "Finalizar Avaliação" : "Próxima Dimensão"}
                </button>

            </div>

        </div>
    `;
}

function proximaDimensao() {

    if (dimensaoAtual < dimensoes.length - 1) {

        dimensaoAtual++;
        carregarDimensao();

    } else {

        calcularResultadoDimensoes();
    }
}

function voltarDimensao() {

    if (dimensaoAtual > 0) {

        dimensaoAtual--;
        carregarDimensao();
    }
}

function calcularResultadoDimensoes() {

    const respostas =
        document.querySelectorAll(".respostaDimensao");

    let total = 0;

    respostas.forEach((resposta) => {
        total += Number(resposta.value);
    });

    const quantidadeRespostas = respostas.length;
    const mediaFinal = (total / quantidadeRespostas).toFixed(1);

    let nivel = "";
let descricao = "";

if (mediaFinal == 0) {

    nivel = "Não se aplica / Não conheço";

    descricao =
        "Sem diagnóstico - O respondente não tem informação suficiente ou o item não condiz com a realidade da empresa, impossibilitando a avaliação do nível de maturidade.";

} else if (mediaFinal >= 0.1 && mediaFinal <= 0.9) {

    nivel = "Inexistente";

    descricao =
        "Estágio Inicial - A empresa não possui qualquer iniciativa, política ou conhecimento sobre Green IT. Não há ações, documentos ou intenção de aplicar práticas sustentáveis relacionadas à tecnologia.";

} else if (mediaFinal >= 1.0 && mediaFinal <= 2.4) {

    nivel = "Baixo";

    descricao =
        "Estágio Reativo - A empresa possui baixa maturidade. As ações são isoladas e informais, geralmente executadas apenas para resolver problemas imediatos ou reduzir custos operacionais óbvios, sem planejamento sustentável.";

} else if (mediaFinal >= 2.5 && mediaFinal <= 3.9) {

    nivel = "Médio";

    descricao =
        "Estágio Funcional - A empresa demonstra maturidade intermediária. Já existem boas práticas estabelecidas e processos recorrentes, porém ainda carecem de integração estratégica e apoio contínuo da alta gestão.";

} else if (mediaFinal >= 4.0 && mediaFinal <= 5.0) {

    nivel = "Alto";

    descricao =
        "Estágio Estratégico/Sustentável - A empresa apresenta alta maturidade. O Green IT é tratado como prioridade estratégica, com processos otimizados, monitoramento constante e foco em inovação e eficiência de longo prazo.";
}

document.getElementById("resultadoMaturidade").innerHTML = `
    <div class="resultado-card">

        <h2>Resultado da Avaliação</h2>

        <p><strong>Média final:</strong> ${mediaFinal}</p>

        <p><strong>Nível de maturidade:</strong> ${nivel}</p>

        <p><strong>Diagnóstico:</strong> ${descricao}</p>

        <button type="button" onclick="reiniciarAvaliacao()">
            Avaliar novamente
        </button>

    </div>
`;

document.getElementById("avaliacaoDimensao").style.display = "none";

document.getElementById("scoreDashboard").innerText = mediaFinal;

document.getElementById("nivelDashboard").innerText = nivel;

const porcentagem = (mediaFinal / 5) * 100;

document.getElementById("barraMaturidade").style.width =
    porcentagem + "%";

let melhorias = [];

if (mediaFinal == 0) {

    melhorias = [
        "Coletar mais informações sobre as práticas de TI da empresa.",
        "Identificar responsáveis pelas áreas de tecnologia e sustentabilidade.",
        "Realizar um diagnóstico inicial antes de definir ações."
    ];

} else if (mediaFinal >= 0.1 && mediaFinal <= 0.9) {

    melhorias = [
        "Criar políticas básicas de Green IT.",
        "Iniciar campanhas de conscientização.",
        "Mapear equipamentos e consumo energético."
    ];

} else if (mediaFinal >= 1.0 && mediaFinal <= 2.4) {

    melhorias = [
        "Formalizar práticas sustentáveis.",
        "Criar indicadores básicos de energia.",
        "Padronizar descarte de equipamentos."
    ];

} else if (mediaFinal >= 2.5 && mediaFinal <= 3.9) {

    melhorias = [
        "Integrar Green IT ao planejamento estratégico.",
        "Automatizar monitoramento energético.",
        "Expandir treinamentos para todas as áreas."
    ];

} else if (mediaFinal >= 4.0 && mediaFinal <= 5.0) {

    melhorias = [
        "Buscar certificações ambientais.",
        "Ampliar auditorias internas de Green IT.",
        "Investir em inovação sustentável e melhoria contínua."
    ];
}

document.getElementById("conteudoMelhorias").innerHTML = `
    <div class="card-melhoria">

        <h2>Recomendações para evolução</h2>

        <ul>
            ${melhorias.map(item => `<li>${item}</li>`).join("")}
        </ul>

    </div>
`;

}

carregarDimensao();

window.carregarDimensao = carregarDimensao;
window.proximaDimensao = proximaDimensao;
window.voltarDimensao = voltarDimensao;

function reiniciarAvaliacao() {

    dimensaoAtual = 0;

    document.getElementById("resultadoMaturidade").innerHTML = "";

    document.getElementById("avaliacaoDimensao").style.display = "block";

    carregarDimensao();
}

window.reiniciarAvaliacao = reiniciarAvaliacao;
