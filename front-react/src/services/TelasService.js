import http from "../http-common.js";

class TelasService {
  
  getAll() {
    return http.get("/telas");
  }

  get(id) {
    return http.get(`/telas/${id}`);
  }

  create(data) {
    return http.post("/telas", data);
  }

  update(id, data) {
    return http.put(`/telas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/telas/${id}`);
  }

  deleteAll() {
    return http.delete(`/telas`);
  }

  findByTitle(nomeAmigavel) {
    return http.get(`/telas?nomeAmigavel=${nomeAmigavel}`);
  }
}

export default new TelasService();