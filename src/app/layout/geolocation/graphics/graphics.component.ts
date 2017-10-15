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
  @ViewChild('baseChart')
  chart: BaseChartDirective;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30], label: 'São Paulo' },
    { data: [28, 48, 40, 19, 86, 27, 90, 50], label: 'Média da vizinhança' },
    { data: [18, 48, 77, 9, 100, 27, 40, 60], label: 'Escolas de mesmo nível socio-econômico' }
  ];
  public lineChartLabels: Array<any> = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
  public lineChartOptions: any = {
    responsive: true
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

  public lineChartData_TA_EF_AI: Array<any> = [
    { data: [], label: 'nome_da_escola' },
    { data: [], label: 'media_da_vizinhanca' },
    { data: [], label: 'escolas_do_mesmo_nivel_socioeconomico' }
  ];
  private subscription = new Subscription();

  constructor(private sharedDataService: ShareddataService) { }

  ngOnInit() {
    const sub = this.sharedDataService.get_TA_EF_AI().subscribe(
      res => {
        this.lineChartData_TA_EF_AI = res;
        console.log('linecharData');
        console.log(this.lineChartData_TA_EF_AI);
        if (this.chart !== undefined) {
          this.chart.ngOnDestroy();
          this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
        }
      });
    this.subscription.add(sub);
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
