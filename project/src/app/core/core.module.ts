import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SharedModule } from '../shared/shared.module';
import { AuthActivate } from './guards/auth.activate';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, ErrorComponent, AuthenticateComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  // Note: tells which components to be exported from this module
  exports: [HeaderComponent, FooterComponent, AuthenticateComponent],
})
export class CoreModule {}
