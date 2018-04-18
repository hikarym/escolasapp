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
  CAT_01 = 'Características Socioeconômicas';
  CAT_02 = 'Perfil Educacional';
  CAT_03 = 'Perfil Educacional da Pop. em Idade Escolas';
  CAT_04 = 'Características demográficas';
  // Geral Information about a CODAP
  CODAP = '';
  GINI = 0;
  PERC_POOR = 0;
  RENDA_DOM_PER_CAP_MEDIA = 0;
  OCUP: any;

  categories: any[] = [
    {
      id: 0,
      name: 'Características Socioeconômicas',
      group: 'cat1',
      visible: false,
      graphics: 2
    },
    {
      id: 1,
      name: 'Perfil Educacional',
      group: 'cat2',
      visible: false,
      graphics: 2
    },
    {
      id: 2,
      name: 'Perfil Educacional da Pop. em Idade Escolas',
      group: 'cat3',
      visible: false,
      graphics: 1
    },
    {
      id: 3,
      name: 'Características demográficas',
      group: 'cat4',
      visible: false,
      graphics: 2
    }
  ];
  categoryDefaultIndex = 0;


  // ------------------------------------
  selectedSchoolCodAP: string;
  weightingAreaInfo: any;
  brSpRmspSecInfo: any;

  // ---------------D3 GRAPHS---------------------
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
  dataVertical = [
    {salesperson: 'Bob', sales: 33},
    {salesperson: 'Robin', sales: 12},
    {salesperson: 'Anne', sales: 41},
    {salesperson: 'Mark', sales: 16},
    {salesperson: 'Joe', sales: 39}
  ];

  dataHorizontal = [
    {type: 'tipo', value: 0}
  ];
  dataCircle = [
    { region: 'Alfabetizados', count: 53245},
    { region: 'Não Alfabetizados', count: 28479}
  ];
  dataComparativeTable = [
    {model: '%Pobres', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0},
    {model: 'Renda per Capita', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0},
    {model: 'GINI', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0}
  ];

  // ----------------
  @ViewChild('comparativeTableGraph')
  private div_comparativeTableGraph: ElementRef;

  @ViewChild('occupationalStructureGraph')
  private div_occupationalStructureGraph: ElementRef;

  @ViewChild('profileEducationalGraph')
  private div_profileEducationalGraph: ElementRef;

  @ViewChild('categoriesProfileEducationalGraph')
  private div_categoriesProfileEducationalGraph: ElementRef;

  // ----------------
  private subscription = new Subscription();

  constructor(private renderer: Renderer2,
              private router: Router,
              private weightingAreaSecInfoService: ApSecVariableService,
              private brSpRmspSecInfoService: BrSpRmspSecVariableService,
              private sharedDataService: ShareddataService) {
    this.categories[this.categoryDefaultIndex].visible = true;
  }

  ngOnInit() {


    const s = this.sharedDataService.getSchoolCodAP().subscribe(
      res => {
        console.log('Retrieving the selected school cod AP', res);

        // Get Weighting Area socioeconomic variables's information
        this.selectedSchoolCodAP = res;
        this.getWeightingAreaInformation(this.selectedSchoolCodAP);

        // Get all the information about BR-SP-RMSP socioeconomic variables
        this.brSpRmspSecInfoService.getBrSpRmspSecInfo().then((res1) => {
          this.brSpRmspSecInfo = res1;
          console.log('brSpRMSPVariables:', this.brSpRmspSecInfo);

          // Graph 1: Comparative table. Data for Metropole, UF, and Br
          this.dataComparativeTable[0].municipio = 0;
          this.dataComparativeTable[1].municipio = 0;
          this.dataComparativeTable[2].municipio = 0;
          this.dataComparativeTable[0].metropole = this.brSpRmspSecInfo[2].ses.perc_poor;
          this.dataComparativeTable[1].metropole = this.brSpRmspSecInfo[2].ses.renda_dom_per_cap_media;
          this.dataComparativeTable[2].metropole = this.brSpRmspSecInfo[2].ses.gini;
          this.dataComparativeTable[0].uf = this.brSpRmspSecInfo[1].ses.perc_poor;
          this.dataComparativeTable[1].uf = this.brSpRmspSecInfo[1].ses.renda_dom_per_cap_media;
          this.dataComparativeTable[2].uf = this.brSpRmspSecInfo[1].ses.gini;
          this.dataComparativeTable[0].br = this.brSpRmspSecInfo[0].ses.perc_poor;
          this.dataComparativeTable[1].br = this.brSpRmspSecInfo[0].ses.renda_dom_per_cap_media;
          this.dataComparativeTable[2].br = this.brSpRmspSecInfo[0].ses.gini;

          this.generateTableGraph(this.dataComparativeTable, this.div_comparativeTableGraph);

          // Graph 2:
          this.generateHorizontalBarChart(this.dataHorizontal, this.div_occupationalStructureGraph);

          // Graph 3:
          this.generatePieGraph(this.dataCircle, this.div_profileEducationalGraph);

          // Graph 4:
          this.generateVerticalBarChart(this.dataVertical, this.div_categoriesProfileEducationalGraph);

        });
      });
    this.subscription.add(s);


  }

  ngAfterViewInit() {
    // ---------------------------------------------
    /*this.dataHorizontal = [
      {'area': 'Militares ', 'value': 18000},
      {'area': 'Gerentes', 'value': 17000},
      {'area': 'Profissionais ', 'value': 80000},
      {'area': 'Técnicos', 'value': 55000},
      {'area': 'Trab. Escritorio', 'value': 100000},
      {'area': 'Tra. Comércio', 'value': 50000}
    ];*/


    // ---------------------------------------------
    /*this.dataCircle = [
      { region: 'Alfabetizados', count: 53245},
      { region: 'Não Alfabetizados', count: 28479}
    ];*/
    // ---------------------------------------------
    /*this.dataVertical = [
      {salesperson: 'Prim. Comp.', sales: 33},
      {salesperson: 'Fund. Incomp.', sales: 12},
      {salesperson: 'Medio Incomp.', sales: 41},
      {salesperson: 'Superior Incomp.', sales: 16},
      {salesperson: 'Superior Comp.', sales: 39}
    ];*/
    // this.generatePieGraph(this.dataCircle, this.div_profileEducationalGraph);
    // this.generateVerticalBarChart(this.dataVertical, this.div_categoriesProfileEducationalGraph);
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getWeightingAreaInformation(schoolCodAP: string) {
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    // this.schoolObject = schoolID;
    this.weightingAreaSecInfoService.showWeightingAreaInfoByCodAP(schoolCodAP).then((res) => {
      this.weightingAreaInfo = res[0];
      console.log(this.weightingAreaInfo);
      this.CODAP = this.weightingAreaInfo.codap;
      this.OCUP = this.weightingAreaInfo.ses.ocup;

      // building of datasets
      // Graph 1: Comparative table. Data for AP
      this.dataComparativeTable[0].ap = this.weightingAreaInfo.ses.perc_poor;
      this.dataComparativeTable[1].ap = this.weightingAreaInfo.ses.renda_dom_per_cap_media;
      this.dataComparativeTable[2].ap = this.weightingAreaInfo.ses.gini;

      // Graph 2: Comparative table. Data for AP
      this.dataHorizontal = [
        {type: 'militares', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.militares)},
        {type: 'gerentes', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.gerentes)},
        {type: 'profissionais', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.profissionais)},
        {type: 'tecnicos', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.tecnicos)},
        {type: 'trabEscritorio', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.trabEscritorio)},
        {type: 'comercioServicos', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.comercioServicos)},
        {type: 'agropecuaria', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.agropecuaria)},
        {type: 'manuaisQualificados', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.manuaisQualificados)},
        {type: 'operadoresMaquina', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.operadoresMaquina)},
        {type: 'ocupacoesElementares', value: this.convertToPercentage(this.weightingAreaInfo.ses.ocup.ocupacoesElementares)}
        ];

      // Graph 3:
      this.dataCircle = [
        { region: 'Alfabetizados', count: this.convertToPercentage(this.weightingAreaInfo.educacao.alfabetizacao)},
        { region: 'Não Alfabetizados', count: this.convertToPercentage(1 - this.weightingAreaInfo.educacao.alfabetizacao)}
      ];

      // Graph 4:
      this.dataVertical = [
        {salesperson: 'Prim. Comp.', sales: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.primarioIncompl)},
        {salesperson: 'Fund. Incomp.', sales: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.FundamenIncompl)},
        {salesperson: 'Medio Incomp.', sales: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.MedioIncompl)},
        {salesperson: 'Superior Incomp.', sales: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.SuperiorIncompl)},
        {salesperson: 'Superior Comp.', sales: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.SuperiorComplet)}
      ];

    });

    // Graph 3: Comparative table. Data for AP
  }

  convertToPercentage (value: number) {
    return parseFloat((value * 100).toFixed(2));
  }

  generateVerticalBarChart(dataGraph2: any, containerDiv: ElementRef) {
    // Define chart dimensions
    const margin = {top: 15, right: 20, bottom: 100, left: 20};
    const width = 335 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    // Define chart dimensions
    // let svg = d3.select(this.element.nativeElement).append('svg')
    const svg = d3.select(containerDiv.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#efefef');

    // Define chart plot area
    const chart = svg.append('g')
      .attr('class', 'bar')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Define domain data for X & Y axes from the data array
    const xDomain = this.dataVertical.map(d => d.salesperson);
    console.log('xDomain:', xDomain);
    const yDomain = [0, d3.max(this.dataVertical, function(d) {return d.sales; })];

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
    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    // add the y Axis
    chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));

    // Plotting the chart
    chart.selectAll('bar')
      .data(this.dataVertical)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return margin.left + x(d.salesperson) ; })
      .attr('width', x.bandwidth)
      .attr('y', function(d) { return y(d.sales); })
      .attr('height', function(d) { return height - y(d.sales); });
  }

  generateHorizontalBarChart(dataGraph: any, containerDiv: ElementRef ) {
    /*const percentage_data = [];
    // Pass the values to percentages
    this.dataHorizontal.forEach(function(d, i) {
      d.valuePerc = (d.value * 100).toFixed(2) + '%';
      percentage_data.push([d.type, d.valuePerc]);
    });*/

    // Define chart dimensions
    const margin = {top: 20, right: 20, bottom: 30, left: 80};
    const width = 335 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    // Define chart dimensions
    const svg = d3.select(containerDiv.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#efefef');

    const tooltip = d3.select('body').append('div').attr('class', 'toolTip');

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleBand().range([height, 0]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.dataHorizontal.sort(function(a, b) { return a.value - b.value; });

    x.domain([0, d3.max(this.dataHorizontal, function(d) { return d.value; })]);
    y.domain(this.dataHorizontal.map(d => d.type )).padding(0.1);

    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      // .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));
      .call(d3.axisBottom(x).ticks(5));

    g.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    g.selectAll('.bar')
      .data(this.dataHorizontal)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('y', function(d) { return y(d.type); })
      .attr('width', function(d) { return x(d.value); })
      .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d.type) + '<br>' + (d.value) + '%');
      })
      .on('mouseout', function(d) { tooltip.style('display', 'none'); });


  }


  generatePieGraph(dataGraph: any, containerDiv: ElementRef) {
    // Define chart dimensions
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = 335 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    console.log('todo el dato', dataGraph);

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    // Define SVG
    const svg = d3.select(containerDiv.nativeElement)
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
      .data(pie(dataGraph.map(d => d.count)))
      .enter()
      .append('g')
      .attr('class', 'arc');

    console.log(pie(dataGraph.map(d => d.count)));

    // Enter new arcs
    arcs.append('path')
      .attr('fill', function(d, i) { return color(i.toString()); })
      .attr('d', <any>arc)
      .attr('stroke', 'white')
      .attr('stroke-width', '2px');

    // Τransition the labels:
    const text = arcs.append('text')
      .attr('transform',
        function(d) {return 'translate(' + label.centroid(<any>d) + ')';
        })
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text(function(d) {return d.data.toString(); });
  }

  generateTableGraph(dataGraph: any, containerDiv: ElementRef ) {

    const bmw_data = [];
    console.log('data table: ', dataGraph);

    dataGraph.forEach(function(d, i) {
      // now we add another data object value, a calculated value.
      d.apPerc = i === 1 ? d.ap.toFixed(2)  : (d.ap * 100).toFixed(2) + '%';
      d.municipioPerc = i === 1 ? d.municipio.toFixed(2)  : (d.municipio * 100).toFixed(2) + '%';
      d.metropolePerc = i === 1 ? d.metropole.toFixed(2)  : (d.metropole * 100).toFixed(2) + '%';
      d.ufPerc = i === 1 ? d.uf.toFixed(2)  : (d.uf * 100).toFixed(2) + '%';
      d.brPerc = i === 1 ? d.br.toFixed(2)  : (d.br * 100).toFixed(2) + '%';
      bmw_data.push([d.model, d.apPerc, d.municipioPerc, d.metropolePerc, d.ufPerc, d.brPerc]);
    });

    console.log(dataGraph);
    console.log('bmw_data:', bmw_data);

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');
    // Remove all children from SVG/HTML
    // d3.select("g.parent").selectAll("*").remove();

    const table = d3.select(containerDiv.nativeElement).append('table');
    const thead = table.append('thead').append('tr');
    const tbody = table.append('tbody');

    thead
      .selectAll('th')
      .data(['Cat.', 'AP', 'Mun.', 'RMSP', 'UF', 'Br'])
      .enter()
      .append('th')
      .text(function(d) {
        return d;
      });

    const rows = tbody
      .selectAll('tr')
      .data(bmw_data)
      .enter()
      .append('tr');

    const cells = rows
      .selectAll('td')
      .data(function(d) {return d; })
      .enter()
      .append('td')
      .text(function(d) {return <any>d; });

    d3.selectAll('tr').select('td').attr('class', 'model');
  }
  // --------------------------
  // ----Socieconomic Characteristics Graphs: (ses)----
  generateComparativeTableGraph() {

  }

  generateOccupationalStructureGraph() {

  }

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

  /**
   * Function to show the graphs of a chosen category
   */
  onGraphCategoryChange(idCatSelected: number) {
    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i].visible = false;
    }
    this.categories[idCatSelected].visible = true;
    this.categoryDefaultIndex = idCatSelected;
    /*switch (idCatSelected) {
      case 0 : {
        this.categories[idCatSelected].visible = true;
        break;
      }
      case 1 : {
        break;
      }
      case 2 : {
        break;
      }
      case 3 : {
        break;
      }
    }*/
  }

  /**
   * unsubscribe to ensure no memory leaks
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
