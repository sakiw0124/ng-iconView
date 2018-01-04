import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconListService } from './../icon-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() styleId: string;
  @Input() series: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() styleIdTransfer = new EventEmitter();
  @Output() seriesTransfer = new EventEmitter();
  sorticon = 'fa fa-sort';
  keyword = '';
  flag = 'B';
  totalcount = 0;
  webSite = '';
  webSiteList = [];
  seriesList = [];

  constructor(private iconListService: IconListService) { }

  ngOnInit() {
    // this.webSiteList = this.iconListService.webSiteList;
    // 可以直接取用Service的變數, 但固定值沒有意義, 不會自己去呼叫class
    this.webSiteList = this.iconListService.getWebSite();
    if ( this.webSiteList.length > 0 ) {
      this.webSite = this.webSiteList[0].website;
    }
    this.seriesList = this.iconListService.getSeriesList(this.webSite);
    if ( this.seriesList.length > 0 ) {
      this.series = this.seriesList[0].series;
      this.seriesTransfer.emit(this.series);
    }
  }

  clearKeyword() {
    this.keyword = '';
  }

  changeSorting() {
    switch (this.flag) {
      case 'A':
        this.sorticon = 'fa fa-sort';
        this.flag = 'B';
        break;
      case 'B':
        this.sorticon = 'fa fa-sort-alpha-asc';
        this.flag = 'C';
        break;
      case 'C':
        this.sorticon = 'fa fa-sort-alpha-desc';
        this.flag = 'A';
        break;
      default:
        this.sorticon = 'fa fa-sort';
        this.flag = 'B';
        break;
    }
  }

  styleChange() {
    this.styleIdTransfer.emit(this.styleId);
  }

  getClass(styleId) {
    if ( this.styleId != null && styleId != null ) {
      styleId = styleId + '-' + this.styleId;
    }
    return styleId;
  }

  websiteChange(newObj) {
    this.webSite = newObj;
    this.seriesList = this.iconListService.getSeriesList(this.webSite);
    if ( this.seriesList.length > 0 ) {
      this.series = this.seriesList[0].series;
      this.seriesTransfer.emit(this.series);
    }
  }

  seriesChange(newObj) {
    this.series = newObj;
    this.seriesTransfer.emit(this.series);
  }

}
