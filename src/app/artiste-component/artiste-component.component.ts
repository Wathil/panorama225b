import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';

import firebase from 'firebase';
import { EvenementService } from '../evenement.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AffichageService } from '../affichage.service';

const getEvenementObservable = (collection: AngularFirestoreCollection<Evenement>) => {
  const subject = new BehaviorSubject<Evenement[]>([]);
  collection.valueChanges().subscribe((val: Evenement[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-artiste-component',
  templateUrl: './artiste-component.component.html',
  styleUrls: ['./artiste-component.component.css']
})
export class ArtisteComponentComponent implements OnInit {
  // imageUrl$: Observable<string>;

  public evenements = getEvenementObservable(
    this.store.collection('evenements', ref => ref.where('artiste', '==', this.service.artiste).orderBy('timestamp').startAt(this.service.timestamp))
  ) as Observable<Evenement[]>;

  constructor(
    private store: AngularFirestore,
    private service: GeneralService,
    private route: ActivatedRoute,
    private affichageService: AffichageService) {
  }

  ngOnInit(): void {
    this.affichageService.affiche(this.route.snapshot.paramMap.get('artiste')!);
  }

}
