import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { ArtisteService } from '../artiste.service';
import { Evenement } from '../evenement';
import { EvenementService } from '../evenement.service';
import { GeneralService } from '../general.service';
import { LieuService } from '../lieu.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {

  titre: string = '';
  artisteSelect = '';
  lieuSelect = '';
  day: number;
  month: number;
  annee: number;
  imageUrl!: number;

  ngOnInit(): void {
  }

  constructor(
    public generalService: GeneralService,
    private evenementService: EvenementService,
    public artisteService: ArtisteService,
    public lieuService: LieuService) {
    this.day = this.generalService.getDay();
    this.month = this.generalService.getMonth();
    this.annee = this.generalService.getFullYear();
  }

  counter(i: number) {
    return new Array(i);
  }

  AddEvenement() {
    var evenement = new Evenement();
    evenement.imageUrl = this.imageUrl.toString();
    evenement.titre = this.titre;
    evenement.artiste = this.artisteSelect;
    evenement.lieu = this.lieuSelect;
    evenement.jour = this.day;
    evenement.mois = this.month;
    evenement.annee = this.annee;
    evenement.annule = false;
    this.evenementService.addEvenement(evenement);
  }

  uploadFile(event: any) {

    this.imageUrl = this.generalService.getTimeStamp();

    var selectedFiles = event.target.files;

    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('img/' + this.imageUrl.toString());

    mountainImagesRef.put(selectedFiles[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

}