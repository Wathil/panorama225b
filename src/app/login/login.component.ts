import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }

  onSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
    }).catch((error) => {
      console.error("error=" + JSON.stringify(error));
    });
  }

  onSignOut() {
    firebase.auth().signOut().then(() => {
      console.log("sign out");
      //this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
