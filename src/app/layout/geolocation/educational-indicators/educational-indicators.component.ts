import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SchoolService} from '../../../services/school.service';
import {ShareddataService} from '../../../services/shareddata.service';
import {MatIconRegistry} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-educational-indicators',
  templateUrl: './educational-indicators.component.html',
  styleUrls: ['./educational-indicators.component.css']
})
export class EducationalIndicatorsComponent implements OnInit, OnDestroy {
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

  sections: any[] = [
    {
      id: 0,
      name: 'geralInfo',
      group: 'section1',
      visible: false
    },
    {
      id: 1,
      name: 'graphByEducationalCat',
      group: 'section2',
      visible: false
    }
  ];
  sectionDefaultIndex = 0;

  private subscription = new Subscription();

  constructor(private schoolService: SchoolService,
              private sharedDataService: ShareddataService,
              iconRegistry: MatIconRegistry) {
    this.sections[this.sectionDefaultIndex].visible = true;
    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolID().subscribe(
      res => {
        this.schoolSelectedID = res;
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

  /**
   * Function to show a specify section
   */
  onSectionChange(idSectionSelected: number) {
    for (let i = 0; i < this.sections.length; i++) {
      this.sections[i].visible = false;
    }
    this.sections[idSectionSelected].visible = true;
    this.sectionDefaultIndex = idSectionSelected;
  }

  /**
   * unsubscribe to ensure no memory leaks
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
