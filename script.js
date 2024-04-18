const url_cliente = "http://127.0.0.1:5000/cliente";
const url_corretor = "http://127.0.0.1:5000/corretor";

import Cliente from "./Model/Cliente.js";
import ClienteView from "./View/ClienteView.js";
import Corretor from "./Model/Corretor.js";
import CorretorView from "./View/CorretorView.js";

const corretor = new Corretor(url_corretor);
const corretorView = new CorretorView();
const cliente = new Cliente(url_cliente);
const clienteView = new ClienteView();
const header = document.querySelector("header");
const cadastroEdicao = document.querySelector(".cadastro-edicao");
const modalDadosConsultados = document.querySelector(
  ".modal-dados-consultados"
);

//Inicia a aplicação carregando o formulário de consulta
header.innerHTML = clienteView.init();

// Buscando o formulário de consulta do cliente
const formConsulta = document.getElementById("consulta");

const limpaCampos = () => {
  cadastroEdicao.innerHTML = "";
  modalDadosConsultados.innerHTML = "";
};

/**
 *  CONSULTANDO CLIENTE
 */
//Adicionando Evento de consulta no submit do formulário de consulta cliente pelo cpf
formConsulta.addEventListener("submit", async function (event) {
  event.preventDefault();

  const cpf = formConsulta.cpf.value;
  //Fazendo requisição do cliente pelo CPF
  try {
    //Buscando cliente
    var cliente_buscado = await cliente.get_cliente(cpf);
    //Apresentando informações do cliente consultado
    modalDadosConsultados.innerHTML = await clienteView.apresentar_dados(
      cliente_buscado
    );
    //Limpando formulário de cadastro caso esteja aberto
    cadastroEdicao.innerHTML = "";

    /**
     *  EDITANDO CLIENTE
     */
    // Adicionando evento do botão de edição do cliente
    var btnEdit = document.querySelector(".btn-edit");

    btnEdit.addEventListener("click", async function () {
      //busca lista de corretores disponíveis
      const corretores = await corretor.get_all_corretores();

      //renderizando fomulário de edição do cliente
      cadastroEdicao.innerHTML = await clienteView.edicao(
        corretores.corretores,
        cliente_buscado
      );
      const formEdicao = document.getElementById("formulario-edicao");

      //adicionando evento de edição do cliente
      formEdicao.addEventListener("submit", async function (event) {
        event.preventDefault();
        const concluiu = await cliente.put_cliente(formEdicao);
        if (concluiu) {
          limpaCampos();
        }
      });
    });

    /**
     *  DELETANDO CLIENTE
     */
    //Adicionado evento de deleção do cliente
    var btnDelete = document.querySelector(".btn-delete");
    btnDelete.addEventListener("click", async function () {
      const id = document.querySelector(".exibe_cliente_id").textContent;
      var deletado = await cliente.delete_cliente(Number(id));
      if (deletado) {
        limpaCampos();
      }
    });

    /**
     *  ERROR DE CONSULTA E CLIENTE NÃO ENCONTRADO
     */
    // Caso ocorra um erro na busca do cliente ou não seja encontrado, é aberto o formulário para cadastro do novo cliente
  } catch (err) {
    //limpando formulário de consulta
    formConsulta.cpf.value = "";

    // buscando corretores para serem adicionados no formulário de cadastro
    const corretores = await corretor.get_all_corretores();
    console.log(corretores);

    //caso exista o corretor, é exibido o formulário de cadastro para o novo cliente
    if (corretores.corretores.length >= 1) {
      // limpando dados do formulário de consulta caso esteja aberto
      modalDadosConsultados.innerHTML = "";

      // Exibindo formulário de cadastro para novo cliente
      cadastroEdicao.innerHTML = clienteView.cadastro(corretores.corretores);

      //adicionando evento de cadastro ao formulário
      var formularioCadastro = document.getElementById("formulario-cadastro");
      formularioCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();

        var cadastrou = await cliente.post_cliente(formularioCadastro);
        limpaCampos();
      });

      // Se o corretor não existir, é retornado um aviso
    } else alert("Sem corretores cadastrados");
  }
});

/**
 *  CORRETORES
 */

const modalListagem = document.querySelector(".modal-listagem");
const btnListaCorretores = document.querySelector(".listar-corretores");
/**
 *  LISTAR CORRETORES CADASTRADOS
 */
btnListaCorretores.addEventListener("click", async function () {
  try {
    // Realiza a consulta dos corretores para serem exibidos
    var corretores = await corretor.get_all_corretores();
    modalListagem.innerHTML = corretorView.lista_todos_corretores(
      corretores.corretores
    );

    // Cria o evento de delete do corretor desejado
    var formCorretores = document.querySelectorAll(".acoes");
    formCorretores.forEach((form) => {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const deleteId = event.target.querySelector(".corretor_id").textContent;
        await corretor.delete_corretor(deleteId);
        modalListagem.innerHTML = "";
      });
    });
    // Adiciona opção de fechar o modal de listagem
    document
      .querySelector(".fechar-modal-listagem")
      .addEventListener("click", function () {
        modalListagem.innerHTML = "";
      });
  } catch (err) {
    console.log(err);
  }
});

const btnCadastraCorretor = document.querySelector(".cadastrar-corretor");
btnCadastraCorretor.addEventListener("click", function () {
  modalListagem.innerHTML = corretorView.formulario_cadastra_corretor();
  var formCadastroCorretor = document.getElementById(
    "formulario-cadastra-corretor"
  );
  formCadastroCorretor.addEventListener("submit", async function (event) {
    event.preventDefault();
    await corretor.post_corretor(formCadastroCorretor);
    modalListagem.innerHTML = "";
  });
  // Adiciona opção de fechar ao modal de cadastro do corretor
  document
    .querySelector(".fechar-modal-cadastro")
    .addEventListener("click", function () {
      modalListagem.innerHTML = "";
    });
});
