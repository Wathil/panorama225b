import { Injectable } from '@angular/core';
import { Evenement } from './evenement';

const date: Date = new Date();

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public artiste! : string;
  public lieu!: string;

  private _timestamp!: number;
  public get timestamp(): number {
    return this._timestamp;
  }

  constructor() {
    this._timestamp = (date.getDate() - 1) +
      (date.getMonth() * 32) +
      (date.getFullYear() * 512);
  }

  public getFullYear(): number {
    return date.getFullYear();
  }

  public getDay(): number {
    return date.getDate();
  }

  public getMonth(): number {
    return date.getMonth(); // 0-11
  }

  public getTimeStamp(): number {
    return Date.now();
  }

  public listMonth = [
    { code: 0, month: "Janvier"},
    { code: 1, month: "Février"},
    { code: 2, month: "Mars"},
    { code: 3, month: "Avril"},
    { code: 4, month: "Mai"},
    { code: 5, month: "Juin"},
    { code: 6, month: "Juillet"},
    { code: 7, month: "Août"},
    { code: 8, month: "Septembre"},
    { code: 9, month: "Octobre"},
    { code: 10, month: "Novembre"},
    { code: 11, month: "Décembre"},
  ];

  // function add(x: number, y: number): number {
  //   return x + y;
  // }

  public doFormatFrenchDate(evenement: Evenement): string {
    if (evenement == null)
      return "ko";

    if (evenement.mois == null)
      return "ko";

    var leMois: string = "";
    switch (+evenement.mois) {
        case 0:
            leMois = "Janvier";
            break;
        case 1:
            leMois = "Février";
            break;
        case 2:
            leMois = "Mars";
            break;
        case 3:
            leMois = "Avril";
            break;
        case 4:
            leMois = "Mai";
            break;
        case 5:
            leMois = "Juin";
            break;
        case 6:
            leMois = "Juillet";
            break;
        case 7:
            leMois = "Août";
            break;
        case 8:
            leMois = "Septembre";
            break;
        case 9:
            leMois = "Octobre";
            break;
        case 10:
            leMois = "Novembre";
            break;
        case 11:
            leMois = "Décembre";
            break;
        default:
            console.log("evenement.mois=" + evenement.mois);
    }
    return evenement.jour + " " + leMois + " " + evenement.annee;
};
}
