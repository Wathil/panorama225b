import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';

import firebase from 'firebase';
import { EvenementService } from '../evenement.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { ActivatedRoute, Router } from '@angular/router';

const getEvenementObservable = (collection: AngularFirestoreCollection<Evenement>) => {
  const subject = new BehaviorSubject<Evenement[]>([]);
  collection.valueChanges().subscribe((val: Evenement[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-artiste-component',
  templateUrl: './artiste-component.component.html',
  styleUrls: ['./artiste-component.component.css']
})
export class ArtisteComponentComponent implements OnInit {
  // imageUrl$: Observable<string>;

  public artiste!: string | null;

  public evenements = getEvenementObservable(
    this.store.collection('evenements', ref => ref.where('artiste', '==', this.service.artiste).orderBy('timestamp').startAt(this.service.timestamp))
  ) as Observable<Evenement[]>;

  user!: firebase.User;
  randomNumber1: number = Date.now();

  constructor(private store: AngularFirestore, private service: GeneralService, private route: ActivatedRoute) {
    //var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/panorama225a.appspot.com/o/img%2F1.jpg?alt=media&token=9d696ca8-19b6-448c-ac39-76b5a969fe1b');
    // var httpsReference = storage.refFromURL('gs://panorama225a.appspot.com/img/1.jpg');
    // this.imageUrl$ = httpsReference.getDownloadURL();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          this.user = user;
          console.log("user=" + JSON.stringify(user));
          // ...
        } else {
          // User is signed out
          // this.user.delete;
        }
      });
  }

  ngOnInit(): void {
    this.artiste = this.route.snapshot.paramMap.get('artiste');
    console.log("ngOnInit this.artiste =" + this.artiste);
  }

  evenementEvent(evenement: Evenement) {
    alert(evenement.titre);
  }

}