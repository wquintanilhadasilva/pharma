import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';

import { PaginaNaoEncontradaComponent } from './shared/pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule', canLoad:[AuthGuard], canActivate:[AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class AppRoutingModule { }
