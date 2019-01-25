import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaquinaCartaoComponent} from "./maquina-cartao/maquina-cartao.component";

const routes: Routes = [
  { path: 'maquina-cartao', component: MaquinaCartaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
