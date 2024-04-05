const app = document.getElementById("app");
var url = "http://127.0.0.1:5000";
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
            name="inputBuscaCliente"
          />
          <button class="btn btn-primary buscar-cliente">Buscar</button>
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

      if (element.corretor) {
        var spanCorretor = document.createElement("span");
        spanCorretor.innerText = element.corretor;
        data.appendChild(spanCorretor);
      }

      //criando a seção com os botões de ação
      var actions = document.createElement("form");
      actions.classList.add("actions");

      var btnEdit = document.createElement("button");
      btnEdit.innerText = "edit";
      btnEdit.classList.add("btn");
      btnEdit.classList.add("btn-edit");

      var btnDelete = document.createElement("button");
      btnDelete.innerText = "delete";
      btnDelete.classList.add("btn");
      btnDelete.classList.add("btn-delete");

      var id = document.createElement("input");
      id.value = element.id;
      id.classList.add("hidden");
      id.setAttribute("name", "id");

      actions.appendChild(btnEdit);
      actions.appendChild(btnDelete);
      actions.appendChild(id);
      btnDelete.addEventListener("click", (e) => {
        e.preventDefault();
        deleteFunction(element.id, element.corretor);
      });

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
}

async function deleteFunction(idRequisition, corretor) {
  let urlDelete = "";
  if (corretor) {
    urlDelete += `${url}/cliente?id=${idRequisition}`;
  } else {
    urlDelete += `${url}/corretor/${idRequisition}`;
  }

  await fetch(urlDelete, {
    method: "delete",
  })
    .then((response) => console.log(response.ok))
    .catch((err) => console.log(err));
}

//CONTROLE DE EVENTOS
//Procurar cliente
var formBuscaCliente = document.querySelector("#form-home");
formBuscaCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  var cpf = formBuscaCliente.inputBuscaCliente.value;

  await fetch(`${url}/cliente?cpf=${cpf}`)
    .then((data) => data.json())
    .then((response) => {
      if (response.id) {
        listView("Cliente", [response], app);
      }
    })
    .catch((err) => {
      alert("Error");
    });
});

//Deletar Cliente
