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
import {formatSize} from '@angular/cli/utilities/stats';
import {text} from 'd3-fetch';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';


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
      graphics: 3
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

  dataComparativeTable = [
    {model: '%Pobres', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0},
    {model: 'Renda per Capita', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0},
    {model: 'GINI', ap: 0, municipio: 0, metropole: 0, uf: 0, br: 0}
  ];

  // ----------------
  @ViewChild('comparativeTableGraph')
  private div_comparativeTableGraph: ElementRef;

  @ViewChild('occupationalStructureByAPGraph')
  private div_occupationalStructureByAPGraph: ElementRef;

  @ViewChild('occupationalStructureByMetropoleGraph')
  private div_occupationalStructureByMetropoleGraph: ElementRef;

  @ViewChild('occupationalStructureByUFGraph')
  private div_occupationalStructureByUFGraph: ElementRef;

  @ViewChild('occupationalStructureByBrasilGraph')
  private div_occupationalStructureByBrasilGraph: ElementRef;

  @ViewChild('profileEducationalByAPGraph')
  private div_profileEducationalByAPGraph: ElementRef;

  @ViewChild('profileEducationalByMetropoleGraph')
  private div_profileEducationalByMetropoleGraph: ElementRef;

  @ViewChild('profileEducationalByUFGraph')
  private div_profileEducationalByUFGraph: ElementRef;

  @ViewChild('profileEducationalByBrasilGraph')
  private div_profileEducationalByBrasilGraph: ElementRef;

  @ViewChild('categoriesProfileEducationalByAPGraph')
  private div_categoriesProfileEducationalByAPGraph: ElementRef;

  @ViewChild('categoriesProfileEducationalByMetropoleGraph')
  private div_categoriesProfileEducationalByMetropoleGraph: ElementRef;

  @ViewChild('categoriesProfileEducationalByUFGraph')
  private div_categoriesProfileEducationalByUFGraph: ElementRef;

  @ViewChild('categoriesProfileEducationalByBrasilGraph')
  private div_categoriesProfileEducationalByBrasilGraph: ElementRef;

  @ViewChild('literacyGraph')
  private div_literacyGraph: ElementRef;

  @ViewChild('scholarFrequencyGraph')
  private div_scholarFrequencyGraph: ElementRef;

  @ViewChild('educationalLevelByAPGraph')
  private div_educationalLevelByAPGraph: ElementRef;

  @ViewChild('educationalLevelByMetropoleGraph')
  private div_educationalLevelByMetropoleGraph: ElementRef;

  @ViewChild('educationalLevelByUFGraph')
  private div_educationalLevelByUFGraph: ElementRef;

  @ViewChild('educationalLevelByBrasilGraph')
  private div_educationalLevelByBrasilGraph: ElementRef;

  @ViewChild('racialDistributionGraph')
  private div_racialDistributionGraph: ElementRef;

  @ViewChild('agePyramidByAPGraph')
  private div_agePyramidByAPGraph: ElementRef;

  @ViewChild('agePyramidByMetropoleGraph')
  private div_agePyramidByMetropoleGraph: ElementRef;

  @ViewChild('agePyramidByUFGraph')
  private div_agePyramidByUFGraph: ElementRef;

  @ViewChild('agePyramidByBrasilGraph')
  private div_agePyramidByBrasilGraph: ElementRef;

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
          // console.log(this.weightingAreaInfo);
          this.CODAP = this.weightingAreaInfo.codap;
          this.OCUP = this.weightingAreaInfo.ses.ocup;

          // Get all the information about BR-SP-RMSP socioeconomic variables
          this.brSpRmspSecInfoService.getBrSpRmspSecInfo().then((res2) => {
            this.brSpRmspSecInfo = res2;
            // console.log('brSpRMSPVariables:', this.brSpRmspSecInfo);

            this.buildDataForComparativeTable();

            this.buildDataForOccupationalStructureGraph(this.weightingAreaInfo,
              this.div_occupationalStructureByAPGraph);
            this.buildDataForOccupationalStructureGraph(this.brSpRmspSecInfo[2],
              this.div_occupationalStructureByMetropoleGraph);
            this.buildDataForOccupationalStructureGraph(this.brSpRmspSecInfo[1],
              this.div_occupationalStructureByUFGraph);
            this.buildDataForOccupationalStructureGraph(this.brSpRmspSecInfo[0],
              this.div_occupationalStructureByBrasilGraph);

            this.buildDataForProfileEducationalGraph(this.weightingAreaInfo, this.div_profileEducationalByAPGraph);
            this.buildDataForProfileEducationalGraph(this.brSpRmspSecInfo[2], this.div_profileEducationalByMetropoleGraph);
            this.buildDataForProfileEducationalGraph(this.brSpRmspSecInfo[1], this.div_profileEducationalByUFGraph);
            this.buildDataForProfileEducationalGraph(this.brSpRmspSecInfo[0], this.div_profileEducationalByBrasilGraph);

            this.buildDataForCategoriesProfileEducationalGraph(this.weightingAreaInfo,
              this.div_categoriesProfileEducationalByAPGraph);
            this.buildDataForCategoriesProfileEducationalGraph(this.brSpRmspSecInfo[2],
              this.div_categoriesProfileEducationalByMetropoleGraph);
            this.buildDataForCategoriesProfileEducationalGraph(this.brSpRmspSecInfo[1],
              this.div_categoriesProfileEducationalByUFGraph);
            this.buildDataForCategoriesProfileEducationalGraph(this.brSpRmspSecInfo[0],
              this.div_categoriesProfileEducationalByBrasilGraph);

            this.buildDataForLiteracyGraph();

            this.buildDataForScholarFrequencyGraph();

            this.buildDataForEducationalLevelGraph(this.weightingAreaInfo, this.div_educationalLevelByAPGraph);
            this.buildDataForEducationalLevelGraph(this.brSpRmspSecInfo[2], this.div_educationalLevelByMetropoleGraph);
            this.buildDataForEducationalLevelGraph(this.brSpRmspSecInfo[1], this.div_educationalLevelByUFGraph);
            this.buildDataForEducationalLevelGraph(this.brSpRmspSecInfo[0], this.div_educationalLevelByBrasilGraph);

            this.buildDataForAgePyramidGraph(this.weightingAreaInfo, this.div_agePyramidByAPGraph);
            this.buildDataForAgePyramidGraph(this.brSpRmspSecInfo[2], this.div_agePyramidByMetropoleGraph);
            this.buildDataForAgePyramidGraph(this.brSpRmspSecInfo[1], this.div_agePyramidByUFGraph);
            this.buildDataForAgePyramidGraph(this.brSpRmspSecInfo[0], this.div_agePyramidByBrasilGraph);

            this.buildDataForRacialDistributionGraph(this.weightingAreaInfo, this.brSpRmspSecInfo, this.div_racialDistributionGraph);

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

  buildDataForOccupationalStructureGraph(data: any, containerDiv: ElementRef) {

    const ocupationalStructureData = [
      {variableName: 'militares', variableValue: this.convertToPercentage(data.ses.ocup.militares)},
      {variableName: 'gerentes', variableValue: this.convertToPercentage(data.ses.ocup.gerentes)},
      {variableName: 'profissionais', variableValue: this.convertToPercentage(data.ses.ocup.profissionais)},
      {variableName: 'tecnicos', variableValue: this.convertToPercentage(data.ses.ocup.tecnicos)},
      {variableName: 'trabEscritorio', variableValue: this.convertToPercentage(data.ses.ocup.trabEscritorio)},
      {variableName: 'comercioServicos', variableValue: this.convertToPercentage(data.ses.ocup.comercioServicos)},
      {variableName: 'agropecuaria', variableValue: this.convertToPercentage(data.ses.ocup.agropecuaria)},
      {variableName: 'manuaisQualificados', variableValue: this.convertToPercentage(data.ses.ocup.manuaisQualificados)},
      {variableName: 'operadoresMaquina', variableValue: this.convertToPercentage(data.ses.ocup.operadoresMaquina)},
      {variableName: 'ocupacoesElementares', variableValue: this.convertToPercentage(data.ses.ocup.ocupacoesElementares)}
    ];
    const maxValueInDomainX = 50;
    this.generateHorizontalBarChart(ocupationalStructureData, containerDiv, maxValueInDomainX);

  }

  buildDataForProfileEducationalGraph(data: any, containerDiv: ElementRef) {

    const dataCircle = [
      { variableName: 'Alfabetizados', variableValue: this.convertToPercentage(data.educacao.alfabetizacao)},
      { variableName: 'Não Alfabetizados', variableValue: this.convertToPercentage(1 - data.educacao.alfabetizacao)}
    ];

    const panelWidth = 170; // 335
    const panelHeight = 160; // 300

    this.generatePieGraph(dataCircle, containerDiv, panelWidth, panelHeight);
  }

  buildDataForCategoriesProfileEducationalGraph(data: any, containerDiv: ElementRef) {
    // Graph 4:
    const dataVertical = [
      {variableName: 'primarioIncompl',
        variableValue: this.convertToPercentage(data.educacao.realizacao.primarioIncompl)},
      {variableName: 'FundamenIncompl',
        variableValue: this.convertToPercentage(data.educacao.realizacao.FundamenIncompl)},
      {variableName: 'MedioIncompl',
        variableValue: this.convertToPercentage(data.educacao.realizacao.MedioIncompl)},
      {variableName: 'SuperiorIncompl',
        variableValue: this.convertToPercentage(data.educacao.realizacao.SuperiorIncompl)},
      {variableName: 'SuperiorComplet',
        variableValue: this.convertToPercentage(data.educacao.realizacao.SuperiorComplet)}
    ];

    this.generateVerticalBarChart(dataVertical, containerDiv);
  }

  buildDataForLiteracyGraph() {
    const groupChartDataForLiteracyGraph = {
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

    this.generateGroupedHorizontalBarChart(groupChartDataForLiteracyGraph, this.div_literacyGraph);
  }

  buildDataForScholarFrequencyGraph() {
    const groupChartDataForScholarFrequencyGraph = {
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

    this.generateGroupedHorizontalBarChart(groupChartDataForScholarFrequencyGraph, this.div_scholarFrequencyGraph);

  }

  buildDataForEducationalLevelGraph(data: any, containerDiv: ElementRef) {
    const groupChartDataForEducationalLevelGraph = {
      labels: [
        '6-10', '11-14', '15-17'
      ],
      series: [
        {
          label: 'Fund.',
          values: [
            this.convertToPercentage(data.educacao.idadeEscolar.range6to10.frequentaFundamental),
            this.convertToPercentage(data.educacao.idadeEscolar.range11to14.frequentaFundamental),
            this.convertToPercentage(data.educacao.idadeEscolar.range15to17.frequentaFundamental)
          ]
        },
        {
          label: 'Medio',
          values: [
            this.convertToPercentage(data.educacao.idadeEscolar.range6to10.frequentaMedio),
            this.convertToPercentage(data.educacao.idadeEscolar.range11to14.frequentaMedio),
            this.convertToPercentage(data.educacao.idadeEscolar.range15to17.frequentaMedio)
          ]
        },
        {
          label: 'Outro',
          values: [
            this.convertToPercentage(data.educacao.idadeEscolar.range6to10.frequentaOutro),
            this.convertToPercentage(data.educacao.idadeEscolar.range11to14.frequentaOutro),
            this.convertToPercentage(data.educacao.idadeEscolar.range15to17.frequentaOutro)
          ]
        }]
    };

    this.generateGroupedHorizontalBarChart(groupChartDataForEducationalLevelGraph, containerDiv);
  }



  buildDataForAgePyramidGraph(data: any, containerDiv: ElementRef) {

    let agePyramidData = [];
    const populacao = data.demograficas.populacao;
    const homemObject = data.demograficas.piramide.Homens;
    const mulherObject = data.demograficas.piramide.Mulheres;
    // Get the object properties. Homem and Mulher have the same properties
    const homemProperties = Object.keys(homemObject);
    const homemPropertiesNumber = homemProperties.length;
    let homensPercentagem = 0;
    let boundaries = [];


    for (let i = 0; i < homemPropertiesNumber; i++) {
      boundaries = this.getRangeBoundaries('range', 'to', homemProperties[i]);

      const jsonData = {};
      jsonData['group'] = boundaries[0] + '-' + boundaries[1];
      jsonData['male'] = homemObject[homemProperties[i]] * populacao;
      jsonData['female'] = mulherObject[homemProperties[i]] * populacao;
      jsonData['maleperc'] = this.convertToPercentage(homemObject[homemProperties[i]]);
      jsonData['femaleperc'] = this.convertToPercentage(mulherObject[homemProperties[i]]);
      jsonData['order'] = Number( boundaries[0]);
      // agePyramidData.push(jsonData);
      agePyramidData = this.insertIntoArrayOrdered(agePyramidData, jsonData);

      homensPercentagem += homemObject[homemProperties[i]];
    }

    this.generateAgePyramid(agePyramidData, populacao, homensPercentagem, containerDiv);

  }

  insertIntoArrayOrdered(list: any[], object: any) {
    const size = list.length;

    if (size === 0) {
      list.push(object);
    } else {
      let l = 0;
      let r = size - 1;

      while ( l >= 0 && r < size && l <= r ) {
        const m  = Math.floor((l + r) / 2);
        const pivot = list[m].order;
        const newEl = object.order;

        if (l === r) {
          if (newEl >= pivot) {
            // insert in the r + 1 position
            list = this.moveElementsToRight(list, r + 1);
            list[r + 1] = object;
            return list;
          } else {
            list = this.moveElementsToRight(list, r);
            list[r] = object;
            return list;
          }
        } else {
          if (newEl > pivot) {
            l = m + 1;
          } else {
            if (newEl === pivot) {
              list = this.moveElementsToRight(list, r + 1);
              list[r + 1] = newEl;
              return list;
            } else {
              r = m - 1;
            }
          }
        }
      }
    }
    return list;
  }

  moveElementsToRight(list: any[], start: number) {
    list.push();
    const size = list.length;
    for (let k = size - 1; k >= start; k--) {
      list[k] = list[k - 1];
    }
    return list;
  }

  getRangeBoundaries(token: string, separator: string, propertyName: string) {
    const range = propertyName.substr(token.length, propertyName.length);
    const limits = range.split(separator);
    const lowerBound = limits[0];
    const upperBound = limits[1];
    return [lowerBound, upperBound];
  }

  buildDataForRacialDistributionGraph(dataGraph1: any, dataGraph2: any, containerDiv: ElementRef) {

    const groupChartDataGraph = {
      labels: [
        'brancosAmarelos', 'pardosIndigenas', 'pretos'
      ],
      series: [
        {
          label: 'AP',
          values: [
            this.convertToPercentage(dataGraph1.demograficas.raca.brancosAmarelos),
            this.convertToPercentage(dataGraph1.demograficas.raca.pardosIndigenas),
            this.convertToPercentage(dataGraph1.demograficas.raca.pretos)
          ]
        },
        {
          label: 'RMSP',
          values: [
            this.convertToPercentage(dataGraph2[2].demograficas.raca.brancosAmarelos),
            this.convertToPercentage(dataGraph2[2].demograficas.raca.pardosIndigenas),
            this.convertToPercentage(dataGraph2[2].demograficas.raca.pretos)
          ]
        },
        {
          label: 'UF',
          values: [
            this.convertToPercentage(dataGraph2[1].demograficas.raca.brancosAmarelos),
            this.convertToPercentage(dataGraph2[1].demograficas.raca.pardosIndigenas),
            this.convertToPercentage(dataGraph2[1].demograficas.raca.pretos)
          ]
        },
        {
          label: 'BR',
          values: [
            this.convertToPercentage(dataGraph2[0].demograficas.raca.brancosAmarelos),
            this.convertToPercentage(dataGraph2[0].demograficas.raca.pardosIndigenas),
            this.convertToPercentage(dataGraph2[0].demograficas.raca.pretos)
          ]
        }]
    };

    this.generateGroupedHorizontalBarChart(groupChartDataGraph, containerDiv);
    // this.generateGroupedVerticalBarChart(groupChartDataGraph, containerDiv);

  }

  convertToPercentage (value: number) {
    return parseFloat((value * 100).toFixed(2));
  }

  generateVerticalBarChart(dataGraph: {variableName: string; variableValue: number; }[], containerDiv: ElementRef) {
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
    const xDomain = dataGraph.map(d => d.variableName);
    // console.log('xDomain:', xDomain);
    const yDomain = [0, d3.max(dataGraph, function(d) {return d.variableValue; })];

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
      .data(dataGraph)
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

  generateHorizontalBarChart(dataGraph: any[], containerDiv: ElementRef, maxValueInDomainX: number) {
    /*const percentage_data = [];
    // Pass the values to percentages
    this.ocupationalStructureByAPData.forEach(function(d, i) {
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

    // To order according to variable value
    // dataGraph.sort(function(a, b) { return a.variableValue - b.variableValue; });
    // const maxValue = d3.max(dataGraph, function(d) {return d.variableValue; } );
    x.domain([0, maxValueInDomainX]);
    y.domain(dataGraph.map(d => d.variableName )).padding(0.1);

    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      // .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));
      .call(d3.axisBottom(x).ticks(5));

    g.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    g.selectAll('.bar')
      .data(dataGraph)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('y', function(d) { return y(d.variableName); })
      .attr('width', function(d) { return x(d.variableValue); })
      .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d.variableName) + '<br>' + (d.variableValue) + '%');
      })
      .on('mouseout', function(d) { tooltip.style('display', 'none'); });


  }

  generateGroupedHorizontalBarChart(dataGraph: any, containerDiv: ElementRef ) {
    // Define chart dimensions
    const chartWidth       = 190,
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
    const color = d3.scaleOrdinal(['#0E3D59', '#88A61B', '#F29F05', '#FA6F1E', '#D92525']);
    const chartHeight = barHeight * zippedData.length + gapBetweenGroups * dataGraph.labels.length;

    const x = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth - 18]);

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

    const tooltip = d3.select('body').append('div').attr('class', 'toolTip');

    // Create bars
    const bar = chart.selectAll('g')
      .data(zippedData)
      .enter().append('g')
      .attr('transform', function(d, i) {
        return 'translate(' + spaceForLabels + ',' +
          (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / dataGraph.series.length))) + ')';
      })
      .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html(d + '%');
      })
      .on('mouseout', function(d) { tooltip.style('display', 'none'); });

    // Create rectangles of the correct width
    bar.append('rect')
      .attr('fill', function(d, i) { return color((i % dataGraph.series.length).toString()); })
      .attr('class', 'barRect')
      .attr('width', x)
      .attr('height', barHeight - 1);

    // Add text label in bar
    bar.append('text')
      .attr('x', function(d) { return x(d) + 37; })
      .attr('y', barHeight / 2)
      // .attr('fill', 'red')
      .attr('dy', '.35em')
      .text(function(d) { return d + '%'; });

    // Draw labels on y axis
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
        // console.log('d group bar: ', dataGraph.series[i].label);
        return dataGraph.series[i].label;
        // d.label;
      });
  }

  generatePieGraph(dataGraph: {variableName: string; variableValue: number; }[],
                   containerDiv: ElementRef, panelWidth: number, panelHeight: number) {
    // Define chart dimensions
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = panelWidth - margin.left - margin.right;
    const height = panelHeight - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    // console.log('todo el dato', dataGraph);

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    // Define SVG
    const svg = d3.select(containerDiv.nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background-color', '#ffffff'),
      g = svg.append('g').attr('transform', 'translate(' + (width + margin.left + margin.right) / 2 + ','
        + (height + margin.top + margin.bottom) / 2 + ')');

    // Define the slices color
    // ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854']);
    const color = d3.scaleOrdinal(['#88A61B', '#F29F05', '#FA6F1E', '#0E3D59', '#D92525']);

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

    // console.log(pie(dataGraph.map(d => d.variableValue)));

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
    // console.log('data table: ', dataGraph);

    dataGraph.forEach(function(d, i) {
      // now we add another data object value, a calculated value.
      d.apPerc = i === 1 ? d.ap.toFixed(2)  : (d.ap * 100).toFixed(2) + '%';
      d.municipioPerc = i === 1 ? d.municipio.toFixed(2)  : (d.municipio * 100).toFixed(2) + '%';
      d.metropolePerc = i === 1 ? d.metropole.toFixed(2)  : (d.metropole * 100).toFixed(2) + '%';
      d.ufPerc = i === 1 ? d.uf.toFixed(2)  : (d.uf * 100).toFixed(2) + '%';
      d.brPerc = i === 1 ? d.br.toFixed(2)  : (d.br * 100).toFixed(2) + '%';
      bmw_data.push([d.model, d.apPerc, d.municipioPerc, d.metropolePerc, d.ufPerc, d.brPerc]);
    });

    // console.log(dataGraph);
    // console.log('bmw_data:', bmw_data);

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

  generateAgePyramid(dataGraph: any[],
                     population: number, homensPopPerc: number, containerDiv: ElementRef) {

    // update x scales
    // SET UP DIMENSIONS
    const w = 330,
      h = 340,
      cx = w / 2;

    // margin.middle is distance from center line to each y-axis
    const margin = {
      top: 20,
      right: 10,
      bottom: 24,
      left: 10,
      middle: 28
    };
    const legendHeight  = 50;

    // the width of each side of the chart
    const regionWidth = w / 2 - margin.middle;

    // these are the x-coordinates of the y-axes
    const pointA = regionWidth,
      pointB = w - regionWidth;

    // GET THE TOTAL POPULATION SIZE AND CREATE A FUNCTION FOR RETURNING THE PERCENTAGE
    /*const totalPopulation = d3.sum(dataGraph, function(d) { return d.male + d.female; });
    const percentage = function(d) { return d / totalPopulation; };*/

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');
    // CREATE SVG
    const svg = d3.select(containerDiv.nativeElement).append('svg')
      .attr('width', margin.left + w + margin.right)
      .attr('height', margin.top + h + margin.bottom + legendHeight);

    // ------ Female and Males lengend -------------
    function uptext ( root, lines ) {
      lines = this.selectAll( 'tspan' ).data( this.datum() );
      lines.text( d => d );
      lines.exit().remove();
      lines.enter().append( 'tspan' )
        .attr( 'x', 0 )
        .attr( 'dy', (d, i) => ( i * 1.2 ) + 'em' )
        .text( d => d );
      return this;
    }

    const formatter = d3.format( ',d' );

    const svg_text_total = svg.append( 'text' )
      .attr( 'transform', 'translate(' + (cx + 14) + ',' + margin.top + ')' )
      .style( 'font', '14px sans-serif' )
      .attr( 'text-anchor', 'middle' );

    const svg_text_m = svg.append( 'text' )
      .attr( 'transform', 'translate(' + 10 + ',' + margin.top + ')' )
      .style( 'font', '12px sans-serif' )
      .attr( 'text-anchor', 'start' );

    const svg_text_f = svg.append( 'text' )
      .attr( 'transform', 'translate(' + 2 * cx + ',' + margin.top + ')' )
      .style( 'font', '12px sans-serif' )
      .attr( 'text-anchor', 'end' );

    const m_total = homensPopPerc * population;
    const homensPopPercFormatted = this.convertToPercentage(homensPopPerc);

    svg_text_total.selectAll('tspan')
      .data([ 'População', formatter(population) ])
      .enter().append('tspan')
      .attr( 'x', 0 )
      .attr( 'y', (d, i) => ( i * 1.2 ) + 'em' )
      .text(d => d);

    svg_text_m.selectAll('tspan')
      .data([ 'Homens', formatter(m_total) , homensPopPercFormatted.toFixed(2) + '%'])
      .enter().append('tspan')
      .attr( 'x', 0 )
      .attr( 'y', (d, i) => ( i * 1.2 ) + 'em' )
      .text(d => d);

    svg_text_f.selectAll('tspan')
      .data([ 'Mulheres', formatter( population - m_total ), (100 - homensPopPercFormatted).toFixed(2) + '%' ])
      .enter().append('tspan')
      .attr( 'x', 0 )
      .attr( 'y', (d, i) => ( i * 1.2 ) + 'em' )
      .text(d => d);

    // TOOLTIP
    const tooltip = d3.select('body').append('div').attr('class', 'toolTip');

    // ----------------------
    // ADD A GROUP FOR THE SPACE WITHIN THE MARGINS
    const chart = svg.append('g')
      .attr('transform', translation(margin.left, legendHeight));

    // find the maximum data value on either side
    //  since this will be shared by both of the x-axes
    /*const maxValue = Math.max(
      d3.max(dataGraph, function(d) { return percentage(d.male); }),
      d3.max(dataGraph, function(d) { return percentage(d.female); })
    );*/

    const maxValue = Math.max(
      d3.max(dataGraph, function(d) { return d.maleperc; }),
      d3.max(dataGraph, function(d) { return d.femaleperc; })
    );

    // SET UP SCALES
    // the xScale goes from 0 to the width of a region
    //  it will be reversed for the left x-axis
    const xScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, regionWidth])
      .nice();

    const yScale = d3.scaleBand()
      .rangeRound([h, 0])
      .padding(0.1)
      .domain(dataGraph.map(function(d) { return d.group; }));

    // SET UP AXES
    const yAxisLeft = d3.axisRight(yScale)
    // .tickSize(4)
      .tickPadding(margin.middle - 4);

    const yAxisRight = d3.axisLeft(yScale)
    // .tickSize(4) ;
      .tickFormat(function(d) {return ''; });

    const xAxisRight = d3.axisBottom(xScale)
      .ticks(4)
      .tickFormat(function(d) {return (<any>d).toFixed(0) + '%'; });

    const xAxisLeft = d3.axisBottom(xScale.copy().range([pointA, 0]))
    // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
      .tickFormat(function(d) {return (<any>d).toFixed(0) + '%'; })
      .ticks(4);

    // MAKE GROUPS FOR EACH SIDE OF CHART
    // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
    const leftBarGroup = chart.append('g')
      .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
    const rightBarGroup = chart.append('g')
      .attr('transform', translation(pointB,  0));

    // DRAW AXES
    chart.append('g')
      .attr('class', 'axis y left')
      .attr('transform', translation(pointA, 0))
      .call(yAxisLeft)
      .selectAll('text')
      .style('text-anchor', 'middle');

    chart.append('g')
      .attr('class', 'axis y right')
      .attr('transform', translation(pointB, 0))
      .call(yAxisRight);

    chart.append('g')
      .attr('class', 'axis x left')
      .attr('transform', translation(0, h))
      .call(xAxisLeft);

    chart.append('g')
      .attr('class', 'axis x right')
      .attr('transform', translation(pointB, h))
      .call(xAxisRight);
    // .attr('class', 'labelsAxis');

    // DRAW BARS
    leftBarGroup.selectAll('.barPyramid.left')
      .data(dataGraph)
      .enter().append('rect')
      .attr('class', 'barPyramid left')
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.group); })
      .attr('width', function(d) { return xScale(d.maleperc); })
      .attr('height', yScale.bandwidth())
      .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html(d.group + '<br>' + d.maleperc + '%');
      })
      .on('mouseout', function(d) { tooltip.style('display', 'none'); });

    rightBarGroup.selectAll('.barPyramid.right')
      .data(dataGraph)
      .enter().append('rect')
      .attr('class', 'barPyramid right')
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.group); })
      .attr('width', function(d) { return xScale(d.femaleperc); })
      .attr('height', yScale.bandwidth())
      .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html(d.group + '<br>' +  d.femaleperc + '%');
      })
      .on('mouseout', function(d) { tooltip.style('display', 'none'); });


    // so sick of string concatenation for translations
    function translation(x, y) {
      return 'translate(' + x + ',' + y + ')';
    }

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
