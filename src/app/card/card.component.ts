import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() evenement?: Evenement; // decorate the property with @Input()
  //@Output() evenementEvent: EventEmitter<Evenement> = new EventEmitter<Evenement>();

  imgUrl$!: Observable<string>;

  constructor(private storage: AngularFireStorage,
    public service: GeneralService) {
  }

  ngOnInit(): void {
    var url = 'gs://panorama225a.appspot.com/img/' + this.evenement?.imageUrl;
    var httpsReference = this.storage.refFromURL(url);
    this.imgUrl$ = httpsReference.getDownloadURL();
    //this.evenement?.doFormatFrenchDate();
    console.log("this.service.doFormatFrenchDate(evenement)=" + this.service.doFormatFrenchDate(this.evenement!));
  }

  // emitEvenement() {
  //   alert("child");
  //   this.evenementEvent.emit(this.evenement);
  // }

}
