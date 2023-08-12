import { Component } from '@angular/core';
import { EMAIL_DOMAINS } from '../email-domains';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService:AuthService, private router: Router) {}

  emailDomains = EMAIL_DOMAINS;
  subscription!: Subscription;
  errMessage!: string;


  register(form: NgForm) : void {
    if (form.invalid) {
      return;
    }

    const {username, email, tel , password, rePassword} = form.value

    this.authService.register(username, email, password, rePassword, tel).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      
      
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
