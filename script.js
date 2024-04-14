import Cliente from "./scripts/cliente.js";
import Corretor from "./scripts/corretor.js";
import { sidebarResponsive } from "./scripts/style.js";

var url_cliente = "http://127.0.0.1:5000/cliente";
var url_corretor = "http://127.0.0.1:5000/corretor";

const cliente = new Cliente(url_cliente);
const corretor = new Corretor(url_corretor);

//CONSULTAR CLIENTE PELO CPF

//fORMULÁRIO DE CONSULTA PELO CPF
var formConsultarCliente = document.getElementById("consultar-cliente");

//FORMULARIO VAZIO QUE ESTÁ DESABILITADO NA TELA
var formularioCadastro = document.getElementById("clienteForm");

//EVENTO DO FURMALARIO DE CONSULTA POR CPF
formConsultarCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  var cpf = await formConsultarCliente.cpf.value;
  //BUSCANDO CLIENTE NA BASE
  var clienteResposta = await cliente.get_cliente(cpf);

  //Se o cliente existir ele é exibido na tela dentro do fomrulárioo desabilitado
  if (clienteResposta.nome) {
    formularioCadastro.nome.value = clienteResposta.nome;
    formularioCadastro.cpf.value = clienteResposta.cpf;
    formularioCadastro.telefone.value = clienteResposta.telefone;
    formularioCadastro.rua.value = clienteResposta.endereco_split.rua;
    formularioCadastro.numero.value = clienteResposta.endereco_split.numero;
    formularioCadastro.bairro.value = clienteResposta.endereco_split.bairro;
    formularioCadastro.cidade.value = clienteResposta.endereco_split.cidade;
    formularioCadastro.uf.value = clienteResposta.endereco_split.uf;
    formularioCadastro.cep.value = clienteResposta.endereco_split.cep;
    formularioCadastro.corretorSpan.value = clienteResposta.corretor.nome;
    formularioCadastro.id.value = clienteResposta.id;

    formConsultarCliente.cpf.value = "";
    formularioCadastro.editar.disabled = false;
    formularioCadastro.excluir.disabled = false;
  } else {
    // caso não, o formulario é habilitado para o cadastro
    habilitarInputs(formularioCadastro);
    formConsultarCliente.cpf.value = "";
    formConsultarCliente.cpf.disabled = true;
    formularioCadastro.cadastrar.disabled = false;
  }
});

function editarCliente(form) {
  var clienteForm = {
    nome: form.nome,
    telefone: form.telefone,
    rua: form.rua,
    numero: form.numero,
    bairro: form.bairro,
    cidade: form.cidade,
    uf: form.uf,
    cep: form.cep,
    id: form.id,
  };

  cliente.put_cliente(clienteForm);
}

function habilitarInputs(form) {
  var inputs = form.querySelectorAll(".form-input");
  inputs.forEach((input) => (input.disabled = false));
}

sidebarResponsive();
