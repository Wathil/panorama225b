import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LieuService } from '../lieu.service';

@Component({
  selector: 'app-lieu-form',
  templateUrl: './lieu-form.component.html',
  styleUrls: ['./lieu-form.component.css']
})
export class LieuFormComponent implements OnInit {

  constructor(public service: LieuService) { }

  ngOnInit(): void {
  }

  name = new FormControl('');
  
  addLieu() {
    this.service.addLieu({ lieu: this.name.value });
  }
}
