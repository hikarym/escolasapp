import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShareddataService} from '../../../../services/shareddata.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import {select} from 'd3-selection';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {

  ano2011to2013 = 'NA';
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

  @ViewChild('txAprovEnsFundAIniciaisGraph')
  private div_txAprovEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('ntProvaMatEnsFundAIniciaisGraph')
  private div_ntProvaMatEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('ntProvaPortuEnsFundAIniciaisGraph')
  private div_ntProvaPortuEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('ntProvaPadronizEnsFundAIniciaisGraph')
  private div_ntProvaPadronizEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('idebEnsFundAIniciaisGraph')
  private div_idebEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('AFDEnsFundAIniciaisGraph')
  private div_AFDEnsFundAIniciaisGraph: ElementRef;
  groupsAFDEnsFundAIniciais: any;

  @ViewChild('DCSEnsFundAIniciaisGraph')
  private div_DCSEnsFundAIniciaisGraph: ElementRef;

  @ViewChild('horasAulaEnsFundAIniciais8Graph')
  private div_horasAulaEnsFundAIniciais8Graph: ElementRef;

  @ViewChild('horasAulaEnsFundAIniciais9Graph')
  private div_horasAulaEnsFundAIniciais9Graph: ElementRef;

  @ViewChild('alunosPorTurmaEnsFundAIniciais8Graph')
  private div_alunosPorTurmaEnsFundAIniciais8Graph: ElementRef;

  @ViewChild('alunosPorTurmaEnsFundAIniciais9Graph')
  private div_alunosPorTurmaEnsFundAIniciais9Graph: ElementRef;

  @ViewChild('EDEnsFundAIniciaisGraph')
  private div_EDEnsFundAIniciaisGraph: ElementRef;
  nivelesEDEnsFundAIniciais: any;

  @ViewChild('txAprovEnsFundAFinaisGraph')
  private div_txAprovEnsFundAFinaisGraph: ElementRef;

  @ViewChild('ntProvaMatEnsFundAFinaisGraph')
  private div_ntProvaMatEnsFundAFinaisGraph: ElementRef;

  @ViewChild('ntProvaPortuEnsFundAFinaisGraph')
  private div_ntProvaPortuEnsFundAFinaisGraph: ElementRef;

  @ViewChild('ntProvaPadronizEnsFundAFinaisGraph')
  private div_ntProvaPadronizEnsFundAFinaisGraph: ElementRef;

  @ViewChild('idebEnsFundAFinaisGraph')
  private div_idebEnsFundAFinaisGraph: ElementRef;

  @ViewChild('AFDEnsFundAFinaisGraph')
  private div_AFDEnsFundAFinaisGraph: ElementRef;
  groupsAFDEnsFundAFinais: any;

  @ViewChild('DCSEnsFundAFinaisGraph')
  private div_DCSEnsFundAFinaisGraph: ElementRef;

  @ViewChild('horasAulaEnsFundAFinais8Graph')
  private div_horasAulaEnsFundAFinais8Graph: ElementRef;

  @ViewChild('horasAulaEnsFundAFinais9Graph')
  private div_horasAulaEnsFundAFinais9Graph: ElementRef;

  @ViewChild('alunosPorTurmaEnsFundAFinais8Graph')
  private div_alunosPorTurmaEnsFundAFinais8Graph: ElementRef;

  @ViewChild('alunosPorTurmaEnsFundAFinais9Graph')
  private div_alunosPorTurmaEnsFundAFinais9Graph: ElementRef;

  @ViewChild('EDEnsFundAFinaisGraph')
  private div_EDEnsFundAFinaisGraph: ElementRef;
  nivelesEDEnsFundAFinais: any;

  @ViewChild('txAprovEnsMedioGraph')
  private div_txAprovEnsMedioGraph: ElementRef;

  @ViewChild('txAbandonoEnsMedioGraph')
  private div_txAbandonoEnsMedioGraph: ElementRef;

  @ViewChild('txDistorEnsMedioGraph')
  private div_txDistorEnsMedioGraph: ElementRef;

  dataForEnemINSEAB: any;
  dataForEnemINSECL: any;

  @ViewChild('provasEnemEnsMedioGraph')
  private div_provasEnemEnsMedioGraph: ElementRef;
  anosProvasEnemEnsMedio: any;

  @ViewChild('AFDEnsMedioGraph')
  private div_AFDEnsMedioGraph: ElementRef;
  groupsAFDEnsMedio: any;

  @ViewChild('DCSEnsMedioGraph')
  private div_DCSEnsMedioGraph: ElementRef;

  @ViewChild('horasAulaPorAnosEnsMedioGraph')
  private div_horasAulaPorAnosEnsMedioGraph: ElementRef;

  @ViewChild('horasAulaAno3EnsMedioGraph')
  private div_horasAulaAno3EnsMedioGraph: ElementRef;

  @ViewChild('alunosPorTurmaPorAnosEnsMedioGraph')
  private div_alunosPorTurmaPorAnosEnsMedioGraph: ElementRef;

  @ViewChild('alunosPorTurmaAno3EnsMedioGraph')
  private div_alunosPorTurmaAno3EnsMedioGraph: ElementRef;

  @ViewChild('EDEnsMedioGraph')
  private div_EDEnsMedioGraph: ElementRef;
  nivelesEDEnsMedio: any;

  private groupDefault = 'Grupo1';
  private nivelDefault = 'Nivel1';

  private margin = {top: 15, right: 20, bottom: 33, left: 20};
  private width = 315;
  private height = 270;
  private valuesUnit = '%';

  // Indicadores, niveis, categorias
  private indicadores = [
    'AdequacaoFormacaoDocente', 'docentes', 'horasAula', 'AlunosPorTurma', 'EsforcoDocente',
    'txAprov', 'txAbandono', 'txDistor',
    'ntProvaMat', 'ntProvaPortu', 'ntProvaPadroniz', 'ideb', 'enem'
  ];
  private niveis = ['Infantil', 'Fundamental', 'Medio'];
  private categorias = [
    'AnosIniciais', 'AnosFinais',
    'AnosIniciais8', 'AnosFinais8',
    'AnosIniciais9', 'AnosFinais9',
    'anos', 'terceiroAno',
    'primeiraSerie', 'terceiraSerie',
    'INSEAB', 'INSECL', 'provas'
  ];
  // flags
  ofereceEnsInfantil = '';
  ofereceEnsFundamental = '';
  ofereceEnsMedio = '';
  ofereceAIniciais = '';
  ofereceAFinais = '';

  constructor(private sharedDataService: ShareddataService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolInformation().subscribe(
      res => {
        this.schoolSelected = res;
        // Verify if the school offers 'ensino infantil'
        const ofereceEnsInfantilRegular = this.schoolSelected['modalidade']['regular']['Infantil'];
        const ofereceEnsInfantilEspecial = this.schoolSelected['modalidade']['especial']['Infantil'];
        const domGraficosEnsInfantil: any = document.querySelector('#graficosEnsInfantil');

        if (this.verifyScholarLevelOffering(ofereceEnsInfantilRegular) === 0 &&
          this.verifyScholarLevelOffering(ofereceEnsInfantilEspecial) === 0) {
          this.ofereceEnsInfantil = this.getInstant('naoOfereceEnsinoInfantil');
          domGraficosEnsInfantil.classList.add('hide-section');
        }  else {
          domGraficosEnsInfantil.classList.remove('hide-section');
          this.ofereceEnsInfantil = '';
        }

        // Verify if the school offers 'ensino Fundamental'
        const ofereceEnsFundamentalRegular = this.schoolSelected['modalidade']['regular']['Fundamental'];
        const ofereceEnsFundamentalEja = this.schoolSelected['modalidade']['eja']['Fundamental'];
        const ofereceEnsFundamentalEspecial = this.schoolSelected['modalidade']['especial']['Fundamental'];
        const domGraficosEnsFundamental: any = document.querySelector('#graficosEnsFundamental');

        if (this.verifyScholarLevelOffering(ofereceEnsFundamentalRegular) === 0 &&
          this.verifyScholarLevelOffering(ofereceEnsFundamentalEja) === 0 &&
          this.verifyScholarLevelOffering(ofereceEnsFundamentalEspecial) === 0 ) {
          this.ofereceEnsFundamental = this.getInstant('naoOfereceEnsinoFundamental');
          domGraficosEnsFundamental.classList.add('hide-section');
        } else {
          domGraficosEnsFundamental.classList.remove('hide-section');
          this.ofereceEnsFundamental = '';
        }

        // Verify if the school offers 'ensino Médio'
        const ofereceEnsMedioRegular = this.schoolSelected['modalidade']['regular']['Medio'];
        const ofereceEnsMedioEja = this.schoolSelected['modalidade']['eja']['Medio'];
        const ofereceEnsMedioProfissional = this.schoolSelected['modalidade']['profissional']['Medio'];
        const ofereceEnsMedioEspecial = this.schoolSelected['modalidade']['especial']['Medio'];
        const domGraficosEnsMedio: any = document.querySelector('#graficosEnsMedio');

        if (this.verifyScholarLevelOffering(ofereceEnsMedioRegular) === 0 &&
          this.verifyScholarLevelOffering(ofereceEnsMedioEja) === 0 &&
          this.verifyScholarLevelOffering(ofereceEnsMedioProfissional) === 0 &&
          this.verifyScholarLevelOffering(ofereceEnsMedioEspecial) === 0 ) {
          this.ofereceEnsMedio = this.getInstant('naoOfereceEnsinoMedio');
          domGraficosEnsMedio.classList.add('hide-section');
        } else {
          domGraficosEnsMedio.classList.remove('hide-section');
          this.ofereceEnsMedio = '';
        }

        // Verify if the school offers 'ensino Fundamental - Anos iniciais'
        const ofereceAIniciaisRegular = this.schoolSelected['modalidade']['regular']['Fundamental']['AnosIniciais'];
        const ofereceAIniciaisEspecial = this.schoolSelected['modalidade']['especial']['Fundamental']['AnosIniciais'];
        const domGraficosAIniciais: any = document.querySelector('#graficosAIniciais');

        if (this.verifyYearsOfScholarLevel(ofereceAIniciaisRegular).length === 0 &&
          this.verifyYearsOfScholarLevel(ofereceAIniciaisEspecial).length === 0 ) {
          this.ofereceAIniciais = this.getInstant('naoOfereceAIniciais');
          domGraficosAIniciais.classList.add('hide-section');
        } else {
          domGraficosAIniciais.classList.remove('hide-section');
          this.ofereceAIniciais = '';
        }

        // Verify if the school offers 'ensino Fundamental - Anos finais'
        const ofereceAFinaisRegular = this.schoolSelected['modalidade']['regular']['Fundamental']['AnosFinais'];
        const ofereceAFinaisEspecial = this.schoolSelected['modalidade']['especial']['Fundamental']['AnosFinais'];
        const domGraficosAFinais: any = document.querySelector('#graficosAFinais');

        if (this.verifyYearsOfScholarLevel(ofereceAFinaisRegular).length === 0 &&
          this.verifyYearsOfScholarLevel(ofereceAFinaisEspecial).length === 0 ) {
          this.ofereceAFinais = this.getInstant('naoOfereceAFinais');
          domGraficosAFinais.classList.add('hide-section');
        } else {
          domGraficosAFinais.classList.remove('hide-section');
          this.ofereceAFinais = '';
        }

        // --- 1. Ensino Infantil
        // AFD
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[0]][this.niveis[0]],
          this.div_AFDNivelInfantilGraph, '#box-AFDNivelInfantil',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});

        // DCS - cursoSuperior
        const dadosDCSNivelInfantil = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[0]];
        this.showGraphWithVerticalBar(dadosDCSNivelInfantil, this.div_DCSNivelInfantilGraph, '#box-DCSNivelInfantil');

        // horasAula - Infantil
        const dadosHorasAulaNivelInfantil = this.schoolSelected[this.indicadores[2]][this.niveis[0]];
        this.showGraphWithVerticalBar(dadosHorasAulaNivelInfantil, this.div_horasAulaNivelInfantilGraph,
          '#box-horasAulaNivelInfantil', ' ' + this.getInstant('horas'));

        // alunosPorTurma - Infantil
        const dadosAlunosPorTurmaNivelInfantil = this.schoolSelected[this.indicadores[3]][this.niveis[0]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaNivelInfantil, this.div_alunosPorTurmaNivelInfantilGraph,
          '#box-alunosPorTurmaNivelInfantil', '');

        // --- 2. Ensino Fundamental
        // ----- Anos Iniciais -----
        // Taxa de aprovação
        const dadosTxAprovEnsFundAIniciais = this.schoolSelected[this.indicadores[5]][this.niveis[1]][this.categorias[0]];
        this.showGraphWithVerticalBar(dadosTxAprovEnsFundAIniciais, this.div_txAprovEnsFundAIniciaisGraph,
          '#box-txAprovEnsFundAIniciais');

        // Nota Matematica
        const dadosNtProvaMatEnsFundAIniciais = this.schoolSelected[this.indicadores[8]][this.niveis[1]][this.categorias[0]];
        this.showGraphWithVerticalBar(dadosNtProvaMatEnsFundAIniciais, this.div_ntProvaMatEnsFundAIniciaisGraph,
          '#box-ntProvaMatEnsFundAIniciais');

        // Nota Lingua Portuguesa
        const dadosNtProvaPortuEnsFundAIniciais = this.schoolSelected[this.indicadores[9]][this.niveis[1]][this.categorias[0]];
        this.showGraphWithVerticalBar(dadosNtProvaPortuEnsFundAIniciais, this.div_ntProvaPortuEnsFundAIniciaisGraph,
          '#box-ntProvaPortuEnsFundAIniciais');

        // Nota Média Padronizada
        const dadosNtProvaPadronizEnsFundAIniciais = this.schoolSelected[this.indicadores[10]][this.niveis[1]][this.categorias[0]];
        this.showGraphWithVerticalBar(dadosNtProvaPadronizEnsFundAIniciais, this.div_ntProvaPadronizEnsFundAIniciaisGraph,
          '#box-ntProvaPadronizEnsFundAIniciais');

        // Nota IDEB
        const dadosIDEBEnsFundAIniciais = this.schoolSelected[this.indicadores[11]][this.niveis[1]][this.categorias[0]];
        this.showGraphWithVerticalBar(dadosIDEBEnsFundAIniciais, this.div_idebEnsFundAIniciaisGraph,
          '#box-idebEnsFundAIniciais');

        // AFD
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[0]][this.niveis[1]][this.categorias[0]],
          this.div_AFDEnsFundAIniciaisGraph, '#box-AFDEnsFundAIniciais',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});

        /*const dadosAFDEnsFundAIniciais = this.getDadosDoIndicador(this.indicadores[0], this.niveis[1], this.categorias[0]);
        this.groupsAFDEnsFundAIniciais = Object.keys(dadosAFDEnsFundAIniciais);
        this.showGraphByGroups(this.indicadores[0], this.niveis[1], this.categorias[0], this.groupDefault,
          this.div_AFDEnsFundAIniciaisGraph);*/

        // EsforcoDocente
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[4]][this.niveis[1]][this.categorias[0]],
          this.div_EDEnsFundAIniciaisGraph, '#box-EDEnsFundAIniciais',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});
        /*const dadosEDEnsFundAIniciais = this.getDadosDoIndicador(this.indicadores[4], this.niveis[1], this.categorias[0]);
        this.nivelesEDEnsFundAIniciais = Object.keys(dadosEDEnsFundAIniciais);
        this.showGraphByGroups(this.indicadores[4], this.niveis[1], this.categorias[0], this.nivelDefault,
          this.div_EDEnsFundAIniciaisGraph);*/

        // DCS - cursoSuperior
        const dadosDCSEnsFundAIniciais = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[1]];
        this.showGraphWithVerticalBar(dadosDCSEnsFundAIniciais, this.div_DCSEnsFundAIniciaisGraph, '#box-DCSEnsFundAIniciais');

        // horasAula 8a
        const dadosHorasAulaEnsFundAIniciais8 = this.schoolSelected[this.indicadores[2]][this.niveis[1]][this.categorias[2]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsFundAIniciais8, this.div_horasAulaEnsFundAIniciais8Graph,
          '#box-horasAulaEnsFundAIniciais8', ' ' + this.getInstant('horas'));

        // horasAula 9a
        const dadosHorasAulaEnsFundAIniciais9 = this.schoolSelected[this.indicadores[2]][this.niveis[1]][this.categorias[4]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsFundAIniciais9, this.div_horasAulaEnsFundAIniciais9Graph,
          '#box-horasAulaEnsFundAIniciais9', ' ' + this.getInstant('horas'));

        // alunosPorTurma 8a
        const dadosAlunosPorTurmaEnsFundAIniciais8 = this.schoolSelected[this.indicadores[3]][this.niveis[1]][this.categorias[2]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsFundAIniciais8, this.div_alunosPorTurmaEnsFundAIniciais8Graph,
          '#box-alunosPorTurmaEnsFundAIniciais8', ' ' + this.getInstant('alunos'));

        // alunosPorTurma 9a
        const dadosAlunosPorTurmaEnsFundAIniciais9 = this.schoolSelected[this.indicadores[3]][this.niveis[1]][this.categorias[4]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsFundAIniciais9, this.div_alunosPorTurmaEnsFundAIniciais9Graph,
          '#box-alunosPorTurmaEnsFundAIniciais9', ' ' + this.getInstant('alunos'));

        // ----- Anos Finais -----
        // Taxa de aprovação
        const dadosTxAprovEnsFundAFinais = this.schoolSelected[this.indicadores[5]][this.niveis[1]][this.categorias[1]];
        this.showGraphWithVerticalBar(dadosTxAprovEnsFundAFinais, this.div_txAprovEnsFundAFinaisGraph,
          '#box-txAprovEnsFundAFinais');

        // Nota Matematica
        const dadosNtProvaMatEnsFundAFinais = this.schoolSelected[this.indicadores[8]][this.niveis[1]][this.categorias[1]];
        this.showGraphWithVerticalBar(dadosNtProvaMatEnsFundAFinais, this.div_ntProvaMatEnsFundAFinaisGraph,
          '#box-ntProvaMatEnsFundAFinais');

        // Nota Lingua Portuguesa
        const dadosNtProvaPortuEnsFundAFinais = this.schoolSelected[this.indicadores[9]][this.niveis[1]][this.categorias[1]];
        this.showGraphWithVerticalBar(dadosNtProvaPortuEnsFundAFinais, this.div_ntProvaPortuEnsFundAFinaisGraph,
          '#box-ntProvaPortuEnsFundAFinais');

        // Nota Média Padronizada
        const dadosNtProvaPadronizEnsFundAFinais = this.schoolSelected[this.indicadores[10]][this.niveis[1]][this.categorias[1]];
        this.showGraphWithVerticalBar(dadosNtProvaPadronizEnsFundAFinais, this.div_ntProvaPadronizEnsFundAFinaisGraph,
          '#box-ntProvaPadronizEnsFundAFinais');

        // Nota IDEB
        const dadosIDEBEnsFundAFinais = this.schoolSelected[this.indicadores[11]][this.niveis[1]][this.categorias[1]];
        this.showGraphWithVerticalBar(dadosIDEBEnsFundAFinais, this.div_idebEnsFundAFinaisGraph,
          '#box-idebEnsFundAFinais');

        // DCS - cursoSuperior
        const dadosDCSEnsFundAFinais = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[1]];
        this.showGraphWithVerticalBar(dadosDCSEnsFundAFinais, this.div_DCSEnsFundAFinaisGraph,
          '#box-DCSEnsFundAFinais');

        // AFD
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[0]][this.niveis[1]][this.categorias[1]],
          this.div_AFDEnsFundAFinaisGraph, '#box-AFDEnsFundAFinais',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});

        /*const dadosAFDEnsFundAFinais = this.getDadosDoIndicador(this.indicadores[0], this.niveis[1], this.categorias[1]);
        this.groupsAFDEnsFundAFinais = Object.keys(dadosAFDEnsFundAFinais);
        this.showGraphByGroups(this.indicadores[0], this.niveis[1], this.categorias[1], this.groupDefault, this.div_AFDEnsFundAFinaisGraph);*/
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[4]][this.niveis[1]][this.categorias[1]],
          this.div_EDEnsFundAFinaisGraph, '#box-EDEnsFundAFinais',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});
        /*// EsforcoDocente
        const dadosEDEnsFundAFinais = this.getDadosDoIndicador(this.indicadores[4], this.niveis[1], this.categorias[1]);
        this.nivelesEDEnsFundAFinais = Object.keys(dadosEDEnsFundAFinais);
        this.showGraphByGroups(this.indicadores[4], this.niveis[1], this.categorias[1], this.nivelDefault, this.div_EDEnsFundAFinaisGraph); */

        // horasAula ------ falta 8a
        const dadosHorasAulaEnsFundAFinais8 = this.schoolSelected[this.indicadores[2]][this.niveis[1]][this.categorias[3]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsFundAFinais8, this.div_horasAulaEnsFundAFinais8Graph,
          '#box-horasAulaEnsFundAFinais8', ' ' + this.getInstant('horas'));

        // horasAula ------ falta 9a
        const dadosHorasAulaEnsFundAFinais9 = this.schoolSelected[this.indicadores[2]][this.niveis[1]][this.categorias[5]];
        this.showGraphWithVerticalBar(dadosHorasAulaEnsFundAFinais9, this.div_horasAulaEnsFundAFinais9Graph,
          '#box-horasAulaEnsFundAFinais9', ' ' + this.getInstant('horas'));

        // alunosPorTurma ------ falta 8a
        const dadosAlunosPorTurmaEnsFundAFinais8 = this.schoolSelected[this.indicadores[3]][this.niveis[1]][this.categorias[3]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsFundAFinais8, this.div_alunosPorTurmaEnsFundAFinais8Graph,
          '#box-alunosPorTurmaEnsFundAFinais8', ' ' + this.getInstant('alunos'));

        // alunosPorTurma ------ falta 9a
        const dadosAlunosPorTurmaEnsFundAFinais9 = this.schoolSelected[this.indicadores[3]][this.niveis[1]][this.categorias[5]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaEnsFundAFinais9, this.div_alunosPorTurmaEnsFundAFinais9Graph,
          '#box-alunosPorTurmaEnsFundAFinais9', 'alunos');

        // --- 3. Ensino Medio
        // Taxa de aprovação
        const dadosTxAprovEnsMedio = this.schoolSelected[this.indicadores[5]][this.niveis[2]][this.categorias[9]];
        this.showGraphWithVerticalBar(dadosTxAprovEnsMedio, this.div_txAprovEnsMedioGraph,
          '#box-txAprovEnsMedio');

        // Taxa de Abandono
        const dadosTxAbandonoEnsMedio = this.schoolSelected[this.indicadores[6]][this.niveis[2]][this.categorias[8]];
        this.showGraphWithVerticalBar(dadosTxAbandonoEnsMedio, this.div_txAbandonoEnsMedioGraph,
          '#box-txAbandonoEnsMedio');

        // Taxa de Distorção
        const dadosTxDistorEnsMedio = this.schoolSelected[this.indicadores[7]][this.niveis[2]][this.categorias[9]];
        this.showGraphWithVerticalBar(dadosTxDistorEnsMedio, this.div_txDistorEnsMedioGraph,
          '#box-txDistorEnsMedio');

        // INSEAB
        const enemINSEAB = this.schoolSelected[this.indicadores[12]][this.niveis[2]][this.categorias[10]];
        this.dataForEnemINSEAB = this.getPropertiesNamesAndValuesForNumbers(enemINSEAB, 1);

        // INSECL
        const enemINSECL = this.schoolSelected[this.indicadores[12]][this.niveis[2]][this.categorias[11]];
        this.dataForEnemINSECL = this.getPropNamesAndValuesForStrings(enemINSECL);

        // Provas do ENEM
        const dadosProvasEnemEnsMedio = this.getDadosDoIndicador(this.indicadores[12], this.niveis[2], this.categorias[12]);
        this.anosProvasEnemEnsMedio = Object.keys(dadosProvasEnemEnsMedio);
        this.showGraphByGroups(this.indicadores[12], this.niveis[2], this.categorias[12], this.anosProvasEnemEnsMedio[0],
          this.div_provasEnemEnsMedioGraph, this.valuesUnit, this.width, 320, {top: 15, right: 20, bottom: 110, left: 20});

        // AFD
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[0]][this.niveis[2]],
          this.div_AFDEnsMedioGraph, '#box-AFDEnsMedio',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});
        /*const dadosAFDEnsMedio = this.getDadosDoIndicador(this.indicadores[0], this.niveis[2], '');
        this.groupsAFDEnsMedio = Object.keys(dadosAFDEnsMedio);
        this.showGraphByGroups(this.indicadores[0], this.niveis[2], '', this.groupDefault, this.div_AFDEnsMedioGraph);*/

        // EsforcoDocente
        this.showGraphByStackedBar(this.schoolSelected[this.indicadores[4]][this.niveis[2]],
          this.div_EDEnsMedioGraph, '#box-EDEnsMedio',
          this.valuesUnit, 2, this.width, 320, {top: 15, right: 80, bottom: 30, left: 30});
        /*const dadosEDEnsMedio = this.getDadosDoIndicador(this.indicadores[4], this.niveis[2], '');
        this.nivelesEDEnsMedio = Object.keys(dadosEDEnsMedio);
        this.showGraphByGroups(this.indicadores[4], this.niveis[2], '', this.nivelDefault, this.div_EDEnsMedioGraph);*/

        // DCS - cursoSuperior
        const dadosDCSEnsMedio = this.schoolSelected[this.indicadores[1]]['cursoSuperior'][this.niveis[2]];
        this.showGraphWithVerticalBar(dadosDCSEnsMedio, this.div_DCSEnsMedioGraph, '#box-DCSEnsMedio');

        // horasAula -  por anos
        const dadosHorasAulaPorAnosEnsMedio = this.schoolSelected[this.indicadores[2]][this.niveis[2]][this.categorias[6]];
        this.showGraphWithVerticalBar(dadosHorasAulaPorAnosEnsMedio, this.div_horasAulaPorAnosEnsMedioGraph,
          '#box-horasAulaPorAnosEnsMedio', ' ' + this.getInstant('horas'));

        // horasAula - Terceiro Ano
        const dadosHorasAulaAno3EnsMedio = this.schoolSelected[this.indicadores[2]][this.niveis[2]][this.categorias[7]];
        this.showGraphWithVerticalBar(dadosHorasAulaAno3EnsMedio, this.div_horasAulaAno3EnsMedioGraph,
          '#box-horasAulaAno3EnsMedio', ' ' + this.getInstant('horas'));

        // alunosPorTurma por anos
        const dadosAlunosPorTurmaPorAnosEnsMedio = this.schoolSelected[this.indicadores[3]][this.niveis[2]][this.categorias[6]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaPorAnosEnsMedio, this.div_alunosPorTurmaPorAnosEnsMedioGraph,
          '#box-alunosPorTurmaPorAnosEnsMedio', ' ' + this.getInstant('alunos'));

        // alunosPorTurma - Terceiro Ano
        const dadosAlunosPorTurmaAno3EnsMedio = this.schoolSelected[this.indicadores[3]][this.niveis[2]][this.categorias[7]];
        this.showGraphWithVerticalBar(dadosAlunosPorTurmaAno3EnsMedio, this.div_alunosPorTurmaAno3EnsMedioGraph,
          '#box-alunosPorTurmaAno3EnsMedio', ' ' + this.getInstant('alunos'));

      });
    this.subscription.add(s);
  }

  /**
   * Function to show the 'esforço docente' indicator (..of the level chosen) - Nivel Médio
   * @param {string} groupValueSelected
   */
  onGroupChangeAnoProvaEnemEnsMedio(anoSelected: string) {
    const ano = 'ano' + anoSelected;
    this.showGraphByGroups(this.indicadores[12], this.niveis[2], this.categorias[12], ano, this.div_provasEnemEnsMedioGraph,
      this.valuesUnit, this.width, 320, {top: 15, right: 20, bottom: 110, left: 20});
  }

  /**
   * shows graph by Groups/levels (Grupo/Nivel)
   * @param groupData
   * @param {ElementRef} containerDiv
   */
  showGraphByGroups(indicador: string, nivelEnsino: string, categoria: string, group: string, divForGraph: ElementRef,
                    valuesUnit: string = this.valuesUnit,
                    divWidth: number = this.width, divHeight: number = this.height, margin = this.margin) {
    const dadosCategoria = this.getDadosDoIndicador(indicador, nivelEnsino, categoria);
    const groupData = dadosCategoria[group];
    const dataForGraph = this.getPropertiesNamesAndValuesForNumbers(groupData, 0);
    this.buildVerticalBarChart(dataForGraph, divForGraph, valuesUnit, divWidth, divHeight, margin);
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
   * @param {string} valuesUnit
   * @param {number} divWidth
   * @param {number} divHeight
   * @param {{top: number; right: number; bottom: number; left: number}} margin
   */
  showGraphWithVerticalBar(groupData: any, containerDiv: ElementRef, boxContainer: string, valuesUnit: string = this.valuesUnit,
                           divWidth: number = this.width, divHeight: number = this.height, margin = this.margin) {
    const dataForGraph = this.getPropertiesNamesAndValuesForNumbers(groupData, 0);
    const dom: any = document.querySelector(boxContainer);
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      this.buildVerticalBarChart(dataForGraph, containerDiv, valuesUnit, divWidth, divHeight, margin);
    } else {
      dom.classList.add('hide-section');
    }
  }

  addRemoveClass(boxContainer: string, addClass: boolean) {
    const dom: any = document.querySelector(boxContainer);
    if (addClass) {
      dom.classList.add('hide-section');
    } else {
      dom.classList.remove('hide-section');
    }
  }

  /**
   * Build a vertical bar chart
   * @param {any[]} dataGraph
   * @param {ElementRef} containerDiv
   * @param {number} divWidth
   * @param {number} divHeight
   * @param margin
   */
  buildVerticalBarChart(dataGraph: any[], containerDiv: ElementRef, valuesUnit: string,
                        divWidth: number, divHeight: number, margin: any) {
    // Define chart dimensions
    // const margin = this.margin;
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
            .html((d.variableName) + '<br>' + (d.variableValue) + valuesUnit);
        })
        .on('mouseout', function (d) {
          tooltip.style('display', 'none');
        });
    }
  }

  showGraphByStackedBar(dataGraph: any[], divForGraph: ElementRef, boxContainer: string,
                        valuesUnit: string = this.valuesUnit, digitsDecimals: number,
                        divWidth: number = this.width, divHeight: number = this.height, margin = this.margin) {

    const years = Object.keys(dataGraph);
    const numberOfYears = years.length;
    // verify if the values are different of "NA"

    const dataForGraph = [];
    for (let i = 0; i < numberOfYears; i++) {
      const groupsByYear = dataGraph[years[i]];
      const groups = Object.keys(groupsByYear);
      const numberOfGroups = groups.length;
      const jsonData = {};
      jsonData['ano'] = this.getInstant(years[i]);
      for (let j = 0; j < numberOfGroups; j++) {
        if (typeof  groupsByYear[groups[j]] === 'number') {
          jsonData[this.getInstant(groups[j])] = (digitsDecimals === 0) ? groupsByYear[groups[j]] :
            groupsByYear[groups[j]].toFixed(digitsDecimals);
        }
      }
      if (Object.keys(jsonData).length > 1) {
        dataForGraph.push(jsonData);
      }
    }

    // console.log('data stack:', dataForGraph);

    const dom: any = document.querySelector(boxContainer);
    if (dataForGraph.length > 0) {
      dom.classList.remove('hide-section');
      this.buildStackedBarChart(dataForGraph, divForGraph, valuesUnit, digitsDecimals, divWidth, divHeight, margin);
    } else {
      dom.classList.add('hide-section');
    }
  }

  buildMultiplelineChart(dataGraph: any[], containerDiv: ElementRef, valuesUnit: string, divWidth: number, divHeight: number, margin: any) {
    const width = divWidth - margin.left - margin.right,
      height = divHeight - margin.top - margin.bottom;

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

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    /*const line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) {
        return x(d.variableName);
      })
      .y(function(d) {
        return y(d.variableValue);
      });

    // Define chart dimensions
    // let svg = d3.select(this.element.nativeElement).append('svg')
    const svg = d3.select(containerDiv.nativeElement).append('svg')
      .attr('width', width + this.margin.left + this.margin.right)
      .attr('height', height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');*/


  }

  buildStackedBarChart(dataGraph: any[], containerDiv: ElementRef, valuesUnit: string, digitsDecimals: number,
                       divWidth: number, divHeight: number, margin: any) {
    // Define chart dimensions
    // const margin = this.margin;
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
      const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Prep the tooltip bits, initial display is hidden
      const tooltip = svg.append('g')
        .attr('class', 'toolTip')
        .style('display', 'none');

      tooltip.append('rect')
        .attr('width', 60)
        .attr('height', 20)
        .attr('fill', 'white')
        .style('opacity', 1);

      tooltip.append('text')
        .attr('x', 30)
        .attr('dy', '1.2em')
        .style('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold');

      const x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

      const y = d3.scaleLinear()
        .rangeRound([height, 0]);

      /*const colorRange = d3.scaleOrdinal(d3.schemeCategory10);
      const color = d3.scaleOrdinal(colorRange.range());*/
      // const color = d3.scaleOrdinal(['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728']);
      const color = d3.scaleOrdinal(['#F29F05', '#E7DD7B', '#1f77b4', '#aec7e8', '#88A61B', '#98df8a', '#d62728']);

      const keys = d3.keys(dataGraph[0]).filter(function (key) { return key !== 'ano'; });
      color.domain(keys);

      dataGraph.forEach(function(d) {
        let y0 = 0;
        d.groups = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.groups[d.groups.length - 1].y1;
      });

      // data.sort(function(a, b) { return b.total - a.total; });
      x.domain(dataGraph.map(function(d) { return d.ano; }));
      y.domain([0, d3.max(dataGraph, function(d) { return d.total; })]).nice();

      g.append('g')
        .selectAll('g')
        .data(d3.stack().keys(keys)(dataGraph))
        .enter().append('g')
        .attr('fill', function(d) { return color(d.key); })
        .selectAll('rect')
        .data(function(d) {return d; })
        .enter().append('rect')
          .attr('x', function(d) { return x((<any>d).data.ano); })
          .attr('y', function(d) { return y(d[1]); })
          .attr('height', function(d) { return y(d[0]) - y(d[1]); })
          .attr('width', x.bandwidth())
        .on('mouseover', function() {
          tooltip.style('display', null);
        })
        .on('mouseout', function() { tooltip.style('display', 'none'); })
        .on('mousemove', function(d) {
          // console.log(d);
          const xPosition = d3.mouse(<any>this)[0] - 5;
          const yPosition = d3.mouse(<any>this)[1] - 5;
          tooltip
            .style('display', 'inline-block')
            .attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
          tooltip.select('text').text((d[1] - d[0]).toFixed(digitsDecimals) + valuesUnit);
        });

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      g.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).ticks(null, 's'))
        .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .text(valuesUnit);

      const legend = g.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 9)
        .attr('text-anchor', 'end')
        .selectAll('g')
        .data(keys.slice().reverse())
        .enter().append('g')
        .attr('transform', function(d, i) { return 'translate(75,' + i * 20 + ')'; });

      legend.append('rect')
        .attr('x', width - 19)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', color);

      legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .text(function(d) { return d; });

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
   * @param {number} digitsDecimals. 0, show the number with all decimals. > 0, show the 'n' decimal digits
   * @returns {Array}
   */
  getPropertiesNamesAndValuesForNumbers(document: any, digitsDecimals: number) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    const data = [];
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof  document[prop[i]] === 'number' && document[prop[i]] !== 0) {
        const jsonData = {};
        jsonData['variableName'] = this.getInstant(prop[i]);
        jsonData['variableValue'] = (digitsDecimals === 0) ? document[prop[i]] : document[prop[i]].toFixed(digitsDecimals);
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
   * Function to verify if a school offers a scholaship level
   * @param document
   * @returns {number}
   */
  verifyScholarLevelOffering(document: any) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    // sublevels that offer this type of scholarship
    let sublevels = 0;
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof  document[prop[i]] === 'object') {
        const subnivel = document[prop[i]];
        sublevels += this.verifyYearsOfScholarLevel(subnivel).length > 0 ? 1 : 0;
      }
    }
    return sublevels;
  }

  verifyYearsOfScholarLevel(document: any) {
    const prop = Object.keys(document);
    const numberOfProp = prop.length;
    const anos = [];
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof document[prop[i]] === 'string' && document[prop[i]] !== 'NA') {
        if (document[prop[i]].toUpperCase() === 'SIM') {
          anos.push(prop[i].substring(4)); // For example, remove 'ano' of field 'ano2015'
        }
      }
      if (typeof document[prop[i]] === 'object') {
        if (this.verifyYearsOfScholarLevel(document[prop[i]]).length > 0) {
          anos.push(prop[i]); // For example, remove 'ano' of field 'ano2015'
        }
      }
    }
    return anos;
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
