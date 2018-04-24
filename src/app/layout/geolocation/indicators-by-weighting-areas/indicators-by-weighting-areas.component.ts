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
      { variableName: 'North', variableValue: 53245},
      { variableName: 'South', variableValue: 28479},
      { variableName: 'East', variableValue: 19697},
      { variableName: 'West', variableValue: 24037},
      { variableName: 'Central', variableValue: 40245}
    ],
    oranges: [
      { variableName: 'North', variableValue: 200},
      { variableName: 'South', variableValue: 200},
      { variableName: 'East', variableValue: 200},
      { variableName: 'West', variableValue: 200},
      { variableName: 'Central', variableValue: 200}
    ]
  };
  dataVertical = [
    {variableName: 'tmp', variableValue: 33}
  ];

  dataHorizontal = [
    {type: 'tipo', value: 0}
  ];
  dataCircle = [
    { variableName: 'Alfabetizados', variableValue: 53245}
  ];
  dataComparativeTable = [
    {model: '%Pobres', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0},
    {model: 'Renda per Capita', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0},
    {model: 'GINI', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0}
  ];

  groupChartData2 = [
    { '2614': 8, '4449': 15, 'over': 1 },
    { '2614': 7, '4449': 2, 'over': 2 },
    { '2614': 4, '4449': 5, 'over': 3 }
  ];
  columnsInfo = { '2614': 'Team A', '4449': 'Team B' };

  groupChartDataForLiteracyGraph = {
    labels: [
      'cat1', 'cat2', 'cat3'
    ],
    series: [
      {
        label: 'AP',
        values: [4, 8, 15]
      }]
  };

  groupChartDataForScholarFrequencyGraph = {
    labels: [
      'cat1', 'cat2', 'cat3'
    ],
    series: [
      {
        label: 'AP',
        values: [4, 8, 15]
      }]
  };


  // ----------------
  @ViewChild('comparativeTableGraph')
  private div_comparativeTableGraph: ElementRef;

  @ViewChild('occupationalStructureGraph')
  private div_occupationalStructureGraph: ElementRef;

  @ViewChild('profileEducationalGraph')
  private div_profileEducationalGraph: ElementRef;

  @ViewChild('categoriesProfileEducationalGraph')
  private div_categoriesProfileEducationalGraph: ElementRef;

  @ViewChild('literacyGraph')
  private div_literacyGraph: ElementRef;

  @ViewChild('scholarFrequencyGraph')
  private div_scholarFrequencyGraph: ElementRef;

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

        this.weightingAreaSecInfoService.showWeightingAreaInfoByCodAP(this.selectedSchoolCodAP).then((res1) => {
          this.weightingAreaInfo = res1[0];
          console.log(this.weightingAreaInfo);
          this.CODAP = this.weightingAreaInfo.codap;
          this.OCUP = this.weightingAreaInfo.ses.ocup;

          // Get all the information about BR-SP-RMSP socioeconomic variables
          this.brSpRmspSecInfoService.getBrSpRmspSecInfo().then((res2) => {
            this.brSpRmspSecInfo = res2;
            console.log('brSpRMSPVariables:', this.brSpRmspSecInfo);

            this.buildDataForComparativeTable();

            this.buildDataForOccupationalStructureGraph();

            this.buildDataForProfileEducationalGraph();

            this.buildDataForCategoriesProfileEducationalGraph();

            this.buildDataForLiteracyGraph();

            this.buildDataForScholarFrequencyGraph();

          });

        });

      });
    this.subscription.add(s);
  }

  ngAfterViewInit() {

  }

  buildDataForComparativeTable() {

    // Graph 1: Comparative table. Data for Metropole, UF, and BR
    this.dataComparativeTable[0].ap = this.weightingAreaInfo.ses.perc_poor;
    this.dataComparativeTable[1].ap = this.weightingAreaInfo.ses.renda_dom_per_cap_media;
    this.dataComparativeTable[2].ap = this.weightingAreaInfo.ses.gini;
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

  }

  buildDataForOccupationalStructureGraph() {
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

    this.generateHorizontalBarChart(this.dataHorizontal, this.div_occupationalStructureGraph);

  }

  buildDataForProfileEducationalGraph() {
    // Graph 3: Comparative table. Data for AP
    this.dataCircle = [
      { variableName: 'Alfabetizados', variableValue: this.convertToPercentage(this.weightingAreaInfo.educacao.alfabetizacao)},
      { variableName: 'Não Alfabetizados', variableValue: this.convertToPercentage(1 - this.weightingAreaInfo.educacao.alfabetizacao)}
    ];

    this.generatePieGraph(this.dataCircle, this.div_profileEducationalGraph);
  }

  buildDataForCategoriesProfileEducationalGraph() {
    // Graph 4:
    this.dataVertical = [
      {variableName: 'primarioIncompl',
        variableValue: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.primarioIncompl)},
      {variableName: 'FundamenIncompl',
        variableValue: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.FundamenIncompl)},
      {variableName: 'MedioIncompl',
        variableValue: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.MedioIncompl)},
      {variableName: 'SuperiorIncompl',
        variableValue: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.SuperiorIncompl)},
      {variableName: 'SuperiorComplet',
        variableValue: this.convertToPercentage(this.weightingAreaInfo.educacao.realizacao.SuperiorComplet)}
    ];

    this.generateVerticalBarChart(this.dataVertical, this.div_categoriesProfileEducationalGraph);
  }

  buildDataForLiteracyGraph() {
      this.groupChartDataForLiteracyGraph = {
        labels: [
          '6-10', '11-14', '15-17'
        ],
        series: [
          {
            label: 'AP',
            values: [
              this.convertToPercentage(this.weightingAreaInfo.educacao.idadeEscolar.range6to10.alfabetizacao),
              this.convertToPercentage(this.weightingAreaInfo.educacao.idadeEscolar.range11to14.alfabetizacao),
              this.convertToPercentage(this.weightingAreaInfo.educacao.idadeEscolar.range15to17.alfabetizacao)
            ]
          },
          {
            label: 'RMSP',
            values: [
              this.convertToPercentage(this.brSpRmspSecInfo[2].educacao.idadeEscolar.range6to10.alfabetizacao),
              this.convertToPercentage(this.brSpRmspSecInfo[2].educacao.idadeEscolar.range11to14.alfabetizacao),
              this.convertToPercentage(this.brSpRmspSecInfo[2].educacao.idadeEscolar.range15to17.alfabetizacao)
            ]
          },
          {
            label: 'UF',
            values: [
              this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range6to10.alfabetizacao),
              this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range11to14.alfabetizacao),
              this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range15to17.alfabetizacao)
            ]
          },
          {
            label: 'BR',
            values: [
              this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range6to10.alfabetizacao),
              this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range11to14.alfabetizacao),
              this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range15to17.alfabetizacao)
            ]
          }]
      };

    this.generateGroupedHorizontalBarChart(this.groupChartDataForLiteracyGraph, this.div_literacyGraph);
  }

  buildDataForScholarFrequencyGraph() {
    this.groupChartDataForScholarFrequencyGraph = {
      labels: [
        '6-10', '11-14', '15-17'
      ],
      series: [
        {
          label: 'AP',
          values: [
            this.convertToPercentage(this.weightingAreaInfo.educacao.idadeEscolar.range6to10.frequentaEscola),
            this.convertToPercentage(this.weightingAreaInfo.educacao.idadeEscolar.range11to14.frequentaEscola),
            this.convertToPercentage(this.weightingAreaInfo.educacao.idadeEscolar.range15to17.frequentaEscola)
          ]
        },
        {
          label: 'RMSP',
          values: [
            this.convertToPercentage(this.brSpRmspSecInfo[2].educacao.idadeEscolar.range6to10.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[2].educacao.idadeEscolar.range11to14.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[2].educacao.idadeEscolar.range15to17.frequentaEscola)
          ]
        },
        {
          label: 'UF',
          values: [
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range6to10.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range11to14.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range15to17.frequentaEscola)
          ]
        },
        {
          label: 'BR',
          values: [
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range6to10.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range11to14.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range15to17.frequentaEscola)
          ]
        }]
    };

    this.generateGroupedHorizontalBarChart(this.groupChartDataForScholarFrequencyGraph, this.div_scholarFrequencyGraph);

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

    const tooltip = d3.select('body').append('div').attr('class', 'toolTip');

    // Define chart plot area
    const chart = svg.append('g')
      .attr('class', 'bar')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Define domain data for X & Y axes from the data array
    const xDomain = this.dataVertical.map(d => d.variableName);
    console.log('xDomain:', xDomain);
    const yDomain = [0, d3.max(this.dataVertical, function(d) {return d.variableValue; })];

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
      .attr('transform', 'translate(' + margin.left + ',' + ( height) + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    // add the y Axis
    chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + margin.left + ',' + 0 + ')' )
      .call(d3.axisLeft(y));

    // Plotting the chart
    chart.selectAll('bar')
      .data(this.dataVertical)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return margin.left + x(d.variableName) ; })
      .attr('width', x.bandwidth)
      .attr('y', function(d) { return y(d.variableValue); })
      .attr('height', function(d) { return height - y(d.variableValue); })
      .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d.variableName) + '<br>' + (d.variableValue) + '%');
      })
      .on('mouseout', function(d) { tooltip.style('display', 'none'); });
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

  generateGroupedHorizontalBarChart(dataGraph: any, containerDiv: ElementRef ) {
    // Define chart dimensions
    const chartWidth       = 200,
      barHeight        = 20,
      groupHeight      = barHeight * dataGraph.series.length,
      gapBetweenGroups = 20,
      spaceForLabels   = 50, // 150
      spaceForLegend   = 80; // 150

    // Zip the series data together (first values, second values, etc.)
    // [4,12,31, 8,43,28, 15,22,14]
    const zippedData = [];
    for (let i = 0; i < dataGraph.labels.length; i++) {
      for (let j = 0; j < dataGraph.series.length; j++) {
        zippedData.push(dataGraph.series[j].values[i]);
      }
    }

    // Color scale
    // const color = d3.scale.category20();
    const color = d3.scaleOrdinal(['#66c2a5', '#fc8d62', '#8da0cb', '#a6d854', '#e78ac3']);
    const chartHeight = barHeight * zippedData.length + gapBetweenGroups * dataGraph.labels.length;

    const x = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth]);

    const y = d3.scaleBand()
      .range([chartHeight + gapBetweenGroups, 0])
      .padding(0.1);

    // y.domain(dataGraph.series.map(d => d.label )).padding(0.1);

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    // Specify the chart area and dimensions
    const chart = d3.select(containerDiv.nativeElement).append('svg')
      .attr('class', 'barchart')
      .attr('width', spaceForLabels + chartWidth + spaceForLegend)
      .attr('height', chartHeight);

    // Create bars
    const bar = chart.selectAll('g')
      .data(zippedData)
      .enter().append('g')
      .attr('transform', function(d, i) {
        return 'translate(' + spaceForLabels + ',' +
          (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / dataGraph.series.length))) + ')';
      });

    // Create rectangles of the correct width
    bar.append('rect')
      .attr('fill', function(d, i) { return color((i % dataGraph.series.length).toString()); }) // ()
      .attr('class', 'barRect')
      .attr('width', x)
      .attr('height', barHeight - 1);

    // Add text label in bar
    bar.append('text')
      .attr('x', function(d) { return x(d) - 3; })
      .attr('y', barHeight / 2)
      .attr('fill', 'red')
      .attr('dy', '.35em')
      .text(function(d) { return d; });

    // Draw labels
    bar.append('text')
      .attr('class', 'label')
      .attr('x', function(d) { return - 10; })
      .attr('y', groupHeight / 2)
      .attr('dy', '.35em')
      .text(function(d, i) {
        if (i % dataGraph.series.length === 0) {
          return dataGraph.labels[Math.floor(i / dataGraph.series.length)];
        } else {
          return '';
        }
      });

    chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + spaceForLabels + ', ' + -gapBetweenGroups / 2 + ')')
      .call(d3.axisLeft(y));

    // Draw legend
    const legendRectSize = 18,
      legendSpacing  = 4;

    const legend = chart.selectAll('.legend')
      .data(dataGraph.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        const height = legendRectSize + legendSpacing;
        const offset = -gapBetweenGroups / 2;
        const horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i.toString()); })
      .style('stroke', function (d, i) { return color(i.toString()); });

    legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d, i) {
        console.log('d group bar: ', dataGraph.series[i].label); return dataGraph.series[i].label;
        // d.label;
      });
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
      .data(pie(dataGraph.map(d => d.variableValue)))
      .enter()
      .append('g')
      .attr('class', 'arc');

    console.log(pie(dataGraph.map(d => d.variableValue)));

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
  }

  /**
   * unsubscribe to ensure no memory leaks
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
