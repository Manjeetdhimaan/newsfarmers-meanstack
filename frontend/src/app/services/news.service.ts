import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
   }
  
   async getNews(){
   return await this.http.get(`getNews`).toPromise();
  //  return this.newsArray.slice();
 }

 getSearchedNews = new Subject<{}>();
 selectedNews:any;

 hoverSelectedNews(selected: any) {
  const selectedNews = selected.urlTitle?.toLowerCase().split(' ').join('-')? selected.urlTitle?.toLowerCase().split(' ').join('-'):selected.title.toLowerCase().split(' ').join('-');
  return selectedNews;
 }
  
}
