import Api from "./Api";

export default {
  async getAllPosts() {
    var response = await Api().get("/posts");
    return response.data;
  },
  async getSelectedPost(id:number) {
    var response = await Api().get(`/posts/${id}`);
    return response.data;
  },
  async createPost(title:string, content:string, categories: string[], user_id: number) {
    var response = await Api().post(`/posts`, { "post" : {title, content, categories, user_id}});
    return response.data;
  },
  async updatePost(id:number, title:string, content:string, categories: string[], user_id: number) {
    var response = await Api().put(`/posts/${id}`, { "post" : {title, content, categories, user_id}});
    return response.data;
  },  
  async deletePost(id:number) {
    var response = await Api().delete(`/posts/${id}`);
    return response.data;
  }
}