import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsArray:any;
  url= 'https://www.newsfarmers.com/';
  localUrl = '' // localhost port here...
  constructor(private http: HttpClient) {
    this.http.get(`${environment.baseApiUrl}/News`).subscribe((news: any) => {
      this.newsArray = news;
    })

    // while deploying with integrated approach
        // this.http.get(`api/News`).subscribe((news: any) => {
        //   this.newsArray = news;
        // })
   }

   onGetNews() {
    return this.newsArray.slice();
   }

   async getNews(){
  // for testing purpose or when deploying separately from server side
           return await this.http.get(`${environment.baseApiUrl}/News`).toPromise();

  // while deploying with integrated approach
      //  return await this.http.get(`api/News`).toPromise();
 }

 getSearchedNews = new Subject<{}>();
 selectedNews:any;

 hoverSelectedNews(selected: any) {
  const selectedNews = selected.urlTitle?.toLowerCase().split(' ').join('-')? selected.urlTitle?.toLowerCase().split(' ').join('-'):selected.title.toLowerCase().split(' ').join('-');
  return selectedNews;
 }
  
}
