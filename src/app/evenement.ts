export class Evenement {
    public imageUrl?: string | undefined;
    public titre?: string;
    public artiste?: string;
    public lieu?: string;
    public annule: boolean = false;

    private _annee?: number | undefined;
    public get annee(): number | undefined {
        return this._annee;
    }
    public set annee(value: number | undefined) {
        if (value != this._annee) {
            this._annee = value;
            this.setTimestamp();
        }
    }

    private _mois?: number | undefined;
    public get mois(): number | undefined {
        return this._mois;
    }
    public set mois(value: number | undefined) {
        if (value != this._mois) {
            this._mois = value;
            this.setTimestamp();
        }
    }

    private _jour?: number | undefined;
    public get jour(): number | undefined {
        return this._jour;
    }
    public set jour(value: number | undefined) {
        if (value != this._jour) {
            this._jour = value;
            this.setTimestamp();
        }
    }

    public timestamp?: number;

    private setTimestamp() {
        if (this._jour && this._mois && this._annee) {
            this.timestamp = (this._jour - 1) + (this._mois * 32) + (this._annee * 512);
        }
    }

}
