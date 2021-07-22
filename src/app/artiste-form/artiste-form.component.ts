import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ArtisteService } from '../artiste.service';
import { GeneralService } from '../general.service';
import firebase from 'firebase';

@Component({
  selector: 'app-artiste-form',
  templateUrl: './artiste-form.component.html',
  styleUrls: ['./artiste-form.component.css']
})
export class ArtisteFormComponent implements OnInit {

  imageUrl!: number;

  constructor(public service: ArtisteService,
    public generalService: GeneralService) { }
  
  ngOnInit(): void {
  }

  name = new FormControl();

  addArtiste() {
    console.log("add artiste=" + this.name.value);
    this.service.addArtiste({ artiste: this.name.value, imgUrl: this.imageUrl.toString() });
  }

  uploadFile(event: any) {

    this.imageUrl = this.generalService.getTimeStamp();

    var selectedFiles = event.target.files;

    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('img/artiste/' + this.imageUrl.toString());

    mountainImagesRef.put(selectedFiles[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }
}
