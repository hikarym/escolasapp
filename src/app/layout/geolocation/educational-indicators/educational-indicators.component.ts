import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SchoolService} from '../../../school.service';
import {ShareddataService} from '../../../services/shareddata.service';
import {MatIconRegistry} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-educational-indicators',
  templateUrl: './educational-indicators.component.html',
  styleUrls: ['./educational-indicators.component.css']
})
export class EducationalIndicatorsComponent implements OnInit {
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
  SIGLA = '';
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

  public lineChartData_TA_EF_AI: Array<any> = [ ];

  public lineChartLabels_TA_EF_AI: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];

  // NPBM_EF_AI
  NPBras_Mat_2005_AI_escola = 'NA';
  NPBras_Mat_2007_AI_escola = 'NA';
  NPBras_Mat_2009_AI_escola = 'NA';
  NPBras_Mat_2011_AI_escola = 'NA';
  NPBras_Mat_2013_AI_escola = 'NA';

  NPBras_Mat_2005_AI_vizinhos = 'NA';
  NPBras_Mat_2007_AI_vizinhos = 'NA';
  NPBras_Mat_2009_AI_vizinhos = 'NA';
  NPBras_Mat_2011_AI_vizinhos = 'NA';
  NPBras_Mat_2013_AI_vizinhos = 'NA';

  NPBras_Mat_2005_AI_SES = 'NA';
  NPBras_Mat_2007_AI_SES = 'NA';
  NPBras_Mat_2009_AI_SES = 'NA';
  NPBras_Mat_2011_AI_SES = 'NA';
  NPBras_Mat_2013_AI_SES = 'NA';

  @Output() on_NPBM_EF_AI = new EventEmitter<any>();

  public lineChartData_NPBM_EF_AI: Array<any> = [ ];

  // ---- NPBLP_EF_AI
  NPBras_LP_2005_AI_escola = 'NA';
  NPBras_LP_2007_AI_escola = 'NA';
  NPBras_LP_2009_AI_escola = 'NA';
  NPBras_LP_2011_AI_escola = 'NA';
  NPBras_LP_2013_AI_escola = 'NA';

  NPBras_LP_2005_AI_vizinhos = 'NA';
  NPBras_LP_2007_AI_vizinhos = 'NA';
  NPBras_LP_2009_AI_vizinhos = 'NA';
  NPBras_LP_2011_AI_vizinhos = 'NA';
  NPBras_LP_2013_AI_vizinhos = 'NA';

  NPBras_LP_2005_AI_SES = 'NA';
  NPBras_LP_2007_AI_SES = 'NA';
  NPBras_LP_2009_AI_SES = 'NA';
  NPBras_LP_2011_AI_SES = 'NA';
  NPBras_LP_2013_AI_SES = 'NA';

  @Output() on_NPBLP_EF_AI = new EventEmitter<any>();

  public lineChartData_NPBLP_EF_AI: Array<any> = [ ];

  // ---- NPBrasNotaPad_AI
  NPBras_NotaPad_2005_AI_escola = 'NA';
  NPBras_NotaPad_2007_AI_escola = 'NA';
  NPBras_NotaPad_2009_AI_escola = 'NA';
  NPBras_NotaPad_2011_AI_escola = 'NA';
  NPBras_NotaPad_2013_AI_escola = 'NA';

  NPBras_NotaPad_2005_AI_vizinhos = 'NA';
  NPBras_NotaPad_2007_AI_vizinhos = 'NA';
  NPBras_NotaPad_2009_AI_vizinhos = 'NA';
  NPBras_NotaPad_2011_AI_vizinhos = 'NA';
  NPBras_NotaPad_2013_AI_vizinhos = 'NA';

  NPBras_NotaPad_2005_AI_SES = 'NA';
  NPBras_NotaPad_2007_AI_SES = 'NA';
  NPBras_NotaPad_2009_AI_SES = 'NA';
  NPBras_NotaPad_2011_AI_SES = 'NA';
  NPBras_NotaPad_2013_AI_SES = 'NA';

  @Output() on_NPBrasNotaPad_AI = new EventEmitter<any>();

  public lineChartData_NPBrasNotaPad_AI: Array<any> = [ ];

  // ---- IDEB_AI
  censo_IDEB_2005_AI_escola = 'NA';
  censo_IDEB_2007_AI_escola = 'NA';
  censo_IDEB_2009_AI_escola = 'NA';
  censo_IDEB_2011_AI_escola = 'NA';
  censo_IDEB_2013_AI_escola = 'NA';

  censo_IDEB_2005_AI_vizinhos = 'NA';
  censo_IDEB_2007_AI_vizinhos = 'NA';
  censo_IDEB_2009_AI_vizinhos = 'NA';
  censo_IDEB_2011_AI_vizinhos = 'NA';
  censo_IDEB_2013_AI_vizinhos = 'NA';

  censo_IDEB_2005_AI_SES = 'NA';
  censo_IDEB_2007_AI_SES = 'NA';
  censo_IDEB_2009_AI_SES = 'NA';
  censo_IDEB_2011_AI_SES = 'NA';
  censo_IDEB_2013_AI_SES = 'NA';

  @Output() on_IDEB_AI = new EventEmitter<any>();

  public lineChartData_IDEB_AI: Array<any> = [ ];

  // ---- TA_EF_AF
  censo_TxAprov_2007_9EF_escola = 'NA';
  censo_TxAprov_2008_9EF_escola = 'NA';
  censo_TxAprov_2009_9EF_escola = 'NA';
  censo_TxAprov_2010_9EF_escola = 'NA';
  censo_TxAprov_2011_9EF_escola = 'NA';
  censo_TxAprov_2012_9EF_escola = 'NA';
  censo_TxAprov_2013_9EF_escola = 'NA';
  censo_TxAprov_2014_9EF_escola = 'NA';

  censo_TxAprov_2007_9EF_vizinhos = 'NA';
  censo_TxAprov_2008_9EF_vizinhos = 'NA';
  censo_TxAprov_2009_9EF_vizinhos = 'NA';
  censo_TxAprov_2010_9EF_vizinhos = 'NA';
  censo_TxAprov_2011_9EF_vizinhos = 'NA';
  censo_TxAprov_2012_9EF_vizinhos = 'NA';
  censo_TxAprov_2013_9EF_vizinhos = 'NA';
  censo_TxAprov_2014_9EF_vizinhos = 'NA';

  censo_TxAprov_2007_9EF_SES = 'NA';
  censo_TxAprov_2008_9EF_SES = 'NA';
  censo_TxAprov_2009_9EF_SES = 'NA';
  censo_TxAprov_2010_9EF_SES = 'NA';
  censo_TxAprov_2011_9EF_SES = 'NA';
  censo_TxAprov_2012_9EF_SES = 'NA';
  censo_TxAprov_2013_9EF_SES = 'NA';
  censo_TxAprov_2014_9EF_SES = 'NA';

  @Output() on_TA_EF_AF = new EventEmitter<any>();

  public lineChartData_TA_EF_AF: Array<any> = [ ];

  // ---- NPBM_EF_AF
  NPBras_Mat_2005_AF_escola = 'NA';
  NPBras_Mat_2007_AF_escola = 'NA';
  NPBras_Mat_2009_AF_escola = 'NA';
  NPBras_Mat_2011_AF_escola = 'NA';
  NPBras_Mat_2013_AF_escola = 'NA';

  NPBras_Mat_2005_AF_vizinhos = 'NA';
  NPBras_Mat_2007_AF_vizinhos = 'NA';
  NPBras_Mat_2009_AF_vizinhos = 'NA';
  NPBras_Mat_2011_AF_vizinhos = 'NA';
  NPBras_Mat_2013_AF_vizinhos = 'NA';

  NPBras_Mat_2005_AF_SES = 'NA';
  NPBras_Mat_2007_AF_SES = 'NA';
  NPBras_Mat_2009_AF_SES = 'NA';
  NPBras_Mat_2011_AF_SES = 'NA';
  NPBras_Mat_2013_AF_SES = 'NA';

  @Output() on_NPBM_EF_AF = new EventEmitter<any>();

  public lineChartData_NPBM_EF_AF: Array<any> = [ ];

  // ---- NPBLP_EF_AF
  NPBras_LP_2005_AF_escola = 'NA';
  NPBras_LP_2007_AF_escola = 'NA';
  NPBras_LP_2009_AF_escola = 'NA';
  NPBras_LP_2011_AF_escola = 'NA';
  NPBras_LP_2013_AF_escola = 'NA';

  NPBras_LP_2005_AF_vizinhos = 'NA';
  NPBras_LP_2007_AF_vizinhos = 'NA';
  NPBras_LP_2009_AF_vizinhos = 'NA';
  NPBras_LP_2011_AF_vizinhos = 'NA';
  NPBras_LP_2013_AF_vizinhos = 'NA';

  NPBras_LP_2005_AF_SES = 'NA';
  NPBras_LP_2007_AF_SES = 'NA';
  NPBras_LP_2009_AF_SES = 'NA';
  NPBras_LP_2011_AF_SES = 'NA';
  NPBras_LP_2013_AF_SES = 'NA';

  @Output() on_NPBLP_EF_AF = new EventEmitter<any>();

  public lineChartData_NPBLP_EF_AF: Array<any> = [ ];

  // ---- NPBrasNotaPad_AF
  NPBras_NotaPad_2005_AF_escola = 'NA';
  NPBras_NotaPad_2007_AF_escola = 'NA';
  NPBras_NotaPad_2009_AF_escola = 'NA';
  NPBras_NotaPad_2011_AF_escola = 'NA';
  NPBras_NotaPad_2013_AF_escola = 'NA';

  NPBras_NotaPad_2005_AF_vizinhos = 'NA';
  NPBras_NotaPad_2007_AF_vizinhos = 'NA';
  NPBras_NotaPad_2009_AF_vizinhos = 'NA';
  NPBras_NotaPad_2011_AF_vizinhos = 'NA';
  NPBras_NotaPad_2013_AF_vizinhos = 'NA';

  NPBras_NotaPad_2005_AF_SES = 'NA';
  NPBras_NotaPad_2007_AF_SES = 'NA';
  NPBras_NotaPad_2009_AF_SES = 'NA';
  NPBras_NotaPad_2011_AF_SES = 'NA';
  NPBras_NotaPad_2013_AF_SES = 'NA';

  @Output() on_NPBrasNotaPad_AF = new EventEmitter<any>();

  public lineChartData_NPBrasNotaPad_AF: Array<any> = [ ];

  // ---- IDEB_AF
  censo_IDEB_2005_AF_escola = 'NA';
  censo_IDEB_2007_AF_escola = 'NA';
  censo_IDEB_2009_AF_escola = 'NA';
  censo_IDEB_2011_AF_escola = 'NA';
  censo_IDEB_2013_AF_escola = 'NA';

  censo_IDEB_2005_AF_vizinhos = 'NA';
  censo_IDEB_2007_AF_vizinhos = 'NA';
  censo_IDEB_2009_AF_vizinhos = 'NA';
  censo_IDEB_2011_AF_vizinhos = 'NA';
  censo_IDEB_2013_AF_vizinhos = 'NA';

  censo_IDEB_2005_AF_SES = 'NA';
  censo_IDEB_2007_AF_SES = 'NA';
  censo_IDEB_2009_AF_SES = 'NA';
  censo_IDEB_2011_AF_SES = 'NA';
  censo_IDEB_2013_AF_SES = 'NA';

  @Output() on_IDEB_AF = new EventEmitter<any>();

  public lineChartData_IDEB_AF: Array<any> = [ ];

  // ---- TxAprov_3EM
  censo_TxAprov_2007_3EM_escola = 'NA';
  censo_TxAprov_2008_3EM_escola = 'NA';
  censo_TxAprov_2009_3EM_escola = 'NA';
  censo_TxAprov_2010_3EM_escola = 'NA';
  censo_TxAprov_2011_3EM_escola = 'NA';
  censo_TxAprov_2012_3EM_escola = 'NA';
  censo_TxAprov_2013_3EM_escola = 'NA';
  censo_TxAprov_2014_3EM_escola = 'NA';

  censo_TxAprov_2007_3EM_vizinhos = 'NA';
  censo_TxAprov_2008_3EM_vizinhos = 'NA';
  censo_TxAprov_2009_3EM_vizinhos = 'NA';
  censo_TxAprov_2010_3EM_vizinhos = 'NA';
  censo_TxAprov_2011_3EM_vizinhos = 'NA';
  censo_TxAprov_2012_3EM_vizinhos = 'NA';
  censo_TxAprov_2013_3EM_vizinhos = 'NA';
  censo_TxAprov_2014_3EM_vizinhos = 'NA';

  censo_TxAprov_2007_3EM_SES = 'NA';
  censo_TxAprov_2008_3EM_SES = 'NA';
  censo_TxAprov_2009_3EM_SES = 'NA';
  censo_TxAprov_2010_3EM_SES = 'NA';
  censo_TxAprov_2011_3EM_SES = 'NA';
  censo_TxAprov_2012_3EM_SES = 'NA';
  censo_TxAprov_2013_3EM_SES = 'NA';
  censo_TxAprov_2014_3EM_SES = 'NA';

  @Output() on_TxAprov_3EM = new EventEmitter<any>();

  public lineChartData_TxAprov_3EM: Array<any> = [ ];

  // ---- TxAband_1EM
  censo_TxAband_2007_1EM_escola = 'NA';
  censo_TxAband_2008_1EM_escola = 'NA';
  censo_TxAband_2009_1EM_escola = 'NA';
  censo_TxAband_2010_1EM_escola = 'NA';
  censo_TxAband_2011_1EM_escola = 'NA';
  censo_TxAband_2012_1EM_escola = 'NA';
  censo_TxAband_2013_1EM_escola = 'NA';
  censo_TxAband_2014_1EM_escola = 'NA';

  censo_TxAband_2007_1EM_vizinhos = 'NA';
  censo_TxAband_2008_1EM_vizinhos = 'NA';
  censo_TxAband_2009_1EM_vizinhos = 'NA';
  censo_TxAband_2010_1EM_vizinhos = 'NA';
  censo_TxAband_2011_1EM_vizinhos = 'NA';
  censo_TxAband_2012_1EM_vizinhos = 'NA';
  censo_TxAband_2013_1EM_vizinhos = 'NA';
  censo_TxAband_2014_1EM_vizinhos = 'NA';

  censo_TxAband_2007_1EM_SES = 'NA';
  censo_TxAband_2008_1EM_SES = 'NA';
  censo_TxAband_2009_1EM_SES = 'NA';
  censo_TxAband_2010_1EM_SES = 'NA';
  censo_TxAband_2011_1EM_SES = 'NA';
  censo_TxAband_2012_1EM_SES = 'NA';
  censo_TxAband_2013_1EM_SES = 'NA';
  censo_TxAband_2014_1EM_SES = 'NA';

  @Output() on_TxAband_1EM = new EventEmitter<any>();

  public lineChartData_TxAband_1EM: Array<any> = [ ];

  // ---- TxDIS_3EM
  censo_TxDIS_2007_3EM_escola = 'NA';
  censo_TxDIS_2008_3EM_escola = 'NA';
  censo_TxDIS_2009_3EM_escola = 'NA';
  censo_TxDIS_2010_3EM_escola = 'NA';
  censo_TxDIS_2011_3EM_escola = 'NA';
  censo_TxDIS_2012_3EM_escola = 'NA';
  censo_TxDIS_2013_3EM_escola = 'NA';
  censo_TxDIS_2014_3EM_escola = 'NA';

  censo_TxDIS_2007_3EM_vizinhos = 'NA';
  censo_TxDIS_2008_3EM_vizinhos = 'NA';
  censo_TxDIS_2009_3EM_vizinhos = 'NA';
  censo_TxDIS_2010_3EM_vizinhos = 'NA';
  censo_TxDIS_2011_3EM_vizinhos = 'NA';
  censo_TxDIS_2012_3EM_vizinhos = 'NA';
  censo_TxDIS_2013_3EM_vizinhos = 'NA';
  censo_TxDIS_2014_3EM_vizinhos = 'NA';

  censo_TxDIS_2007_3EM_SES = 'NA';
  censo_TxDIS_2008_3EM_SES = 'NA';
  censo_TxDIS_2009_3EM_SES = 'NA';
  censo_TxDIS_2010_3EM_SES = 'NA';
  censo_TxDIS_2011_3EM_SES = 'NA';
  censo_TxDIS_2012_3EM_SES = 'NA';
  censo_TxDIS_2013_3EM_SES = 'NA';
  censo_TxDIS_2014_3EM_SES = 'NA';

  @Output() on_TxDIS_3EM = new EventEmitter<any>();

  public lineChartData_TxDIS_3EM: Array<any> = [ ];

  // ---- ENEM
  ENEM_RED_2013_3M_escola = 'NA';
  ENEM_LC_2013_3M_escola = 'NA';
  ENEM_MAT_2013_3M_escola = 'NA';
  ENEM_CH_2013_3M_escola = 'NA';
  ENEM_CN_2013_3M_escola = 'NA';
  ENEM_Geral_2013_3M_escola = 'NA';

  ENEM_RED_2013_3M_vizinhos = 'NA';
  ENEM_LC_2013_3M_vizinhos = 'NA';
  ENEM_MAT_2013_3M_vizinhos = 'NA';
  ENEM_CH_2013_3M_vizinhos = 'NA';
  ENEM_CN_2013_3M_vizinhos = 'NA';
  ENEM_Geral_2013_3M_vizinhos = 'NA';

  ENEM_RED_2013_3M_SES = 'NA';
  ENEM_LC_2013_3M_SES = 'NA';
  ENEM_MAT_2013_3M_SES = 'NA';
  ENEM_CH_2013_3M_SES = 'NA';
  ENEM_CN_2013_3M_SES = 'NA';
  ENEM_Geral_2013_3M_SES = 'NA';

  @Output() on_ENEM = new EventEmitter<any>();

  public barChartData_ENEM: any[] = [ ];

  private subscription = new Subscription();

  constructor(private schoolService: SchoolService,
              private sharedDataService: ShareddataService,
              iconRegistry: MatIconRegistry) {
    // this.subscription = this.sharedDataService.getSchoolID().subscribe(message => {this.message = message; } );
    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolID().subscribe(
      res => {
        console.log('cosa', this.sharedDataService);
        console.log('res', res);
        this.schoolSelectedID = res;
        // this.getSchoolDetailedInformation(this.schoolSelectedID);
        this.getSchoolDetailedInformation(this.schoolSelectedID);
      });
    this.subscription.add(s);
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getSchoolDetailedInformation(schoolID: string) {
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.schoolService.showEscola(schoolID).then((res) => {
      this.schoolSelected = res;
      console.log(this.schoolSelected);
      this.CODESC = this.schoolSelected.codesc;
      this.NO_ENTIDAD = this.schoolSelected.detalhes.nomeesc;
      this.NOMEMUN = this.schoolSelected.detalhes.nomemun.x;
      this.BAIRRO = this.schoolSelected.detalhes.bairro;
      this.CEP = this.schoolSelected.detalhes.cep;
      this.ENDERECO = this.schoolSelected.detalhes.endereco;
      this.NUMERO = this.schoolSelected.detalhes.numero;
      this.DDD = this.schoolSelected.detalhes.ddd;
      this.TELEFONE = this.schoolSelected.detalhes.telefone;
      // this.NO_REGIAO = this.schoolSelected.detalhes.noregiao;
      // this.SIGLA = this.schoolSelected.detalhes.sigla;
      this.Dependad = this.schoolSelected.detalhes.tipodep;
      // this.DESC_SITUACAO_FUNCIONAMENTO = this.schoolSelected.sitfun.2016;
      this.ID_LOCALIZACAO = this.schoolSelected.detalhes.localiza;
      this.ID_LABORATORIO_INFORMATICA = this.schoolSelected.detalhes.ID_LABORATORIO_INFORMATICA;
      this.ID_QUADRA_ESPORTES_COBERTA = this.schoolSelected.ID_QUADRA_ESPORTES_COBERTA;
      this.ID_QUADRA_ESPORTES_DESCOBERTA = this.schoolSelected.ID_QUADRA_ESPORTES_DESCOBERTA;
      this.ID_BIBLIOTECA = this.schoolSelected.ID_BIBLIOTECA;
      this.LOCATION.LAT = this.schoolSelected.lat;
      this.LOCATION.LON = this.schoolSelected.lon;
      this.LOCATION.CODAP = this.schoolSelected.codap;
      // send lat, lon and codAp of a school selected to geolocation component via observable subject
      this.sharedDataService.sendSchoolLocation(this.LOCATION);
      this.onSchoolLocation.emit(this.LOCATION);

      // TA_EF_AI
      this.censo_TxAprov_2007_5EF_escola = this.schoolSelected.censo_TxAprov_2007_5EF_escola;
      this.censo_TxAprov_2008_5EF_escola = this.schoolSelected.censo_TxAprov_2008_5EF_escola;
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

      // send TA_EF_AI information
      this.buildLineChartData_TA_EF_AI();
      this.sharedDataService.send_TA_EF_AI(this.lineChartData_TA_EF_AI);
      this.on_TA_EF_AI.emit(this.lineChartData_TA_EF_AI);

      // NPBM_EF_AI
      this.NPBras_Mat_2005_AI_escola = this.schoolSelected.NPBras_Mat_2005_AI_escola;
      this.NPBras_Mat_2007_AI_escola = this.schoolSelected.NPBras_Mat_2007_AI_escola;
      this.NPBras_Mat_2009_AI_escola = this.schoolSelected.NPBras_Mat_2009_AI_escola;
      this.NPBras_Mat_2011_AI_escola = this.schoolSelected.NPBras_Mat_2011_AI_escola;
      this.NPBras_Mat_2013_AI_escola = this.schoolSelected.NPBras_Mat_2013_AI_escola;

      this.NPBras_Mat_2005_AI_vizinhos = this.schoolSelected.NPBras_Mat_2005_AI_vizinhos;
      this.NPBras_Mat_2007_AI_vizinhos = this.schoolSelected.NPBras_Mat_2007_AI_vizinhos;
      this.NPBras_Mat_2009_AI_vizinhos = this.schoolSelected.NPBras_Mat_2009_AI_vizinhos;
      this.NPBras_Mat_2011_AI_vizinhos = this.schoolSelected.NPBras_Mat_2011_AI_vizinhos;
      this.NPBras_Mat_2013_AI_vizinhos = this.schoolSelected.NPBras_Mat_2013_AI_vizinhos;

      this.NPBras_Mat_2005_AI_SES = this.schoolSelected.NPBras_Mat_2005_AI_SES;
      this.NPBras_Mat_2007_AI_SES = this.schoolSelected.NPBras_Mat_2007_AI_SES;
      this.NPBras_Mat_2009_AI_SES = this.schoolSelected.NPBras_Mat_2009_AI_SES;
      this.NPBras_Mat_2011_AI_SES = this.schoolSelected.NPBras_Mat_2011_AI_SES;
      this.NPBras_Mat_2013_AI_SES = this.schoolSelected.NPBras_Mat_2013_AI_SES;
      // send NPBM_EF_AI information
      this.buildLineChartData_NPBM_EF_AI();
      this.sharedDataService.send_NPBM_EF_AI(this.lineChartData_NPBM_EF_AI);
      this.on_NPBM_EF_AI.emit(this.lineChartData_NPBM_EF_AI);

      // ---- NPBLP_EF_AI
      this.NPBras_LP_2005_AI_escola = this.schoolSelected.NPBras_LP_2005_AI_escola;
      this.NPBras_LP_2007_AI_escola = this.schoolSelected.NPBras_LP_2007_AI_escola;
      this.NPBras_LP_2009_AI_escola = this.schoolSelected.NPBras_LP_2009_AI_escola;
      this.NPBras_LP_2011_AI_escola = this.schoolSelected.NPBras_LP_2011_AI_escola;
      this.NPBras_LP_2013_AI_escola = this.schoolSelected.NPBras_LP_2013_AI_escola;

      this.NPBras_LP_2005_AI_vizinhos = this.schoolSelected.NPBras_LP_2005_AI_vizinhos;
      this.NPBras_LP_2007_AI_vizinhos = this.schoolSelected.NPBras_LP_2007_AI_vizinhos;
      this.NPBras_LP_2009_AI_vizinhos = this.schoolSelected.NPBras_LP_2009_AI_vizinhos;
      this.NPBras_LP_2011_AI_vizinhos = this.schoolSelected.NPBras_LP_2011_AI_vizinhos;
      this.NPBras_LP_2013_AI_vizinhos = this.schoolSelected.NPBras_LP_2013_AI_vizinhos;

      this.NPBras_LP_2005_AI_SES = this.schoolSelected.NPBras_LP_2005_AI_SES;
      this.NPBras_LP_2007_AI_SES = this.schoolSelected.NPBras_LP_2007_AI_SES;
      this.NPBras_LP_2009_AI_SES = this.schoolSelected.NPBras_LP_2009_AI_SES;
      this.NPBras_LP_2011_AI_SES = this.schoolSelected.NPBras_LP_2011_AI_SES;
      this.NPBras_LP_2013_AI_SES = this.schoolSelected.NPBras_LP_2013_AI_SES;
      // send NPBLP_EF_AI information
      this.buildLineChartData_NPBLP_EF_AI();
      this.sharedDataService.send_NPBLP_EF_AI(this.lineChartData_NPBLP_EF_AI);
      this.on_NPBLP_EF_AI.emit(this.lineChartData_NPBLP_EF_AI);

      // ---- NPBrasNotaPad_EF_AI
      this.NPBras_NotaPad_2005_AI_escola = this.schoolSelected.NPBras_NotaPad_2005_AI_escola;
      this.NPBras_NotaPad_2007_AI_escola = this.schoolSelected.NPBras_NotaPad_2007_AI_escola;
      this.NPBras_NotaPad_2009_AI_escola = this.schoolSelected.NPBras_NotaPad_2009_AI_escola;
      this.NPBras_NotaPad_2011_AI_escola = this.schoolSelected.NPBras_NotaPad_2011_AI_escola;
      this.NPBras_NotaPad_2013_AI_escola = this.schoolSelected.NPBras_NotaPad_2013_AI_escola;

      this.NPBras_NotaPad_2005_AI_vizinhos = this.schoolSelected.NPBras_NotaPad_2005_AI_vizinhos;
      this.NPBras_NotaPad_2007_AI_vizinhos = this.schoolSelected.NPBras_NotaPad_2007_AI_vizinhos;
      this.NPBras_NotaPad_2009_AI_vizinhos = this.schoolSelected.NPBras_NotaPad_2009_AI_vizinhos;
      this.NPBras_NotaPad_2011_AI_vizinhos = this.schoolSelected.NPBras_NotaPad_2011_AI_vizinhos;
      this.NPBras_NotaPad_2013_AI_vizinhos = this.schoolSelected.NPBras_NotaPad_2013_AI_vizinhos;

      this.NPBras_NotaPad_2005_AI_SES = this.schoolSelected.NPBras_NotaPad_2005_AI_SES;
      this.NPBras_NotaPad_2007_AI_SES = this.schoolSelected.NPBras_NotaPad_2007_AI_SES;
      this.NPBras_NotaPad_2009_AI_SES = this.schoolSelected.NPBras_NotaPad_2009_AI_SES;
      this.NPBras_NotaPad_2011_AI_SES = this.schoolSelected.NPBras_NotaPad_2011_AI_SES;
      this.NPBras_NotaPad_2013_AI_SES = this.schoolSelected.NPBras_NotaPad_2013_AI_SES;
      // send NPBrasNotaPad_AI information
      this.buildLineChartData_NPBrasNotaPad_AI();
      this.sharedDataService.send_NPBrasNotaPad_AI(this.lineChartData_NPBrasNotaPad_AI);
      this.on_NPBrasNotaPad_AI.emit(this.lineChartData_NPBrasNotaPad_AI);

      // ---- IDEB_AI
      this.censo_IDEB_2005_AI_escola = this.schoolSelected.censo_IDEB_2005_AI_escola;
      this.censo_IDEB_2007_AI_escola = this.schoolSelected.censo_IDEB_2007_AI_escola;
      this.censo_IDEB_2009_AI_escola = this.schoolSelected.censo_IDEB_2009_AI_escola;
      this.censo_IDEB_2011_AI_escola = this.schoolSelected.censo_IDEB_2011_AI_escola;
      this.censo_IDEB_2013_AI_escola = this.schoolSelected.censo_IDEB_2013_AI_escola;

      this.censo_IDEB_2005_AI_vizinhos = this.schoolSelected.censo_IDEB_2005_AI_vizinhos;
      this.censo_IDEB_2007_AI_vizinhos = this.schoolSelected.censo_IDEB_2007_AI_vizinhos;
      this.censo_IDEB_2009_AI_vizinhos = this.schoolSelected.censo_IDEB_2009_AI_vizinhos;
      this.censo_IDEB_2011_AI_vizinhos = this.schoolSelected.censo_IDEB_2011_AI_vizinhos;
      this.censo_IDEB_2013_AI_vizinhos = this.schoolSelected.censo_IDEB_2013_AI_vizinhos;

      this.censo_IDEB_2005_AI_SES = this.schoolSelected.censo_IDEB_2005_AI_SES;
      this.censo_IDEB_2007_AI_SES = this.schoolSelected.censo_IDEB_2007_AI_SES;
      this.censo_IDEB_2009_AI_SES = this.schoolSelected.censo_IDEB_2009_AI_SES;
      this.censo_IDEB_2011_AI_SES = this.schoolSelected.censo_IDEB_2011_AI_SES;
      this.censo_IDEB_2013_AI_SES = this.schoolSelected.censo_IDEB_2013_AI_SES;

      this.buildLineChartData_IDEB_AI();
      this.sharedDataService.send_IDEB_AI(this.lineChartData_IDEB_AI);
      this.on_IDEB_AI.emit(this.lineChartData_IDEB_AI);

      // TA_EF_AF
      this.censo_TxAprov_2007_9EF_escola = this.schoolSelected.censo_TxAprov_2007_9EF_escola;
      this.censo_TxAprov_2008_9EF_escola = this.schoolSelected.censo_TxAprov_2008_9EF_escola;
      this.censo_TxAprov_2009_9EF_escola = this.schoolSelected.censo_TxAprov_2009_9EF_escola;
      this.censo_TxAprov_2010_9EF_escola = this.schoolSelected.censo_TxAprov_2010_9EF_escola;
      this.censo_TxAprov_2011_9EF_escola = this.schoolSelected.censo_TxAprov_2011_9EF_escola;
      this.censo_TxAprov_2012_9EF_escola = this.schoolSelected.censo_TxAprov_2012_9EF_escola;
      this.censo_TxAprov_2013_9EF_escola = this.schoolSelected.censo_TxAprov_2013_9EF_escola;
      this.censo_TxAprov_2014_9EF_escola = this.schoolSelected.censo_TxAprov_2014_9EF_escola;

      this.censo_TxAprov_2007_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2007_9EF_vizinhos;
      this.censo_TxAprov_2008_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2008_9EF_vizinhos;
      this.censo_TxAprov_2009_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2009_9EF_vizinhos;
      this.censo_TxAprov_2010_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2010_9EF_vizinhos;
      this.censo_TxAprov_2011_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2011_9EF_vizinhos;
      this.censo_TxAprov_2012_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2012_9EF_vizinhos;
      this.censo_TxAprov_2013_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2013_9EF_vizinhos;
      this.censo_TxAprov_2014_9EF_vizinhos = this.schoolSelected.censo_TxAprov_2014_9EF_vizinhos;

      this.censo_TxAprov_2007_9EF_SES = this.schoolSelected.censo_TxAprov_2007_9EF_SES;
      this.censo_TxAprov_2008_9EF_SES = this.schoolSelected.censo_TxAprov_2008_9EF_SES;
      this.censo_TxAprov_2009_9EF_SES = this.schoolSelected.censo_TxAprov_2009_9EF_SES;
      this.censo_TxAprov_2010_9EF_SES = this.schoolSelected.censo_TxAprov_2010_9EF_SES;
      this.censo_TxAprov_2011_9EF_SES = this.schoolSelected.censo_TxAprov_2011_9EF_SES;
      this.censo_TxAprov_2012_9EF_SES = this.schoolSelected.censo_TxAprov_2012_9EF_SES;
      this.censo_TxAprov_2013_9EF_SES = this.schoolSelected.censo_TxAprov_2013_9EF_SES;
      this.censo_TxAprov_2014_9EF_SES = this.schoolSelected.censo_TxAprov_2014_9EF_SES;

      // send TA_EF_AF information
      this.buildLineChartData_TA_EF_AF();
      this.sharedDataService.send_TA_EF_AF(this.lineChartData_TA_EF_AF);
      this.on_TA_EF_AF.emit(this.lineChartData_TA_EF_AF);

      // NPBM_EF_AF
      this.NPBras_Mat_2005_AF_escola = this.schoolSelected.NPBras_Mat_2005_AF_escola;
      this.NPBras_Mat_2007_AF_escola = this.schoolSelected.NPBras_Mat_2007_AF_escola;
      this.NPBras_Mat_2009_AF_escola = this.schoolSelected.NPBras_Mat_2009_AF_escola;
      this.NPBras_Mat_2011_AF_escola = this.schoolSelected.NPBras_Mat_2011_AF_escola;
      this.NPBras_Mat_2013_AF_escola = this.schoolSelected.NPBras_Mat_2013_AF_escola;

      this.NPBras_Mat_2005_AF_vizinhos = this.schoolSelected.NPBras_Mat_2005_AF_vizinhos;
      this.NPBras_Mat_2007_AF_vizinhos = this.schoolSelected.NPBras_Mat_2007_AF_vizinhos;
      this.NPBras_Mat_2009_AF_vizinhos = this.schoolSelected.NPBras_Mat_2009_AF_vizinhos;
      this.NPBras_Mat_2011_AF_vizinhos = this.schoolSelected.NPBras_Mat_2011_AF_vizinhos;
      this.NPBras_Mat_2013_AF_vizinhos = this.schoolSelected.NPBras_Mat_2013_AF_vizinhos;

      this.NPBras_Mat_2005_AF_SES = this.schoolSelected.NPBras_Mat_2005_AF_SES;
      this.NPBras_Mat_2007_AF_SES = this.schoolSelected.NPBras_Mat_2007_AF_SES;
      this.NPBras_Mat_2009_AF_SES = this.schoolSelected.NPBras_Mat_2009_AF_SES;
      this.NPBras_Mat_2011_AF_SES = this.schoolSelected.NPBras_Mat_2011_AF_SES;
      this.NPBras_Mat_2013_AF_SES = this.schoolSelected.NPBras_Mat_2013_AF_SES;
      // send NPBM_EF_AF information
      this.buildLineChartData_NPBM_EF_AF();
      this.sharedDataService.send_NPBM_EF_AF(this.lineChartData_NPBM_EF_AF);
      this.on_NPBM_EF_AF.emit(this.lineChartData_NPBM_EF_AF);

      // ---- NPBLP_EF_AF
      this.NPBras_LP_2005_AF_escola = this.schoolSelected.NPBras_LP_2005_AF_escola;
      this.NPBras_LP_2007_AF_escola = this.schoolSelected.NPBras_LP_2007_AF_escola;
      this.NPBras_LP_2009_AF_escola = this.schoolSelected.NPBras_LP_2009_AF_escola;
      this.NPBras_LP_2011_AF_escola = this.schoolSelected.NPBras_LP_2011_AF_escola;
      this.NPBras_LP_2013_AF_escola = this.schoolSelected.NPBras_LP_2013_AF_escola;

      this.NPBras_LP_2005_AF_vizinhos = this.schoolSelected.NPBras_LP_2005_AF_vizinhos;
      this.NPBras_LP_2007_AF_vizinhos = this.schoolSelected.NPBras_LP_2007_AF_vizinhos;
      this.NPBras_LP_2009_AF_vizinhos = this.schoolSelected.NPBras_LP_2009_AF_vizinhos;
      this.NPBras_LP_2011_AF_vizinhos = this.schoolSelected.NPBras_LP_2011_AF_vizinhos;
      this.NPBras_LP_2013_AF_vizinhos = this.schoolSelected.NPBras_LP_2013_AF_vizinhos;

      this.NPBras_LP_2005_AF_SES = this.schoolSelected.NPBras_LP_2005_AF_SES;
      this.NPBras_LP_2007_AF_SES = this.schoolSelected.NPBras_LP_2007_AF_SES;
      this.NPBras_LP_2009_AF_SES = this.schoolSelected.NPBras_LP_2009_AF_SES;
      this.NPBras_LP_2011_AF_SES = this.schoolSelected.NPBras_LP_2011_AF_SES;
      this.NPBras_LP_2013_AF_SES = this.schoolSelected.NPBras_LP_2013_AF_SES;
      // send NPBLP_EF_AF information
      this.buildLineChartData_NPBLP_EF_AF();
      this.sharedDataService.send_NPBLP_EF_AF(this.lineChartData_NPBLP_EF_AF);
      this.on_NPBLP_EF_AF.emit(this.lineChartData_NPBLP_EF_AF);

      // ---- NPBrasNotaPad_EF_AF
      this.NPBras_NotaPad_2005_AF_escola = this.schoolSelected.NPBras_NotaPad_2005_AF_escola;
      this.NPBras_NotaPad_2007_AF_escola = this.schoolSelected.NPBras_NotaPad_2007_AF_escola;
      this.NPBras_NotaPad_2009_AF_escola = this.schoolSelected.NPBras_NotaPad_2009_AF_escola;
      this.NPBras_NotaPad_2011_AF_escola = this.schoolSelected.NPBras_NotaPad_2011_AF_escola;
      this.NPBras_NotaPad_2013_AF_escola = this.schoolSelected.NPBras_NotaPad_2013_AF_escola;

      this.NPBras_NotaPad_2005_AF_vizinhos = this.schoolSelected.NPBras_NotaPad_2005_AF_vizinhos;
      this.NPBras_NotaPad_2007_AF_vizinhos = this.schoolSelected.NPBras_NotaPad_2007_AF_vizinhos;
      this.NPBras_NotaPad_2009_AF_vizinhos = this.schoolSelected.NPBras_NotaPad_2009_AF_vizinhos;
      this.NPBras_NotaPad_2011_AF_vizinhos = this.schoolSelected.NPBras_NotaPad_2011_AF_vizinhos;
      this.NPBras_NotaPad_2013_AF_vizinhos = this.schoolSelected.NPBras_NotaPad_2013_AF_vizinhos;

      this.NPBras_NotaPad_2005_AF_SES = this.schoolSelected.NPBras_NotaPad_2005_AF_SES;
      this.NPBras_NotaPad_2007_AF_SES = this.schoolSelected.NPBras_NotaPad_2007_AF_SES;
      this.NPBras_NotaPad_2009_AF_SES = this.schoolSelected.NPBras_NotaPad_2009_AF_SES;
      this.NPBras_NotaPad_2011_AF_SES = this.schoolSelected.NPBras_NotaPad_2011_AF_SES;
      this.NPBras_NotaPad_2013_AF_SES = this.schoolSelected.NPBras_NotaPad_2013_AF_SES;
      // send NPBrasNotaPad_AF information
      this.buildLineChartData_NPBrasNotaPad_AF();
      this.sharedDataService.send_NPBrasNotaPad_AF(this.lineChartData_NPBrasNotaPad_AF);
      this.on_NPBrasNotaPad_AF.emit(this.lineChartData_NPBrasNotaPad_AF);

      // ---- IDEB_AF
      this.censo_IDEB_2005_AF_escola = this.schoolSelected.censo_IDEB_2005_AF_escola;
      this.censo_IDEB_2007_AF_escola = this.schoolSelected.censo_IDEB_2007_AF_escola;
      this.censo_IDEB_2009_AF_escola = this.schoolSelected.censo_IDEB_2009_AF_escola;
      this.censo_IDEB_2011_AF_escola = this.schoolSelected.censo_IDEB_2011_AF_escola;
      this.censo_IDEB_2013_AF_escola = this.schoolSelected.censo_IDEB_2013_AF_escola;

      this.censo_IDEB_2005_AF_vizinhos = this.schoolSelected.censo_IDEB_2005_AF_vizinhos;
      this.censo_IDEB_2007_AF_vizinhos = this.schoolSelected.censo_IDEB_2007_AF_vizinhos;
      this.censo_IDEB_2009_AF_vizinhos = this.schoolSelected.censo_IDEB_2009_AF_vizinhos;
      this.censo_IDEB_2011_AF_vizinhos = this.schoolSelected.censo_IDEB_2011_AF_vizinhos;
      this.censo_IDEB_2013_AF_vizinhos = this.schoolSelected.censo_IDEB_2013_AF_vizinhos;

      this.censo_IDEB_2005_AF_SES = this.schoolSelected.censo_IDEB_2005_AF_SES;
      this.censo_IDEB_2007_AF_SES = this.schoolSelected.censo_IDEB_2007_AF_SES;
      this.censo_IDEB_2009_AF_SES = this.schoolSelected.censo_IDEB_2009_AF_SES;
      this.censo_IDEB_2011_AF_SES = this.schoolSelected.censo_IDEB_2011_AF_SES;
      this.censo_IDEB_2013_AF_SES = this.schoolSelected.censo_IDEB_2013_AF_SES;

      this.buildLineChartData_IDEB_AF();
      this.sharedDataService.send_IDEB_AF(this.lineChartData_IDEB_AF);
      this.on_IDEB_AF.emit(this.lineChartData_IDEB_AF);

      // TxAprov_3EM
      this.censo_TxAprov_2007_3EM_escola = this.schoolSelected.censo_TxAprov_2007_3EM_escola;
      this.censo_TxAprov_2008_3EM_escola = this.schoolSelected.censo_TxAprov_2008_3EM_escola;
      this.censo_TxAprov_2009_3EM_escola = this.schoolSelected.censo_TxAprov_2009_3EM_escola;
      this.censo_TxAprov_2010_3EM_escola = this.schoolSelected.censo_TxAprov_2010_3EM_escola;
      this.censo_TxAprov_2011_3EM_escola = this.schoolSelected.censo_TxAprov_2011_3EM_escola;
      this.censo_TxAprov_2012_3EM_escola = this.schoolSelected.censo_TxAprov_2012_3EM_escola;
      this.censo_TxAprov_2013_3EM_escola = this.schoolSelected.censo_TxAprov_2013_3EM_escola;
      this.censo_TxAprov_2014_3EM_escola = this.schoolSelected.censo_TxAprov_2014_3EM_escola;

      this.censo_TxAprov_2007_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2007_3EM_vizinhos;
      this.censo_TxAprov_2008_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2008_3EM_vizinhos;
      this.censo_TxAprov_2009_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2009_3EM_vizinhos;
      this.censo_TxAprov_2010_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2010_3EM_vizinhos;
      this.censo_TxAprov_2011_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2011_3EM_vizinhos;
      this.censo_TxAprov_2012_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2012_3EM_vizinhos;
      this.censo_TxAprov_2013_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2013_3EM_vizinhos;
      this.censo_TxAprov_2014_3EM_vizinhos = this.schoolSelected.censo_TxAprov_2014_3EM_vizinhos;

      this.censo_TxAprov_2007_3EM_SES = this.schoolSelected.censo_TxAprov_2007_3EM_SES;
      this.censo_TxAprov_2008_3EM_SES = this.schoolSelected.censo_TxAprov_2008_3EM_SES;
      this.censo_TxAprov_2009_3EM_SES = this.schoolSelected.censo_TxAprov_2009_3EM_SES;
      this.censo_TxAprov_2010_3EM_SES = this.schoolSelected.censo_TxAprov_2010_3EM_SES;
      this.censo_TxAprov_2011_3EM_SES = this.schoolSelected.censo_TxAprov_2011_3EM_SES;
      this.censo_TxAprov_2012_3EM_SES = this.schoolSelected.censo_TxAprov_2012_3EM_SES;
      this.censo_TxAprov_2013_3EM_SES = this.schoolSelected.censo_TxAprov_2013_3EM_SES;
      this.censo_TxAprov_2014_3EM_SES = this.schoolSelected.censo_TxAprov_2014_3EM_SES;

      // send TxAprov_3EM information
      this.buildLineChartData_TxAprov_3EM();
      this.sharedDataService.send_TxAprov_3EM(this.lineChartData_TxAprov_3EM);
      this.on_TxAprov_3EM.emit(this.lineChartData_TxAprov_3EM);

      // TxAband_1EM
      this.censo_TxAband_2007_1EM_escola = this.schoolSelected.censo_TxAband_2007_1EM_escola;
      this.censo_TxAband_2008_1EM_escola = this.schoolSelected.censo_TxAband_2008_1EM_escola;
      this.censo_TxAband_2009_1EM_escola = this.schoolSelected.censo_TxAband_2009_1EM_escola;
      this.censo_TxAband_2010_1EM_escola = this.schoolSelected.censo_TxAband_2010_1EM_escola;
      this.censo_TxAband_2011_1EM_escola = this.schoolSelected.censo_TxAband_2011_1EM_escola;
      this.censo_TxAband_2012_1EM_escola = this.schoolSelected.censo_TxAband_2012_1EM_escola;
      this.censo_TxAband_2013_1EM_escola = this.schoolSelected.censo_TxAband_2013_1EM_escola;
      this.censo_TxAband_2014_1EM_escola = this.schoolSelected.censo_TxAband_2014_1EM_escola;

      this.censo_TxAband_2007_1EM_vizinhos = this.schoolSelected.censo_TxAband_2007_1EM_vizinhos;
      this.censo_TxAband_2008_1EM_vizinhos = this.schoolSelected.censo_TxAband_2008_1EM_vizinhos;
      this.censo_TxAband_2009_1EM_vizinhos = this.schoolSelected.censo_TxAband_2009_1EM_vizinhos;
      this.censo_TxAband_2010_1EM_vizinhos = this.schoolSelected.censo_TxAband_2010_1EM_vizinhos;
      this.censo_TxAband_2011_1EM_vizinhos = this.schoolSelected.censo_TxAband_2011_1EM_vizinhos;
      this.censo_TxAband_2012_1EM_vizinhos = this.schoolSelected.censo_TxAband_2012_1EM_vizinhos;
      this.censo_TxAband_2013_1EM_vizinhos = this.schoolSelected.censo_TxAband_2013_1EM_vizinhos;
      this.censo_TxAband_2014_1EM_vizinhos = this.schoolSelected.censo_TxAband_2014_1EM_vizinhos;

      this.censo_TxAband_2007_1EM_SES = this.schoolSelected.censo_TxAband_2007_1EM_SES;
      this.censo_TxAband_2008_1EM_SES = this.schoolSelected.censo_TxAband_2008_1EM_SES;
      this.censo_TxAband_2009_1EM_SES = this.schoolSelected.censo_TxAband_2009_1EM_SES;
      this.censo_TxAband_2010_1EM_SES = this.schoolSelected.censo_TxAband_2010_1EM_SES;
      this.censo_TxAband_2011_1EM_SES = this.schoolSelected.censo_TxAband_2011_1EM_SES;
      this.censo_TxAband_2012_1EM_SES = this.schoolSelected.censo_TxAband_2012_1EM_SES;
      this.censo_TxAband_2013_1EM_SES = this.schoolSelected.censo_TxAband_2013_1EM_SES;
      this.censo_TxAband_2014_1EM_SES = this.schoolSelected.censo_TxAband_2014_1EM_SES;

      // send TxAband_1EM information
      this.buildLineChartData_TxAband_1EM();
      this.sharedDataService.send_TxAband_1EM(this.lineChartData_TxAband_1EM);
      this.on_TxAband_1EM.emit(this.lineChartData_TxAband_1EM);

      // TxDIS_3EM
      this.censo_TxDIS_2007_3EM_escola = this.schoolSelected.censo_TxDIS_2007_3EM_escola;
      this.censo_TxDIS_2008_3EM_escola = this.schoolSelected.censo_TxDIS_2008_3EM_escola;
      this.censo_TxDIS_2009_3EM_escola = this.schoolSelected.censo_TxDIS_2009_3EM_escola;
      this.censo_TxDIS_2010_3EM_escola = this.schoolSelected.censo_TxDIS_2010_3EM_escola;
      this.censo_TxDIS_2011_3EM_escola = this.schoolSelected.censo_TxDIS_2011_3EM_escola;
      this.censo_TxDIS_2012_3EM_escola = this.schoolSelected.censo_TxDIS_2012_3EM_escola;
      this.censo_TxDIS_2013_3EM_escola = this.schoolSelected.censo_TxDIS_2013_3EM_escola;
      this.censo_TxDIS_2014_3EM_escola = this.schoolSelected.censo_TxDIS_2014_3EM_escola;

      this.censo_TxDIS_2007_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2007_3EM_vizinhos;
      this.censo_TxDIS_2008_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2008_3EM_vizinhos;
      this.censo_TxDIS_2009_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2009_3EM_vizinhos;
      this.censo_TxDIS_2010_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2010_3EM_vizinhos;
      this.censo_TxDIS_2011_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2011_3EM_vizinhos;
      this.censo_TxDIS_2012_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2012_3EM_vizinhos;
      this.censo_TxDIS_2013_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2013_3EM_vizinhos;
      this.censo_TxDIS_2014_3EM_vizinhos = this.schoolSelected.censo_TxDIS_2014_3EM_vizinhos;

      this.censo_TxDIS_2007_3EM_SES = this.schoolSelected.censo_TxDIS_2007_3EM_SES;
      this.censo_TxDIS_2008_3EM_SES = this.schoolSelected.censo_TxDIS_2008_3EM_SES;
      this.censo_TxDIS_2009_3EM_SES = this.schoolSelected.censo_TxDIS_2009_3EM_SES;
      this.censo_TxDIS_2010_3EM_SES = this.schoolSelected.censo_TxDIS_2010_3EM_SES;
      this.censo_TxDIS_2011_3EM_SES = this.schoolSelected.censo_TxDIS_2011_3EM_SES;
      this.censo_TxDIS_2012_3EM_SES = this.schoolSelected.censo_TxDIS_2012_3EM_SES;
      this.censo_TxDIS_2013_3EM_SES = this.schoolSelected.censo_TxDIS_2013_3EM_SES;
      this.censo_TxDIS_2014_3EM_SES = this.schoolSelected.censo_TxDIS_2014_3EM_SES;

      // send TxDIS_3EM information
      this.buildLineChartData_TxDIS_3EM();
      this.sharedDataService.send_TxDIS_3EM(this.lineChartData_TxDIS_3EM);
      this.on_TxDIS_3EM.emit(this.lineChartData_TxDIS_3EM);

      // ---- ENEM
      this.ENEM_RED_2013_3M_escola = this.schoolSelected.ENEM_RED_2013_3M_escola;
      this.ENEM_LC_2013_3M_escola = this.schoolSelected.ENEM_LC_2013_3M_escola;
      this.ENEM_MAT_2013_3M_escola = this.schoolSelected.ENEM_MAT_2013_3M_escola;
      this.ENEM_CH_2013_3M_escola = this.schoolSelected.ENEM_CH_2013_3M_escola;
      this.ENEM_CN_2013_3M_escola = this.schoolSelected.ENEM_CN_2013_3M_escola;
      this.ENEM_Geral_2013_3M_escola = this.schoolSelected.ENEM_Geral_2013_3M_escola;

      this.ENEM_RED_2013_3M_vizinhos = this.schoolSelected.ENEM_RED_2013_3M_vizinhos;
      this.ENEM_LC_2013_3M_vizinhos = this.schoolSelected.ENEM_LC_2013_3M_vizinhos;
      this.ENEM_MAT_2013_3M_vizinhos = this.schoolSelected.ENEM_MAT_2013_3M_vizinhos;
      this.ENEM_CH_2013_3M_vizinhos = this.schoolSelected.ENEM_CH_2013_3M_vizinhos;
      this.ENEM_CN_2013_3M_vizinhos = this.schoolSelected.ENEM_CN_2013_3M_vizinhos;
      this.ENEM_Geral_2013_3M_vizinhos = this.schoolSelected.ENEM_Geral_2013_3M_vizinhos;

      this.ENEM_RED_2013_3M_SES = this.schoolSelected.ENEM_RED_2013_3M_SES;
      this.ENEM_LC_2013_3M_SES = this.schoolSelected.ENEM_LC_2013_3M_SES;
      this.ENEM_MAT_2013_3M_SES = this.schoolSelected.ENEM_MAT_2013_3M_SES;
      this.ENEM_CH_2013_3M_SES = this.schoolSelected.ENEM_CH_2013_3M_SES;
      this.ENEM_CN_2013_3M_SES = this.schoolSelected.ENEM_CN_2013_3M_SES;
      this.ENEM_Geral_2013_3M_SES = this.schoolSelected.ENEM_Geral_2013_3M_SES;

      this.buildLineChartData_ENEM();
      this.sharedDataService.send_ENEM(this.barChartData_ENEM);
      this.on_ENEM.emit(this.barChartData_ENEM);

    }, (err) => {
      console.log(err);
    });
  }

  // ---- TA_EF_AI
  buildLineChartData_TA_EF_AI() {
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
      label: this.NO_ENTIDAD,
      borderWidth: 2
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
      label: 'Média da vizinhança',
      borderWidth: 2
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
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- NPBM_EF_AI
  buildLineChartData_NPBM_EF_AI() {
    this.lineChartData_NPBM_EF_AI[0] = {
      data: [
        this.toFloat(this.NPBras_Mat_2005_AI_escola),
        this.toFloat(this.NPBras_Mat_2007_AI_escola),
        this.toFloat(this.NPBras_Mat_2009_AI_escola),
        this.toFloat(this.NPBras_Mat_2011_AI_escola),
        this.toFloat(this.NPBras_Mat_2013_AI_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_NPBM_EF_AI[1] = {
      data: [
        this.toFloat(this.NPBras_Mat_2005_AI_vizinhos),
        this.toFloat(this.NPBras_Mat_2007_AI_vizinhos),
        this.toFloat(this.NPBras_Mat_2009_AI_vizinhos),
        this.toFloat(this.NPBras_Mat_2011_AI_vizinhos),
        this.toFloat(this.NPBras_Mat_2013_AI_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_NPBM_EF_AI[2] = {
      data: [
        this.toFloat(this.NPBras_Mat_2005_AI_SES),
        this.toFloat(this.NPBras_Mat_2007_AI_SES),
        this.toFloat(this.NPBras_Mat_2009_AI_SES),
        this.toFloat(this.NPBras_Mat_2011_AI_SES),
        this.toFloat(this.NPBras_Mat_2013_AI_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- NPBLP_EF_AI
  buildLineChartData_NPBLP_EF_AI() {
    this.lineChartData_NPBLP_EF_AI[0] = {
      data: [
        this.toFloat(this.NPBras_LP_2005_AI_escola),
        this.toFloat(this.NPBras_LP_2007_AI_escola),
        this.toFloat(this.NPBras_LP_2009_AI_escola),
        this.toFloat(this.NPBras_LP_2011_AI_escola),
        this.toFloat(this.NPBras_LP_2013_AI_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_NPBLP_EF_AI[1] = {
      data: [
        this.toFloat(this.NPBras_LP_2005_AI_vizinhos),
        this.toFloat(this.NPBras_LP_2007_AI_vizinhos),
        this.toFloat(this.NPBras_LP_2009_AI_vizinhos),
        this.toFloat(this.NPBras_LP_2011_AI_vizinhos),
        this.toFloat(this.NPBras_LP_2013_AI_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_NPBLP_EF_AI[2] = {
      data: [
        this.toFloat(this.NPBras_LP_2005_AI_SES),
        this.toFloat(this.NPBras_LP_2007_AI_SES),
        this.toFloat(this.NPBras_LP_2009_AI_SES),
        this.toFloat(this.NPBras_LP_2011_AI_SES),
        this.toFloat(this.NPBras_LP_2013_AI_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- NPBrasNotaPad_AI
  buildLineChartData_NPBrasNotaPad_AI() {
    this.lineChartData_NPBrasNotaPad_AI[0] = {
      data: [
        this.toFloat(this.NPBras_NotaPad_2005_AI_escola),
        this.toFloat(this.NPBras_NotaPad_2007_AI_escola),
        this.toFloat(this.NPBras_NotaPad_2009_AI_escola),
        this.toFloat(this.NPBras_NotaPad_2011_AI_escola),
        this.toFloat(this.NPBras_NotaPad_2013_AI_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_NPBrasNotaPad_AI[1] = {
      data: [
        this.toFloat(this.NPBras_NotaPad_2005_AI_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2007_AI_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2009_AI_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2011_AI_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2013_AI_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_NPBrasNotaPad_AI[2] = {
      data: [
        this.toFloat(this.NPBras_NotaPad_2005_AI_SES),
        this.toFloat(this.NPBras_NotaPad_2007_AI_SES),
        this.toFloat(this.NPBras_NotaPad_2009_AI_SES),
        this.toFloat(this.NPBras_NotaPad_2011_AI_SES),
        this.toFloat(this.NPBras_NotaPad_2013_AI_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- IDEB_AI
  buildLineChartData_IDEB_AI() {
    this.lineChartData_IDEB_AI[0] = {
      data: [
        this.toFloat(this.censo_IDEB_2005_AI_escola),
        this.toFloat(this.censo_IDEB_2007_AI_escola),
        this.toFloat(this.censo_IDEB_2009_AI_escola),
        this.toFloat(this.censo_IDEB_2011_AI_escola),
        this.toFloat(this.censo_IDEB_2013_AI_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_IDEB_AI[1] = {
      data: [
        this.toFloat(this.censo_IDEB_2005_AI_vizinhos),
        this.toFloat(this.censo_IDEB_2007_AI_vizinhos),
        this.toFloat(this.censo_IDEB_2009_AI_vizinhos),
        this.toFloat(this.censo_IDEB_2011_AI_vizinhos),
        this.toFloat(this.censo_IDEB_2013_AI_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_IDEB_AI[2] = {
      data: [
        this.toFloat(this.censo_IDEB_2005_AI_SES),
        this.toFloat(this.censo_IDEB_2007_AI_SES),
        this.toFloat(this.censo_IDEB_2009_AI_SES),
        this.toFloat(this.censo_IDEB_2011_AI_SES),
        this.toFloat(this.censo_IDEB_2013_AI_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- TA_EF_AF
  buildLineChartData_TA_EF_AF() {
    this.lineChartData_TA_EF_AF[0] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_9EF_escola),
        this.toFloat(this.censo_TxAprov_2008_9EF_escola),
        this.toFloat(this.censo_TxAprov_2009_9EF_escola),
        this.toFloat(this.censo_TxAprov_2010_9EF_escola),
        this.toFloat(this.censo_TxAprov_2011_9EF_escola),
        this.toFloat(this.censo_TxAprov_2012_9EF_escola),
        this.toFloat(this.censo_TxAprov_2013_9EF_escola),
        this.toFloat(this.censo_TxAprov_2014_9EF_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_TA_EF_AF[1] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2008_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2009_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2010_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2011_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2012_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2013_9EF_vizinhos),
        this.toFloat(this.censo_TxAprov_2014_9EF_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_TA_EF_AF[2] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_9EF_SES),
        this.toFloat(this.censo_TxAprov_2008_9EF_SES),
        this.toFloat(this.censo_TxAprov_2009_9EF_SES),
        this.toFloat(this.censo_TxAprov_2010_9EF_SES),
        this.toFloat(this.censo_TxAprov_2011_9EF_SES),
        this.toFloat(this.censo_TxAprov_2012_9EF_SES),
        this.toFloat(this.censo_TxAprov_2013_9EF_SES),
        this.toFloat(this.censo_TxAprov_2014_9EF_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- NPBM_EF_AF
  buildLineChartData_NPBM_EF_AF() {
    this.lineChartData_NPBM_EF_AF[0] = {
      data: [
        this.toFloat(this.NPBras_Mat_2005_AF_escola),
        this.toFloat(this.NPBras_Mat_2007_AF_escola),
        this.toFloat(this.NPBras_Mat_2009_AF_escola),
        this.toFloat(this.NPBras_Mat_2011_AF_escola),
        this.toFloat(this.NPBras_Mat_2013_AF_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_NPBM_EF_AF[1] = {
      data: [
        this.toFloat(this.NPBras_Mat_2005_AF_vizinhos),
        this.toFloat(this.NPBras_Mat_2007_AF_vizinhos),
        this.toFloat(this.NPBras_Mat_2009_AF_vizinhos),
        this.toFloat(this.NPBras_Mat_2011_AF_vizinhos),
        this.toFloat(this.NPBras_Mat_2013_AF_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_NPBM_EF_AF[2] = {
      data: [
        this.toFloat(this.NPBras_Mat_2005_AF_SES),
        this.toFloat(this.NPBras_Mat_2007_AF_SES),
        this.toFloat(this.NPBras_Mat_2009_AF_SES),
        this.toFloat(this.NPBras_Mat_2011_AF_SES),
        this.toFloat(this.NPBras_Mat_2013_AF_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- NPBLP_EF_AF
  buildLineChartData_NPBLP_EF_AF() {
    this.lineChartData_NPBLP_EF_AF[0] = {
      data: [
        this.toFloat(this.NPBras_LP_2005_AF_escola),
        this.toFloat(this.NPBras_LP_2007_AF_escola),
        this.toFloat(this.NPBras_LP_2009_AF_escola),
        this.toFloat(this.NPBras_LP_2011_AF_escola),
        this.toFloat(this.NPBras_LP_2013_AF_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_NPBLP_EF_AF[1] = {
      data: [
        this.toFloat(this.NPBras_LP_2005_AF_vizinhos),
        this.toFloat(this.NPBras_LP_2007_AF_vizinhos),
        this.toFloat(this.NPBras_LP_2009_AF_vizinhos),
        this.toFloat(this.NPBras_LP_2011_AF_vizinhos),
        this.toFloat(this.NPBras_LP_2013_AF_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_NPBLP_EF_AF[2] = {
      data: [
        this.toFloat(this.NPBras_LP_2005_AF_SES),
        this.toFloat(this.NPBras_LP_2007_AF_SES),
        this.toFloat(this.NPBras_LP_2009_AF_SES),
        this.toFloat(this.NPBras_LP_2011_AF_SES),
        this.toFloat(this.NPBras_LP_2013_AF_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- NPBrasNotaPad_AF
  buildLineChartData_NPBrasNotaPad_AF() {
    this.lineChartData_NPBrasNotaPad_AF[0] = {
      data: [
        this.toFloat(this.NPBras_NotaPad_2005_AF_escola),
        this.toFloat(this.NPBras_NotaPad_2007_AF_escola),
        this.toFloat(this.NPBras_NotaPad_2009_AF_escola),
        this.toFloat(this.NPBras_NotaPad_2011_AF_escola),
        this.toFloat(this.NPBras_NotaPad_2013_AF_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_NPBrasNotaPad_AF[1] = {
      data: [
        this.toFloat(this.NPBras_NotaPad_2005_AF_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2007_AF_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2009_AF_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2011_AF_vizinhos),
        this.toFloat(this.NPBras_NotaPad_2013_AF_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_NPBrasNotaPad_AF[2] = {
      data: [
        this.toFloat(this.NPBras_NotaPad_2005_AF_SES),
        this.toFloat(this.NPBras_NotaPad_2007_AF_SES),
        this.toFloat(this.NPBras_NotaPad_2009_AF_SES),
        this.toFloat(this.NPBras_NotaPad_2011_AF_SES),
        this.toFloat(this.NPBras_NotaPad_2013_AF_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- IDEB_AF
  buildLineChartData_IDEB_AF() {
    this.lineChartData_IDEB_AF[0] = {
      data: [
        this.toFloat(this.censo_IDEB_2005_AF_escola),
        this.toFloat(this.censo_IDEB_2007_AF_escola),
        this.toFloat(this.censo_IDEB_2009_AF_escola),
        this.toFloat(this.censo_IDEB_2011_AF_escola),
        this.toFloat(this.censo_IDEB_2013_AF_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_IDEB_AF[1] = {
      data: [
        this.toFloat(this.censo_IDEB_2005_AF_vizinhos),
        this.toFloat(this.censo_IDEB_2007_AF_vizinhos),
        this.toFloat(this.censo_IDEB_2009_AF_vizinhos),
        this.toFloat(this.censo_IDEB_2011_AF_vizinhos),
        this.toFloat(this.censo_IDEB_2013_AF_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_IDEB_AF[2] = {
      data: [
        this.toFloat(this.censo_IDEB_2005_AF_SES),
        this.toFloat(this.censo_IDEB_2007_AF_SES),
        this.toFloat(this.censo_IDEB_2009_AF_SES),
        this.toFloat(this.censo_IDEB_2011_AF_SES),
        this.toFloat(this.censo_IDEB_2013_AF_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- TxAprov_3EM
  buildLineChartData_TxAprov_3EM() {
    this.lineChartData_TxAprov_3EM[0] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_3EM_escola),
        this.toFloat(this.censo_TxAprov_2008_3EM_escola),
        this.toFloat(this.censo_TxAprov_2009_3EM_escola),
        this.toFloat(this.censo_TxAprov_2010_3EM_escola),
        this.toFloat(this.censo_TxAprov_2011_3EM_escola),
        this.toFloat(this.censo_TxAprov_2012_3EM_escola),
        this.toFloat(this.censo_TxAprov_2013_3EM_escola),
        this.toFloat(this.censo_TxAprov_2014_3EM_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_TxAprov_3EM[1] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2008_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2009_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2010_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2011_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2012_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2013_3EM_vizinhos),
        this.toFloat(this.censo_TxAprov_2014_3EM_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_TxAprov_3EM[2] = {
      data: [
        this.toFloat(this.censo_TxAprov_2007_3EM_SES),
        this.toFloat(this.censo_TxAprov_2008_3EM_SES),
        this.toFloat(this.censo_TxAprov_2009_3EM_SES),
        this.toFloat(this.censo_TxAprov_2010_3EM_SES),
        this.toFloat(this.censo_TxAprov_2011_3EM_SES),
        this.toFloat(this.censo_TxAprov_2012_3EM_SES),
        this.toFloat(this.censo_TxAprov_2013_3EM_SES),
        this.toFloat(this.censo_TxAprov_2014_3EM_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- TxAband_1EM
  buildLineChartData_TxAband_1EM() {
    this.lineChartData_TxAband_1EM[0] = {
      data: [
        this.toFloat(this.censo_TxAband_2007_1EM_escola),
        this.toFloat(this.censo_TxAband_2008_1EM_escola),
        this.toFloat(this.censo_TxAband_2009_1EM_escola),
        this.toFloat(this.censo_TxAband_2010_1EM_escola),
        this.toFloat(this.censo_TxAband_2011_1EM_escola),
        this.toFloat(this.censo_TxAband_2012_1EM_escola),
        this.toFloat(this.censo_TxAband_2013_1EM_escola),
        this.toFloat(this.censo_TxAband_2014_1EM_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_TxAband_1EM[1] = {
      data: [
        this.toFloat(this.censo_TxAband_2007_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2008_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2009_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2010_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2011_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2012_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2013_1EM_vizinhos),
        this.toFloat(this.censo_TxAband_2014_1EM_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_TxAband_1EM[2] = {
      data: [
        this.toFloat(this.censo_TxAband_2007_1EM_SES),
        this.toFloat(this.censo_TxAband_2008_1EM_SES),
        this.toFloat(this.censo_TxAband_2009_1EM_SES),
        this.toFloat(this.censo_TxAband_2010_1EM_SES),
        this.toFloat(this.censo_TxAband_2011_1EM_SES),
        this.toFloat(this.censo_TxAband_2012_1EM_SES),
        this.toFloat(this.censo_TxAband_2013_1EM_SES),
        this.toFloat(this.censo_TxAband_2014_1EM_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- TxDIS_3EM
  buildLineChartData_TxDIS_3EM() {
    this.lineChartData_TxDIS_3EM[0] = {
      data: [
        this.toFloat(this.censo_TxDIS_2007_3EM_escola),
        this.toFloat(this.censo_TxDIS_2008_3EM_escola),
        this.toFloat(this.censo_TxDIS_2009_3EM_escola),
        this.toFloat(this.censo_TxDIS_2010_3EM_escola),
        this.toFloat(this.censo_TxDIS_2011_3EM_escola),
        this.toFloat(this.censo_TxDIS_2012_3EM_escola),
        this.toFloat(this.censo_TxDIS_2013_3EM_escola),
        this.toFloat(this.censo_TxDIS_2014_3EM_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.lineChartData_TxDIS_3EM[1] = {
      data: [
        this.toFloat(this.censo_TxDIS_2007_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2008_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2009_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2010_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2011_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2012_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2013_3EM_vizinhos),
        this.toFloat(this.censo_TxDIS_2014_3EM_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.lineChartData_TxDIS_3EM[2] = {
      data: [
        this.toFloat(this.censo_TxDIS_2007_3EM_SES),
        this.toFloat(this.censo_TxDIS_2008_3EM_SES),
        this.toFloat(this.censo_TxDIS_2009_3EM_SES),
        this.toFloat(this.censo_TxDIS_2010_3EM_SES),
        this.toFloat(this.censo_TxDIS_2011_3EM_SES),
        this.toFloat(this.censo_TxDIS_2012_3EM_SES),
        this.toFloat(this.censo_TxDIS_2013_3EM_SES),
        this.toFloat(this.censo_TxDIS_2014_3EM_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
  }

  // ---- ENEM
  buildLineChartData_ENEM() {
    this.barChartData_ENEM[0] = {
      data: [
        this.toFloat(this.ENEM_RED_2013_3M_escola),
        this.toFloat(this.ENEM_LC_2013_3M_escola),
        this.toFloat(this.ENEM_MAT_2013_3M_escola),
        this.toFloat(this.ENEM_CH_2013_3M_escola),
        this.toFloat(this.ENEM_CN_2013_3M_escola),
        this.toFloat(this.ENEM_Geral_2013_3M_escola)
      ],
      label: this.NO_ENTIDAD,
      borderWidth: 2
    };
    this.barChartData_ENEM[1] = {
      data: [
        this.toFloat(this.ENEM_RED_2013_3M_vizinhos),
        this.toFloat(this.ENEM_LC_2013_3M_vizinhos),
        this.toFloat(this.ENEM_MAT_2013_3M_vizinhos),
        this.toFloat(this.ENEM_CH_2013_3M_vizinhos),
        this.toFloat(this.ENEM_CN_2013_3M_vizinhos),
        this.toFloat(this.ENEM_Geral_2013_3M_vizinhos)
      ],
      label: 'Média da vizinhança',
      borderWidth: 2
    };
    this.barChartData_ENEM[2] = {
      data: [
        this.toFloat(this.ENEM_RED_2013_3M_SES),
        this.toFloat(this.ENEM_LC_2013_3M_SES),
        this.toFloat(this.ENEM_MAT_2013_3M_SES),
        this.toFloat(this.ENEM_CH_2013_3M_SES),
        this.toFloat(this.ENEM_CN_2013_3M_SES),
        this.toFloat(this.ENEM_Geral_2013_3M_SES)
      ],
      label: 'Escolas de mesmo nível socio-econômico',
      borderWidth: 2
    };
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

  toggleSchoolDetails() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right-school-details');
    console.log('procurando a informaçao detalhada da escola escolhida');
  }

}
