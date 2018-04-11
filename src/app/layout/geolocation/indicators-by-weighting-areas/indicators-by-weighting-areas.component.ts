import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {ShareddataService} from '../../../services/shareddata.service';
import {ApSecVariableService} from '../../../services/ap-sec-variable.service';
import {BrSpRmspSecVariableService} from '../../../services/br-sp-rmsp-sec-variable.service';

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
  CODAP = '';
  GINI = 0;
  PERC_POOR = 0;
  RENDA_DOM_PER_CAP_MEDIA = 0;
  OCUP: any;

  // ------------
  @Output() onSchoolLocation = new EventEmitter<any>();
  selectedSchoolCodAP: string;
  weightingAreaInfo: any;
  brSpRmspSecInfo: any;

  private subscription = new Subscription();

  constructor(private router: Router,
              private weightingAreaSecInfoService: ApSecVariableService,
              private brSpRmspSecInfoService: BrSpRmspSecVariableService,
              private sharedDataService: ShareddataService) {
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolCodAP().subscribe(
      res => {
        console.log('Retrieving the selected school cod AP', res);

        // Get all the information about BR-SP-RMSP socioeconomic variables
        this.brSpRmspSecInfoService.getBrSpRmspSecInfo().then((res1) => {
          this.brSpRmspSecInfo = res1;
          console.log(this.brSpRmspSecInfo);
        });

        // Get Weighting Area socioeconomic variables's information
        this.selectedSchoolCodAP = res;
        this.getWeightingAreaInformation(this.selectedSchoolCodAP);
      });
    this.subscription.add(s);
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getWeightingAreaInformation(schoolCodAP: string) {
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.weightingAreaSecInfoService.showWeightingAreaInfoByCodAP(schoolCodAP).then((res) => {
      this.weightingAreaInfo = res[0];
      console.log(this.weightingAreaInfo);
      this.CODAP = this.weightingAreaInfo.codap;
      this.GINI = this.weightingAreaInfo.ses.gini;
      this.PERC_POOR = this.weightingAreaInfo.ses.perc_poor;
      this.RENDA_DOM_PER_CAP_MEDIA = this.weightingAreaInfo.ses.renda_dom_per_cap_media;
    });
  }

}
