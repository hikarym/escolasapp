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
  propAFDInfantil: any;

  @ViewChild('DCSNivelInfantilGraph')
  private div_DCSNivelInfantilGraph: ElementRef;

  @ViewChild('horasAulaGraph')
  private div_horasAulaGraph: ElementRef;

  @ViewChild('alunosPorTurmaGraph')
  private div_alunosPorTurmaGraph: ElementRef;

  private margin = {top: 15, right: 20, bottom: 40, left: 20};
  private width = 297;
  private heigth = 250;

  constructor(private sharedDataService: ShareddataService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolInformation().subscribe(
      res => {
        this.schoolSelected = res;

        // ---
        const adequacaoFormacaoDocenteInfantil = this.schoolSelected['AdequacaoFormacaoDocente']['Infantil'];
        this.propAFDInfantil = Object.keys(adequacaoFormacaoDocenteInfantil);
        this.showGraphForAFDNivelInfantil(adequacaoFormacaoDocenteInfantil['Grupo1']);

        const docentesCursoSuperior = this.schoolSelected['docentes']['cursoSuperior']['infantil'];
        this.showGraphForDCSNivelInfantil(docentesCursoSuperior);

        const horasAula = this.schoolSelected['horasAula']['infantil'];
        this.showGraphForHorasAulaNivelInfantil(horasAula);

        const alunosPorTurma = this.schoolSelected['AlunosPorTurma']['infantil'];
        this.showGraphForAlunosPorTurmaNivelInfantil(alunosPorTurma);

      });
    this.subscription.add(s);
  }

  /**
   * Function to show school's information (..of the group chosen)
   */
  onGroupChange(groupValueSelected: number) {
    const adequacaoFormacaoDocenteInfantil = this.schoolSelected['AdequacaoFormacaoDocente']['Infantil'];
    this.showGraphForAFDNivelInfantil(adequacaoFormacaoDocenteInfantil[groupValueSelected]);
  }

  /**
   * shows graph for Adequação de formação docente
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphForAFDNivelInfantil(groupData: any) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const containerDiv = this.div_AFDNivelInfantilGraph;
    this.buildVerticalBarChart(dataForGraph, containerDiv);
  }

  /**
   * shows graph for "Docente com curso superior"
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphForDCSNivelInfantil(groupData: any) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector('#boxDCSNivelInfantilGraph');
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      const containerDiv = this.div_DCSNivelInfantilGraph;
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
  showGraphForHorasAulaNivelInfantil(groupData: any) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector('#boxHorasAulaNivelInfantilGraph');
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      const containerDiv = this.div_horasAulaGraph;
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
  showGraphForAlunosPorTurmaNivelInfantil(groupData: any) {
    const dataForGraph = this.getPropertiesNamesAndValues(groupData);
    const dom: any = document.querySelector('#boxAlunosPorTurmaNivelInfantilGraph');
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      const containerDiv = this.div_alunosPorTurmaGraph;
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
