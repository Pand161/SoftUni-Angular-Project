import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {
  subscribe$!: Subscription;
  postId!: string;
  themeId!: any;
  post: Post | undefined;
  postText: string | undefined;



  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['postId'];

    this.subscribe$ = this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.post = posts.find((post) => post._id == this.postId);
        this.postText = this.post?.text;
        this.themeId = this.post?.themeId._id;
      },
    })
  }



  updatePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { postText } = form.value;
    this.subscribe$ = this.apiService.updatePost(this.themeId, this.postId, postText).subscribe({
      next: () => {
        this.router.navigate([`/theme/themes/${this.themeId}`]);
      }
    })
  }


  ngOnDestroy(): void {
    if (this.subscribe$) {
      this.subscribe$.unsubscribe();
    }
  }

}
