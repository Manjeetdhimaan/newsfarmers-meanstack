import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  celebrities: any
  //  =
  //  [
  //   {
  //     id: 'ce379', 
  //     category: ['Bollywood', 'Instagram', 'Acting', 'Bollywood actress', 'actress', 'Director', 'Tollywood Actress', 'Tollywood', 'South', 'South Cinema', 'South Indian'],
  //     categoryId: ['Bollywood Actor/Actress, Model', 'Tollywood Actor/Actress'],
  //     name: `Kajal Aggarwal`,
  //     otherName: `Kajal A Kitchlu, Kajal Agarwal`,
  //     nickName: `Kaju`,
  //     fullname: ``,
  //     height: `in feet inches - 5’ 5”`,
  //     weight: '55 Kg',
  //     gender: 'Female',
  //     boyfriend: '',
  //     profession: `Actress, Model`,
  //     professionId: ``,
  //     eyeColor: 'Black',
  //     hairColor: 'Dark Brown',
  //     imgSrc: "assets/images/february2023/kajal-aggarwal.jpg",
  //     politicalParty: "",
  //     politicalPartyImgSrc: "",
  //     dob: {
  //       date: '19',
  //       month: 'June',
  //       year: '1985'
  //     },
  //     dod: {
  //       date: '',
  //       month: '',
  //       year: ''
  //     },
  //     deathCause: ``,
  //     placeOfDeath: ``,
  //     birthPlace: `Mumbai, Maharashtra, India`,
  //     nationality: 'Indian',
  //     hometown: 'Mumbai, Maharashtra, India',
  //     school: `St. Anne's High School, Mumbai`,
  //     collegeUniversity: `Jai Hind College, Mumbai<br />
  //     K.C. College, Mumbai`,
  //     qualification: `Degree in Mass Media specializing in Advertising and Marketing`,
  //     religion: 'Hinduism',
  //     zodiacSign: 'Gemini',
  //     bloodGroup: '',
  //     foodHabit: '',
  //     address: ``,
  //     hobbies: `Dancing, Doing Yoga, Reading`,
  //     debut: {
  //       lyrical: "",
  //       lyricalImgSrc: "",
  //       punjabiFilm: ``,
  //       punjabiFilmImgSrc: "",
  //       bollywoodFilm: `Kyun! Ho Gaya Na (2004)`,
  //       bollywoodFilmImgSrc: "",
  //       hollywoodFilm: ``,
  //       hollywoodFilmImgSrc: "",
  //       tollywoodFilm: `Lakshmi Kalyanam (2007)`,
  //       tollywoodFilmImgSrc: "",
  //       tamilFilm: 'Pazhani (2008)',
  //       tamilFilmImgSrc: "",
  //       kannadaFilm: '',
  //       kannadaFilmImgSrc: "",
  //       punjabiAlbum: '',
  //       punjabiAlbumImgSrc: "",
  //       hindiAlbum: '',
  //       hindiAlbumImgSrc: "",
  //       singles: ``,
  //       singlesImgSrc: "",
  //       musicDirection: "",
  //       musicDirectionImgSrc: "",
  //       filmDirection: "",
  //       filmDirectionImgSrc: "",
  //       tv: ``,
  //       tvImgSrc: "",
  //       webSeries: "",
  //       webSeriesImgSrc: "",
  //       production: "",
  //       productionImgSrc: "",
  //       filmWriter: "",
  //       filmWriterImgSrc: "",
  //       lastSong: ``,
  //       lastSongImgSrc: ``,
  //       lastFilm: ``,
  //       lastFilmImgSrc: ``
  //     },
  //     awards: [],
  //     controversies: [
  //       {
  //         title:``,
  //         controversy:`Once FHM magazine issued a topless photo of her, but she later admitted that it was an altered picture of her.`
  //       }
  //     ],
  //     maritalStatus: `Married`,
  //     affairs: ``,
  //     affairsImgSrc: ``,
  //     wifeOrHusband: `Gautam Kitchlu (Mumbai-based entrepreneur)`,
  //     wifeOrHusbandImgSrc: `assets/images/february2023/kajal-aggarwal-with-husband.jpg`,
  //     fiance: '',
  //     fianceImgSrc: '',
  //     children: {
  //       son: `Neil Kitchlu`,
  //       sonImgSrc: `assets/images/february2023/kajal-aggarwal-with-son.jpg`,
  //       sonImgSrc1: '',
  //       sonImgSrc2: '',
  //       daughter: ``,
  //       daughterImgSrc: ''
  //     },
  //     parents: {
  //       father: 'Vinay Aggarwal (Entrepreneur)',
  //       fatherImgSrc: '',
  //       mother: 'Suman Aggarwal (Confectioner)',
  //       motherImgSrc: 'assets/images/february2023/Kajal-Aggarwal-with-her-parents.jpg'
  //     },
  
  //     siblings: {
  //       brother: `None`,
  //       brotherImgSrc: '',
  //       sister: `Nisha Agarwal (Actress)`,
  //       sisterImgSrc: ''
  //     },
  //     favourites: {
  //       food: `Hyderabadi Biryani`,
  //       fruit: ``,
  //       beverages: ``,
  //       actor: `Junior NTR, Vijay`,
  //       actress: `Aishwarya Rai Bachchan`,
  //       singer: ``,
  //       fashionBrand: ``,
  //       colour: `White, Red, Blue`,
  //       destination: `Goa, Kerela`,
  //       sports: ``,
  //       sportsman: ``,
  //       dress: '',
  //       song: ``,
  //       film: `Dilwale Dulhania Le Jayenge`,
  //       director: `The Shiva Trilogy by Amish Tripathi, The Bridges of Madison County<br />
  //       by Robert James Walle`
  //     },
  //     styleQoutient: {
  //       carsCollection: "",
  //       imgSrc: '',
  //     },
  //     // INR 3 to 4 Crore+/movie (as in 2021)
  //     moneyFactor: {
  //       earning: `₹1-2 crore/film`,
  //       netWorth: 'Rs. 66 crores',
  //       imgSrc: 'assets/images/february2023/kajal-aggarwal-net.jpg'
  //     },
  //     tattoos: [],
  //     facts: {
  //       smoke: 'No',
  //       alcoholic: 'No'
  //     },
  //     otherFacts: [
  //       {
  //         fact: 'Instagram',
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: '',
  //         instaLink: 'https://www.instagram.com/p/Coq301rBkqD/embed/'
  //       }, 
  //       {
  //         fact: "Interview",
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: 'https://www.youtube.com/embed/1F0UxXaGN3c?feature=oembed'
  //       },
  //       {
  //         fact: `Kajal was born into a middle-class Punjabi family with roots in Amritsar`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `When she was doing her final year internship with L&#8217;Oreal, a photographer recommended her to try her luck in modelling. Later, she had a photo shoot; and as a result, she grabbed her first South Indian film alongside Nana Patekar.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Kajal is also known as <em>Miss Congeniality</em> in the South Indian film industry due to her friendly nature and ability to get along with others well.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `She is a good friend of actress Tamannaah Bhatia and actor Ram Charan.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `She has fear of dogs.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `She did few Hindi films like <em>Kyun! Ho Gaya Na, S</em><em>ingham </em>and <em>Special 26</em>.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `She supports PETA&#8217;s initiative to <em>Ban Animal Circuse</em>s to stop the torture faced by animals in circuses.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `In 2010, she won the CineMAA Award for Best Actress (Telugu) for the film <em>Brindaavanam.</em>`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `In 2013, she was declared as the Youth Icon of South Indian Cinema.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `On 17 October 2021, the actress and her husband, Gautam Kitchlu, took to Instagram to introduce a puppy, Mia, as their first child.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       }
  //     ],
  //     description: `Kajal Aggarwal (born 19 June 1985) is an Indian actress and model who mainly appears in Telugu and Tamil language films, in addition to a few Hindi films. Aggarwal has worked in more than 50 films and also received two South Indian International Movie Awards.`
  //   }
  // ];
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
    this.http.get(`${environment.baseApiUrl}/Celebrity`).subscribe((celRes: any) => {
      this.celebrities = celRes.slice();
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
    return await this.http.get(`${environment.baseApiUrl}/Celebrity`).toPromise();
  }

  async getRecentCelebrities() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity/getRecentCelebrities`))
    return await this.http.get(`${environment.baseApiUrl}/Celebrity/getRecentCelebrities`).toPromise();
  }

  async getCelebrity(celebrity: any) {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity`))
    return await this.http.get(`${environment.baseApiUrl}/Celebrity/getCelebrity/${celebrity}`).toPromise();
  }

  async getFilteredCelebrities(filter: any) {
    return await this.http.get(`${environment.baseApiUrl}/Celebrity/getFilteredCelebrities/${filter}`).toPromise();
  }

  async getRandomCelebrity() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity/getRandomCelebrity`))
    return await this.http.get(`${environment.baseApiUrl}/Celebrity/getRandomCelebrity`).toPromise();
  }

  async getRandomCelebrityForHome() {
    // return await Promise.resolve(this.http.get(`https://www.newsfarmers.com/getCelebrity/getRandomCelebrityForHome`))
    return await this.http.get(`${environment.baseApiUrl}/Celebrity/getRandomCelebrityForHome`).toPromise();
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