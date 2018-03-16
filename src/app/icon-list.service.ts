import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IconListService {

  webSiteList = [];
  seriesList = [];

  constructor(private http: Http) { }

  getStyleList(): Observable<any> {
    return this.http.get('../assets/mock-data/styleList.json');
  }

  getWebSite(): Observable<any> {
    return this.http.get('../assets/mock-data/webSiteList.json');
  }
  getWebSiteOld() {
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

  getSeriesList(selectWebSite): Observable<any> {
    return this.http.get('../assets/mock-data/' + selectWebSite + '/000_directory.json');
  }

  getIconList(selectWebSite, selectSeries): Observable<any> {
    return this.http.get('../assets/mock-data/' + selectWebSite + '/' + selectSeries + '.json');
  }
}
