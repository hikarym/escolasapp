import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShareddataService} from '../../../../services/shareddata.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import {select} from 'd3-selection';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {

  schoolSelected: any;
  private subscription = new Subscription();

  @ViewChild('AFDNivelInfantilGraph')
  private div_AFDNivelInfantilGraph: ElementRef;
  groupsAFDInfantil: any;

  @ViewChild('DCSNivelInfantilGraph')
  private div_DCSNivelInfantilGraph: ElementRef;

  @ViewChild('horasAulaNivelInfantilGraph')
  private div_horasAulaNivelInfantilGraph: ElementRef;

  @ViewChild('alunosPorTurmaNivelInfantilGraph')
  private div_alunosPorTurmaNivelInfantilGraph: ElementRef;

  @ViewChild('AFDEnsFundAIniciaisGraph')
  private div_AFDEnsFundAIniciaisGraph: ElementRef;
  groupsAFDEnsFundAIniciais: any;

  @ViewChild('DCSEnsFundAIniciaisGraph')
  private div_DCSEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('horasAulaEnsFundAIniciaisGraph')
  private div_horasAulaEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('alunosPorTurmaEnsFundAIniciaisGraph')
  private div_alunosPorTurmaEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('EDEnsFundAIniciaisGraph')
  private div_EDEnsFundAIniciaisGraph: ElementRef;
  nivelesEDEnsFundAIniciais: any;

  @ViewChild('AFDEnsFundAFinaisGraph')
  private div_AFDEnsFundAFinaisGraph: ElementRef;
  groupsAFDEnsFundAFinais: any;

  @ViewChild('DCSEnsFundAFinaisGraph')
  private div_DCSEnsFundAFinaisGraph: ElementRef;

  @ViewChild('horasAulaEnsFundAFinaisGraph')
  private div_horasAulaEnsFundAFinaisGraph: ElementRef;

  @ViewChild('alunosPorTurmaEnsFundAFinaisGraph')
  private div_alunosPorTurmaEnsFundAFinaisGraph: ElementRef;

  @ViewChild('EDEnsFundAFinaisGraph')
  private div_EDEnsFundAFinaisGraph: ElementRef;
  nivelesEDEnsFundAFinais: any;

  @ViewChild('AFDEnsMedioGraph')
  private div_AFDEnsMedioGraph: ElementRef;
  groupsAFDEnsMedio: any;

  @ViewChild('DCSEnsMedioGraph')
  private div_DCSEnsMedioGraph: ElementRef;

  @ViewChild('horasAulaEnsMedioGraph')
  private div_horasAulaEnsMedioGraph: ElementRef;

  @ViewChild('alunosPorTurmaEnsMedioGraph')
  private div_alunosPorTurmaEnsMedioGraph: ElementRef;

  @ViewChild('EDEnsMedioGraph')
  private div_EDEnsMedioGraph: ElementRef;
  nivelesEDEnsMedio: any;

  private groupDefault = 'Grupo1';
  private nivelDefault = 'Nivel1';
  private margin = {top: 15, right: 20, bottom: 40, left: 20};
  private width = 297;
  private heigth = 250;

  // Indicadores, niveis, categorias
  private indicadores = ['AdequacaoFormacaoDocente', 'docentes', 'horasAula', 'AlunosPorTurma', 'EsforcoDocente'];
  private niveis = ['Infantil', 'Fundamental', 'Medio'];
  private categorias = ['AnosIniciais', 'AnosFinais', 'AnosIniciais8', 'AnosFinais8', 'AnosIniciais9', 'AnosFinais9'];

  constructor(private sharedDataService: ShareddataService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolInformation().subscribe(
      res => {
        this.schoolSelected = res;

        // --- 1. Ensino Infantil
        // AFD
        const dadosAFDInfantil = this.getDadosDoIndicador(this.indicadores[0], this.niveis[0], '');
        this.groupsAFDInfantil = Object.keys(dadosAFDInfantil);
        this.showGraphForAFD(this.indicadores[0], this.niveis[0], '', this.groupDefault, this.div_AFDNivelInfantilGraph);

        // DCS - cursoSuperior
        const dadosDCSNivelInfantil = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[0]];
        this.showGraphWithVerticalBar(dadosDCSNivelInfantil, this.div_DCSNivelInfantilGraph, '#box-DCSNivelInfantil');

        // horasAula - Infantil
        const dadosHorasAulaNivelInfantil = this.schoolSelected[this.indicadores[2]][this.niveis[0]];
        this.showGraphWithVerticalBar(dadosHorasAulaNivelInfantil, this.div_horasAulaNivelInfantilGraph, '#box-horasAulaNivelInfantil');

        // alunosPorTurma - Infantil
        const dadosAlunosPorTurmaNivelInfantil = this.schoolSelected[this.indicadores[3]][this.niveis[0]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaNivelInfantil, this.div_alunosPorTurmaNivelInfantilGraph,
          '#box-alunosPorTurmaNivelInfantil');

        // --- 2. Ensino Fundamental
        // ----- Anos Iniciais -----
        // AFD
        const dadosAFDEnsFundAIniciais = this.getDadosDoIndicador(this.indicadores[0], this.niveis[1], this.categorias[0]);
        this.groupsAFDEnsFundAIniciais = Object.keys(dadosAFDEnsFundAIniciais);
        this.showGraphForAFD(this.indicadores[0], this.niveis[1], this.categorias[0], this.groupDefault, this.div_AFDEnsFundAIniciaisGraph);

        // DCS - cursoSuperior
        const dadosDCSEnsFundAIniciais = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[1]];
        this.showGraphWithVerticalBar(dadosDCSEnsFundAIniciais, this.div_DCSEnsFundAIniciaisGraph, '#box-DCSEnsFundAIniciais');

        // horasAula ------ falta 9a
        const dadosHorasAulaEnsFundAIniciais = this.schoolSelected[this.indicadores[2]][this.niveis[1]][this.categorias[2]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsFundAIniciais, this.div_horasAulaEnsFundAIniciaisGraph,
          '#box-horasAulaEnsFundAIniciais');

        // alunosPorTurma ------ falta 9a
        const dadosAlunosPorTurmaEnsFundAIniciais = this.schoolSelected[this.indicadores[3]][this.niveis[1]][this.categorias[2]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsFundAIniciais, this.div_alunosPorTurmaEnsFundAIniciaisGraph,
          '#box-alunosPorTurmaEnsFundAIniciais');

        // EsforcoDocente
        const dadosEDEnsFundAIniciais = this.getDadosDoIndicador(this.indicadores[4], this.niveis[1], this.categorias[0]);
        this.nivelesEDEnsFundAIniciais = Object.keys(dadosEDEnsFundAIniciais);
        this.showGraphForAFD(this.indicadores[4], this.niveis[1], this.categorias[0], this.nivelDefault, this.div_EDEnsFundAIniciaisGraph);

        // ----- Anos Finais -----
        // AFD
        const dadosAFDEnsFundAFinais = this.getDadosDoIndicador(this.indicadores[0], this.niveis[1], this.categorias[1]);
        this.groupsAFDEnsFundAFinais = Object.keys(dadosAFDEnsFundAFinais);
        this.showGraphForAFD(this.indicadores[0], this.niveis[1], this.categorias[1], this.groupDefault, this.div_AFDEnsFundAFinaisGraph);

        // DCS - cursoSuperior
        const dadosDCSEnsFundAFinais = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[1]];
        this.showGraphWithVerticalBar(dadosDCSEnsFundAFinais, this.div_DCSEnsFundAFinaisGraph,
          '#box-DCSEnsFundAFinais');

        // horasAula ------ falta 9a
        const dadosHorasAulaEnsFundAFinais = this.schoolSelected[this.indicadores[2]][this.niveis[1]][this.categorias[3]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsFundAFinais, this.div_horasAulaEnsFundAFinaisGraph,
          '#box-horasAulaEnsFundAFinais');

        // alunosPorTurma ------ falta 9a
        const dadosAlunosPorTurmaEnsFundAFinais = this.schoolSelected[this.indicadores[3]][this.niveis[1]][this.categorias[3]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsFundAFinais, this.div_alunosPorTurmaEnsFundAFinaisGraph,
          '#box-alunosPorTurmaEnsFundAFinais');

        // EsforcoDocente
        const dadosEDEnsFundAFinais = this.getDadosDoIndicador(this.indicadores[4], this.niveis[1], this.categorias[1]);
        this.nivelesEDEnsFundAFinais = Object.keys(dadosEDEnsFundAFinais);
        this.showGraphForAFD(this.indicadores[4], this.niveis[1], this.categorias[1], this.nivelDefault, this.div_EDEnsFundAFinaisGraph);

        // --- 3. Ensino Medio
        // AFD
        const dadosAFDEnsMedio = this.getDadosDoIndicador(this.indicadores[0], this.niveis[2], '');
        this.groupsAFDEnsMedio = Object.keys(dadosAFDEnsMedio);
        this.showGraphForAFD(this.indicadores[0], this.niveis[2], '', this.groupDefault, this.div_AFDEnsMedioGraph);

        // DCS - cursoSuperior
        const dadosDCSEnsMedio = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[2]];
        this.showGraphWithVerticalBar(dadosDCSEnsMedio, this.div_DCSEnsMedioGraph, '#box-DCSEnsMedio');

        // horasAula
        const dadosHorasAulaEnsMedio = this.schoolSelected[this.indicadores[2]][this.niveis[2]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsMedio, this.div_horasAulaEnsMedioGraph, '#box-horasAulaEnsMedio');

        // alunosPorTurma
        const dadosAlunosPorTurmaEnsMedio = this.schoolSelected[this.indicadores[3]][this.niveis[2]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsMedio, this.div_alunosPorTurmaEnsMedioGraph,
          '#box-alunosPorTurmaEnsMedio');

        // EsforcoDocente
        const dadosEDEnsMedio = this.getDadosDoIndicador(this.indicadores[4], this.niveis[2], '');
        this.nivelesEDEnsMedio = Object.keys(dadosEDEnsMedio);
        this.showGraphForAFD(this.indicadores[4], this.niveis[2], '', this.nivelDefault, this.div_EDEnsMedioGraph);

      });
    this.subscription.add(s);
  }

  /**
   * Function to show school's information (..of the group chosen) - Nivel Infantil
   */
  onGroupChangeAFDInfantil(groupValueSelected: string) {
    this.showGraphForAFD(this.indicadores[0], this.niveis[0], '', groupValueSelected, this.div_AFDNivelInfantilGraph);
  }

  /**
   * Function to show school's information (..of the group chosen) - Nivel Fundamental, anos iniciais
   */
  onGroupChangeAFDEnsFundAIniciais(groupValueSelected: string) {
    this.showGraphForAFD(this.indicadores[0], this.niveis[1], this.categorias[0], groupValueSelected, this.div_AFDEnsFundAIniciaisGraph);
  }

  /**
   * Function to show school's information (..of the group chosen) - Nivel Fundamental, anos finais
   */
  onGroupChangeAFDEnsFundAFinais(groupValueSelected: string) {
    this.showGraphForAFD(this.indicadores[0], this.niveis[1], this.categorias[1], groupValueSelected, this.div_AFDEnsFundAFinaisGraph);
  }

  /**
   * Function to show the 'AFD' indicator (..of the group chosen) - Nivel Médio
   * @param {string} groupValueSelected
   */
  onGroupChangeAFDEnsMedio(groupValueSelected: string) {
    this.showGraphForAFD(this.indicadores[0], this.niveis[2], '', groupValueSelected, this.div_AFDEnsMedioGraph);
  }

  /**
   * Function to show the 'esforço docente' indicator (..of the level chosen) - Nivel Fundamental, anos iniciais
   * @param {string} groupValueSelected
   */
  onNivelChangeEDEnsFundAIniciais(nivelValueSelected: string) {
    this.showGraphForAFD(this.indicadores[4], this.niveis[1], this.categorias[0], nivelValueSelected, this.div_EDEnsFundAIniciaisGraph);
  }

  /**
   * Function to show the 'esforço docente' indicator (..of the level chosen) - Nivel Fundamental, anos finais
   * @param {string} groupValueSelected
   */
  onNivelChangeEDEnsFundAFinais(nivelValueSelected: string) {
    this.showGraphForAFD(this.indicadores[4], this.niveis[1], this.categorias[1], nivelValueSelected, this.div_EDEnsFundAFinaisGraph);
  }

  /**
   * Function to show the 'esforço docente' indicator (..of the level chosen) - Nivel Médio
   * @param {string} groupValueSelected
   */
  onNivelChangeEDEnsMedio(nivelValueSelected: string) {
    this.showGraphForAFD(this.indicadores[4], this.niveis[2], '', nivelValueSelected, this.div_EDEnsMedioGraph);
  }

  /**
   * shows graph for Adequação de formação docente
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphForAFD(indicador: string, nivelEnsino: string, categoria: string, group: string, divForGraph: ElementRef) {
    const AFD = this.getDadosDoIndicador(indicador, nivelEnsino, categoria);
    const groupData = AFD[group];
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    this.buildVerticalBarChart(dataForGraph, divForGraph);
  }

  getDadosDoIndicador(indicador: string, nivelEnsino: string, categoria: string) {
    if (nivelEnsino === '') {
      return this.schoolSelected[indicador];
    } else {
      if (categoria === '') {
        return this.schoolSelected[indicador][nivelEnsino];
      } else {
        return this.schoolSelected[indicador][nivelEnsino][categoria];
      }
    }
  }

  /**
   * Shows graph using vartical bar chart
   * @param groupData
   * @param {ElementRef} containerDiv
   * @param {string} boxContainer
   */
  showGraphWithVerticalBar(groupData: any, containerDiv: ElementRef, boxContainer: string) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector(boxContainer);
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      this.buildVerticalBarChart(dataForGraph, containerDiv);
    } else {
      dom.classList.add('hide-section');
    }
  }

  /**
   * shows graph for "Docente com curso superior"
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphForDCS(groupData: any, containerDiv: ElementRef, boxContainer: string) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector(boxContainer);
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      this.buildVerticalBarChart(dataForGraph, containerDiv);
    } else {
      dom.classList.add('hide-section');
    }
  }

  /**
   * shows graph for "Horas Aula"
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphForHorasAula(groupData: any, containerDiv: ElementRef, boxContainer: string) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector(boxContainer);
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      this.buildVerticalBarChart(dataForGraph, containerDiv);
    } else {
      dom.classList.add('hide-section');
    }
  }

  /**
   * shows graph for 'Alunos por Turma'
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphForAlunosPorTurma(groupData: any, containerDiv: ElementRef, boxContainer: string) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector(boxContainer);
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      this.buildVerticalBarChart(dataForGraph, containerDiv);
    } else {
      dom.classList.add('hide-section');
    }
  }

  /**
   * Build a vertical bar chart
   * @param {any[]} dataGraph
   * @param {ElementRef} containerDiv
   */
  buildVerticalBarChart(dataGraph: any[], containerDiv: ElementRef) {
    // Define chart dimensions
    const margin = this.margin;
    const width = this.width - margin.left - margin.right;
    const height = this.heigth - margin.top - margin.bottom;

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

  /**
   * Fix a float number to 'n' fraction digits
   * @param {number} value
   * @returns {number}
   */
  convertToPercentage (value: number) {
    return parseFloat((value * 100).toFixed(2));
  }

  /**
   * Builds a json array using the properties of a document
   * @param document
   * @returns {Array}
   */
  getProperties(document: any) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    const selectData = [];
    for (let i = 0; i < numberOfProp; i++) {
      const jsonData = {};
      jsonData['variableName'] = prop[i];
      jsonData['variableValue'] = prop[i];
      selectData.push(jsonData);
    }
    return selectData;
  }

  /**
   * Builds a array with documents (variableName and variableValue) properties
   * @param document
   * @returns {Array}
   */
  getPropertiesNamesAndValues(document: any) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    const data = [];
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof  document[prop[i]] === 'number' && document[prop[i]] !== 0) {
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
