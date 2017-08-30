import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root', // nome do rotulo que se usará quando vai ser representado
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// classe para exportar todas a propriedades e metodos que desejem ser usados desde a vista
export class AppComponent {

  constructor (private translate: TranslateService) {
    translate.addLangs(['pt', 'en']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/pt|en/) ? browserLang : 'en');
  }
}


