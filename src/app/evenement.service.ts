import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evenement } from './evenement';
import { GeneralService } from './general.service';

const EVENEMENT_COLLECTION = 'evenements';
const MAX_EVENEMENTS = 10;

const getEvenementObservable = (collection: AngularFirestoreCollection<Evenement>) => {
  const subject = new BehaviorSubject<Evenement[]>([]);
  collection.valueChanges().subscribe((val: Evenement[]) => {
    subject.next(val);
  },
  error => console.error("error evenement-service.ts=" + JSON.stringify(error)));
  return subject;
};

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  public evenements: Evenement[] = new Array<Evenement>();

  private evenements$ = getEvenementObservable(
    this.store.collection(EVENEMENT_COLLECTION, ref => ref.orderBy('timestamp').startAt(this.service.timestamp).limit(MAX_EVENEMENTS))
  ) as Observable<Evenement[]>;

  constructor(
    private store: AngularFirestore,
    private service: GeneralService) {

    this.evenements$.forEach(evens => {
      evens.forEach(async evenement => {
        this.evenements.push(evenement);
      });
    });
  }

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
