import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lieu } from './lieu';

const getLieuObservable = (collection: AngularFirestoreCollection<Lieu>) => {
  const subject = new BehaviorSubject<Lieu[]>([]);
  collection.valueChanges().subscribe((val: Lieu[]) => {
    subject.next(val);
  });
  return subject;
};

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  public lieux = getLieuObservable(this.store.collection('lieux', ref => ref.orderBy('lieu'))) as Observable<Lieu[]>;

  constructor(private store: AngularFirestore) { }

  addLieu(lieu: Lieu) {
    console.log("add lieu=" + lieu.lieu);
    this.store.collection('lieux').add(lieu);
  }

}
