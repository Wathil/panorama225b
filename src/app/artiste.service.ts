import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artiste } from './artiste';

const getArtisteObservable = (collection: AngularFirestoreCollection<Artiste>) => {
  const subject = new BehaviorSubject<Artiste[]>([]);
  collection.valueChanges().subscribe((val: Artiste[]) => {
    subject.next(val);
  },
  error => console.error("error artiste-service.ts=" + JSON.stringify(error)));
  return subject;
};

const ARTISTE_COLLECTION = 'artistes';
const MAX_ARTISTES = 100;

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {

  public artistes$ = getArtisteObservable(
    this.store.collection(ARTISTE_COLLECTION, ref => ref.orderBy('artiste').limit(MAX_ARTISTES))
  ) as Observable<Artiste[]>;

  constructor(private store: AngularFirestore) { }

  addArtiste(artiste: Artiste) {
    this.store.collection(ARTISTE_COLLECTION).add({ artiste: artiste.artiste, imgUrl: artiste.imgUrl })
      .then((docRef) => { console.log("Document written with ID: ", docRef.id); })
      .catch((error) => { console.error("Error adding document: ", error); });
  }
}
