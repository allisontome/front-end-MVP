export default class Cliente {
  constructor(url) {
    this.url = url;
  }

  async get_cliente(cpf) {
    return await fetch(`${this.url}?cpf=${cpf}`)
      .then((result) => result.json())
      .catch((error) => console.log(error));
  }

  async post_cliente() {
    const form = document.getElementById("formulario-cadastro-edicao");
    const formData = new FormData(form);
    const corretor_id = form.corretor_id.value;

    for (let pair of formData.entries()) {
      formData.append(pair[0] + ":" + pair[1]);
    }
    formData.append("corretor_id", corretor_id);

    await fetch(this.url, {
      method: "post",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        return true;
      }
    });
  }

  async delete_cliente(id) {
    var bool = confirm("Deseja deletar o cliente?");
    if (bool) {
      return fetch(`${this.url}?id=${id}`, {
        method: "delete",
      }).then((response) => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  }
}
