import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GeolocationComponent} from './geolocation/geolocation.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(GeolocationComponent) geolocationComponent: GeolocationComponent;

  constructor(public router: Router) { }

  ngOnInit() {
    if (this.router.url === '/' ) {
      this.router.navigate(['/geolocation']); // '/geolocation'
    }
  }
}
