import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CriarVeiculoPage } from './criar-veiculo/criar-veiculo.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { PlayersOnlinePage } from './players-online/players-online.page';
import { RegistroPage } from './registro/registro.page';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'players-online', component: PlayersOnlinePage},
  {path: 'registro', component: RegistroPage},
  {path: 'criar-veiculo', component: CriarVeiculoPage},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
