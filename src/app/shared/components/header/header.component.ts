import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SchoolService} from '../../../school.service';
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
  @Output() onSchoolSel = new EventEmitter<string>();
  logo = 'Escolas da RMSP';

  constructor(private translate: TranslateService,
              public router: Router,
              private completerService: CompleterService,
              private schoolService: SchoolService,
              private sharedDataService: ShareddataService,
              private http: Http) {
    /*this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992) {
        this.toggleSidebar();
      }
    });*/
    // The way that we can check which events are the ones we need, ideally NavigationEnd
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log('val header:' + val);
      }
    });

    this.schoolListFiltered = new CustomData(http);
    // this.schoolListFiltered = completerService.remote( this.URL_ROOT + 'school/search?text=', 'NO_ENTIDAD','NO_ENTIDAD_BAIRRO');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Width: ' + event.target.innerWidth);
    if (event.target.innerWidth <= 992) {
      this.logo = 'ESCOLASAPP';
    } else {
      this.logo = 'Escolas da RMSP';
    }
  }

  ngOnInit() {
    if (window.innerWidth <= 992) {
      this.logo = 'ESCOLASAPP';
    } else {
      this.logo = 'Escolas da RMSP';
    }
  }

  onSchoolSelected(item: CompleterItem) {
    console.log('onSchoolSelected', item);
    this.toggleSchoolDetails();
    if (item !== null) {
      this.selectedSchoolID = item ? item.originalObject._id : '';
      // send school ID to school-details component via observable subject
      this.sharedDataService.sendSchoolID(this.selectedSchoolID);
      this.onSchoolSel.emit(this.selectedSchoolID);
      // Get the complete information about the selected school
      // this.getSchoolDetailedInformation(this.selectedSchoolID);
      // center the map in the selected school location
    }
  }

  toggleSchoolDetails() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right-school-details');
    console.log('procurando a informaçao detalhada da escola escolhida');
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

}
