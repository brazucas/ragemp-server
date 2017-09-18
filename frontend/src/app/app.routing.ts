import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Layout404Component} from "./layouts/layout-404.component";
import {LayoutDefaultComponent} from "./layouts/layout-default.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '**',
    component: Layout404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
