import {
  Component, EventEmitter, Output, OnInit, OnDestroy, ViewChild, ViewEncapsulation,
  ElementRef, AfterViewInit, Renderer2
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ShareddataService} from '../../../services/shareddata.service';
import {ApSecVariableService} from '../../../services/ap-sec-variable.service';
import {BrSpRmspSecVariableService} from '../../../services/br-sp-rmsp-sec-variable.service';
import * as d3 from 'd3';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-indicators-by-weighting-areas',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './indicators-by-weighting-areas.component.html',
  styleUrls: ['./indicators-by-weighting-areas.component.css']
})
export class IndicatorsByWeightingAreasComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onSecInformations = new EventEmitter<any>();
  PANELNAME = 'Informação sobre a vizinhança da Escola';
  // Geral Information about a CODAP
  CODAP = '';
  GINI = 0;
  OCUP: any;

  categories: any[] = [
    {
      id: 0,
      name: 'caracSes',
      group: 'cat1',
      visible: false,
      graphics: 2
    },
    {
      id: 1,
      name: 'caracEdu',
      group: 'cat2',
      visible: false,
      graphics: 2
    },
    {
      id: 2,
      name: 'caracEduPopulacao',
      group: 'cat3',
      visible: false,
      graphics: 3
    },
    {
      id: 3,
      name: 'caracDemo',
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

  @ViewChild('profEduAlfabByAPGraph')
  private div_profEduAlfabByAPGraph: ElementRef;

  @ViewChild('profEduAlfabByMetropoleGraph')
  private div_profEduAlfabByMetropoleGraph: ElementRef;

  @ViewChild('profEduAlfabByUFGraph')
  private div_profEduAlfabByUFGraph: ElementRef;

  @ViewChild('profEduAlfabByBrasilGraph')
  private div_profEduAlfabByBrasilGraph: ElementRef;

  @ViewChild('profEduRealizacaoByAPGraph')
  private div_profEduRealizacaoByAPGraph: ElementRef;

  @ViewChild('profEduRealizacaoByMetropoleGraph')
  private div_profEduRealizacaoByMetropoleGraph: ElementRef;

  @ViewChild('profEduRealizacaoByUFGraph')
  private div_profEduRealizacaoByUFGraph: ElementRef;

  @ViewChild('profEduRealizacaoByBrasilGraph')
  private div_profEduRealizacaoByBrasilGraph: ElementRef;

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

  private margin = {top: 15, right: 20, bottom: 20, left: 20};
  private width = 315;
  private height = 300;

  // ----------------
  private subscription = new Subscription();

  constructor(private weightingAreaSecInfoService: ApSecVariableService,
              private brSpRmspSecInfoService: BrSpRmspSecVariableService,
              private sharedDataService: ShareddataService,
              private translate: TranslateService) {
    // this.buildDropDownList();
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
          this.CODAP = this.weightingAreaInfo.codap;
          this.OCUP = this.weightingAreaInfo.ses.ocup;

          // Get all the information about BR-SP-RMSP socioeconomic variables
          this.brSpRmspSecInfoService.getBrSpRmspSecInfo().then((res2) => {
            this.brSpRmspSecInfo = res2;

            // Tabela socieconômica
            const dataSesAp = this.weightingAreaInfo['ses'];
            const dataSesRMSP = this.brSpRmspSecInfo[2]['ses'];
            const dataSesBr = this.brSpRmspSecInfo[1]['ses'];
            const dataSesSP = this.brSpRmspSecInfo[0]['ses'];
            const dataComparativeTable = this.buildDataForComparativeTable(dataSesAp, dataSesRMSP, dataSesSP, dataSesBr);
            this.generateTableGraph(dataComparativeTable, this.div_comparativeTableGraph);

            // Estrutura ocupacional
            const dataForOcupAp = this.getPropertiesNamesAndValuesForNumbers(dataSesAp['ocup']);
            this.generateHorizontalBarChart(dataForOcupAp, this.div_occupationalStructureByAPGraph, 50,
              this.width, this.height, {top: 15, right: 20, bottom: 20, left: 120});

            const dataForOcupRmsp = this.getPropertiesNamesAndValuesForNumbers(dataSesRMSP['ocup']);
            this.generateHorizontalBarChart(dataForOcupRmsp, this.div_occupationalStructureByMetropoleGraph, 50,
              this.width, this.height, {top: 15, right: 20, bottom: 20, left: 120});

            const dataForOcupBr = this.getPropertiesNamesAndValuesForNumbers(dataSesBr['ocup']);
            this.generateHorizontalBarChart(dataForOcupBr, this.div_occupationalStructureByBrasilGraph, 50,
              this.width, this.height, {top: 15, right: 20, bottom: 20, left: 120});

            const dataForOcupSP = this.getPropertiesNamesAndValuesForNumbers(dataSesSP['ocup']);
            this.generateHorizontalBarChart(dataForOcupSP, this.div_occupationalStructureByUFGraph, 50,
              this.width, this.height,  {top: 15, right: 20, bottom: 20, left: 120});

            // Perfil Educacional - alfabetização
            const panelWidth = 170; // 335
            const panelHeight = this.height / 2; // 300
            const dataForAlfaAp = this.buildDataForProfileEducationalGraph(this.weightingAreaInfo);
            this.generatePieGraph(dataForAlfaAp, this.div_profEduAlfabByAPGraph, panelWidth, panelHeight);
            const dataForAlfaApRMSP = this.buildDataForProfileEducationalGraph(this.brSpRmspSecInfo[2]);
            this.generatePieGraph(dataForAlfaApRMSP, this.div_profEduAlfabByMetropoleGraph, panelWidth, panelHeight);
            const dataForAlfaBr = this.buildDataForProfileEducationalGraph(this.brSpRmspSecInfo[1]);
            this.generatePieGraph(dataForAlfaBr, this.div_profEduAlfabByBrasilGraph, panelWidth, panelHeight);
            const dataForAlfaSP = this.buildDataForProfileEducationalGraph(this.brSpRmspSecInfo[0]);
            this.generatePieGraph(dataForAlfaSP, this.div_profEduAlfabByUFGraph, panelWidth, panelHeight);

            // Perfil Educacional - Realizacao
            const dataEduAp = this.weightingAreaInfo['educacao'];
            const dataEduRMSP = this.brSpRmspSecInfo[2]['educacao'];
            const dataEduBr = this.brSpRmspSecInfo[1]['educacao'];
            const dataEduSP = this.brSpRmspSecInfo[0]['educacao'];
            const dataForRealizacaoAp = this.getPropertiesNamesAndValuesForNumbers(dataEduAp['realizacao']);
            this.generateVerticalBarChart(dataForRealizacaoAp, this.div_profEduRealizacaoByAPGraph,
              this.width, this.height, {top: 15, right: 20, bottom: 110, left: 20});

            const dataForRealizacaoRMSP = this.getPropertiesNamesAndValuesForNumbers(dataEduRMSP['realizacao']);
            this.generateVerticalBarChart(dataForRealizacaoRMSP, this.div_profEduRealizacaoByMetropoleGraph,
              this.width, this.height, {top: 15, right: 20, bottom: 110, left: 20});

            const dataForRealizacaoBr = this.getPropertiesNamesAndValuesForNumbers(dataEduBr['realizacao']);
            this.generateVerticalBarChart(dataForRealizacaoBr, this.div_profEduRealizacaoByUFGraph,
              this.width, this.height, {top: 15, right: 20, bottom: 110, left: 20});

            const dataForRealizacaoSp = this.getPropertiesNamesAndValuesForNumbers(dataEduSP['realizacao']);
            this.generateVerticalBarChart(dataForRealizacaoSp, this.div_profEduRealizacaoByBrasilGraph,
              this.width, this.height, {top: 15, right: 20, bottom: 110, left: 20});

            // Aqui falta revisar

            this.buildDataForLiteracyGraph();

            this.buildDataForScholarFrequencyGraph();

            this.buildDataForEducationalLevelGraph(this.weightingAreaInfo, this.div_educationalLevelByAPGraph);
            this.buildDataForEducationalLevelGraph(this.brSpRmspSecInfo[2], this.div_educationalLevelByMetropoleGraph);
            this.buildDataForEducationalLevelGraph(this.brSpRmspSecInfo[0], this.div_educationalLevelByUFGraph);
            this.buildDataForEducationalLevelGraph(this.brSpRmspSecInfo[1], this.div_educationalLevelByBrasilGraph);

            this.buildDataForAgePyramidGraph(this.weightingAreaInfo, this.div_agePyramidByAPGraph);
            this.buildDataForAgePyramidGraph(this.brSpRmspSecInfo[2], this.div_agePyramidByMetropoleGraph);
            this.buildDataForAgePyramidGraph(this.brSpRmspSecInfo[0], this.div_agePyramidByUFGraph);
            this.buildDataForAgePyramidGraph(this.brSpRmspSecInfo[1], this.div_agePyramidByBrasilGraph);

            this.buildDataForRacialDistributionGraph(this.weightingAreaInfo, this.brSpRmspSecInfo, this.div_racialDistributionGraph);

          });

        });

      });
    this.subscription.add(s);
  }

  ngAfterViewInit() {

  }

  buildDataForComparativeTable(dataAp: any, dataRMSP: any, dataSP: any, dataBr: any) {
    // Graph 1: Comparative table. Data for Metropole, UF, and BR
    const dataComparativeTable = [];
    let jsonData = {};

    jsonData = {model: '%Pobres', ap: dataAp['perc_poor'], metropole: dataSP['perc_poor'],
      uf: dataRMSP['perc_poor'], br: dataBr['perc_poor']};
    dataComparativeTable.push(jsonData);

    jsonData = {model: 'Renda per Capita', ap: dataAp['renda_dom_per_cap_media'], metropole: dataSP['renda_dom_per_cap_media'],
      uf: dataRMSP['renda_dom_per_cap_media'], br: dataBr['renda_dom_per_cap_media']};
    dataComparativeTable.push(jsonData);

    jsonData = {model: 'GINI', ap: dataAp['gini'], metropole: dataSP['gini'],
      uf: dataRMSP['gini'], br: dataBr['gini']};
    dataComparativeTable.push(jsonData);

    return dataComparativeTable;
  }

  buildDataForProfileEducationalGraph(data: any) {
    const dataCircle = [
      { variableName: this.getInstant('alfabetizados'), variableValue: this.convertToPercentage(data['educacao']['alfabetizacao'])},
      { variableName: this.getInstant('naoAlfabetizados'), variableValue: this.convertToPercentage(1 - data['educacao']['alfabetizacao'])}
    ];
    return dataCircle;
  }

  buildDataForLiteracyGraph() {
    const groupChartDataForLiteracyGraph = {
      labels: [
        this.getInstant('6-10'), this.getInstant('11-14'), this.getInstant('15-17')
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
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range6to10.alfabetizacao),
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range11to14.alfabetizacao),
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range15to17.alfabetizacao)
          ]
        },
        {
          label: 'BR',
          values: [
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range6to10.alfabetizacao),
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range11to14.alfabetizacao),
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range15to17.alfabetizacao)
          ]
        }]
    };

    this.generateGroupedHorizontalBarChart(groupChartDataForLiteracyGraph, this.div_literacyGraph);
  }

  buildDataForScholarFrequencyGraph() {
    const groupChartDataForScholarFrequencyGraph = {
      labels: [
        this.getInstant('6-10'), this.getInstant('11-14'), this.getInstant('15-17')
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
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range6to10.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range11to14.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[0].educacao.idadeEscolar.range15to17.frequentaEscola)
          ]
        },
        {
          label: 'BR',
          values: [
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range6to10.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range11to14.frequentaEscola),
            this.convertToPercentage(this.brSpRmspSecInfo[1].educacao.idadeEscolar.range15to17.frequentaEscola)
          ]
        }]
    };

    this.generateGroupedHorizontalBarChart(groupChartDataForScholarFrequencyGraph, this.div_scholarFrequencyGraph);

  }

  buildDataForEducationalLevelGraph(data: any, containerDiv: ElementRef) {
    const groupChartDataForEducationalLevelGraph = {
      labels: [
        this.getInstant('6-10'), this.getInstant('11-14'), this.getInstant('15-17')
      ],
      series: [
        {
          label: this.getInstant('abrevFundamental'),
          values: [
            this.convertToPercentage(data.educacao.idadeEscolar.range6to10.frequentaFundamental),
            this.convertToPercentage(data.educacao.idadeEscolar.range11to14.frequentaFundamental),
            this.convertToPercentage(data.educacao.idadeEscolar.range15to17.frequentaFundamental)
          ]
        },
        {
          label: this.getInstant('abrevMedio'),
          values: [
            this.convertToPercentage(data.educacao.idadeEscolar.range6to10.frequentaMedio),
            this.convertToPercentage(data.educacao.idadeEscolar.range11to14.frequentaMedio),
            this.convertToPercentage(data.educacao.idadeEscolar.range15to17.frequentaMedio)
          ]
        },
        {
          label: this.getInstant('abrevOutro'),
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
        this.getInstant('brancosAmarelos'), this.getInstant('pardosIndigenas'), this.getInstant('pretos')
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
            this.convertToPercentage(dataGraph2[0].demograficas.raca.brancosAmarelos),
            this.convertToPercentage(dataGraph2[0].demograficas.raca.pardosIndigenas),
            this.convertToPercentage(dataGraph2[0].demograficas.raca.pretos)
          ]
        },
        {
          label: 'BR',
          values: [
            this.convertToPercentage(dataGraph2[1].demograficas.raca.brancosAmarelos),
            this.convertToPercentage(dataGraph2[1].demograficas.raca.pardosIndigenas),
            this.convertToPercentage(dataGraph2[1].demograficas.raca.pretos)
          ]
        }]
    };

    this.generateGroupedHorizontalBarChart(groupChartDataGraph, containerDiv);
    // this.generateGroupedVerticalBarChart(groupChartDataGraph, containerDiv);

  }

  /**
   * Function para convert  a number to percentage
   * @param {number} value
   * @returns {number}
   */
  convertToPercentage (value: number) {
    return parseFloat((value * 100).toFixed(2));
  }

  /**
   * Function to build a table
   * @param dataGraph
   * @param {ElementRef} containerDiv
   */
  generateTableGraph(dataGraph: any, containerDiv: ElementRef ) {
    const bmw_data = [];

    dataGraph.forEach(function(d, i) {
      // now we add another data object value, a calculated value.
      d.apPerc = i === 1 ? d.ap.toFixed(2)  : (d.ap * 100).toFixed(2) + '%';
      d.metropolePerc = i === 1 ? d.metropole.toFixed(2)  : (d.metropole * 100).toFixed(2) + '%';
      d.ufPerc = i === 1 ? d.uf.toFixed(2)  : (d.uf * 100).toFixed(2) + '%';
      d.brPerc = i === 1 ? d.br.toFixed(2)  : (d.br * 100).toFixed(2) + '%';
      bmw_data.push([d.model, d.apPerc, d.metropolePerc, d.ufPerc, d.brPerc]);
    });

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    const table = d3.select(containerDiv.nativeElement).append('table');
    const thead = table.append('thead').append('tr');
    const tbody = table.append('tbody');

    thead
      .selectAll('th')
      .data(['Cat.', 'AP', 'RMSP', 'UF', 'Br'])
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

  /**
   * Function to build a horizontal bar chart
   * @param {any[]} dataGraph
   * @param {ElementRef} containerDiv
   * @param {number} maxValueInDomainX
   * @param {number} divWidth
   * @param {number} divHeight
   * @param margin
   */

  generateHorizontalBarChart(dataGraph: any[], containerDiv: ElementRef, maxValueInDomainX: number,
                             divWidth: number = this.width, divHeight: number = this.height, margin: any = this.margin) {
    // Define chart dimensions
    // const margin = {top: 20, right: 20, bottom: 30, left: 80};
    const width = divWidth - margin.left - margin.right;
    const height = divHeight - margin.top - margin.bottom;

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');

    // Define chart dimensions
    const svg = d3.select(containerDiv.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

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

  /**
   * Function to create a vertical bar chart
   * @param {any[]} dataGraph
   * @param {ElementRef} containerDiv
   * @param {number} divWidth
   * @param {number} divHeight
   * @param margin
   */
  generateVerticalBarChart(dataGraph: any[], containerDiv: ElementRef,
                           divWidth: number = this.width, divHeight: number = this.height, margin: any = this.margin) {
    // Define chart dimensions
    // const margin = {top: 15, right: 20, bottom: 100, left: 20};
    const width = divWidth - margin.left - margin.right;
    const height = divHeight - margin.top - margin.bottom;

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');
    if (dataGraph.length > 0) {

      // Define chart dimensions
      // let svg = d3.select(this.element.nativeElement).append('svg')
      const svg = d3.select(containerDiv.nativeElement).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
      // .style('background-color', '#efefef');

      const tooltip = d3.select('body').append('div').attr('class', 'toolTip');

      // Define chart plot area
      const chart = svg.append('g')
        .attr('class', 'bar')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Define domain data for X & Y axes from the data array
      const xDomain = dataGraph.map(d => d.variableName);
      // console.log('xDomain:', xDomain);
      const yDomain = [0, d3.max(dataGraph, function (d) {
        return d.variableValue;
      })];

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
        .attr('transform', 'translate(' + margin.left + ',' + 0 + ')')
        .call(d3.axisLeft(y));

      // Plotting the chart
      chart.selectAll('bar')
        .data(dataGraph)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) {
          return margin.left + x(d.variableName);
        })
        .attr('width', x.bandwidth)
        .attr('y', function (d) {
          return y(d.variableValue);
        })
        .attr('height', function (d) {
          return height - y(d.variableValue);
        })
        .on('mousemove', function (d) {
          tooltip
            .style('left', d3.event.pageX - 50 + 'px')
            .style('top', d3.event.pageY - 70 + 'px')
            .style('display', 'inline-block')
            .html((d.variableName) + '<br>' + (d.variableValue) + '%');
        })
        .on('mouseout', function (d) {
          tooltip.style('display', 'none');
        });
    }
  }

  generateGroupedHorizontalBarChart(dataGraph: any, containerDiv: ElementRef ) {
    // Define chart dimensions
    const chartWidth       = 190,
      barHeight        = 20,
      groupHeight      = barHeight * dataGraph.series.length,
      gapBetweenGroups = 20,
      spaceForLabels   = 60, // 150
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
      })
      .call(this.wrap, spaceForLabels);

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

  wrap(text, width) {
    text.each(function() {
      const text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        lineHeight = 1.1, // ems
        y = text.attr('y'),
        x = text.attr('x'),
        dy = parseFloat(text.attr('dy')),
        factor = 7.5;

      let word;
      let line = [];
      let lineNumber = 0;
      let tspan = text.text(null).append('tspan')
        .attr('x', x).attr('y', y).attr('dy', dy + 'em');
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        const node: SVGTSpanElement = <SVGTSpanElement>tspan.node();
        if (tspan.text().length * factor > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan')
            .attr('x', x).attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);
        }
      }
    });
  }

  /*wrap(text, width) {
    text.each(function() {
      const text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr('y'),
        dy = parseFloat(text.attr('dy')),
        tspan = text.text(null).append('tspan').attr('x', -100).attr('y', y).attr('dy', dy + 'em');
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', -100).attr('y', y).attr('dy', `${++lineNumber * lineHeight + dy}em`).text(word);
        }
      }
    });
  }*/

  generatePieGraph(dataGraph: any[],
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
        .append('g');
        /*.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background-color', '#ffffff'),
      g = svg.append('g').attr('transform', 'translate(' + (width + margin.left + margin.right) / 2 + ','
        + (height + margin.top + margin.bottom) / 2 + ')');*/

    svg.append('g')
      .attr('class', 'slices');
    svg.append('g')
      .attr('class', 'labelName');
    svg.append('g')
      .attr('class', 'labelValue');
    svg.append('g')
      .attr('class', 'lines');

    const pie = d3.pie()
      .sort(null)
      .value(function(d) {
        console.log('ddd pie:', d);
        const dataTemp = <any>d;
        return dataTemp.variableValue;
      });

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius * 0.8);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const legendRectSize = radius * 0.05;
    const legendSpacing = radius * 0.02;

    const div = d3.select('body').append('div').attr('class', 'toolTip');

    svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Define the slices color
    const colorRange = d3.scaleOrdinal(d3.schemeCategory10);
    const color = d3.scaleOrdinal(colorRange.range());
    // const color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
    console.log(color);

    /* ------- PIE SLICES -------*/
    const slice = svg.select('.slices').selectAll('path.slice')
      .data(pie(dataGraph), function(d) {
        // console.log('d slices pie:', d);
        const dataTemp = <any>d;
        return dataTemp.data.variableName;
      });

    slice.enter()
      .insert('path')
      .style('fill', function(d) {
        const dataTemp = <any>d;
        // console.log('data color:', dataTemp);
        return color(dataTemp.data.variableName);
      })
      .attr('d', <any>arc)
      .style('opacity', 0.7)
      .attr('class', 'slice');

    /*slice
      .transition().duration(1000)
      .attr('d', <any>arc);
      .attrTween('d', function(d) {
        this._current = this._current || <any>d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });*/

    slice
      .on('mousemove', function(d) {
        div.style('left', d3.event.pageX + 10 + 'px');
        div.style('top', d3.event.pageY - 25 + 'px');
        div.style('display', 'inline-block');
        div.html(((<any>d).data.variableName) + '<br>' + ((<any>d).data.variableValue) + '%');
      });

    slice
      .on('mouseout', function(d) {
        div.style('display', 'none');
      });

    slice.exit()
      .remove();

    /*
    // Center Legend
    const legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        const height = legendRectSize + legendSpacing;
        const offset =  height * color.domain().length / 2;
        const horz = -3 * legendRectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });*/

    /* ------- TEXT LABELS -------*/
    const text = svg.select('.labelName').selectAll('text')
      .data(pie(dataGraph), function(d) {
        const dataTemp = <any>d;
        return dataTemp.data.variableName;
      });

    text.enter()
      .append('text')
      .attr('dy', '.35em')
      .text(function(d) {
        const dataTemp = <any>d;
        return (dataTemp.data.variableName + ': ' + dataTemp.data.variableValue + '%');
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text
      /*.transition().duration(1000)
      .attrTween('transform', function(d) {
        console.log(d);
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return 'translate(' + pos + ')';
        };
      })
      .styleTween('text-anchor', function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? 'start' : 'end';
        };
      })*/
      .text(function(d) {
        const dataTemp = <any>d;
        return (dataTemp.data.label + ': ' + dataTemp.value + '%');
      });

    text.exit()
      .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/
    const polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(dataGraph), function(d){
        return (<any>d).data.variableName;
      });

    polyline.enter()
      .append('polyline');

  /*  polyline.transition().duration(1000)
      .attrTween('points', function(d){
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });*/

    polyline.exit()
      .remove();

  }

  generateAgePyramid(dataGraph: any[],
                     population: number, homensPopPerc: number, containerDiv: ElementRef) {

    // update x scales
    // SET UP DIMENSIONS
    const w = this.width,
      h = 340,
      cx = w / 2;

    // margin.middle is distance from center line to each y-axis
    const margin = {
      top: 20,
      right: 15,
      bottom: 0,
      left: 15,
      middle: 28
    };
    const legendHeight  = 50;

    // the width of each side of the chart
    const regionWidth = (w - margin.left - margin.right) / 2 - margin.middle;
    // these are the x-coordinates of the y-axes
    const pointA = regionWidth,
      pointB = w - margin.left - margin.right - regionWidth ;

    // GET THE TOTAL POPULATION SIZE AND CREATE A FUNCTION FOR RETURNING THE PERCENTAGE
    /*const totalPopulation = d3.sum(dataGraph, function(d) { return d.male + d.female; });
    const percentage = function(d) { return d / totalPopulation; };*/

    // Remove all children from HTML
    d3.select(containerDiv.nativeElement).html('');
    // CREATE SVG
    const svg = d3.select(containerDiv.nativeElement).append('svg')
      .attr('width', w)
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
      .attr( 'transform', 'translate(' + cx + ',' + margin.top + ')' )
      .style( 'font', '14px sans-serif' )
      .attr( 'text-anchor', 'middle' );

    const svg_text_m = svg.append( 'text' )
      .attr( 'transform', 'translate(' + 0 + ',' + margin.top + ')' )
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
   * Builds a array with documents (variableName and variableValue) properties
   * @param document
   * @returns {Array}
   */
  getPropertiesNamesAndValuesForNumbers(document: any) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    const data = [];
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof  document[prop[i]] === 'number' && document[prop[i]] !== 0) {
        const jsonData = {};
        jsonData['variableName'] = this.getInstant(prop[i]);
        jsonData['variableValue'] = this.convertToPercentage(document[prop[i]]);
        data.push(jsonData);
      }
    }
    return data;
  }

  /**
   * Get names and values for 'String' properties
   * @param document
   * @returns {Array}
   */
  getPropNamesAndValuesForStrings(document: any) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    const data = [];
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof  document[prop[i]] === 'string' && document[prop[i]] !== 'NA') {
        const jsonData = {};
        jsonData['variableName'] = this.getInstant(prop[i]);
        jsonData['variableValue'] = document[prop[i]];
        data.push(jsonData);
      }
    }
    return data;
  }

  /**
   * Returns the translation of a word
   * @param key
   * @returns {string | any}
   */
  getInstant(key) {
    return this.translate.instant(key);
    // return this.translate.get(key).subscribe(data => data)
  }

  /**
   * unsubscribe to ensure no memory leaks
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
