export default class Corretor {
  constructor(url) {
    this.url = url;
  }

  async get_all_corretores() {
    return fetch(`${this.url}es`)
      .then((response) => response.json())
      .catch((err) => err);
  }

  async delete_corretor(id) {
    var formId = new FormData();
    formId.append("id", id);
    return await fetch(this.url, {
      method: "delete",
      body: formId,
    }).then((response) => {
      if (response.ok) {
        alert("Corretor excluído");
        return true;
      } else {
        alert("não foi possivel excluir corretor no momento");
        return false;
      }
    });
  }

  async post_corretor(form) {
    const formCorretor = new FormData(form);

    return await fetch(this.url, {
      method: "post",
      body: formCorretor,
    }).then((response) => {
      if (response.ok) {
        alert("Corretor Cadastrado");
        return true;
      } else {
        alert("não foi possivel cadastrar corretor no momento");
        return false;
      }
    });
  }
}
