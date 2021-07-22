import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffichageService {

  affichage$: Observable<string>;
  private affichageSubject = new Subject<string>();

  constructor() {
    this.affichage$ = this.affichageSubject.asObservable();
  }

  affiche(data: string) {
    console.log(data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.affichageSubject.next(data);
  }

}
