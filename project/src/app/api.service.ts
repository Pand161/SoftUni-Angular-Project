import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Theme } from './types/theme';
import { Post } from './types/post';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  posts: any = [];

  get postCollection(): string {
    return this.posts || [];
  }

  // for themes
  getTheme(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Theme>(`${apiUrl}/themes/${id}`);
  }

  getThemes() {
    const { apiUrl } = environment;
    return this.http.get<Theme[]>(`${apiUrl}/themes`);
  }

  getLastTheme(limit?: number) {
    const { apiUrl } = environment;
    const limitCount = limit ? `?limit=${limit}` : '';
    return this.http.get<Theme[]>(`${apiUrl}/themes${limitCount}`);
  }

  createTheme(themeName: string, postText: string) {
    return this.http.post<Theme>('/api/themes', { themeName, postText });
  }

  // for posts
  getPosts(limit?: number) {
    const { apiUrl } = environment;
    const limitFilter = limit ? `?limit=${limit}` : '';

    return this.http
      .get<Post[]>(`${apiUrl}/posts${limitFilter}`)
      .pipe(tap((posts) => (this.posts = posts)));
  }

  postComment(postText: string, themeId: string) {
    return this.http.post<Post>(`/api/themes/${themeId}`, { postText })
  }

  likePost(postId: string) {
    return this.http.put<Post>(`/api/likes/${postId}`, {})
  }

  updatePost(themeId: string, postId: string, postText: string) {
    return this.http.put(`/api/themes/${themeId}/posts/${postId}`, { postText })
  }

  deletePost(themeId: string, postId: string) {
    return this.http.delete(`/api/themes/${themeId}/posts/${postId}`, {})
  }
}
