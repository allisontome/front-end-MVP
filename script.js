const app = document.getElementById("app");

viewHome(app);

// FUNÇÕES DE VIEW
function viewHome(app) {
  app.innerHTML = `
      <div class="home">
        <form action="#" id="form-home">
          <label> Buscar Cliente </label>
          <input
            type="text"
            maxlength="11"
            required
            placeholder="000.000.000-00"
            class="input"
          />
          <button class="btn btn-primary">Buscar</button>
        </form>
     </div>
      `;
}

function listView(title, list = [], app) {
  // Criação da lista para exibição
  var modal = document.createElement("div");
  modal.classList.add("modal");

  //titulo da lista
  var h2 = document.createElement("h2");
  h2.classList.add("title");
  h2.innerText = title;

  //criação da lista não ordenada
  var ul = document.createElement("ul");
  ul.classList.add("list");

  //verificando se existem elemtos na lista que por default recebe um array vazio
  if (list) {
    list.map((element) => {
      //criando o li
      var li = document.createElement("li");
      li.classList.add("list-item");

      //criando primeira seção com os dados bsucados
      var data = document.createElement("div");
      data.classList.add("data");

      var spanNome = document.createElement("span");
      spanNome.innerText = element.nome;

      var spanCPF = document.createElement("span");
      spanCPF.innerText = element.cpf;

      var spanTelefone = document.createElement("span");
      spanTelefone.innerText = element.telefone;

      data.appendChild(spanNome);
      data.appendChild(spanCPF);
      data.appendChild(spanTelefone);

      //criando a seção com os botões de ação
      var actions = document.createElement("div");
      actions.classList.add("actions");

      var btnEdit = document.createElement("button");
      btnEdit.innerText = "edit";
      btnEdit.classList.add("btn");
      btnEdit.classList.add("btn-edit");

      var btnDelete = document.createElement("button");
      btnDelete.innerText = "delete";
      btnDelete.classList.add("btn");
      btnDelete.classList.add("btn-delete");

      actions.appendChild(btnEdit);
      actions.appendChild(btnDelete);

      //adicionado seções a lista
      li.appendChild(data);
      li.appendChild(actions);
      ul.appendChild(li);
    });

    modal.appendChild(h2);
    modal.appendChild(ul);

    app.innerHTML = "";
    //renderizando lista
    app.append(modal);
  }

  const modeloDoRender = `
  <div class="modal">
  <h2 class="title">Corretores</h2>
  <ul class="list">
    <li class="list-item">
      <div class="data">
        <span>nome completo do Corretor</span>
        <span>000.000.000-00</span>
        <span>telefone</span>
      </div>
      <div class="actions">
        <button class="btn btn-edit">edit</button>
        <button class="btn btn-delete">delete</button>
      </div>
    </li>
  </ul>
</div>
  `;
}

//CONTROLE DE EVENTOS

//Listagem dos corretores cadastrados
document.querySelector(".list-corretor").addEventListener("click", (e) => {
  e.preventDefault();
  var corretores = [];
  //Logica para recuperar dados dos corretores do banco de dados

  listView("Corretores", corretores, app);
});

//Pagina Incial - Buscar Clientes
document.querySelector(".client-search").addEventListener("click", (e) => {
  e.preventDefault();
  viewHome(app);
});
