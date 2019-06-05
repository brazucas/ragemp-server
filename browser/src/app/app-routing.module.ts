import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CriarVeiculoPage } from './criar-veiculo/criar-veiculo.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { NickInvalidoPage } from './nick-invalido/nick-invalido.page';
import { PlayerGuiPage } from './player-gui/player-gui.page';
import { PlayersOnlinePage } from './players-online/players-online.page';
import { RegistroPage } from './registro/registro.page';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'login', component: LoginPage},
  {path: 'players-online', component: PlayersOnlinePage},
  {path: 'registro', component: RegistroPage},
  {path: 'criar-veiculo', component: CriarVeiculoPage},
  {path: 'nick-invalido', component: NickInvalidoPage},
  {path: 'player-gui', component: PlayerGuiPage},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
