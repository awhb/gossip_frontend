export interface UserModel {
  "id": number,
  "username": string,
  "created_at": Date,
}

export interface UserArrayModel {
  "all_users": UserModel[],
  "selected_user": UserModel,
  "current_user": UserModel,
  "isLoading": boolean,
}

export interface PostModel {
  "id": number,
  "title": string,
  "content": string,
  "user_id": number,
  "categories": string[],
  "creator": string,
  "created_at": Date,
  "upvotes": number,
}

export interface PostArrayModel {
  "all_posts": PostModel[],
  "filtered_posts": PostModel[],
  "selected_post": PostModel,
}

export interface CommentModel {
  "id": number,
  "content": string,
  "creator": string,
  "post_id": number,
  "user_id": number,
  "created_at": Date,
  "updated_at": Date,
}

export interface CommentArrayModel {
  "all_comments": CommentModel[],
  "selected_comment": CommentModel,
}

export interface CategoriesModel {
  "all_categories": string[],
}

export interface ErrorModel {
  "error": string,
}

export interface AuthModel {
  "user": UserModel,
  "token": string,
}