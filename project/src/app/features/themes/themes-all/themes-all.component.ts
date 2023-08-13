import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-themes-all',
  templateUrl: './themes-all.component.html',
  styleUrls: ['./themes-all.component.css']
})
export class ThemesAllComponent implements OnInit, OnDestroy {
  themesList: Theme[] = [];
  subscription!: Subscription;

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.subscription = this.apiService.getThemes().subscribe((themes) => {
        this.themesList = themes;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}