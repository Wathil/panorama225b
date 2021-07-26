import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/app/evenement';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { GeneralService } from 'src/app/general.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router } from '@angular/router';
import { MapPipe } from './map.pipe';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public formatString(str: string, len: number): string {
    if (str.length < len) return str;
    return str.substr(0, len).concat("…");
  }

  @Input() evenement?: Evenement; // decorate the property with @Input()
  //@Output() evenementEvent: EventEmitter<Evenement> = new EventEmitter<Evenement>();

  imgUrl$!: Observable<string>;

  constructor(private storage: AngularFireStorage,
    public service: GeneralService,
    //private nav: NavigationComponent,
    private router: Router) {
  }

  ngOnInit(): void {
    var url = 'gs://panorama225-9aa61.appspot.com/img/evenement/' + this.evenement?.imageUrl;
    var httpsReference = this.storage.refFromURL(url);
    this.imgUrl$ = httpsReference.getDownloadURL();
  }

  // emitEvenement() {
  //   alert("child");
  //   this.evenementEvent.emit(this.evenement);
  // }

  goToArtiste(artiste : string | undefined) {
    if (artiste) {
      this.service.artiste = artiste;
      //this.nav.label = artiste;
      this.router.navigateByUrl('artistes/' + encodeURIComponent(artiste));
    }
  }

  goToLieu(lieu : string | undefined) {
    if (lieu) {
      this.service.lieu = lieu;
      //this.nav.label = artiste;
      this.router.navigateByUrl('lieux/' + encodeURIComponent(lieu));
    }
  }

}
