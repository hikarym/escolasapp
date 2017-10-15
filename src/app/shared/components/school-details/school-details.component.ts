import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {SchoolService} from '../../../school.service';
import {Router} from '@angular/router';
import {ShareddataService} from '../../../services/shareddata.service';
import {Subscription} from 'rxjs/Subscription';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  @Output() onSchoolLocation = new EventEmitter<any>();
  schoolSelectedID: string;
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

  LOCATION = {
    LAT: 0,
    LON: 0,
    CODAP: ''
  };
  // TA_EF_AI
  censo_TxAprov_2007_5EF_escola = 'NA';
  censo_TxAprov_2008_5EF_escola = 'NA';
  censo_TxAprov_2009_5EF_escola = 'NA';
  censo_TxAprov_2010_5EF_escola = 'NA';
  censo_TxAprov_2011_5EF_escola = 'NA';
  censo_TxAprov_2012_5EF_escola = 'NA';
  censo_TxAprov_2013_5EF_escola = 'NA';
  censo_TxAprov_2014_5EF_escola = 'NA';

  censo_TxAprov_2007_5EF_vizinhos = 'NA';
  censo_TxAprov_2008_5EF_vizinhos = 'NA';
  censo_TxAprov_2009_5EF_vizinhos = 'NA';
  censo_TxAprov_2010_5EF_vizinhos = 'NA';
  censo_TxAprov_2011_5EF_vizinhos = 'NA';
  censo_TxAprov_2012_5EF_vizinhos = 'NA';
  censo_TxAprov_2013_5EF_vizinhos = 'NA';
  censo_TxAprov_2014_5EF_vizinhos = 'NA';

  censo_TxAprov_2007_5EF_SES = 'NA';
  censo_TxAprov_2008_5EF_SES = 'NA';
  censo_TxAprov_2009_5EF_SES = 'NA';
  censo_TxAprov_2010_5EF_SES = 'NA';
  censo_TxAprov_2011_5EF_SES = 'NA';
  censo_TxAprov_2012_5EF_SES = 'NA';
  censo_TxAprov_2013_5EF_SES = 'NA';
  censo_TxAprov_2014_5EF_SES = 'NA';

  @Output() on_TA_EF_AI = new EventEmitter<any>();

  public lineChartData_TA_EF_AI: Array<any> = [
    { data: [], label: 'nome_da_escola' },
    { data: [], label: 'media_da_vizinhanca' },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico' }
  ];

  public lineChartLabels_TA_EF_AI: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];

  constructor(private router: Router,
              private schoolService: SchoolService,
              private sharedDataService: ShareddataService,
              iconRegistry: MatIconRegistry) {
    // this.subscription = this.sharedDataService.getSchoolID().subscribe(message => {this.message = message; } );
    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getSchoolDetailedInformation(schoolID: string) {
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
      this.NUMERO = this.schoolSelected.NUMERO;
      this.DDD = this.schoolSelected.DDD;
      this.TELEFONE = this.schoolSelected.TELEFONE;
      this.NO_REGIAO = this.schoolSelected.NO_REGIAO;
      this.SIGLA = this.schoolSelected.SIGLA;
      this.Dependad = this.schoolSelected.Dependad;
      this.DESC_SITUACAO_FUNCIONAMENTO = this.schoolSelected.DESC_SITUACAO_FUNCIONAMENTO;
      this.ID_LOCALIZACAO = this.schoolSelected.ID_LOCALIZACAO;
      this.ID_LABORATORIO_INFORMATICA = this.schoolSelected.ID_LABORATORIO_INFORMATICA;
      this.ID_QUADRA_ESPORTES_COBERTA = this.schoolSelected.ID_QUADRA_ESPORTES_COBERTA;
      this.ID_QUADRA_ESPORTES_DESCOBERTA = this.schoolSelected.ID_QUADRA_ESPORTES_DESCOBERTA;
      this.ID_BIBLIOTECA = this.schoolSelected.ID_BIBLIOTECA;
      this.LOCATION.LAT = this.schoolSelected.lat;
      this.LOCATION.LON = this.schoolSelected.lon;
      this.LOCATION.CODAP = this.schoolSelected.codap;
      // TA_EF_AI
      this.censo_TxAprov_2007_5EF_escola = this.schoolSelected.censo_TxAprov_2007_5EF_escola;
      this.censo_TxAprov_2008_5EF_escola = this.schoolSelected.censo_TxAprov_2008_3EM_escola;
      this.censo_TxAprov_2009_5EF_escola = this.schoolSelected.censo_TxAprov_2009_5EF_escola;
      this.censo_TxAprov_2010_5EF_escola = this.schoolSelected.censo_TxAprov_2010_5EF_escola;
      this.censo_TxAprov_2011_5EF_escola = this.schoolSelected.censo_TxAprov_2011_5EF_escola;
      this.censo_TxAprov_2012_5EF_escola = this.schoolSelected.censo_TxAprov_2012_5EF_escola;
      this.censo_TxAprov_2013_5EF_escola = this.schoolSelected.censo_TxAprov_2013_5EF_escola;
      this.censo_TxAprov_2014_5EF_escola = this.schoolSelected.censo_TxAprov_2014_5EF_escola;

      this.censo_TxAprov_2007_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2007_5EF_vizinhos;
      this.censo_TxAprov_2008_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2008_5EF_vizinhos;
      this.censo_TxAprov_2009_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2009_5EF_vizinhos;
      this.censo_TxAprov_2010_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2010_5EF_vizinhos;
      this.censo_TxAprov_2011_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2011_5EF_vizinhos;
      this.censo_TxAprov_2012_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2012_5EF_vizinhos;
      this.censo_TxAprov_2013_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2013_5EF_vizinhos;
      this.censo_TxAprov_2014_5EF_vizinhos = this.schoolSelected.censo_TxAprov_2014_5EF_vizinhos;

      this.censo_TxAprov_2007_5EF_SES = this.schoolSelected.censo_TxAprov_2007_5EF_SES;
      this.censo_TxAprov_2008_5EF_SES = this.schoolSelected.censo_TxAprov_2008_5EF_SES;
      this.censo_TxAprov_2009_5EF_SES = this.schoolSelected.censo_TxAprov_2009_5EF_SES;
      this.censo_TxAprov_2010_5EF_SES = this.schoolSelected.censo_TxAprov_2010_5EF_SES;
      this.censo_TxAprov_2011_5EF_SES = this.schoolSelected.censo_TxAprov_2011_5EF_SES;
      this.censo_TxAprov_2012_5EF_SES = this.schoolSelected.censo_TxAprov_2012_5EF_SES;
      this.censo_TxAprov_2013_5EF_SES = this.schoolSelected.censo_TxAprov_2013_5EF_SES;
      this.censo_TxAprov_2014_5EF_SES = this.schoolSelected.censo_TxAprov_2014_5EF_SES;

      // send lat, lon and codAp of a school selected to geolocation component via observable subject
      this.sharedDataService.sendSchoolLocation(this.LOCATION);
      this.onSchoolLocation.emit(this.LOCATION);

      // send TA_EF_AI information
      this.buildLineChartData();
      this.sharedDataService.send_TA_EF_AI(this.lineChartData_TA_EF_AI);
      this.on_TA_EF_AI.emit(this.lineChartData_TA_EF_AI);

    }, (err) => {
      console.log(err);
    });
  }

  buildLineChartData() {
    this.lineChartData_TA_EF_AI[0] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_5EF_escola),
        this.toFloat(this.censo_TxAprov_2008_5EF_escola),
        this.toFloat(this.censo_TxAprov_2009_5EF_escola),
        this.toFloat(this.censo_TxAprov_2010_5EF_escola),
        this.toFloat(this.censo_TxAprov_2011_5EF_escola),
        this.toFloat(this.censo_TxAprov_2012_5EF_escola),
        this.toFloat(this.censo_TxAprov_2013_5EF_escola),
        this.toFloat(this.censo_TxAprov_2014_5EF_escola)
      ],
      label: this.NO_ENTIDAD
    };
    this.lineChartData_TA_EF_AI[1] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2008_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2009_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2010_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2011_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2012_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2013_5EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2014_5EF_vizinhos)
      ],
      label: 'Média da vizinhança'
    };
    this.lineChartData_TA_EF_AI[2] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_5EF_SES),
        this.toFloat(this.censo_TxAprov_2008_5EF_SES),
        this.toFloat(this.censo_TxAprov_2009_5EF_SES),
        this.toFloat(this.censo_TxAprov_2010_5EF_SES),
        this.toFloat(this.censo_TxAprov_2011_5EF_SES),
        this.toFloat(this.censo_TxAprov_2012_5EF_SES),
        this.toFloat(this.censo_TxAprov_2013_5EF_SES),
        this.toFloat(this.censo_TxAprov_2014_5EF_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico' };
  }

  toFloat(input: any) {
    return input === 'NA' ? null : input;
    /*if (input ===  'NA') {
      return null;
    } else {
      return input;
    }*/
  }

  displayWeightingArea(event) {
    alert(event.checked);
    if (event.checked) {
      // display the weighting area
    } else {
      // Hide the weighting area
    }
  }

  displayNeighborhood(event) {
    alert(event.checked);
    if (event.checked) {
      // display the weighting area
    } else {
      // Hide the weighting area
    }
  }

  displaySharePopup() {
    alert('Compartilhar');
  }

  /* ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  } */

  toggleSchoolDetails() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right-school-details');
    console.log('procurando a informaçao detalhada da escola escolhida');
  }

}
