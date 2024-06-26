export default class ClienteView {
  init() {
    return `
        <h2>Consultar Cliente</h2>
        <form id="consulta">
        <div class="inputs-form">
            <input
            name="cpf"
            type="text"
            maxlength="14"
            placeholder="Insira o cpf"
            />
        </div>
        <button type="submit" name="consulta">Consultar</button>
        </form>

        `;
  }

  apresentar_dados(data) {
      return `
        <div class="dados-consultados">
          <div class="dados-cliente">
            <span>${data.nome}</span>
            <span>${data.cpf}</span>
            <span>${data.telefone}</span>
            <span>${data.endereco_completo}</span>
          </div>
          <div class="dados-corretor">
            <span>${data.corretor.nome}</span>
            <span>${data.corretor.cpf}</span>
            <span>${data.corretor.telefone}</span>
          </div>
        </div>
        <div class="dados-manipulacao">
          <span class='hide exibe_cliente_id'>${data.id}</span>
          <button class="btn-edit">Editar</button>
          <button class="btn-delete">Excluir</button>
        </div>
        `;

  }

  edicao(corretores, cliente) {
    return `
    <form method="put" id="formulario-edicao">
    <div class="form-dados">
      <div class="form-container">
        <label for="nome">Nome: </label>
        <input type="text" name="nome" id="nome" value=${cliente.nome} required />
      </div>
      <div class="form-container">
        <label for="cpf">CPF: </label>
        <input type="text" name="cpf" id="cpf" value=${cliente.cpf} disabled/>
      </div>
      <div class="form-container">
        <label for="telefone">Telefone: </label>
        <input type="text" name="telefone" id="telefone" required value=${cliente.telefone} />
      </div>
    </div>
    <div class="form-endereco">
    <div class="form-container">
      <label for="cep">CEP: </label>
      <input type="text" name="cep" id="cep" maxlength="9" required value=${cliente.endereco_split.cep} />
    </div>
    <div class="form-container">
      <label for="rua">Rua: </label>
      <input type="text" name="rua" id="rua" required value=${cliente.endereco_split.rua} />
    </div>
    <div class="form-container">
      <label for="numero">Numero: </label>
      <input type="text" name="numero" id="numero" required value=${cliente.endereco_split.numero} />
    </div>
    <div class="form-container">
      <label for="bairro">Bairro: </label>
      <input type="text" name="bairro" id="bairro" required value=${cliente.endereco_split.bairro} />
    </div>
    <div class="form-container">
      <label for="cidade">Cidade: </label>
      <input type="text" name="cidade" id="cidade" required value=${cliente.endereco_split.cidade} />
    </div>
    <div class="form-container">
      <label for="uf">UF: </label>
      <input type="text" name="uf" id="uf" required value=${cliente.endereco_split.uf} />
    </div>
    <div class="form-container">
      <input class="hide" type="number" name="id" id="id" required value=${cliente.id} />
    </div>
  </div>
  <div class="form-corretor">
    <div class="form-container">
      <label for="corretor_id">Corretor</label>
      ${this.__gera_lista_de_corretores(corretores)}
  </div>
    <div class="form-actions">
      <button class="btn-save">Salvar</button>
    </div>
  </form>
    `;
  }

  cadastro(corretores) {
    return `
    <form method="post" id="formulario-cadastro">
    <div class="form-dados">
      <div class="form-container">
        <label for="nome">Nome: </label>
        <input type="text" name="nome" id="nome" required />
      </div>
      <div class="form-container">
        <label for="cpf">CPF: </label>
        <input type="text" name="cpf" id="cpf" required />
      </div>
      <div class="form-container">
        <label for="telefone">Telefone: </label>
        <input type="text" name="telefone" id="telefone" required />
      </div>
    </div>
    <div class="form-endereco">
    <div class="form-container">
      <label for="cep">CEP: </label>
      <input type="text" name="cep" id="cep" maxlength="9" required />
    </div>
    <div class="form-container">
      <label for="rua">Rua: </label>
      <input type="text" name="rua" id="rua" required />
    </div>
    <div class="form-container">
      <label for="numero">Numero: </label>
      <input type="text" name="numero" id="numero" required />
    </div>
    <div class="form-container">
      <label for="bairro">Bairro: </label>
      <input type="text" name="bairro" id="bairro" required />
    </div>
    <div class="form-container">
      <label for="cidade">Cidade: </label>
      <input type="text" name="cidade" id="cidade" required />
    </div>
    <div class="form-container">
      <label for="uf">UF: </label>
      <input type="text" name="uf" id="uf" required />
    </div>
  </div>
  <div class="form-corretor">
    <div class="form-container">
      <label for="corretor_id">Corretor</label>
      ${this.__gera_lista_de_corretores(corretores)}
  </div>
    <div class="form-actions">
      <button class="btn-save">Salvar</button>
    </div>
  </form>
    `;
  }

  __gera_lista_de_corretores(arr) {
    var select = document.createElement("select");
    select.id = "corretor_id";
    select.name = "corretor_id";
    select.required = true;

    arr.map((corretor) => {
      var option = document.createElement("option");
      option.value = corretor.id;
      option.textContent = corretor.nome;
      select.appendChild(option);
    });

    var div = document.createElement("div");
    div.append(select);
    return div.innerHTML;
  }
}
