import { observable, action } from 'mobx';
import { Fetch } from '../helpers/fetch';
import { env } from 'src/env/environment';

export class Comments {
  @observable
  comments: any[] = [];

  @action 
  fetchComments(postId: number) {
    return Fetch.request(env.securedRoutes + '/comment/' + postId, 'json',
      { 
        method: 'GET'
      }
    )
    .then((response) => {
      this.comments = response;
      return response;
    });
  }

  @action
  addComment(postId: number, authorId: number, content: string) {
    return Fetch.request(env.securedRoutes + '/add_new_comment', 'json',
      { 
        method: 'POST',
        body: JSON.stringify({
          postId,
          authorId,
          content
        })
      }
    ).then(() => {
      this.fetchComments(postId);
    });
  }

  @action 
  removeComment(postId: number, commentId: number) {
    return Fetch.request(env.securedRoutes + '/delete_comment/' + commentId, 'json',
      { 
        method: 'DELETE'
      }
    ).then(() => {
      this.fetchComments(postId);
    });
  }
};

export const commentsStore = new Comments();