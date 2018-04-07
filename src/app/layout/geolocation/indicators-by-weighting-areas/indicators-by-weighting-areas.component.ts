import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-indicators-by-weighting-areas',
  templateUrl: './indicators-by-weighting-areas.component.html',
  styleUrls: ['./indicators-by-weighting-areas.component.css']
})
export class IndicatorsByWeightingAreasComponent implements OnInit {

  @Output() onSecInformations = new EventEmitter<any>();
  codapSelected: any;
  PANELNAME = 'Informação sobre a vizinhança da Escola';
  // Geral Information about a CODAP
  NO_ENTIDAD = '';
  CODAP = '';

  private subscription = new Subscription();

  constructor() { }

  ngOnInit() {
  }

}
