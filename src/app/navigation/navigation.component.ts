import { Component, OnInit } from '@angular/core';
import { AffichageService } from '../affichage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  label!: string;

  constructor(private affichageService: AffichageService) {
    this.affichageService.affichage$.subscribe((data) => {
      this.label = data;
    });
  }

  ngOnInit(): void {
  }

}
