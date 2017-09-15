import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareddataService {
  private selectedSchoolID$ = new BehaviorSubject([]);
  private subject = new Subject<any>();
  private schoolIDSource = new Subject<string>();
  // Observable string streams
  schoolID$ = this.schoolIDSource.asObservable();

  constructor() { }

  sendSchoolID(message: any) {
    // this.schoolIDSource.next(message);
    // this.subject.next({text: message});
    this.subject.next(message);
  }

  getSchoolID(): Observable<any> {
    return this.subject.asObservable();
    // return this.schoolID$;
  }
}
