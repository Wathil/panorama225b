import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evenement } from './evenement';
import { GeneralService } from './general.service';

const getEvenementObservable = (collection: AngularFirestoreCollection<Evenement>) => {
  const subject = new BehaviorSubject<Evenement[]>([]);
  collection.valueChanges().subscribe((val: Evenement[]) => {
    subject.next(val);
  });
  return subject;
};

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  public evenements = getEvenementObservable(
    this.store.collection('evenements', ref => ref.orderBy('timestamp').startAt(this.service.timestamp))
  ) as Observable<Evenement[]>;

  constructor(private store: AngularFirestore, private service: GeneralService) { }

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
