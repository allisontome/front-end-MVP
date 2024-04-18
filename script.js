var url_cliente = "http://127.0.0.1:5000/cliente";
var url_corretor = "http://127.0.0.1:5000/corretor";

import Cliente from "./Model/Cliente.js";
import ClienteView from "./View/ClienteView.js";
import Corretor from "./Model/Corretor.js";

const corretor = new Corretor(url_corretor);
const cliente = new Cliente(url_cliente);
const clienteView = new ClienteView();

const header = document.querySelector("header");
const modalDadosConsultados = document.querySelector(
  ".modal-dados-consultados"
);
const cadastroEdicao = document.querySelector(".cadastro-edicao");

header.innerHTML = clienteView.init();

const formConsulta = document.getElementById("consulta");

formConsulta.addEventListener("submit", async function (event) {
  event.preventDefault();
  let parametro = formConsulta.parametro.value;
  let cpf = formConsulta.cpf.value;
  if (parametro === "cliente") {
    try {
      var responseData = await cliente.get_cliente(cpf);
      var responseView = await clienteView.apresentar_dados(responseData);
      modalDadosConsultados.innerHTML = responseView;
      cadastroEdicao.innerHTML = "";
      var btnEdit = document.querySelector(".btn-edit");
      btnEdit.addEventListener("click", async function () {
        clienteView.edicao(responseData);
      });
      var btnDelete = document.querySelector(".btn-delete");
      btnDelete.addEventListener("click", async function () {
        var id = document.querySelector(".exibe_cliente_id").textContent;
        var del = cliente.delete_cliente(Number(id));
        if (del) {
          alert("cliente excluído");
          modalDadosConsultados.innerHTML = "";
        }
      });
    } catch (err) {
      formConsulta.cpf.value = "";
      var corretores = await corretor.get_all_corretores();
      if (corretores.corretores.length >= 1) {
        modalDadosConsultados.innerHTML = "";
        cadastroEdicao.innerHTML = clienteView.cadastro(corretores.corretores);
        var formularioCadastro = document.getElementById("formulario-cadastro");
        formConsulta.addEventListener("submit", function (event) {
          event.preventDefault();
          var cadastrou = cliente.post_cliente(formularioCadastro);
          console.log(cadastrou);
        });
      } else alert("Sem corretores adastrados");
    }
  }
});
