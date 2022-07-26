import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsArray:any;
  constructor(private http: HttpClient) {
    this.http.get(`https://www.newsfarmers.com/api/News`).subscribe((news: any) => {
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
           return await this.http.get(`https://www.newsfarmers.com/api/News`).toPromise();

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
