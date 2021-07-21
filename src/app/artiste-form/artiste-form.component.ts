import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ArtisteService } from '../artiste.service';

@Component({
  selector: 'app-artiste-form',
  templateUrl: './artiste-form.component.html',
  styleUrls: ['./artiste-form.component.css']
})
export class ArtisteFormComponent implements OnInit {

  constructor(public service: ArtisteService) { }
  
  ngOnInit(): void {
  }

  name = new FormControl();

  addArtiste() {
    console.log("add artiste=" + this.name.value);
    this.service.addArtiste({ artiste: this.name.value });
  }
}
