import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SchoolService} from '../../../services/school.service';
import {ShareddataService} from '../../../services/shareddata.service';
import {MatIconRegistry} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-educational-indicators',
  templateUrl: './educational-indicators.component.html',
  styleUrls: ['./educational-indicators.component.css']
})
export class EducationalIndicatorsComponent implements OnInit {
  schoolSelectedID: string;
  schoolSelected: any;
  // Geral Information about a school
  CODESC = '';
  NO_ENTIDAD = '';

  LOCATION = {
    LAT: 0,
    LON: 0,
    CODAP: ''
  };

  private subscription = new Subscription();

  constructor(private schoolService: SchoolService,
              private sharedDataService: ShareddataService,
              iconRegistry: MatIconRegistry) {
    // this.subscription = this.sharedDataService.getSchoolID().subscribe(message => {this.message = message; } );
    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
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

      this.LOCATION.LAT = this.schoolSelected.lat;
      this.LOCATION.LON = this.schoolSelected.lon;
      this.LOCATION.CODAP = this.schoolSelected.codap;
      // send lat, lon and codAp of a school selected  via observable subject
      this.sharedDataService.sendSchoolLocation(this.LOCATION);
      // save school selected information as observable object
      this.sharedDataService.sendSchoolInformation(this.schoolSelected);

    }, (err) => {
      console.log(err);
    });
  }
}
