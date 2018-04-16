import {
  Component, EventEmitter, Output, OnInit, OnDestroy, ViewChild, ViewEncapsulation,
  ElementRef, AfterViewInit, Renderer2
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {ShareddataService} from '../../../services/shareddata.service';
import {ApSecVariableService} from '../../../services/ap-sec-variable.service';
import {BrSpRmspSecVariableService} from '../../../services/br-sp-rmsp-sec-variable.service';
import * as d3 from 'd3';


@Component({
  selector: 'app-indicators-by-weighting-areas',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './indicators-by-weighting-areas.component.html',
  styleUrls: ['./indicators-by-weighting-areas.component.css']
})
export class IndicatorsByWeightingAreasComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onSecInformations = new EventEmitter<any>();
  codapSelected: any;
  PANELNAME = 'Informação sobre a vizinhança da Escola';
  // Geral Information about a CODAP
  CODAP = '';
  GINI = 0;
  PERC_POOR = 0;
  RENDA_DOM_PER_CAP_MEDIA = 0;
  OCUP: any;

  // ------------------------------------
  selectedSchoolCodAP: string;
  weightingAreaInfo: any;
  brSpRmspSecInfo: any;

  // ---------------D3 GRAPHS---------------------
  data = [
    {salesperson: 'Bob', sales: 33},
    {salesperson: 'Robin', sales: 12},
    {salesperson: 'Anne', sales: 41},
    {salesperson: 'Mark', sales: 16},
    {salesperson: 'Joe', sales: 39}
  ];

  dataCircle = [
    { region: 'North', count: 53245},
    { region: 'South', count: 28479},
    { region: 'East', count: 19697},
    { region: 'West', count: 24037},
    { region: 'Central', count: 40245}
  ];

  dataCircle2 = {
    apples: [
      { region: 'North', count: 53245},
      { region: 'South', count: 28479},
      { region: 'East', count: 19697},
      { region: 'West', count: 24037},
      { region: 'Central', count: 40245}
    ],
    oranges: [
      { region: 'North', count: 200},
      { region: 'South', count: 200},
      { region: 'East', count: 200},
      { region: 'West', count: 200},
      { region: 'Central', count: 200}
    ]
  };

  // ----------------
  @ViewChild('d3elements')
  private div_d3Elements: ElementRef;

  @ViewChild('occupationalStructureGraph')
  private div_occupationalStructureGraph: ElementRef;
  // ----------------
  private subscription = new Subscription();

  constructor(private renderer: Renderer2,
              private router: Router,
              private weightingAreaSecInfoService: ApSecVariableService,
              private brSpRmspSecInfoService: BrSpRmspSecVariableService,
              private sharedDataService: ShareddataService) {

  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolCodAP().subscribe(
      res => {
        console.log('Retrieving the selected school cod AP', res);

        // Get all the information about BR-SP-RMSP socioeconomic variables
        this.brSpRmspSecInfoService.getBrSpRmspSecInfo().then((res1) => {
          this.brSpRmspSecInfo = res1;
          console.log('brSpRMSPVariables:', this.brSpRmspSecInfo);
        });

        // Get Weighting Area socioeconomic variables's information
        this.selectedSchoolCodAP = res;
        this.getWeightingAreaInformation(this.selectedSchoolCodAP);
      });
    this.subscription.add(s);


  }

  ngAfterViewInit() {
    this.generateBarChart();

    this.generateOccupationalStructureGraph();
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getWeightingAreaInformation(schoolCodAP: string) {
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.weightingAreaSecInfoService.showWeightingAreaInfoByCodAP(schoolCodAP).then((res) => {
      this.weightingAreaInfo = res[0];
      console.log(this.weightingAreaInfo);
      this.CODAP = this.weightingAreaInfo.codap;
      this.GINI = this.weightingAreaInfo.ses.gini;
      this.PERC_POOR = this.weightingAreaInfo.ses.perc_poor;
      this.RENDA_DOM_PER_CAP_MEDIA = this.weightingAreaInfo.ses.renda_dom_per_cap_media;
      this.OCUP = this.weightingAreaInfo.ses.ocup;
    });
  }

  generateBarChart() {
    // Define chart dimensions
    const margin = {top: 15, right: 20, bottom: 30, left: 40};
    const width = 335 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Define SVG
//    let svg = d3.select(this.element.nativeElement).append('svg')
    const svg = d3.select(this.div_d3Elements.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#efefef');

    // Define chart plot area
    const chart = svg.append('g')
      .attr('class', 'bar')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define domain data for X & Y axes from the data array
    const xDomain = this.data.map(d => d.salesperson);
    console.log('xDomain:', xDomain);
    const yDomain = [0, d3.max(this.data, d => d.sales)];

    // Set the scale for X & Y
    const x = d3.scaleBand()
      .domain(xDomain)
      .rangeRound([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);

    // Add X & Y axes to the SVG
    // add the x Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));

    // Plotting the chart
    svg.selectAll('bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return margin.left + x(d.salesperson) ; })
      .attr('width', x.bandwidth)
      .attr('y', function(d) { return y(d.sales); })
      .attr('height', function(d) { return height - y(d.sales); });
  }


  // ----Socieconomic Characteristics Graphs: (ses)----
  generateComparativeTableGraph() {

  }

  generateOccupationalStructureGraph() {
    // Define chart dimensions
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = 335 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    console.log('todo el dato', this.dataCircle);

    // Define SVG
    const svg = d3.select(this.div_occupationalStructureGraph.nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background-color', '#efefef'),
      g = svg.append('g').attr('transform', 'translate(' + (width + margin.left + margin.right) / 2 + ','
        + (height + margin.top + margin.bottom) / 2 + ')');

    // Define the slices color
    const color = d3.scaleOrdinal(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854']);

    const pie = d3.pie()
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const label = d3.arc()
      .outerRadius(radius - 30)
      .innerRadius(radius - 30);

    // Join new data
    const arcs = g.selectAll('.arc')
      .data(pie(this.dataCircle.map(d => d.count)))
      .enter()
      .append('g')
      .attr('class', 'arc');

    console.log(pie(this.dataCircle.map(d => d.count)));

    // Enter new arcs
    arcs.append('path')
      .attr('fill', function(d, i) { return color(i.toString()); })
      .attr('d', <any>arc)
      .attr('stroke', 'white')
      .attr('stroke-width', '4px');

    // Τransition the labels:
    const text = arcs.append('text')
      .attr('transform',
        function(d) {return 'translate(' + label.centroid(<any>d) + ')';
      })
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text(function(d) {return d.data.toString(); });
  }
  // --------------------------

  // ----Educational Profile Graphs: (educacao) ----
  // code: alfabetizacao
  generateLiteracyGraph() {

  }

  // code: realizacao
  generateAchievementGraph() {

  }
  // --------------------------

  // ---- Educational profile of population in scholarship age : (idadeEscolar)
  // --- For 6_10 years old
  generateSixToTenYearsGraphs() {

  }


  // -----------Generic Graphs
  generateCircleGraph() {

  }

  generateHorizontalBarGraph() {

  }


  // --------------------------

  // unsubscribe to ensure no memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
