import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemesAllComponent } from './themes-all/themes-all.component';
import { ThemeDetailsComponent } from './theme-details/theme-details.component';
import { ThemeAddComponent } from './theme-add/theme-add.component';
import { PostEditComponent } from './post-edit/post-edit.component';



const routes: Routes = [
    {
        path: 'themes',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ThemesAllComponent
            },
            {
                path: ':themeId',
                component: ThemeDetailsComponent
            }
        ]
    },
    {
        path: 'add-theme',
        component:ThemeAddComponent
    },
    {
        path: 'post-edit/:postId',
        component: PostEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }