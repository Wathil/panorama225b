import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArtisteComponentComponent } from './artiste-component/artiste-component.component';
import { ArtisteFormComponent } from './artiste-form/artiste-form.component';
import { LieuFormComponent } from './lieu-form/lieu-form.component';
import { LoginComponent } from './login/login.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { MainFormComponent } from './main-form/main-form.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'artiste', component: ArtisteFormComponent},
  {path: 'artistes', component: ArtisteComponentComponent},
  {path: 'lieu', component: LieuFormComponent},
  {path: 'form', component: MainFormComponent},
  {path: 'main', component: MainComponentComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: AppComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
