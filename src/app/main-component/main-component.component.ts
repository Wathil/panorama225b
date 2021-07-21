import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';

import firebase from 'firebase';
import { EvenementService } from '../evenement.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  // imageUrl$: Observable<string>;

  user!: firebase.User;
  randomNumber1: number = Date.now();

  constructor(public service: EvenementService) {
    //var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/panorama225a.appspot.com/o/img%2F1.jpg?alt=media&token=9d696ca8-19b6-448c-ac39-76b5a969fe1b');
    // var httpsReference = storage.refFromURL('gs://panorama225a.appspot.com/img/1.jpg');
    // this.imageUrl$ = httpsReference.getDownloadURL();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          this.user = user;

          // ...
        } else {
          // User is signed out
          this.user.delete;
        }
      });
  }

  ngOnInit(): void {
  }

  evenementEvent(evenement: Evenement) {
    alert(evenement.titre);
  }

}
