import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription!: Subscription;
  lastPost: Theme | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.getLastTheme(1).subscribe({
      next: (themes) => {
        this.lastPost = themes[themes.length-1]
      },
    });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}