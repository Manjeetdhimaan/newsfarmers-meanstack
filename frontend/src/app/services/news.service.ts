import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsArray:any;
  constructor(private http: HttpClient) {
    this.http.get(`https://www.newsfarmers.com/getNews`).subscribe((news: any) => {
      this.newsArray = news;
    })
   }

   onGetNews() {
    return this.newsArray.slice();
   }

   async getNews(){
   return await this.http.get(`https://www.newsfarmers.com/getNews`).toPromise();
  //  return this.newsArray.slice();
 }

 getSearchedNews = new Subject<{}>();
 selectedNews:any;

 hoverSelectedNews(selected: any) {
  const selectedNews = selected.urlTitle?.toLowerCase().split(' ').join('-')? selected.urlTitle?.toLowerCase().split(' ').join('-'):selected.title.toLowerCase().split(' ').join('-');
  return selectedNews;
 }
  
}
