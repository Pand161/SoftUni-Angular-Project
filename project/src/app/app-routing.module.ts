import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './features/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {path: 'theme',
    loadChildren: () => import('./features/themes/theme.module').then((x) => x.ThemeModule)
},
  {path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((x) => x.AuthModule)
},
  {path: 'error', component: ErrorComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}