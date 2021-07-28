import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArtisteComponentComponent } from './artiste-component/artiste-component.component';
import { ArtisteFormComponent } from './artiste-form/artiste-form.component';
import { LieuFormComponent } from './lieu-form/lieu-form.component';
import { LieuComponent } from './lieu/lieu.component';
import { LoginComponent } from './login/login.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { MainFormComponent } from './main-form/main-form.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'artiste', component: ArtisteFormComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'artistes/:artiste', component: ArtisteComponentComponent},
  {path: 'lieu', component: LieuFormComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'lieux/:lieu', component: LieuComponent},
  {path: 'form', component: MainFormComponent, canActivate: [AngularFireAuthGuard]},
  {path: '', component: MainComponentComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })], // reload
  exports: [RouterModule]
})
export class AppRoutingModule { }
