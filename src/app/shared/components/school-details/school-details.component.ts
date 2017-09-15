import {Component, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {SchoolService} from '../../../school.service';
import {Router} from '@angular/router';
import {ShareddataService} from '../../../services/shareddata.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnDestroy {
  isActive = false;
  message: any;
  schoolSelectedID: string;
  subscription: Subscription;

  public eventCalled() {
    this.isActive = !this.isActive;  }

  constructor(private router: Router,
              private schoolService: SchoolService,
              private sharedDataService: ShareddataService) {
    this.subscription = this.sharedDataService.getSchoolID().subscribe(message => {this.message = message; } );
    alert(this.message.text);
  }

  /*ngOnInit() {
  }*/

  getSchoolDetailedInformation(schoolID: string) {
    console.log('school/school-details/' + schoolID);
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

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
