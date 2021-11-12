import http from "../http-common.js";

class FunilService {
  
  getAll() {
    return http.get("/funil");
  }

  get(id) {
    return http.get(`/funil/${id}`);
  }

  create(data) {
    return http.post("/funil", data);
  }

  update(id, data) {
    return http.put(`/funil/${id}`, data);
  }

  delete(id) {
    return http.delete(`/funil/${id}`);
  }

  deleteAll() {
    return http.delete(`/funil`);
  }

  findByTitle(nomeAmigavel) {
    return http.get(`/funil?nomeAmigavel=${nomeAmigavel}`);
  }

  
  findByIdJornada(idJornada) {
    return http.get(`/funil?idJornada=${idJornada}`);
}
}

export default new FunilService();