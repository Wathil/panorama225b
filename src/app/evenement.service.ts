import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Evenement } from './evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private store: AngularFirestore) { }

  addEvenement(evenement: Evenement) {
    console.log("add evenement=" + JSON.stringify(evenement));

    var e = {
      imageUrl: evenement.imageUrl,
      titre: evenement.titre,
      artiste: evenement.artiste,
      lieu: evenement.lieu,
      jour: evenement.jour,
      mois: evenement.mois,
      annee: evenement.annee,
      annule: evenement.annule,
      timestamp: evenement.timestamp
    };
    this.store.collection('evenements').add(e);
  }
}
