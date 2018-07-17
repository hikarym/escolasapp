import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareddataService {
  // private location: Subject<any> = new BehaviorSubject<any>();
  private schoolLocationSource = new Subject<any>();
  private subjectSchoolID = new Subject<any>();
  private subjectSchoolInformation = new Subject<any>();
  private subjectCodAP = new Subject<any>();
  private subjectLocation = new Subject<any>();
  private schoolIDSource = new Subject<string>();
  // Observable string streams
  location$ = this.schoolLocationSource.asObservable();
  schoolID$ = this.schoolIDSource.asObservable();
  private dataObs$ = new Subject();

  constructor() { }

  sendSchoolID(message: any) {
    this.subjectSchoolID.next(message);
  }

  getSchoolID(): Observable<any> {
    return this.subjectSchoolID.asObservable();
  }

  sendSchoolCodAP(message: any) {
    this.subjectCodAP.next(message);
  }

  getSchoolCodAP(): Observable<any> {
    return this.subjectCodAP.asObservable();
  }

  sendSchoolInformation(message: any) {
    this.subjectSchoolInformation.next(message);
  }

  getSchoolInformation(): Observable<any> {
    return this.subjectSchoolInformation.asObservable();
  }

  sendSchoolLocation(message: any) {
    this.subjectLocation.next(message);
  }

  getSchoolLoc() {
    return this.subjectLocation.asObservable(); // return this.subjectLocation;
  }

  /* Send school location and codAp  from Main Layout to GeolocationComponent*/
  updateSchoolLocation (schoolLocation: any) {
    this.dataObs$.next(schoolLocation);
  }

  getSchoolLocation() {
    return this.dataObs$;
  }
}
