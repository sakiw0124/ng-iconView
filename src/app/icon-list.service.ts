import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IconListService {

  webSiteList = [];
  seriesList = [];

  constructor(private http: Http) { }

  getWebSite() {
    this.webSiteList = [
      { 'website' : 'Collection' },
      { 'website' : 'customicondesign.com' },
      { 'website' : 'Double-JDesign' },
      { 'website' : 'DryIcons.com' },
      { 'website' : 'Fasticon.com' },
      { 'website' : 'freeiconsdownload.com' },
      { 'website' : 'iconshock.com' },
      { 'website' : 'iconspedia.com' },
      { 'website' : 'VistaIcons.com' }
    ];
    return this.webSiteList;
  }

  getSeriesList(selectWebSite) {
    switch (selectWebSite) {
      case 'Collection':
        this.seriesList = [
          { 'series' : 'diagram' },
          { 'series' : 'diagram_v2' },
          { 'series' : 'Drifting_psp' }
        ];
        break;
      case 'customicondesign.com':
        this.seriesList = [
          { 'series' : 'customicondesign-cute1' },
          { 'series' : 'customicondesign-flag2' },
          { 'series' : 'customicondesign-flags' },
          { 'series' : 'customicondesign-line-user-white' }
        ];
        break;
    }
    return this.seriesList;
  }
}
