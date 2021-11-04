import http from "../http-common.js";

class JornadaService {

  getAll() {
    return http.get("/jornada");
  }

  get(id) {
    return http.get(`/jornada/${id}`);
  }

  getbyStatus(status){
    return http.get(`/jornada/status/${status}`);
  }

  create(data) {
    return http.post("/jornada", data);
  }

  update(id, data) {
    return http.put(`/jornada/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jornada/${id}`);
  }

  deleteAll() {
    return http.delete(`/jornada`);
  }

  findByTitle(nomeJornada) {
    return http.get(`/jornada?nomeJornada=${nomeJornada}`);
  }

  findByGraph(){
    return http.get('/jornada/graph');
  }
}

export default new JornadaService();