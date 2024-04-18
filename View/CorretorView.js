export default class CorretorView {
    constructor(){

    }

    lista_todos_corretores(corretores) {
        return `
    <div class="modal-listagem-corretores">
        <h2>Corretores</h2>
        <ul class="modal-lista">
          <li class="modal-lista-item">
            <div class="dados">
              <span>Corretor</span>
            <span>CPF</span>
            <Span>Telefone</Span>
            </div>
            <div class="acoes">
              <button>excluir</button>
            </div>
          </li>
        </ul>
      </div>
        `
    }

    
}