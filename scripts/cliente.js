export default class Cliente {
  constructor(url) {
    this.url = url;
  }

  async post_cliente(cliente) {
    var formData = new FormData();
    formData.append("bairro", cliente.bairro);
    formData.append("cep", cliente.cep);
    formData.append("cidade", cliente.cidade);
    formData.append("corretor_id", cliente.corretor_id);
    formData.append("cpf", cliente.cpf);
    formData.append("nome", cliente.nome);
    formData.append("numero", cliente.numero);
    formData.append("rua", cliente.rua);
    formData.append("telefone", cliente.telefone);
    formData.append("uf", cliente.uf);

    try {
      const resposta = await fetch(this.url, {
        method: "POST",
        body: formData,
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.message);
        throw new Error(erro.message);
      }
    } catch (erro) {
      console.error("Erro:", erro);
    }
  }

  async put_cliente(cliente) {
    var formData = new FormData();
    formData.append("bairro", cliente.bairro);
    formData.append("cep", cliente.cep);
    formData.append("cidade", cliente.cidade);
    formData.append("corretor_id", cliente.corretor_id);
    formData.append("nome", cliente.nome);
    formData.append("numero", cliente.numero);
    formData.append("rua", cliente.rua);
    formData.append("telefone", cliente.telefone);
    formData.append("uf", cliente.uf);
    formData.append("id", cliente.id);

    try {
      const resposta = await fetch(this.url, {
        method: "PUT",
        body: formData,
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.message);
        throw new Error(erro.message);
      }
    } catch (erro) {
      console.error("Erro:", erro);
    }
  }

  async get_cliente(cpf) {
    try {
      const resposta = await fetch(`${this.url}?cpf=${cpf}`);
      const data = await resposta.json();
      return data;
    } catch (erro) {
      return false;
    }
  }
}
