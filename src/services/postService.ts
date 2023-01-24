import Api from "./Api";
import { PostModel } from "../../src/models/redux-model";

export default {
  async getAllPosts() {
    var response = await Api().get("/posts");
    return response.data;
  },
  async getSelectedPost(post_id:number) {
    var response = await Api().get(`/posts/${post_id}`);
    return response.data;
  },
  async createPost(title:string, content:string, user_id: number, categories: string[]) {
    var response = await Api().post(`/posts`, {title, content, user_id, categories});
    return response.data;
  },
  async updatePost(post_id:number, title:string, content:string, user_id: number, categories: string[]) {
    var response = await Api().put(`/posts/${post_id}`, {title, content, user_id, categories});
    return response.data;
  },  
  async deletePost(post_id:number) {
    var response = await Api().delete(`/posts/${post_id}`);
    return response.data;
  }
}