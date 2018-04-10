import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {SchoolService} from '../../../school.service';
import {ShareddataService} from '../../../services/shareddata.service';

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
  CODESC = '';
  // ------------
  @Output() onSchoolLocation = new EventEmitter<any>();
  schoolSelectedID: string;
  schoolSelected: any;

  private subscription = new Subscription();

  constructor(private router: Router, private schoolService: SchoolService,
              private sharedDataService: ShareddataService) {
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolID().subscribe(
      res => {
        console.log('cosa', this.sharedDataService);
        console.log('res', res);
        this.schoolSelectedID = res;
        // this.getSchoolDetailedInformation(this.schoolSelectedID);
        this.getSchoolDetailedInformation(this.schoolSelectedID);
      });
    this.subscription.add(s);
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getSchoolDetailedInformation(schoolID: string) {
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.schoolService.showEscola(schoolID).then((res) => {
      this.schoolSelected = res;
      console.log(this.schoolSelected);
      this.CODESC = this.schoolSelected.codesc;
      this.NO_ENTIDAD = this.schoolSelected.detalhes.nomeesc;
      this.CODAP = this.schoolSelected.codap;
    });
  }

}
