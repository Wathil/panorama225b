import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AffichageService } from '../affichage.service';
import { Evenement } from '../evenement';
import { GeneralService } from '../general.service';

const getEvenementObservable = (collection: AngularFirestoreCollection<Evenement>) => {
  const subject = new BehaviorSubject<Evenement[]>([]);
  collection.valueChanges().subscribe((val: Evenement[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.css']
})
export class LieuComponent implements OnInit {

  public evenements = getEvenementObservable(
    this.store.collection('evenements', ref => ref.where('lieu', '==', this.service.lieu).orderBy('timestamp').startAt(this.service.timestamp))
  ) as Observable<Evenement[]>;

  constructor(
    private store: AngularFirestore,
    private service: GeneralService,
    private route: ActivatedRoute,
    private affichageService: AffichageService) {
  }

  ngOnInit(): void {
    this.affichageService.affiche(this.route.snapshot.paramMap.get('lieu')!);
  }

}
