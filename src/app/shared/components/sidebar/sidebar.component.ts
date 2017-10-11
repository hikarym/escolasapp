import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // headerComponent: HeaderComponent;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  changeLang(language: string) {
    // this.headerComponent.changeLang(language);
    this.translate.use(language);
  }
}
