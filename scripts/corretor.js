export default class Corretor {
  constructor(url) {
    this.url = url;
  }

  async post_corretor(corretor) {
    var formData = new FormData();
    formData.append("cpf", corretor.cpf);
    formData.append("nome", corretor.nome);
    formData.append("telefone", corretor.telefone);

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

  async get_corretor(id) {
    try {
      const resposta = await fetch(`${this.url}?cpf=${id}`);
      const data = await resposta.json();
      console.log(data);
    } catch (erro) {
      console.log(erro);
    }
  }
}
