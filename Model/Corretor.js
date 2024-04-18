export default class Corretor {
  constructor(url) {
    this.url = url;
  }

  async get_all_corretores() {
    return fetch(`${this.url}es`)
      .then((response) => response.json())
      .catch((err) => err);
  }
}
