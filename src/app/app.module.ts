import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { CardComponent } from './card/card.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainFormComponent } from './main-form/main-form.component';
import { LieuFormComponent } from './lieu-form/lieu-form.component';
import { ArtisteFormComponent } from './artiste-form/artiste-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtisteComponentComponent } from './artiste-component/artiste-component.component';
import { MapPipe } from './card/map.pipe';
import { LieuComponent } from './lieu/lieu.component';
import { TopComponent } from './top/top.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    CardComponent,
    LoginComponent,
    NavigationComponent,
    MainFormComponent,
    LieuFormComponent,
    ArtisteFormComponent,
    ArtisteComponentComponent,
    MapPipe,
    LieuComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule.enablePersistence(), // Does it work?
    AngularFireAuthModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2737506190590879',
      adSlot: 8546594619
      }),
  ],
  providers: [
// {
//   provide: APP_INITIALIZER,
//   useFactory: initConnexionService,
//   deps: [ConnexionService],
//   multi: true
// }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function initConnexionService(connexionService: ConnexionService) {
//   return () => connexionService.init();
// }
