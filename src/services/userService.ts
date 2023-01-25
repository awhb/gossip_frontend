import Api from "./Api";

export default {
  async getAllUsers() {
    var response = await Api().get("/users");
    return response.data;
  },
  async getSelectedUser(id: number) {
    var response = await Api().get(`/users/${id}`);
    return response.data;
  },
  async createUser(username: string, password: string) {
    var response = await Api().post(`/users`, { username, password });
    return response.data;
  },
  async updateUser(id: number, username: string, password: string) {
    var response = await Api().put(`/users/${id}`, { "user": { "id": id, "username": username, "password": password } });
    return response.data;
  },
  async deleteUser(id: number) {
    var response = await Api().delete(`/users/${id}`);
    return response.data;
  },
  // login
  async loginUser(username: string, password: string) {
    var response = await Api().post(`/login`, { "user": { "username": username, "password": password } });
    return response.data;
  },
}