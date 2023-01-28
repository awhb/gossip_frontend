import Api from "./Api";

export default {
  async getAllComments(post_id: number) {
    var response = await Api().get(`/posts/${post_id}/comments`);
    return response.data;
  },
  async getComment(id:number) {
    var response = await Api().get(`/comments/${id}`);
    return response.data;
  },
  async createComment(content:string, user_id: number, post_id: number) {
    var response = await Api().post(`/comments`, {"comment" : {content, user_id, post_id} });
    return response.data;
  },
  async updateComment(id:number, content:string, user_id: number, post_id: number) {
    var response = await Api().put(`/comments/${id}`, {"comment" : {id, content, user_id, post_id}});
    return response.data;
  },  
  async deleteComment(id:number) {
    var response = await Api().delete(`/comments/${id}`);
    return response.data;
  }
}