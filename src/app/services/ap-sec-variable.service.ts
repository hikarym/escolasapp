import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ApSecVariableService {

  constructor(private http: Http) { }

  getAllWeightingAreasInfo() {
    return new Promise((resolve, reject) => {
      this.http.get('/ap-secvariable')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /* Get a single School by ID ("_id"). For example: '5ac3a91961f5122e72625650' */
  showWeightingAreaInfoByID(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/ap-secvariable/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /* GET the variable informations of a SINGLE AP  BY codap ("codap"). For example: '3503901003001' */
  showWeightingAreaInfoByCodAP(codAP: string) {
    return new Promise((resolve, reject) => {
      this.http.get('/ap-secvariable/search/' + codAP)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
