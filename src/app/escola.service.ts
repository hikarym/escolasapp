// Os serviços são úteis para separar toda a lógica que não está relacionada
// à visão em classes separadas como, por exemplo, o acesso a uma API para
// obter dados para exibição na tela

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EscolaService {

  constructor(private http: Http) { }

  getAllEscolas() {
    return new Promise((resolve, reject) => {
      this.http.get('/escola')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getSchoolSought(schoolName) {
    return new Promise((resolve, reject) => {
      this.http.get('/search/' + schoolName)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showEscola(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/escola/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
