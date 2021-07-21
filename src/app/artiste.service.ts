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

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {

  public artistes = getArtisteObservable(
    //this.store.collection('artistes')
    this.store.collection('artistes', ref => ref.orderBy('artiste'))
    ) as Observable<Artiste[]>;

  constructor(private store: AngularFirestore) { }

  addArtiste(artiste: Artiste) {
    console.log("add artiste=" + artiste.artiste);
    this.store.collection('artistes').add(artiste);
  }
}
