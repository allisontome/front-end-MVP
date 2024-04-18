export default class Cliente {
  constructor(url) {
    this.url = url;
  }

  async get_cliente(cpf) {
    return await fetch(`${this.url}?cpf=${cpf}`)
      .then((result) => result.json())
      .catch((error) => console.log(error));
  }

  async post_cliente(form) {
    const formData = new FormData(form);
    const corretor_id = form.corretor_id.value;
    formData.append("corretor_id", corretor_id);

    try {
      await fetch(this.url, {
        method: "post",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          return true;
        }
      });
    }catch(err) {
      alert(err.message)
    }
  }

  async put_cliente(form) {
    const formData = new FormData(form);
    const corretor_id = form.corretor_id.value;
    formData.append("corretor_id", corretor_id);

    try {
      await fetch(this.url, {
        method: "put",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          return true;
        }
      });
      alert('cliente atualizado com sucesso')
      return true;
    }catch(err){
      alert(err.message)
    }
  }

  async delete_cliente(id) {
   try{
    var bool = confirm("Deseja deletar o cliente?");
    var deletado = false;
    if (bool) {
      return fetch(`${this.url}?id=${id}`, {
        method: "delete",
      }).then((response) => {
        if (response.ok) {
          alert('Cliente excluído!')
          return deletado = true;
        }
      });
    }
    return deletado;
   }catch(err){
    alert(err.message)
   }
  }
}
