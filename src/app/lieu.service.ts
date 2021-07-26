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

const LIEU_COLLECTION = 'lieux';

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  public lieux$ = getLieuObservable(this.store.collection(LIEU_COLLECTION, ref => ref.orderBy('lieu'))) as Observable<Lieu[]>;

  constructor(private store: AngularFirestore) { }

  addLieu(lieu: Lieu) {
    this.store.collection(LIEU_COLLECTION).add({ lieu: lieu.lieu, imgUrl: lieu.imgUrl })
      .then((docRef) => { console.log("Document written with ID: ", docRef.id); })
      .catch(error => { console.error("Error adding document: ", error); });
  }

}
