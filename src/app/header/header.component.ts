import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IconListService } from './../icon-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {

  @Input() styleId: string;
  @Input() website: string;
  @Input() series: string;
  @Input() totalcount: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() styleIdChange = new EventEmitter();
  @Output() websiteChange = new EventEmitter();
  @Output() seriesChange = new EventEmitter();
  @Output() keywordChange = new EventEmitter();
  @Output() sortTypeChange = new EventEmitter();
  sorticon = 'fa fa-sort';
  flag = 'O';
  // totalcount = 0;
  websiteList = [];
  seriesList = [];
  styleList = [];
  keyword = '';

  constructor(private iconListService: IconListService) { }

  ngOnChanges() {
    // 所有@Input的change都會跑, 所以要判斷讓他不要重複
    if ( this.website === null || this.website === '' || this.series === null || this.series === '' ) {
      // this.websiteList = this.iconListService.websiteList;
      // 可以直接取用Service的變數, 但固定值沒有意義, 不會自己去呼叫class
      // this.websiteList = this.iconListService.getWebSite();
      // 類似上述做法，只是固定在Service的值一樣沒有意義
      this.iconListService.getWebSite().subscribe(
        data => {
          this.websiteList = data.json();
          if ( this.websiteList.length > 0 ) {
            this.website = this.websiteList[0].website;
          }
          // this.seriesList = this.iconListService.getSeriesList(this.website);
          this.iconListService.getSeriesList(this.website).subscribe(
            data2 => {
              this.seriesList = data2.json();
              if ( this.seriesList.length > 0 ) {
                this.series = this.seriesList[0].series;
                // 一組取得才一起送出, 否則ngOnChanages會跑很多次
                this.websiteChange.emit(this.website);
                this.seriesChange.emit(this.series);
              }
            },
            error => {
              console.log('get series list error:' + error);
            },
            () => { // complete
            }
          );
        },
        error => {
          console.log('get website list error:' + error);
        },
        () => { // complete
        }
      );
    }
    if ( this.styleList.length <= 0 ) {
      this.iconListService.getStyleList().subscribe(
        data => {
          this.styleList = data.json();
          if ( this.styleId === null || this.styleId === '' || this.styleId === 'undefined' ) {
            this.styleId = 's' + new Date().getDay();
            this.styleIdChange.emit(this.styleId);
          }
        },
        error => {
          console.log('get style list error:' + error);
        },
        () => {
        }
      );
    }
  }

  onKey(event: any) {
    this.keyword = event.target.value;
    this.keywordChange.emit(this.keyword);
  }

  clearKeyword() {
    this.keyword = '';
    this.keywordChange.emit(this.keyword);
  }

  changeSorting() {
    // sorttype: O=>Original=>原始, A=>ASC=>遞增, D=>DESC=>遞減, 順序O=>A=>D
    switch (this.flag) {
      case 'D':
        this.sorticon = 'fa fa-sort';
        this.flag = 'O';
        break;
      case 'O':
        this.sorticon = 'fa fa-sort-alpha-asc';
        this.flag = 'A';
        break;
      case 'A':
        this.sorticon = 'fa fa-sort-alpha-desc';
        this.flag = 'D';
        break;
      default:
        this.sorticon = 'fa fa-sort';
        this.flag = 'O';
        break;
    }
    this.sortTypeChange.emit(this.flag);
  }

  styleChange() {
    this.styleIdChange.emit(this.styleId);
  }

  getClass(styleId) {
    if ( this.styleId != null && styleId != null ) {
      styleId = styleId + '-' + this.styleId;
    }
    return styleId;
  }

  onWebsiteChange(newObj) {
    this.website = newObj;
    if (this.website !== null && this.website !== '' && this.website !== 'undefined') {
      // this.seriesList = this.iconListService.getSeriesList(this.website);
      this.iconListService.getSeriesList(this.website).subscribe(
        data => {
          this.seriesList = data.json();
          if ( this.seriesList.length > 0 ) {
            this.series = this.seriesList[0].series;
            this.websiteChange.emit(this.website);
            this.seriesChange.emit(this.series);
          }
        },
        error => {
          console.log('get series list error:' + error);
        },
        () => { // complete
        }
      );
    }
  }

  onSeriesChange(newObj) {
    this.series = newObj;
    // 這裡是不是要推送去外層讓其他component知道這個值?
    this.seriesChange.emit(this.series);
  }

}
