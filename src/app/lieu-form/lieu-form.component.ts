import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralService } from '../general.service';
import { LieuService } from '../lieu.service';
import firebase from 'firebase';

@Component({
  selector: 'app-lieu-form',
  templateUrl: './lieu-form.component.html',
  styleUrls: ['./lieu-form.component.css']
})
export class LieuFormComponent implements OnInit {

  imageUrl!: number;

  constructor(public service: LieuService,
    public generalService: GeneralService) { }

  ngOnInit(): void {
  }

  name = new FormControl('');

  addLieu() {
    this.service.addLieu({ lieu: this.name.value });
  }

}
