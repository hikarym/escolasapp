import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SchoolService} from '../../../school.service';
import {CompleterData, CompleterItem, CompleterService} from 'ng2-completer';
import {ShareddataService} from '../../../services/shareddata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
  URL_ROOT: string;
  schools: any;
  searchField: string;
  placeholderSearch: string;
  schoolListFiltered: CompleterData;
  selectedSchoolID: string = '';
  @Output() onSchoolSel = new EventEmitter<string>();
  schoolObject: any;

  constructor(private translate: TranslateService,
              public router: Router,
              private completerService: CompleterService,
              private schoolService: SchoolService,
              private sharedDataService: ShareddataService) {
    // this.toggleSidebar();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992) {
        this.toggleSidebar();
      }
    });
    this.URL_ROOT = 'http://172.16.1.32:3005/';
    this.schoolListFiltered = completerService.remote( this.URL_ROOT + 'school/search?text=','NO_ENTIDAD','NO_ENTIDAD_BAIRRO');
    this.placeholderSearch = 'Digite o nome da escola de seu interesse';
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992) {
        this.toogleSchoolDetails();
      }
    });
  }

  ngOnInit() {  }

  onSchoolSelected(item: CompleterItem) {
    // this.toggleSidebar();
    this.toogleSchoolDetails();
    this.selectedSchoolID = item ? item.originalObject._id : '';
    // send school ID to school-details component via observable subject
    this.sharedDataService.sendSchoolID(this.selectedSchoolID);
    // Get the complete information about the selected school
    // this.getSchoolDetailedInformation(this.selectedSchoolID);
    // center the map in the selected school location

  }

  getSchoolDetailedInformation(schoolID: string) {
    console.log(this.URL_ROOT + 'school/school-details/' + schoolID);
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.schoolService.showEscola(schoolID).then((res) => {
      console.log(res);
      // send Data to school-details component
      // Send schoolID to school-details component
      // this.router.navigate(['/schoolDetails']);
    }, (err) => {
      console.log(err);
    });
  }

  centerMap(latitude: number, longitude: number) {
    // const dom: any = document.querySelector('#mymap');
    /*dom.classList.toogle();*/
  }

  toogleSchoolDetails() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right-school-details');
    console.log('procurando a informacao detalhada da escola procurada');

  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  /*getSchoolsList() {
    this.schoolService.getAllSchools().then((res) => {
      this.schools = res;
    }, (err) => {
      console.log(err);
    });
  }*/

  public convertStringToNumber(value: string): number {
    return +value;
  }

  public convertToDouble(value: number) {
    return value / 1000000;
  }

}
