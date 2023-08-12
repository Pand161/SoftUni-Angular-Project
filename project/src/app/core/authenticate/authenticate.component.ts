import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticated = true;
  errMessage!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: () => { this.isAuthenticated = false },
      error: () =>  { this.isAuthenticated = false },
      complete: () => { this.isAuthenticated = false }
    })
  }
}
