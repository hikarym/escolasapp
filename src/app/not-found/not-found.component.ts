import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [routerTransition()]
})

export class NotFoundComponent { }

/*export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
