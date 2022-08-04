import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CelebritiesService {
  //'lyricist', 'writer', 'Song writer', 'Music Composer' ,'music director', 'music composer', 'Punjabi singer', 'Singer', 'Record Producer', 'punjabi actress', 'actress', 'model', 'Film Producer', 'Rapper', 'Anchor', 'Director', 'Screenwriter', 'Dialogue writer, 'Film director'

  // {
  //   tattoo: `On His Wrist: Written "Awara" in hindi`,
  //   tattooImgSrc: 'assets/images/march2022/Ranbir-Kapoors-Tattoo-On-His-Wrist.webp',
  //   imgCaption: '',
  //   videoSrc: ''
  // },
  celebrities:any
  constructor(private http: HttpClient) {
   }
   
  users: any;
  url: string = 'https://www.newsfarmers.com/';
  getSearchedCelebrity = new Subject<any>();
  getSelectedCategories = new Subject<any>();
  getActiveClass = new Subject<boolean>();
  domain = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

  selectedCelebrity(selected: any) {
    const selectedCelebrity = selected.name.toLowerCase().split(' ').join('-');
    return selectedCelebrity;
  }

  async getCelebrities() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity`))
    return await this.http.get(`getCelebrity`).toPromise();
    // return this.celebrities.slice();
  }

  // # HTTPS forced

  // <IfModule mod_rewrite.c>

  // RewriteEngine On

  // RewriteCond %{HTTPS} off
  // ErrorDocument 404 /index.html

  // RewriteRule ^(.*)$ https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
  // Header always set Content-Security-Policy "upgrade-insecure-requests;"

  // </IfModule>

 
}