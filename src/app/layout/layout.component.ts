import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
// import {SchoolDetailsComponent} from '../shared/components/school-details/school-details.component';
import {GeolocationComponent} from './geolocation/geolocation.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  selectedSchoolID_cp: string;

  // @ViewChild(SchoolDetailsComponent) schoolDetailsComponent: SchoolDetailsComponent;
  @ViewChild(GeolocationComponent) geolocationComponent: GeolocationComponent;

  constructor(public router: Router) { }

  ngOnInit() {
    if (this.router.url === '/' ) {
      this.router.navigate(['/geolocation']); // '/geolocation'
    }
  }

  /*onSchoolSel(selectedSchoolID: string) {
    this.selectedSchoolID_cp = selectedSchoolID;
    this.schoolDetailsComponent.schoolSelectedID = this.selectedSchoolID_cp;
    this.schoolDetailsComponent.getSchoolDetailedInformation(this.selectedSchoolID_cp);
  }*/

  /*onSchoolLocation(locationInfo: any) {
    this.LOCATION.LAT = locationInfo.LAT;
    this.LOCATION.LON = locationInfo.LON;
    this.LOCATION.CODAP = locationInfo.CODAP;
    // this.geolocationComponent.recenter();
    // this.router.navigate(['school-details', this.selectedSchoolID_cp] , {skipLocationChange: false });
    // this.router.navigateByUrl('/geolocation');
    // this.router.navigate(['/geolocation']);
  }*/

}
