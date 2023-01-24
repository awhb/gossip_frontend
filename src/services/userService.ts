import Api from "./Api";
import { UserModel } from "../../src/models/redux-model";

export default {
  async getAllPosts() {
    var response = await Api().get("/posts");
    return response.data;
  },
  async getParticularPost(post_id:number) {
    var response = await Api().get(`/posts/${post_id}`);
    return response.data;
  }
}