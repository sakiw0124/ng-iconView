import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  styleId = '';
  website = '';
  series = '';
  totalcount: number;

  // Component間的關係: http://oomusou.io/angular/component-interaction/
  onStyleChange(styleId: string) {
    this.styleId = styleId;
  }

  onWebsiteChange(website: string) {
    this.website = website;
  }

  onSeriesChange(series: string) {
    this.series = series;
  }

  onTotalCountChange(totalcount: number) {
    this.totalcount = totalcount;
  }

}
