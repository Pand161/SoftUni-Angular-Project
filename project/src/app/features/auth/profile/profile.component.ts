import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/types/user';
import { UserId } from 'src/app/types/user-id';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from '../email-domains';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | undefined;
  userId!: string | UserId;
  subscribe$!: Subscription;
  editMode = false;
  emailDomains = EMAIL_DOMAINS;

  constructor(private authService: AuthService,) {}

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  updateProfile(form:NgForm) {
    if(form.invalid){
      return
    }
    
    const {username, email} = form.value

    this.authService.updateProfile(username, email).subscribe(() => this.toggleEditMode())
  }

  ngOnInit(): void {
    this.userId = this.authService.user?._id as string
    this.subscribe$ = this.authService.user$.subscribe((user) => this.user = user)
  }

  ngOnDestroy(): void {
    if (this.subscribe$ ) {
      this.subscribe$ .unsubscribe();
    }
  }

}
