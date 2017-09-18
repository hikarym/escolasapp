import {Component, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {SchoolService} from '../../../school.service';
import {Router} from '@angular/router';
import {ShareddataService} from '../../../services/shareddata.service';
import {Subscription} from 'rxjs/Subscription';
import {School} from "../../../school";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  isActive = false;
  message: any;
  schoolSelectedID: string;
  subscription: Subscription;
  schoolSelected: any;
  // Geral Information about a school
  CODESC = '';
  NO_ENTIDAD = '';
  NOMEMUN = '';
  BAIRRO = '';
  CEP = '';
  ENDERECO = '';
  NUMERO = '';
  DDD = '';
  TELEFONE = '';
  NO_REGIAO = '';
  SIGLA= '';
  Dependad = '';
  DESC_SITUACAO_FUNCIONAMENTO = '';
  ID_LOCALIZACAO = '';
  ID_LABORATORIO_INFORMATICA = '';
  ID_QUADRA_ESPORTES_COBERTA = '';
  ID_QUADRA_ESPORTES_DESCOBERTA = '';
  ID_BIBLIOTECA = '';

  public eventCalled() {
    this.isActive = !this.isActive;  }

  constructor(private router: Router,
              private schoolService: SchoolService,
              private sharedDataService: ShareddataService) {
    // this.subscription = this.sharedDataService.getSchoolID().subscribe(message => {this.message = message; } );
  }

  ngOnInit() {
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getSchoolDetailedInformation(schoolID: string) {
    console.log('school/school-details/' + schoolID);
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.schoolService.showEscola(schoolID).then((res) => {
      this.schoolSelected = res;
      this.CODESC = this.schoolSelected.CODESC;
      this.NO_ENTIDAD = this.schoolSelected.NO_ENTIDAD;
      this.NOMEMUN = this.schoolSelected.NOMEMUN;
      this.BAIRRO = this.schoolSelected.BAIRRO;
      this.CEP = this.schoolSelected.CEP;
      this.ENDERECO = this.schoolSelected.ENDERECO;
      this.NUMERO = this.schoolSelected.NUMEROM;
      this.DDD = this.schoolSelected.DDD;
      this.TELEFONE = this.schoolSelected.TELEFONE;
      this.NO_REGIAO = this.schoolSelected.NO_REGIAO;
      this.SIGLA = this.SIGLA;
      this.Dependad = this.schoolSelected.Dependad;
      this.DESC_SITUACAO_FUNCIONAMENTO = this.schoolSelected.DESC_SITUACAO_FUNCIONAMENTO;
      this.ID_LOCALIZACAO = this.schoolSelected.ID_LOCALIZACAO;
      this.ID_LABORATORIO_INFORMATICA = this.schoolSelected.ID_LABORATORIO_INFORMATICA;
      this.ID_QUADRA_ESPORTES_COBERTA = this.schoolSelected.ID_QUADRA_ESPORTES_COBERTA;
      this.ID_QUADRA_ESPORTES_DESCOBERTA = this.schoolSelected.ID_QUADRA_ESPORTES_DESCOBERTA;
      this.ID_BIBLIOTECA = this.schoolSelected.ID_BIBLIOTECA;
      console.log(res);

      // send Data to school-details component
      // Send schoolID to school-details component
      // this.router.navigate(['/schoolDetails']);
    }, (err) => {
      console.log(err);
    });
  }

  /* gOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  } */

}
