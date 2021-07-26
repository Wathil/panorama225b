import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artiste } from './artiste';

const getArtisteObservable = (collection: AngularFirestoreCollection<Artiste>) => {
  const subject = new BehaviorSubject<Artiste[]>([]);
  collection.valueChanges().subscribe((val: Artiste[]) => {
    subject.next(val);
  });
  return subject;
};

const ARTISTE_COLLECTION = 'artistes';

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {

  public artistes$ = getArtisteObservable(
    this.store.collection(ARTISTE_COLLECTION, ref => ref.orderBy('artiste'))
  ) as Observable<Artiste[]>;

  constructor(private store: AngularFirestore) { }

  addArtiste(artiste: Artiste) {
    this.store.collection(ARTISTE_COLLECTION).add({ artiste: artiste.artiste, imgUrl: artiste.imgUrl })
      .then((docRef) => { console.log("Document written with ID: ", docRef.id); })
      .catch((error) => { console.error("Error adding document: ", error); });
  }
}
