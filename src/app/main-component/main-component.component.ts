import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';

import { AffichageService } from '../affichage.service';
import { EvenementService } from '../evenement.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  constructor(
    public evenementService: EvenementService,
    private affichageService: AffichageService) {
  }

  ngOnInit(): void {
    this.affichageService.affiche("Accueil");
  }

  evenementEvent(evenement: Evenement) {
    alert(evenement.titre);
  }

}
