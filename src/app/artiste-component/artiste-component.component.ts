import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { ActivatedRoute } from '@angular/router';
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

  public evenements = getEvenementObservable(
    this.store.collection('evenements', ref => ref.where('artiste', '==', this.service.artiste).orderBy('timestamp').startAt(this.service.timestamp).limit(10))
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
