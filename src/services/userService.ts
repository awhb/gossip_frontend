import Api from "./Api";
import { UserModel } from "../../src/models/redux-model";

export default {
async getAllUsers() {
var response = await Api().get("/users");
return response.data;
},
async getSelectedUser(user_id:number) {
var response = await Api().get(`/users/${user_id}`);
return response.data;
},
async createUser(username:string, password:string) {
var response = await Api().post(`/users`, {username, password});
return response.data;
},
async updateUser(user_id:number, username:string, password:string) {
var response = await Api().put(`/users/${user_id}`, {username, password});
return response.data;
},
async deleteUser(user_id:number) {
var response = await Api().delete(`/users/${user_id}`);
return response.data;
},
// login
async loginUser(username:string, password:string) {
  var response = await Api().post(`/login`, { "user": {"username": username, "password": password}});
  return response.data;
},
}