import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDetailsComponent } from './theme-details/theme-details.component';
import { ThemesAllComponent } from './themes-all/themes-all.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeAddComponent } from './theme-add/theme-add.component';
import { ThemeEditComponent } from './theme-edit/theme-edit.component';
import { PostEditComponent } from './post-edit/post-edit.component';





@NgModule({
  declarations: [
    ThemeDetailsComponent,
    ThemesAllComponent,
    ThemeAddComponent,
    ThemeEditComponent,
    PostEditComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ThemeRoutingModule
  ],
  exports:[
    ThemesAllComponent,
    ThemeDetailsComponent
  ]
})
export class ThemeModule { }
