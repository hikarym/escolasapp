import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { EscolaService } from '../../escola.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit {
  lat: number;
  lng: number;
  schoolsLocation: any;
  @ViewChild(AgmMap) private map: any;

  constructor(
    private escolaService: EscolaService
  ) { }

  ngOnInit( ) {
    this.getEscolaList();
    this.lat = -23.552133;
    this.lng = -46.6331418;
    // this.redrawMap();
  }

  private redrawMap() {
    this.map.triggerResize()
      .then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
  }

  getEscolaList() {
    this.escolaService.getAllEscolas().then((res) => {
      this.schoolsLocation = res;
    }, (err) => {
      console.log(err);
    });
  }

  public convertStringToNumber(value: string): number {
    return +value;
  }

  public convertToDouble(value: number) {
    return value / 1000000;
  }

}
