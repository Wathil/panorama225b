import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageService } from '../affichage.service';
import { ArtisteService } from '../artiste.service';
import { Evenement } from '../evenement';
import { GeneralService } from '../general.service';
import { LieuService } from '../lieu.service';

import firebase from 'firebase';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  label!: string;
  userConnected: string = '';

  artistesNav: ArtisteNav[] = new Array<ArtisteNav>();
  lieuxNav: LieuNav[] = new Array<LieuNav>();

  artisteSelect = new FormControl(undefined);
  lieuSelect = new FormControl(undefined);

  constructor(private service: GeneralService,
    private lieuService: LieuService,
    private artisteService: ArtisteService,
    private store: AngularFirestore,
    private affichageService: AffichageService,
    private router: Router) {

    this.affichageService.affichage$.subscribe((data) => {
      this.label = data;
    });

    this.lieuService.lieux$.forEach(lieux => {
      lieux.forEach(async lieu => {
        if (lieu.lieu) {
          var lieuString: string = lieu.lieu;
          var lieux2 = (this.store.collection('evenements', ref => ref.where('lieu', '==', lieuString).orderBy('timestamp').startAt(this.service.timestamp))) as AngularFirestoreCollection<Evenement>;
          let snapshot = await lieux2.get();
          var count: number = 0;
          await snapshot.forEach(async next => {
            next.forEach(async a => {
              ++count;
            })
          });
          this.lieuxNav.push({ lieu: lieuString, total: count });
        }
      });
    });

    this.artisteService.artistes$.forEach(artistes => {
      artistes.forEach(async artiste => {
        if (artiste.artiste) {
          var artisteString: string = artiste.artiste;
          var artistes2 = (this.store.collection('evenements', ref => ref.where('artiste', '==', artisteString).orderBy('timestamp').startAt(this.service.timestamp))) as AngularFirestoreCollection<Evenement>;
          let snapshot = await artistes2.get();
          var count: number = 0;
          await snapshot.forEach(async next => {
            next.forEach(async a => {
              ++count;
            })
          });
          this.artistesNav.push({ artiste: artisteString, total: count });
        }
      });
    });

  }

  ngOnInit(): void {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      console.log("A");
      if (user.displayName != null ) {
        console.log("B");
        this.userConnected = user.displayName;
      }
      else {
        console.log("C");
      }
    }
    else {
      console.log("D");
    }
  }

  isAccueil(): boolean {
    if (this.label == 'Accueil')
      return true;
    return false;
  }

  goToHome() {
    if (this.label != 'Accueil') {
      this.artisteSelect.reset();
      this.lieuSelect.reset();
      this.router.navigateByUrl('main');
    }
  }

  goToArtiste() {
    if (this.artisteSelect.value && this.artisteSelect.value != '') {
      let artiste: string = this.artisteSelect.value;
      this.artisteSelect.reset();
      this.service.artiste = artiste;
      this.router.navigateByUrl('artistes/' + encodeURIComponent(artiste));
    }
  }

  goToLieu() {
    if (this.lieuSelect.value && this.lieuSelect.value != '') {
      let lieu: string = this.lieuSelect.value;
      this.lieuSelect.reset();
      this.service.lieu = lieu;
      this.router.navigateByUrl('lieux/' + encodeURIComponent(lieu));
    }
  }

}

class LieuNav {
  lieu!: string;
  total!: number;
}

class ArtisteNav {
  artiste!: string;
  total!: number;
}
