import { Directive } from '@angular/core';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';

@Directive({
  selector: '[appMap]'
})
export class MapDirective {
  leafletDirective: LeafletDirective;

  constructor(leafletDirective: LeafletDirective) {
    this.leafletDirective = leafletDirective;
    this.resizeMap();
  }

  resizeMap() {
    const map = this.leafletDirective.getMap();
    if (null != map) {
      // Do stuff with the map
      map.invalidateSize();
    }
  }
  getMapp() {
    return this.leafletDirective.getMap();
  }
}
