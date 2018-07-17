import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CompleterData, CompleterItem, CompleterService} from 'ng2-completer';
import {ShareddataService} from '../../../services/shareddata.service';
import {Http} from '@angular/http';
import {CustomData} from '../../../custom.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
  searchField: string;
  schoolListFiltered: CompleterData;
  selectedSchoolID = '';
  selectedSchoolCodAP = '';
  @Output() onSchoolSel = new EventEmitter<string>();
  @Output() onSelectedSchoolCodAP = new EventEmitter<string>();
  brand: string;

  constructor(private translate: TranslateService,
              public router: Router,
              private sharedDataService: ShareddataService,
              private http: Http) {
    this.schoolListFiltered = new CustomData(http);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeBrandName(event.target.innerWidth, 768);
  }

  ngOnInit() {
    this.changeBrandName(window.innerWidth, 768);
  }

  onSchoolSelected(item: CompleterItem) {
    this.toggleSchoolDetails();
    this.toggleIndicatiorsByWeightingAreas();
    if (item !== null) {
      this.selectedSchoolID = item ? item.originalObject._id : '';
      // send school ID to school-details component via observable subject
      this.sharedDataService.sendSchoolID(this.selectedSchoolID);
      this.onSchoolSel.emit(this.selectedSchoolID);
      // send codAP
      this.selectedSchoolCodAP = item ? item.originalObject.codap : '';
      this.sharedDataService.sendSchoolCodAP(this.selectedSchoolCodAP);
    }
  }

  toggleSchoolDetails() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right-school-details');
  }

  toggleIndicatiorsByWeightingAreas() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-left-indicators-by-weighting-areas');
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  changeLang(language: string) {
    this.translate.use(language);
    this.changeBrandName(window.innerWidth, 992);
  }

  changeBrandName(screenWidth: number, threshold: number ) {
    if (screenWidth <= threshold) {
      // this.translate.i.instant('brand-small');
      this.translate.get('brand-small').subscribe(res => { this.brand = res; });
    } else {
      // this.translate.instant('brand-small');
      this.translate.get('brand-large').subscribe(res => { this.brand = res; });
    }
  }

}
