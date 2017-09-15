import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderComponent} from '../shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  selectedSchoolID_cp: string;
  @ViewChild(HeaderComponent)
  private header: HeaderComponent;

  constructor(public router: Router) { }

  ngOnInit() {
    if (this.router.url === '/' ) {
      this.router.navigate(['/geolocation']);
    }
  }

  onSchoolSel(selectedSchoolID: string) {
    this.selectedSchoolID_cp = selectedSchoolID;
  }

}
