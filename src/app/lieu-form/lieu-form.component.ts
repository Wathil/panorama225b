import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralService } from '../general.service';
import { LieuService } from '../lieu.service';
import firebase from 'firebase';

@Component({
  selector: 'app-lieu-form',
  templateUrl: './lieu-form.component.html',
  styleUrls: ['./lieu-form.component.css']
})
export class LieuFormComponent implements OnInit {

  imageUrl!: number;

  constructor(public service: LieuService,
    public generalService: GeneralService) { }

  ngOnInit(): void {
  }

  name = new FormControl('');
  
  addLieu() {
    this.service.addLieu({ lieu: this.name.value, imgUrl: this.imageUrl.toString() });
  }

  uploadFile(event: any) {

    this.imageUrl = this.generalService.getTimeStamp();

    var selectedFiles = event.target.files;

    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('img/lieu/' + this.imageUrl.toString());

    mountainImagesRef.put(selectedFiles[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }
}
