export default class CorretorView {
  constructor() {}

  formulario_cadastra_corretor() {
    return `
    <div class="modal-cadastra-corretor">
    <form id="formulario-cadastra-corretor">
      <h2>Cadastra Novo Corretor</h2>
      <div class="form-container">
        <label for="nome">Nome: </label>
        <input type="text" name="nome" required />
      </div>
      <div class="form-container">
        <label for="cpf">CPF: </label>
        <input type="text" name="cpf" id="cpf" required />
      </div>
      <div class="form-container">
        <label for="telefone">Telefone: </label>
        <input type="text" name="telefone" id="telefone" required />
      </div>
      <div class="form-container">
        <button>Cadastrar</button>
      </div>
    </form>
    <button class="fechar-modal-cadastro">fechar</button>
  </div>
    `;
  }

  lista_todos_corretores(corretores) {
    return `
    <div class="modal-listagem-corretores">
        <h2>Corretores</h2>
        ${this.__gerar_li_listagem(corretores)}
        <button class="fechar-modal-listagem">fechar</button>
      </div>
        `;
  }

  __gerar_li_listagem(corretores) {
    // Cria UL da lista
    var ul = document.createElement("ul");
    ul.classList.add("modal-lista");

    corretores.map((corretor) => {
      var li = document.createElement("li");
      li.classList.add("modal-lista-item");

      var divDados = document.createElement("div");
      divDados.classList.add("dados");

      var spanNome = document.createElement("span");
      spanNome.textContent = `Nome: ${corretor.nome}`;

      var spanCpf = document.createElement("span");
      spanCpf.textContent = `CPF: ${corretor.cpf}`;

      var spanTelefone = document.createElement("span");
      spanTelefone.textContent = `Telefone: ${corretor.telefone}`;

      divDados.appendChild(spanNome);
      divDados.appendChild(spanCpf);
      divDados.appendChild(spanTelefone);

      var divAcoes = document.createElement("form");
      divAcoes.classList.add("acoes");

      var corretorId = document.createElement("p");
      corretorId.classList.add("hide");
      corretorId.classList.add("corretor_id");
      corretorId.name = "corretor_id";
      console.log(corretor);
      corretorId.textContent = corretor.id;

      var btnDelete = document.createElement("button");
      btnDelete.textContent = "excluir";
      divAcoes.appendChild(corretorId);
      divAcoes.appendChild(btnDelete);

      li.appendChild(divDados);
      li.appendChild(divAcoes);

      ul.appendChild(li);
    });

    var divHtml = document.createElement("div");
    divHtml.appendChild(ul);

    return divHtml.innerHTML;
  }
}
