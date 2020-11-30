import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientA';
  resultsR : Object[];
  resultsA : Object[];
  obs : Observable<Object>;

  constructor(private http : HttpClient, private sanitizer: DomSanitizer) {}

  load10Rest()
  {
    this.obs = this.http.get("https://3000-cadd6fbb-9549-45fd-a9c3-bd515ae6151e.ws-eu01.gitpod.io/users/borough");
    this.obs.subscribe(this.getDataR);
  }
  load10MoviesAction()
  {
    this.obs = this.http.get("https://3000-cadd6fbb-9549-45fd-a9c3-bd515ae6151e.ws-eu01.gitpod.io/users/action");
    this.obs.subscribe(this.getDataA);
  }
  getDataR = (data) => {
    this.resultsR = data;
  }
  getDataA = (data) => {
    this.resultsA = data;
  }

  photoURL(urltoSanitize) {
    console.log(urltoSanitize);
    if (urltoSanitize == undefined){
      return false;
    }
    return this.sanitizer.bypassSecurityTrustUrl(urltoSanitize);
  }

}
