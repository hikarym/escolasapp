import {Component, OnDestroy, OnInit} from '@angular/core';
import {SchoolService} from '../../../../services/school.service';
import {ShareddataService} from '../../../../services/shareddata.service';
import {MatIconRegistry} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import {iteratorToArray} from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-geral-information',
  templateUrl: './geral-information.component.html',
  styleUrls: ['./geral-information.component.css']
})
export class GeralInformationComponent implements OnInit, OnDestroy {
  schoolSelected: any;
  // Geral Information about a school
  codesc = 'NA';
  nomeesc = 'NA';
  nomemun = 'NA';
  nomdist = 'NA';
  bairro = 'NA';
  end_esc = 'NA';
  num_esc = 'NA';
  tipdep = 'NA';
  localiza = 'NA';
  schoolWasGeolocated = false;

  detalhesAnuais: any;
  mantenedora = 'NA';
  alimentacao = 'NA';
  acessibilidade: any;
  saneamento: any;
  agua = 'NA';
  energia = 'NA';
  esgoto = 'NA';
  lixo = 'NA';
  equipamentos: any;
  dependencias: any;
  local = 'NA';
  quadra = 'NA';

  // ----------------------
  LOCATION = {
    LAT: 0,
    LON: 0,
    CODAP: ''
  };
  // ----------------------
  anos: any[] = [
    { value: 2016, name: '2016' },
    { value: 2015, name: '2015' },
    { value: 2014, name: '2014' },
    { value: 2013, name: '2013' },
    { value: 2012, name: '2012' },
    { value: 2011, name: '2011' },
    { value: 2010, name: '2010' },
    { value: 2009, name: '2009' },
    { value: 2008, name: '2008' },
    { value: 2007, name: '2007' },
    { value: 2005, name: '2005' }
  ];
  yearSelValue = 2016;

  private subscription = new Subscription();

  constructor(private schoolService: SchoolService,
              private sharedDataService: ShareddataService,
              iconRegistry: MatIconRegistry,
              private translate: TranslateService) {
    // this.subscription = this.sharedDataService.getSchoolID().subscribe(message => {this.message = message; } );
    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
    const s = this.sharedDataService.getSchoolInformation().subscribe(
      res => {
        const schoolInformation = res;
        this.getSchoolDetailedInformation(schoolInformation);
      });
    this.subscription.add(s);
  }

  // Invoked from layout.component.ts or from geolocation.component.ts
  getSchoolDetailedInformation(schoolInformation: any) {
    // this.router.navigate([this.URL_ROOT + 'school/school-details/' + schoolID]);
    this.schoolSelected = schoolInformation;

    // Geral Data
    this.codesc = this.schoolSelected.codesc;
    this.nomeesc = this.schoolSelected.detalhes.nomeesc;
    this.nomemun = this.schoolSelected.detalhes.nomemun;
    this.nomdist = this.schoolSelected.detalhes.nomdist;
    this.bairro = this.schoolSelected.detalhes.bairro;
    this.end_esc = this.schoolSelected.detalhes.end_esc;
    this.num_esc = this.schoolSelected.detalhes.num_esc;
    this.tipdep = this.schoolSelected.detalhes.tipdep;
    this.localiza = this.schoolSelected.detalhes.localiza;
    this.schoolWasGeolocated = typeof this.schoolSelected.lon === 'string' ? false : true;
    // Annual Information
    const yearSelFieldName = 'ano' + this.yearSelValue;
    this.loadAnnualDetails(yearSelFieldName);
    this.loadAcessibilidadeInfo(yearSelFieldName);
    this.loadAlimentacaoInfo(yearSelFieldName);
    this.loadSaneamentoInfo(yearSelFieldName);
    this.loadEquipamentosInfo(yearSelFieldName);
    this.loadDependenciasInfo(yearSelFieldName);
  }

  /**
   * Function to show school's information (..of the year chosen)
   */
  onYearChange(yearValueSelected: number) {
    this.yearSelValue = yearValueSelected;
    const yearSelFieldName = 'ano' + yearValueSelected;

    this.loadAnnualDetails(yearSelFieldName);
    this.loadAcessibilidadeInfo(yearSelFieldName);
    this.loadAlimentacaoInfo(yearSelFieldName);
    this.loadSaneamentoInfo(yearSelFieldName);
    this.loadEquipamentosInfo(yearSelFieldName);
    this.loadDependenciasInfo(yearSelFieldName);
  }

  /**
   * Function to load Annual Geral Informations
   */
  loadAnnualDetails(yearFieldName: string) {
    this.detalhesAnuais = this.schoolSelected.detalhesAnuais[yearFieldName];
    this.mantenedora = 'NA';
    if (this.detalhesAnuais) {
      let nfieldsNA = 0;
      const prop = Object.keys(this.detalhesAnuais);
      const numberOfProp = prop.length;

      this.mantenedora = this.detalhesAnuais.mantenedora ? this.getFieldValue(this.detalhesAnuais.mantenedora, 'SIM') : 'NA';
      nfieldsNA += this.mantenedora === 'NA' ? 1 : 0;

      nfieldsNA += this.countFieldsNA(this.detalhesAnuais, 'NA');
      if (nfieldsNA === numberOfProp) {
        this.detalhesAnuais = null;
      }
    }
  }

  /**
   * Function to load accessibility Informations
   */
  loadAcessibilidadeInfo(yearFieldName: string) {
    this.acessibilidade = this.schoolSelected.acessibilidade[yearFieldName];
    if (this.acessibilidade) {
      const prop = Object.keys(this.acessibilidade);
      const numberOfProp = prop.length;

      if (this.countFieldsNA(this.acessibilidade, 'NA') === numberOfProp) {
        this.acessibilidade = null;
      }
    }
  }

  /**
   * Function to load 'alimentacao' Informations
   */
  loadAlimentacaoInfo(yearFieldName: string) {
    this.alimentacao = this.schoolSelected.Alimentacao[yearFieldName];
    if (this.alimentacao === 'NA' ) {
      this.alimentacao = null;
    }
  }

  /**
   * Function to load 'saneamento' Informations
   */
  loadSaneamentoInfo(yearFieldName: string) {
    // Initialize the fields
    this.agua = this.energia = this.esgoto = this.lixo = 'NA';
    this.saneamento = this.schoolSelected.saneamento[yearFieldName];

    if (this.schoolSelected.saneamento && this.saneamento) {
      let nfieldsNA = 0;
      const prop = Object.keys(this.saneamento);
      const numberOfProp = prop.length;
      if (this.saneamento.agua) {
        this.agua = this.getFieldValue(this.saneamento.agua, 'SIM');
        nfieldsNA += this.agua === 'NA' ? 1 : 0;
      } else {
        this.agua = 'NA';
        nfieldsNA += 1;
      }

      if (this.saneamento.energia) {
        this.energia = this.getFieldValue(this.saneamento.energia, 'SIM');
        nfieldsNA += this.energia === 'NA' ? 1 : 0;
      } else {
        this.energia = 'NA';
        nfieldsNA += 1;
      }

      if (this.saneamento.esgoto) {
        this.esgoto = this.getFieldValue(this.saneamento.esgoto, 'SIM');
        nfieldsNA += this.esgoto === 'NA' ? 1 : 0;
      } else {
        this.esgoto = 'NA';
        nfieldsNA += 1;
      }

      if (this.saneamento.lixo) {
        this.lixo = this.getFieldValue(this.saneamento.lixo, 'SIM');
        nfieldsNA += this.lixo === 'NA' ? 1 : 0;
      } else {
        this.lixo = 'NA';
        nfieldsNA += 1;
      }

      if (nfieldsNA === numberOfProp) {
        this.saneamento = null;
      }
    }
  }

  /**
   * Load the 'equipamentos' information
   */
  loadEquipamentosInfo(yearFieldName: string) {
    this.equipamentos = this.schoolSelected.equipamentos[yearFieldName];
    if (this.equipamentos) {
      let nfieldsNA = 0;
      const prop = Object.keys(this.equipamentos);
      const numberOfProp = prop.length;

      if (this.equipamentos.Computador) {
        let nfieldsNA_Comp = 0;
        const prop_Comp = Object.keys(this.equipamentos.Computador);
        const numberOfProp_Comp = prop_Comp.length;
        nfieldsNA_Comp += this.countFieldsNA(this.equipamentos.Computador, 'NA');
        nfieldsNA += nfieldsNA_Comp === numberOfProp_Comp ? 1 : 0;
      }

      if (this.equipamentos.AcessoInternet) {
        let nfieldsNA_AI = 0;
        const prop_AI = Object.keys(this.equipamentos.AcessoInternet);
        const numberOfProp_AI = prop_AI.length;
        nfieldsNA_AI += this.countFieldsNA(this.equipamentos.AcessoInternet, 'NA');
        nfieldsNA += nfieldsNA_AI === numberOfProp_AI ? 1 : 0;
      }

      nfieldsNA += this.countFieldsNA(this.equipamentos, 'NA');
      if (nfieldsNA === numberOfProp) {
        this.equipamentos = null;
      }
    }
  }

  /**
   * Load the 'dependencias' information
   */
  loadDependenciasInfo(yearFieldName: string) {
    this.dependencias = this.schoolSelected.dependencias[yearFieldName];
    if (this.dependencias) {
      let nfieldsNA = 0;
      const prop = Object.keys(this.dependencias);
      const numberOfProp = prop.length;

      this.local = this.dependencias.local;
      if (this.local) {
        this.local = this.dependencias.local ? this.getFieldValue(this.local, 'SIM') : 'NA';
        nfieldsNA += this.local === 'NA' ? 1 : 0;
      }

      if (this.dependencias.formaOcupacao) {
        let nfieldsNA_tmp = 0;
        const prop_tmp = Object.keys(this.dependencias.formaOcupacao);
        const numberOfProp_tmp = prop_tmp.length;
        nfieldsNA_tmp += this.countFieldsNA(this.dependencias.formaOcupacao, 'NA');
        if (nfieldsNA_tmp === numberOfProp_tmp) {
          nfieldsNA += 1;
        }
      }

      this.quadra = this.dependencias.Quadra;
      if (this.quadra) {
        if (typeof this.quadra === 'object') {
          if (this.getFieldValue(this.quadra, 'SIM') === 'NA') {
            this.quadra = null;
            nfieldsNA += 1;
          } else {
            this.quadra = 'Sim';
          }
        }
      }

      nfieldsNA += this.countFieldsNA(this.dependencias, 'NA');
      if (nfieldsNA === numberOfProp) {
        this.dependencias = null;
      }
    }
  }

  /**
   * Return the translation of a word
   */
  getInstant(key) {
    return this.translate.instant(key);
    // return this.translate.get(key).subscribe(data => data)
  }

  /**
   * Return fields which are equals to 'specific value'
   */
  getFieldValue(fieldJSON: string, token: string) {
    let field = '';
    const prop = Object.keys(fieldJSON);
    const numberOfProp = prop.length;
    for (let i = 0; i < numberOfProp; i++) {
      if (fieldJSON[prop[i]].toUpperCase() === token) {
        field += this.getInstant(prop[i]) + ', ';
      }
    }
    return (field !== '' ? field.slice(0, -2) : 'NA');
  }

  /**
   * Determine whether the all document's fields are 'NA'
   */
  countFieldsNA(fieldJSON: string, token: string) {
    let nfieldsNA = 0;
    const prop = Object.keys(fieldJSON);
    const numberOfProp = prop.length;
    for (let i = 0; i < numberOfProp; i++) {
      if (typeof fieldJSON[prop[i]] === 'string' &&  fieldJSON[prop[i]].toUpperCase() === token) {
        nfieldsNA += 1;
      }
    }
    return nfieldsNA;
  }

  // unsubscribe to ensure no memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



