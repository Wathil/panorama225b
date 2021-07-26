import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';

import firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { AffichageService } from '../affichage.service';

const getEvenementObservable = (collection: AngularFirestoreCollection<Evenement>) => {
  const subject = new BehaviorSubject<Evenement[]>([]);
  collection.valueChanges().subscribe((val: Evenement[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  getOne(): AngularFirestoreCollection<Evenement> {
    return (this.store.collection('evenements', ref => ref.orderBy('timestamp').startAt(this.service.timestamp).limit(10))) as AngularFirestoreCollection<Evenement>;
  }

  evenements = getEvenementObservable(
    this.getOne()
  ) as Observable<Evenement[]>;

  constructor(private store: AngularFirestore,
    private service: GeneralService,
    private affichageService: AffichageService) {
  }

  ngOnInit(): void {
    this.affichageService.affiche("Accueil");
  }

  evenementEvent(evenement: Evenement) {
    alert(evenement.titre);
  }

}
