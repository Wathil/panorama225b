import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSignIn() {
    this.authService.GoogleAuth().then((result) => {
      console.log(result);
      if (result.user?.uid !== 'jSXbxCbdBfRpwfx7iEik5izr3Hz1') {
        this.onSignOut();
      }
      this.router.navigate(['']);
    });
  }

  onSignOut() {
    firebase.auth().signOut().then(() => {
      console.log("sign out");
      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    });
  }
}