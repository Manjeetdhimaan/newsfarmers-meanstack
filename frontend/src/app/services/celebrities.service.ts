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
  celebrities: any;
  users: any;
  url: string = 'https://www.newsfarmers.com/';
  localUrl: string = ''; // local server host and port
  getSearchedCelebrity = new Subject<any>();
  getSelectedCategories = new Subject<any>();
  getActiveClass = new Subject<boolean>();
  domain = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

  constructor(private http: HttpClient) {
    // this.http.get(`https://www.newsfarmers.com/api/Celebrity`).subscribe((cel: any) => {
    //   this.celebrities = cel.slice();
    // })
    this.http.get(`${this.localUrl}/api/Celebrity`).subscribe((cel: any) => {
      this.celebrities = cel.slice();
    })
    
    // this.http.get(`api/Celebrity`).subscribe((cel: any) => {
    //   this.celebrities = cel.slice();
    // })
  }

  getCel() {
    return this.celebrities.slice();
  }

  selectedCelebrity(selected: any) {
    const selectedCelebrity = selected.name.toLowerCase().split(' ').join('-');
    return selectedCelebrity;
  }

  async getCelebrities() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity`))
    // return await this.http.get(`https://www.newsfarmers.com/api/Celebrity`).toPromise();
    return await this.http.get(`${this.localUrl}/api/Celebrity`).toPromise();
     // while deploying with integrated approach
     // return await this.http.get(`api/Celebrity`).toPromise();
  }

  async getRecentCelebrities() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity/getRecentCelebrities`))
    // return await this.http.get(`https://www.newsfarmers.com/api/Celebrity/getRecentCelebrities`).toPromise();
    return await this.http.get(`${this.localUrl}/api/Celebrity/getRecentCelebrities`).toPromise();
     // while deploying with integrated approach
     // return await this.http.get(`api/Celebrity/getRecentCelebrities`).toPromise();
  }

  async getCelebrity(celebrity: any) {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity`))
    // return await this.http.get(`https://www.newsfarmers.com/api/Celebrity/getCelebrity/${celebrity}`).toPromise();
    return await this.http.get(`${this.localUrl}/api/Celebrity/getCelebrity/${celebrity}`).toPromise();
     // while deploying with integrated approach
     // return await this.http.get(`api/Celebrity/getCelebrity/${celebrity}`).toPromise();
  }

  async getFilteredCelebrities(filter: any) {
    // return await this.http.get(`https://www.newsfarmers.com/api/Celebrity/getFilteredCelebrities`).toPromise();
    return await this.http.get(`${this.localUrl}/api/Celebrity/getFilteredCelebrities/${filter}`).toPromise();
     // while deploying with integrated approach
     // return await this.http.get(`api/Celebrity/getFilteredCelebrities`).toPromise();
  }

  async getRandomCelebrity() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity/getRandomCelebrity`))
    // return await this.http.get(`https://www.newsfarmers.com/api/Celebrity/getRandomCelebrity`).toPromise();
    return await this.http.get(`${this.localUrl}/api/Celebrity/getRandomCelebrity`).toPromise();
     // while deploying with integrated approach
     // return await this.http.get(`api/Celebrity/getRandomCelebrity`).toPromise();
  }

  async getRandomCelebrityForHome() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity/getRandomCelebrityForHome`))
    // return await this.http.get(`https://www.newsfarmers.com/api/Celebrity/getRandomCelebrityForHome`).toPromise();
    return await this.http.get(`${this.localUrl}/api/Celebrity/getRandomCelebrityForHome`).toPromise();
     // while deploying with integrated approach
     // return await this.http.get(`api/Celebrity/getRandomCelebrityForHome`).toPromise();
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