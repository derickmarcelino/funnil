import http from "../http-common.js";

class AcessosService {
  
  getAll() {
    return http.get("/acessos");
  }

  get(id) {
    return http.get(`/acessos/${id}`);
  }

  create(data) {
    return http.post("/acessos", data);
  }

  update(id, data) {
    return http.put(`/acessos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/acessos/${id}`);
  }

  deleteAll() {
    return http.delete(`/acessos`);
  }

  
  findByIdTelas(idTelas,dataInicio,dataFim) {
    return http.get(`/acessos/telas/acessos?idTelas=${idTelas}&dataInicio=${dataInicio}&dataFim=${dataFim}`);
}
}

export default new AcessosService();