import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-theme-add',
  templateUrl: './theme-add.component.html',
  styleUrls: ['./theme-add.component.css']
})
export class ThemeAddComponent implements  OnDestroy {
  theme: Theme | undefined;
  subscription!: Subscription;

  constructor(

    private apiService: ApiService,
    private router: Router) { }


  createTheme(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    const { themeName, postText } = form.value;

    this.subscription = this.apiService.createTheme(themeName, postText).subscribe({
      next: () => {
        this.router.navigate(["/theme/themes"]);
      },
    })
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
