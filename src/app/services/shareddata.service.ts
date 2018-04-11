import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareddataService {
  // private location: Subject<any> = new BehaviorSubject<any>();
  private schoolLocationSource = new Subject<any>();
  private subjectSchoolID = new Subject<any>();
  private subjectCodAP = new Subject<any>();
  private subjectLocation = new Subject<any>();
  private subject_TA_EF_AI = new Subject<any>();
  private subject_NPBM_EF_AI = new Subject<any>();
  private subject_NPBLP_EF_AI = new Subject<any>();
  private subject_NPBrasNotaPad_AI = new Subject<any>();
  private subject_IDEB_AI = new Subject<any>();
  private subject_TA_EF_AF = new Subject<any>();
  private subject_NPBM_EF_AF = new Subject<any>();
  private subject_NPBLP_EF_AF = new Subject<any>();
  private subject_NPBrasNotaPad_AF = new Subject<any>();
  private subject_IDEB_AF = new Subject<any>();
  private subject_TxAprov_3EM = new Subject<any>();
  private subject_TxAband_1EM = new Subject<any>();
  private subject_TxDIS_3EM = new Subject<any>();
  private subject_ENEM = new Subject<any>();
  private schoolIDSource = new Subject<string>();
  // Observable string streams
  location$ = this.schoolLocationSource.asObservable();
  schoolID$ = this.schoolIDSource.asObservable();
  private dataObs$ = new Subject();

  constructor() { }

  sendSchoolID(message: any) {
    // this.schoolIDSource.next(message);
    // this.subject.next({text: message});
    this.subjectSchoolID.next(message);
    console.log('message:', message);
  }

  getSchoolID(): Observable<any> {
    return this.subjectSchoolID.asObservable();
    // return this.schoolID$;
  }

  sendSchoolCodAP(message: any) {
    this.subjectCodAP.next(message);
    // console.log('message:', message);
  }

  getSchoolCodAP(): Observable<any> {
    return this.subjectCodAP.asObservable();
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

  send_TA_EF_AI(message: any) {
    this.subject_TA_EF_AI.next(message);
  }

  get_TA_EF_AI() {
    return this.subject_TA_EF_AI.asObservable();
  }

  // ----
  send_NPBM_EF_AI(message: any) {
    this.subject_NPBM_EF_AI.next(message);
  }

  get_NPBM_EF_AI() {
    return this.subject_NPBM_EF_AI.asObservable();
  }

  // ---- NPBLP_EF_AI
  send_NPBLP_EF_AI(message: any) {
    this.subject_NPBLP_EF_AI.next(message);
  }

  get_NPBLP_EF_AI() {
    return this.subject_NPBLP_EF_AI.asObservable();
  }

  // ---- NPBrasNotaPad_AI
  send_NPBrasNotaPad_AI(message: any) {
    this.subject_NPBrasNotaPad_AI.next(message);
  }

  get_NPBrasNotaPad_AI() {
    return this.subject_NPBrasNotaPad_AI.asObservable();
  }

  // ---- IDEB_AI
  send_IDEB_AI(message: any) {
    this.subject_IDEB_AI.next(message);
  }

  get_IDEB_AI() {
    return this.subject_IDEB_AI.asObservable();
  }

  // ---- TA_EF_AF
  send_TA_EF_AF(message: any) {
    this.subject_TA_EF_AF.next(message);
  }

  get_TA_EF_AF() {
    return this.subject_TA_EF_AF.asObservable();
  }

  // ---- NPBM_EF_AF
  send_NPBM_EF_AF(message: any) {
    this.subject_NPBM_EF_AF.next(message);
  }

  get_NPBM_EF_AF() {
    return this.subject_NPBM_EF_AF.asObservable();
  }

  // ---- NPBLP_EF_AF
  send_NPBLP_EF_AF(message: any) {
    this.subject_NPBLP_EF_AF.next(message);
  }

  get_NPBLP_EF_AF() {
    return this.subject_NPBLP_EF_AF.asObservable();
  }

  // ---- NPBrasNotaPad_AF
  send_NPBrasNotaPad_AF(message: any) {
    this.subject_NPBrasNotaPad_AF.next(message);
  }

  get_NPBrasNotaPad_AF() {
    return this.subject_NPBrasNotaPad_AF.asObservable();
  }

  // ---- IDEB_AF
  send_IDEB_AF(message: any) {
    this.subject_IDEB_AF.next(message);
  }

  get_IDEB_AF() {
    return this.subject_IDEB_AF.asObservable();
  }

  // ---- TxAprov_3EM
  send_TxAprov_3EM(message: any) {
    this.subject_TxAprov_3EM.next(message);
  }

  get_TxAprov_3EM() {
    return this.subject_TxAprov_3EM.asObservable();
  }

  // ---- TxAband_1EM
  send_TxAband_1EM(message: any) {
    this.subject_TxAband_1EM.next(message);
  }

  get_TxAband_1EM() {
    return this.subject_TxAband_1EM.asObservable();
  }

  // ---- TxDIS_3EM
  send_TxDIS_3EM(message: any) {
    this.subject_TxDIS_3EM.next(message);
  }

  get_TxDIS_3EM() {
    return this.subject_TxDIS_3EM.asObservable();
  }

  // ---- ENEM
  send_ENEM(message: any) {
    this.subject_ENEM.next(message);
  }

  get_ENEM() {
    return this.subject_ENEM.asObservable();
  }
}
