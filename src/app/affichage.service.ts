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
    this.affichageSubject.next(data);
  }

}
