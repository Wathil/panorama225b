import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageService } from '../affichage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  label!: string;

  constructor(private affichageService: AffichageService,
    private router: Router) {
    this.affichageService.affichage$.subscribe((data) => {
      this.label = data;
    });
  }

  ngOnInit(): void {
  }

  isAccueil() : boolean {
    if (this.label == 'Accueil')
      return true;
    return false;
  }

  goToHome() {
    if (this.label != 'Accueil')
      this.router.navigateByUrl('main');
  }

}
