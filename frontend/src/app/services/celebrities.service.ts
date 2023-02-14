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
  //     id: 'ce377', 
  //     category: ['Bollywood', 'Instagram', 'Acting', 'Bollywood actor', 'actor', 'Director'],
  //     categoryId: ['Bollywood Actor/Actress, Model'],
  //     name: `Naseeruddin Shah`,
  //     otherName: `NaseeruddinShah, Shah Naseeruddin`,
  //     nickName: ``,
  //     fullname: ``,
  //     height: `in feet inches - 5’ 7”`,
  //     weight: '71 Kg',
  //     gender: 'Male',
  //     boyfriend: '',
  //     profession: `Actor, Director`,
  //     professionId: ``,
  //     eyeColor: 'Dark Brown',
  //     hairColor: 'White',
  //     imgSrc: "assets/images/october2022/naseerudin-shah.jpg",
  //     politicalParty: "",
  //     politicalPartyImgSrc: "",
  //     dob: {
  //       date: '20',
  //       month: 'July',
  //       year: '1950'
  //     },
  //     dod: {
  //       date: '',
  //       month: '',
  //       year: ''
  //     },
  //     deathCause: ``,
  //     placeOfDeath: ``,
  //     birthPlace: `Barabanki, Uttar Pradesh, India`,
  //     nationality: 'Indian',
  //     hometown: 'Barabanki, Uttar Pradesh, India',
  //     school: `St. Anselm's Ajmer, Rajasthan<br />
  //     St Joseph's College, Nainital`,
  //     collegeUniversity: `Aligarh Muslim University, Uttar Pradesh<br />
  //     National School of Drama, Delhi`,
  //     qualification: `Graduate in Arts`,
  //     religion: 'Islam',
  //     zodiacSign: 'Leo',
  //     bloodGroup: '',
  //     foodHabit: '',
  //     address: `04, Sand Pebbles, Perry Cross Road, Bandra (West), Mumbai`,
  //     hobbies: `Playing Tennis, Reading`,
  //     debut: {
  //       lyrical: "",
  //       lyricalImgSrc: "",
  //       punjabiFilm: ``,
  //       punjabiFilmImgSrc: "",
  //       bollywoodFilm: `Nishant (1975)`,
  //       bollywoodFilmImgSrc: "",
  //       hollywoodFilm: ``,
  //       hollywoodFilmImgSrc: "",
  //       tollywoodFilm: ``,
  //       tollywoodFilmImgSrc: "",
  //       tamilFilm: '',
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
  //       filmDirection: "Yun Hota to Kya Hota (2006)",
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
  //         controversy:`In an interview in 2016, Naseeruddin Shah referred to late superstar Rajesh Khanna as a "mediocre actor". He further added that a 'poor actor' like Rajesh Khanna was responsible for the mediocrity in films in the 70's. However, the comments did not go well with Khanna's fans and family and Shah was heavily criticized for defaming a deceased superstar.`
  //       },
  //       {
  //         title:``,
  //         controversy:`In May 2016, Anupam Kher raked up a storm on Twitter when he shared a collage of Kashmiri Pandits killed during the 1990 exodus. The tweet came in regard to the killing of Hizbul Mujahideen's 'poster boy' Burhan Wani in an encounter. Shah, however, did not like Kher's tweet and took a dig at his former co-star. He said, "A person who has never lived in Kashmir has started a fight for Kashmiri Pandits. Suddenly, he has become a displaced person." Infuriated by Shah's take, Kher then tweeted, "Shah Saab ki Jai Ho. By that logic, NRIs should not think about India at all.:)"`
  //       },
  //       {
  //         title:``,
  //         controversy:`Shah went to Pakistan in early 2015 to promote his memoir, And Then One Day, at the Lahore Literary Festival. While addressing media and fans at the venue, Shah started talking about the animosity between the two countries. "Indians are being brainwashed into believing that Pakistan is an enemy country without being aware of the historical background. Politicians will change colors whenever it suits them. But artists from both countries must look beyond the political animosity", Shah said. This statement, however, hurt Indian sentiments. Pressure group Shiv Sena even issued a statement saying that only the near and dear ones of the 26/11 victims would understand that why there is so much hatred against Pakistan.`
  //       },
  //     ],
  //     maritalStatus: `Widower`,
  //     affairs: ``,
  //     affairsImgSrc: ``,
  //     wifeOrHusband: `Late Parveen Murada aka Manara Sikri(First wife), Ratna Pathak, Actress`,
  //     wifeOrHusbandImgSrc: `assets/images/october2022/Naseeruddin-Shah-present-wife-Ratna-Pathak.jpg`,
  //     fiance: '',
  //     fianceImgSrc: '',
  //     children: {
  //       son: `Imaad Shah, Vivaan Shah (Both Actors)`,
  //       sonImgSrc: ``,
  //       sonImgSrc1: '',
  //       sonImgSrc2: '',
  //       daughter: `Heeba Shah, Actress (Daughter from first wife)`,
  //       daughterImgSrc: ''
  //     },
  //     parents: {
  //       father: 'Aley Mohammed Shah',
  //       fatherImgSrc: '',
  //       mother: 'Farrukh Sultan',
  //       motherImgSrc: ''
  //     },
  
  //     siblings: {
  //       brother: `Retd. Lt. General Zameerud-din Shah and 2 more`,
  //       brotherImgSrc: '',
  //       sister: `N/A`,
  //       sisterImgSrc: ''
  //     },
  //     favourites: {
  //       food: ``,
  //       fruit: ``,
  //       beverages: ``,
  //       actor: `Mohanlal, Nedumudi Venu, Shammi Kapoor, Dara Singh, Boman Irani`,
  //       actress: ``,
  //       singer: ``,
  //       fashionBrand: ``,
  //       colour: `Black`,
  //       destination: `Dubai`,
  //       sports: `Tennis`,
  //       sportsman: ``,
  //       dress: '',
  //       song: ``,
  //       film: `<strong>Bollywood:</strong> Masaan (2015), Dil Chahta Hai (2001)`,
  //       director: `Neeraj Pandey, Rajkumar Hirani, Neeraj Ghaywan`
  //     },
  //     styleQoutient: {
  //       carsCollection: "",
  //       imgSrc: '',
  //     },
  //     // INR 3 to 4 Crore+/movie (as in 2021)
  //     moneyFactor: {
  //       earning: `Not Known`,
  //       netWorth: 'Not Known',
  //       imgSrc: 'assets/images/october2022/naseerudin-shah-net.jpg'
  //     },
  //     tattoos: [],
  //     facts: {
  //       smoke: 'Not Known',
  //       alcoholic: 'Not Known'
  //     },
  //     otherFacts: [
  //       {
  //         fact: 'Instagram',
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: '',
  //         instaLink: 'https://www.instagram.com/p/B_2G-UVp2HV/embed/'
  //       }, 
  //       {
  //         fact: "Interview",
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: 'https://www.youtube.com/embed/XvjLyUU6FG0?feature=oembed'
  //       },
  //       {
  //         fact: `Naseeruddin started acting (Theatre) at a young age of 14. Shakespeare&#8217;s <em>Merchant of Venice</em> was his first theatrical show.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Not many people know that Naseeruddin is a descendant of a 19th-century warlord named <em>Jan-Fishan Khan</em>. The latter helped the British during the Indian Rebellion of 1857.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Shah&#8217;s debut movie, Nishant (1975), was awarded the National Award in the Best Film category. The film was subsequently nominated for the Oscars.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Rajendra Jaspal, a fellow actor and classmate of Shah, once stabbed him in the canteen of FTII. The former was envious of Shah signing certain films which he believed should have been his.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `His first wife, Late Parveen Murad, was 16 years older than him at the time of their marriage. 2 years later, the couple had a tiff and decided to part ways. However, Shah did not divorce his wife, as in his <i>nikaahnama</i> (Muslim marriage contract), Shah had not only promised a huge amount of money to his wife as alimony but had also disclaimed the right to bigamy.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Even after becoming an established actor, Shah did not give up his love for theater. As a result, he along with a few friends founded a theater group named <em>Motley Productions</em> in the year 1977.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Interestingly, Shah was the first choice to play the role of Mahatma Gandhi in the film- Gandhi (1982). However, Ben Kingsley overshadowed him at the auditions and grabbed the role.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `For his immense contribution to the field of acting/theater, Shah was awarded the <em>Padma Shri</em> in 1987 followed by the <em>Padma Bhushan</em> in 2003.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Aside from Bollywood, Shah has also acted in a number Hollywood and Pakistani movies. His role of <em>Captain Nemo</em> in the 2003 Hollywood flick, <i>The League of Extraordinary Gentlemen, </i>was widely appreciated. Additionally, his second Pakistani film, <i>Zinda Bhaag </i>was selected as the country&#8217;s official entry into the 86th Academy Awards in the Best Foreign Language Film category.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Notably, Shah has been honored with the lifetime membership of International Film And Television Club of Asian Academy of Film and Television.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `His brother, Retd. Lt. General Zameerud-din Shah, is the present (2016) vice-chancellor of Aligarh Muslim University (AMU), UP.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Bad luck has constantly followed Shah as to date more than 20 feature films starring him have been shelved.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `Shah released his memoir titled <em>And Then One day</em> in 2014. In the memoir, the actor has admitted to having consumed marijuana (gaanja) in various phases of his life and credits it with giving him clarity of thought.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //       {
  //         fact: `According to reports, the directors of Harry Potter wanted to audition Naseeruddin Shah for the role of <em>Albus Dumbledore</em>, after the actor who played it passed away prior to the shooting of the third installment of the movie series. Shah, however, refused to audition and the role was passed over to English actor Michael Gambon.`,
  //         imgSrc: '',
  //         imgCaption: '',
  //         videoSrc: ''
  //       },
  //     ],
  //     description: `Naseeruddin Shah (born 20 July 1950) is an Indian actor. He is notable in Indian parallel cinema. He has also starred in international productions. He has won numerous awards in his career, including three National Film Awards, three Filmfare Awards and the Volpi Cup for Best Actor at the Venice Film Festival. The Government of India honoured him with the Padma Shri and the Padma Bhushan awards for his contributions to Indian cinema.`
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