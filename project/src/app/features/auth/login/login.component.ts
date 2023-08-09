import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { EMAIL_DOMAINS } from '../email-domains';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService,private router: Router) {}

  emailDomains = EMAIL_DOMAINS;

  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const {email, password} = form.value

    this.authService.login(email, password).subscribe(() => {this.router.navigate(["/"])});
  }
}
