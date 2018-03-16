import { Component, OnChanges, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { IconListService } from './../icon-list.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnChanges {

  @Input() styleId: string;
  @Input() website: string;
  @Input() series: string;
  @Input() totalcount: number;
  @Output() countChange = new EventEmitter<number>();
  iconList = [];

  constructor(private iconListService: IconListService) { }

  // 注意生命週期, https://ithelp.ithome.com.tw/articles/10188047
  // OnInit只有一次的話, 為了content.component會一直接收header的值, 直接改為OnChanges, 因為不知道OnInit跟OnChanges一起用的方式
  // 不要implements, 用onChange()跟onInit() -> 不行, onInit()啟動不了
  ngOnChanges() {
    if ( this.website !== null && this.website !== '' && this.website !== 'undefined' &&
         this.series !== null && this.series !== '' && this.series !== 'undefined') {
      this.iconListService.getIconList(this.website, this.series).subscribe(
        data => {
          this.iconList = data.json();
          this.countChange.emit(this.iconList.length);
        },
        error => {
          console.log('error:' + error);
        },
        () => { // complete
        }
      );
    }
  }

  getClass(styleId) {
    if ( this.styleId != null && styleId != null ) {
      styleId = styleId + '-' + this.styleId;
    }
    return styleId;
  }

  getWhiteClass(styleId) {
    if ( this.styleId != null && styleId != null ) {
      if (this.series.search('white') > 0 || this.series.search('general1-light') > 0 ||
          this.series.search('general2-light') > 0 || this.series.search('general3-light') > 0 ||
          this.series.search('general4-light') > 0 ) {
          styleId = styleId + '-white' + '-' + this.styleId;
      } else {
          styleId = '';
      }
    }
    return styleId;
  }

}
