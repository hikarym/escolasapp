import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ShareddataService} from '../../../services/shareddata.service';
import {Subscription} from 'rxjs/Subscription';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit, OnDestroy {
  @ViewChild('baseChart') chart: BaseChartDirective;
  @ViewChild('baseChart_NPBM_EF_AI') chart_NPBM_EF_AI: BaseChartDirective;
  @ViewChild('baseChart_NPBLP_EF_AI') chart_NPBLP_EF_AI: BaseChartDirective;
  @ViewChild('baseChart_NPBrasNotaPad_AI') chart_NPBrasNotaPad_AI: BaseChartDirective;
  @ViewChild('baseChart_IDEB_AI') chart_IDEB_AI: BaseChartDirective;
  @ViewChild('baseChart_TA_EF_AF') chart_TA_EF_AF: BaseChartDirective;
  @ViewChild('baseChart_NPBM_EF_AF') chart_NPBM_EF_AF: BaseChartDirective;
  @ViewChild('baseChart_NPBLP_EF_AF') chart_NPBLP_EF_AF: BaseChartDirective;
  @ViewChild('baseChart_NPBrasNotaPad_AF') chart_NPBrasNotaPad_AF: BaseChartDirective;
  @ViewChild('baseChart_IDEB_AF') chart_IDEB_AF: BaseChartDirective;
  @ViewChild('baseChart_TxAprov_3EM') chart_TxAprov_3EM: BaseChartDirective;
  @ViewChild('baseChart_TxAband_1EM') chart_TxAband_1EM: BaseChartDirective;
  @ViewChild('baseChart_TxDIS_3EM') chart_TxDIS_3EM: BaseChartDirective;
  @ViewChild('baseChart_ENEM') chart_ENEM: BaseChartDirective;

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30], label: 'São Paulo', borderWidth: 1},
    { data: [28, 48, 40, 19, 86, 27, 90, 50], label: 'Média da vizinhança', borderWidth: 1 },
    { data: [18, 48, 77, 9, 100, 27, 40, 60], label: 'Escolas de mesmo nível socio-econômico', borderWidth: 1 }
  ];
  public lineChartLabels: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };
  public lineChartColors: Array<any> = [
    { // light blue
      backgroundColor: 'rgba(124, 181, 236,0)',
      borderColor: 'rgba(124, 181, 236,1)',
      pointBackgroundColor: 'rgba(124, 181, 236,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(124, 181, 236,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // light green
      backgroundColor: 'rgba(144, 237, 125,0)',
      borderColor: 'rgba(144, 237, 125,1)',
      pointBackgroundColor: 'rgba(144, 237, 125,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(144, 237, 125,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {position: 'bottom'}
  };
  public barChartType = 'bar';
  public barChartLegend = true;

  // TA_EF_AI
  public lineChartData_TA_EF_AI: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2 },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2 },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2 }
  ];
  public lineChartLabels_TA_EF_AI: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];

  // NPBM_EF_AI
  public lineChartData_NPBM_EF_AI: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_NPBM_EF_AI: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // NPBLP_EF_AI
  public lineChartData_NPBLP_EF_AI: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_NPBLP_EF_AI: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // NPBrasNotaPad_AI
  public lineChartData_NPBrasNotaPad_AI: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_NPBrasNotaPad_AI: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // IDEB_AI
  public lineChartData_IDEB_AI: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_IDEB_AI: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // TA_EF_AF
  public lineChartData_TA_EF_AF: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_TA_EF_AF: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013'];

  // NPBM_EF_AF
  public lineChartData_NPBM_EF_AF: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_NPBM_EF_AF: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // NPBLP_EF_AF
  public lineChartData_NPBLP_EF_AF: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_NPBLP_EF_AF: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // NPBrasNotaPad_AF
  public lineChartData_NPBrasNotaPad_AF: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_NPBrasNotaPad_AF: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // IDEB_AF
  public lineChartData_IDEB_AF: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_IDEB_AF: Array<any> = ['2005', '2007', '2009', '2011', '2013'];

  // TxAprov_3EM
  public lineChartData_TxAprov_3EM: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_TxAprov_3EM: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013'];

  // TxAband_1EM
  public lineChartData_TxAband_1EM: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_TxAband_1EM: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013'];

  // TxDIS_3EM
  public lineChartData_TxDIS_3EM: Array<any> = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public lineChartLabels_TxDIS_3EM: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];

  // ENEM
  public barChartData_ENEM: any[] = [
    { data: [], label: 'nome_da_escola', borderWidth: 2  },
    { data: [], label: 'media_da_vizinhanca', borderWidth: 2  },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico', borderWidth: 2  }
  ];
  public barChartLabels_ENEM: string[] = [
    'Red.',
    'Ling.',
    'Mat.',
    'C.Hum.',
    'C.Nat.',
    'P.Obj.'
  ];
  /*public barChartLabels_ENEM: string[] = [
    'Redação',
    'Linguagens e Códigos',
    'Matemática',
    'Ciências Humanas',
    'Ciências da Natureza',
    'Prova Objetiva'
  ];*/

  // -------------
  private subscription = new Subscription();

  constructor(private sharedDataService: ShareddataService) { }

  ngOnInit() {
    // ---- TA_EF_AI
    const sub1 = this.sharedDataService.get_TA_EF_AI().subscribe(
      res => {
        this.lineChartData_TA_EF_AI = res;
        console.log('linecharData');
        console.log(this.lineChartData_TA_EF_AI);
        if (this.chart !== undefined) {
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      });
    this.subscription.add(sub1);

    // ---- NPBM_EF_AI
    const sub_NPBM_EF_AI = this.sharedDataService.get_NPBM_EF_AI().subscribe(
      res => {
        this.lineChartData_NPBM_EF_AI = res;
        console.log('linecharData');
        console.log(this.lineChartData_NPBM_EF_AI);
        if (this.chart_NPBM_EF_AI !== undefined) {
          this.chart_NPBM_EF_AI.ngOnDestroy();
          this.chart_NPBM_EF_AI.chart = this.chart_NPBM_EF_AI.getChartBuilder(this.chart_NPBM_EF_AI.ctx);
        }
      });
    this.subscription.add(sub_NPBM_EF_AI);

    // ---- NPBLP_EF_AI
    const sub_NPBLP_EF_AI = this.sharedDataService.get_NPBLP_EF_AI().subscribe(
      res => {
        this.lineChartData_NPBLP_EF_AI = res;
        console.log('linecharData');
        console.log(this.lineChartData_NPBLP_EF_AI);
        if (this.chart_NPBLP_EF_AI !== undefined) {
          this.chart_NPBLP_EF_AI.ngOnDestroy();
          this.chart_NPBLP_EF_AI.chart = this.chart_NPBLP_EF_AI.getChartBuilder(this.chart_NPBLP_EF_AI.ctx);
        }
      });
    this.subscription.add(sub_NPBLP_EF_AI);

    // ---- NPBrasNotaPad_AI
    const sub_NPBrasNotaPad_AI = this.sharedDataService.get_NPBrasNotaPad_AI().subscribe(
      res => {
        this.lineChartData_NPBrasNotaPad_AI = res;
        console.log('linecharData');
        console.log(this.lineChartData_NPBrasNotaPad_AI);
        if (this.chart_NPBrasNotaPad_AI !== undefined) {
          this.chart_NPBrasNotaPad_AI.ngOnDestroy();
          this.chart_NPBrasNotaPad_AI.chart = this.chart_NPBrasNotaPad_AI.getChartBuilder(this.chart_NPBrasNotaPad_AI.ctx);
        }
      });
    this.subscription.add(sub_NPBrasNotaPad_AI);

    // ---- IDEB_AI
    const sub_IDEB_AI = this.sharedDataService.get_IDEB_AI().subscribe(
      res => {
        this.lineChartData_IDEB_AI = res;
        console.log('linecharData');
        console.log(this.lineChartData_IDEB_AI);
        if (this.chart_IDEB_AI !== undefined) {
          this.chart_IDEB_AI.ngOnDestroy();
          this.chart_IDEB_AI.chart = this.chart_IDEB_AI.getChartBuilder(this.chart_IDEB_AI.ctx);
        }
      });
    this.subscription.add(sub_IDEB_AI);

    // ---- TA_EF_AF
    const sub_TA_EF_AF = this.sharedDataService.get_TA_EF_AF().subscribe(
      res => {
        this.lineChartData_TA_EF_AF = res;
        console.log('linecharData');
        console.log(this.lineChartData_TA_EF_AF);
        if (this.chart_TA_EF_AF !== undefined) {
          this.chart_TA_EF_AF.ngOnDestroy();
          this.chart_TA_EF_AF.chart = this.chart_TA_EF_AF.getChartBuilder(this.chart_TA_EF_AF.ctx);
        }
      });
    this.subscription.add(sub_TA_EF_AF);

    // ---- NPBM_EF_AF
    const sub_NPBM_EF_AF = this.sharedDataService.get_NPBM_EF_AF().subscribe(
      res => {
        this.lineChartData_NPBM_EF_AF = res;
        console.log('linecharData');
        console.log(this.lineChartData_NPBM_EF_AF);
        if (this.chart_NPBM_EF_AF !== undefined) {
          this.chart_NPBM_EF_AF.ngOnDestroy();
          this.chart_NPBM_EF_AF.chart = this.chart_NPBM_EF_AF.getChartBuilder(this.chart_NPBM_EF_AF.ctx);
        }
      });
    this.subscription.add(sub_NPBM_EF_AF);

    // ---- NPBLP_EF_AF
    const sub_NPBLP_EF_AF = this.sharedDataService.get_NPBLP_EF_AF().subscribe(
      res => {
        this.lineChartData_NPBLP_EF_AF = res;
        console.log('linecharData');
        console.log(this.lineChartData_NPBLP_EF_AF);
        if (this.chart_NPBLP_EF_AF !== undefined) {
          this.chart_NPBLP_EF_AF.ngOnDestroy();
          this.chart_NPBLP_EF_AF.chart = this.chart_NPBLP_EF_AF.getChartBuilder(this.chart_NPBLP_EF_AF.ctx);
        }
      });
    this.subscription.add(sub_NPBLP_EF_AF);

    // ---- NPBrasNotaPad_AF
    const sub_NPBrasNotaPad_AF = this.sharedDataService.get_NPBrasNotaPad_AF().subscribe(
      res => {
        this.lineChartData_NPBrasNotaPad_AF = res;
        console.log('linecharData');
        console.log(this.lineChartData_NPBrasNotaPad_AF);
        if (this.chart_NPBrasNotaPad_AF !== undefined) {
          this.chart_NPBrasNotaPad_AF.ngOnDestroy();
          this.chart_NPBrasNotaPad_AF.chart = this.chart_NPBrasNotaPad_AF.getChartBuilder(this.chart_NPBrasNotaPad_AF.ctx);
        }
      });
    this.subscription.add(sub_NPBrasNotaPad_AF);

    // ---- IDEB_AF
    const sub_IDEB_AF = this.sharedDataService.get_IDEB_AF().subscribe(
      res => {
        this.lineChartData_IDEB_AF = res;
        console.log('linecharData');
        console.log(this.lineChartData_IDEB_AF);
        if (this.chart_IDEB_AF !== undefined) {
          this.chart_IDEB_AF.ngOnDestroy();
          this.chart_IDEB_AF.chart = this.chart_IDEB_AF.getChartBuilder(this.chart_IDEB_AF.ctx);
        }
      });
    this.subscription.add(sub_IDEB_AF);

    // ---- TxAprov_3EM
    const sub_TxAprov_3EM = this.sharedDataService.get_TxAprov_3EM().subscribe(
      res => {
        this.lineChartData_TxAprov_3EM = res;
        console.log('linecharData');
        console.log(this.lineChartData_TxAprov_3EM);
        if (this.chart_TxAprov_3EM !== undefined) {
          this.chart_TxAprov_3EM.ngOnDestroy();
          this.chart_TxAprov_3EM.chart = this.chart_TxAprov_3EM.getChartBuilder(this.chart_TxAprov_3EM.ctx);
        }
      });
    this.subscription.add(sub_TxAprov_3EM);

    // ---- TxAband_1EM
    const sub_TxAband_1EM = this.sharedDataService.get_TxAband_1EM().subscribe(
      res => {
        this.lineChartData_TxAband_1EM = res;
        console.log('linecharData');
        console.log(this.lineChartData_TxAband_1EM);
        if (this.chart_TxAband_1EM !== undefined) {
          this.chart_TxAband_1EM.ngOnDestroy();
          this.chart_TxAband_1EM.chart = this.chart_TxAband_1EM.getChartBuilder(this.chart_TxAband_1EM.ctx);
        }
      });
    this.subscription.add(sub_TxAband_1EM);

    // ---- TxDIS_3EM
    const sub_TxDIS_3EM = this.sharedDataService.get_TxDIS_3EM().subscribe(
      res => {
        this.lineChartData_TxDIS_3EM = res;
        console.log('linecharData');
        console.log(this.lineChartData_TxDIS_3EM);
        if (this.chart_TxDIS_3EM !== undefined) {
          this.chart_TxDIS_3EM.ngOnDestroy();
          this.chart_TxDIS_3EM.chart = this.chart_TxDIS_3EM.getChartBuilder(this.chart_TxDIS_3EM.ctx);
        }
      });
    this.subscription.add(sub_TxDIS_3EM);

    // ---- ENEM
    const sub_ENEM = this.sharedDataService.get_ENEM().subscribe(
      res => {
        this.barChartData_ENEM = res;
        console.log('linecharData');
        console.log(this.barChartData_ENEM);
        if (this.chart_ENEM !== undefined) {
          this.chart_ENEM.ngOnDestroy();
          this.chart_ENEM.chart = this.chart_ENEM.getChartBuilder(this.chart_ENEM.ctx);
        }
      });
    this.subscription.add(sub_ENEM);

    console.log('iniciando os graficos');
  }

  popupGraph(input) {

  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  // unsubscribe to ensure no memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
