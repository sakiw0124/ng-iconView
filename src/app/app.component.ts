import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  styleId = 's' + new Date().getDay();
  // 不能設空值, null, 奇怪
  series = 'diagram';

  getStyleId(newObj: string) {
    this.styleId = newObj;
  }

  getSeries(newObj: string) {
    this.series = newObj;
  }

}
