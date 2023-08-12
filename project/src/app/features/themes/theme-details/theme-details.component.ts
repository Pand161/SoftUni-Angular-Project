import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';
import { Theme } from 'src/app/types/theme';
import { AuthService } from '../../auth/auth.service';
import { DeleteService } from 'src/app/shared/popup/delete.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailsComponent implements OnInit, OnDestroy {
  theme: Theme | undefined;
  canLike$!: Observable<number>;
  likes$!: Observable<number>;
  post: Post | undefined;
  subscribe$!: Subscription;
  errMessage!: string;
  currentPostText!: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private deleteService: DeleteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getThemeWithPosts();

  }

  get username(): string {
    return this.authService.user?.username || '';
  }
  
  get userId(): string {
    return this.authService.user?._id || '';
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  getThemeWithPosts(): void {
    const themeId = this.activatedRoute.snapshot.params['themeId'];

    this.subscribe$ = this.apiService.getTheme(themeId).subscribe({
      next: (theme) => {
        this.theme = theme;
      },
      error: (err) => {
        this.router.navigate(["**"]);
      }
    })
  }


  deletePost(postId: string): void {
    const themeId = this.activatedRoute.snapshot.params['themeId'];
    const msg = 'Are you sure you want to delete this post?';

    this.subscribe$ = this.deleteService.conform(msg).subscribe((hasComfirmed: boolean) => {
      if (hasComfirmed) {
        this.subscribe$ = this.apiService.deletePost(themeId, postId).subscribe({
          next: () => {
            this.getThemeWithPosts();
          },
          error: (err) => this.errMessage = err.error.message
        })

      }
    })

  }

  likePost(postId: string): void {
    this.subscribe$ = this.apiService.likePost(postId).subscribe({
      next: () => {
        this.getThemeWithPosts();
      },
      error: (err) => this.errMessage = err.error.message
    })
  }


 

  postComment(form: NgForm): void {
    const themeId = this.activatedRoute.snapshot.params['themeId'];
    if (form.invalid) {
      return;
    }
    
    const { postText } = form.value;

    this.subscribe$ = this.apiService.postComment(postText, themeId).subscribe({
      next: () => {
        form.reset()
        this.getThemeWithPosts();
      },
      error: (err) => this.errMessage = err.error.message
    })

  }

  ngOnDestroy(): void {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }


}
