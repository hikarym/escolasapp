import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  isActive = false;

  public eventCalled() {
    this.isActive = !this.isActive;  }

  constructor() { }

  ngOnInit() {
  }

}
