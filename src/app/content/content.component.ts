import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() styleId: string;
  @Input() series: string;

  constructor() { }

  ngOnInit() {
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
