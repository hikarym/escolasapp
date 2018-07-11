import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {googleAnalytics} from '../assets/script';
import {NavigationStart, Router} from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root', // nome do rotulo que se usará quando vai ser representado
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// classe para exportar todas a propriedades e metodos que desejem ser usados desde a vista
export class AppComponent {

  private defaultLang = 'pt';
  constructor (private translate: TranslateService, private router: Router) {
    this.translate.addLangs(['pt', 'en']);
    this.translate.setDefaultLang(this.defaultLang);
    // this.translate.getTranslation(this.defaultLang).subscribe(() => {});
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/pt|en/) ? browserLang : 'pt');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.defaultLang);

    // Google Analytics
    this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
      const url = event['url'];
      if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
        googleAnalytics(url);
      }
    });
  }
}


