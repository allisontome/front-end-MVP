import Cliente from "./scripts/cliente.js";
import Corretor from "./scripts/corretor.js";
var url_cliente = "http://127.0.0.1:5000/cliente";
var url_corretor = "http://127.0.0.1:5000/corretor";

const cliente = new Cliente(url_cliente);
const corretor = new Corretor(url_corretor);

cliente.get_cliente("480.751.556-02");
corretor.get_corretor(1);
