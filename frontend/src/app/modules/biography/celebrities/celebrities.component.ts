import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CelebritiesService } from 'src/app/services/celebrities.service';
import { Meta } from '@angular/platform-browser';
import { ToasTMessageService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css'],
})

export class CelebritiesComponent implements OnInit, OnDestroy {
  imgUrl: any = 'assets/images/no-preview.png';
  celebrities: any[] = [];
  celebrity: any;
  currentYear: number = new Date().getFullYear();
  dobOfCelebrity: any;
  dodOfCelebrity: any;
  exactDOB: any;
  relatedPostArray: any[] = [];
  searchText: any;
  recentPost: any;
  isLoading = false;
  isError = false;
  next: any;
  previous: any;
  borderColor = "black"
  subscription: Subscription;
  celebrityWhileError:string;

  constructor(private celebritiesService: CelebritiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta, private toastService: ToasTMessageService) {
    // this.meta.addTag({ name: 'description', content: 'biography' });
    // this.meta.addTag({ name: 'description', content: 'biography' },true);
    // this.meta.addTag({ name: 'author', content: 'newsfarmers' });
    // this.meta.addTag({ name: 'author', content: 'newsfarmers' });
    router.events
      .subscribe((event: any) => {
        if (event.navigationTrigger === 'popstate') {
          this.isLoading = true;
          // this.recentPost = this.celebritiesService.getCelebrities().slice(-8).reverse();
          // this.celebrities = this.celebritiesService.getCelebrities();
          activatedRoute.params.subscribe((param: Params) => {
            if(this.celebritiesService.celebrities){
              const celebrities = this.celebritiesService.celebrities;
              celebrities.map((celebrity: any) => {
                this.recentPost = celebrities.slice(-8).reverse();
                this.celebrities = celebrities;
                if (this.router.url.toLowerCase() == "/" + celebrity.name.toLowerCase().split(' ').join('-')) {
                  this.router.url.toLowerCase();
                  this.celebrity = celebrity;
                  this.dobOfCelebrity = this.celebrity.dob.year;
                  this.dodOfCelebrity = this.celebrity.dod?.year;
                  this.exactDOB = this.celebrity.dob.year + '-' + this.celebrity.month + '-' + this.celebrity.date;
                  this.relatedPostArray = [];
                  const Celebrities = celebrities.slice();
                  const suffledArray = Celebrities.sort(() => 0.5 - Math.random());
                  // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
                  const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
                  suffledArray.filter((shuffleCelebrity: any) => {
                    let randomCelebrity = shuffleCelebrity.categoryId.map((a: any) => a?.toLowerCase());
                    if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
                      this.relatedPostArray.push(shuffleCelebrity);
                    }
                  });
                  // this.toastService.success(`${a.name}`);
                  this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${celebrity.name?.toLowerCase().split(' ').join('-')}` });
                  this.isLoading = false
                }
              })
            }
              else{
                this.celebritiesService.getCelebrities().then((celebrities: any) => {
                  celebrities.map((celebrity: any) => {
                    this.recentPost = celebrities.slice(-8).reverse();
                    this.celebrities = celebrities;
                    if (this.router.url.toLowerCase() == "/" + celebrity.name.toLowerCase().split(' ').join('-')) {
                      this.router.url.toLowerCase();
                      this.celebrity = celebrity;
                      this.dobOfCelebrity = this.celebrity.dob.year;
                      this.dodOfCelebrity = this.celebrity.dod?.year;
                      this.exactDOB = this.celebrity.dob.year + '-' + this.celebrity.month + '-' + this.celebrity.date;
                      this.relatedPostArray = [];
                      const Celebrities = celebrities.slice();
                      const suffledArray = Celebrities.sort(() => 0.5 - Math.random());
                      // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
                      const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
                      suffledArray.filter((shuffleCelebrity: any) => {
                        let randomCelebrity = shuffleCelebrity.categoryId.map((a: any) => a?.toLowerCase());
                        if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
                          this.relatedPostArray.push(shuffleCelebrity);
                        }
                      });
                      // this.toastService.success(`${a.name}`);
                      this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${celebrity.name?.toLowerCase().split(' ').join('-')}` });
                      this.isLoading = false
                    }
                  })
                  
                }).catch((err) => {
                  this.toastService.error(err.message);
                  this.isLoading = false;
                  this.isError= true;
                })
              }
          })
        }
      });
  }


  // getArraysIntersection(a1: any, a2: any) {
  //   return a1.filter((n: any) => { return a2.indexOf(n) !== -1; });
  // }

  curetCel = [
    {
    id: 'ce368', 
    category: ['Bollywood', 'Instagram', 'Acting', 'Bollywood actor', 'actor', 'Filmmaker'],
    categoryId: ['Bollywood Actor/Actress, Model'],
    name: `Nana Patekar`,
    otherName: `NanaPatekar, Naana Patekar`,
    nickName: `Nana`,
    fullname: `Vishwanath Patekar`,
    height: `in feet inches - 5’ 7”`,
    weight: '70 Kg',
    gender: 'Male',
    boyfriend: '',
    profession: `Actor, Writer, Philanthropist, and Filmmaker`,
    professionId: ``,
    eyeColor: 'Dark Brown',
    hairColor: 'Salt &amp; Pepper',
    imgSrc: "assets/images/august2022/nana-patekar.jpg",
    politicalParty: "",
    politicalPartyImgSrc: "",
    dob: {
      date: '1',
      month: 'January',
      year: '1951'
    },
    dod: {
      date: '',
      month: '',
      year: ''
    },
    deathCause: ``,
    placeOfDeath: ``,
    birthPlace: `Murud-Janjira, Bombay State (now, Maharashtra), India`,
    nationality: 'Indian',
    hometown: 'Mumbai, Maharashtra, India',
    school: `• Samarth Vidyalaya, Dadar West, Mumbai<br />
    • Bandra School of Arts (now L.S. Raheja School of Art) in Mumbai`,
    collegeUniversity: `Sir J.J Institute of Applied Arts, Mumbai`,
    qualification: `A Commercial Arts diploma from J J School of Arts`,
    religion: 'Agnostic',
    zodiacSign: 'Capricorn',
    bloodGroup: '',
    foodHabit: '',
    address: `304 Sheetal, Apna Ghar Society, Samarth Nagar, Andheri, Mumbai`,
    hobbies: `Cooking, Doing Philanthropy`,
    debut: {
      lyrical: "",
      lyricalImgSrc: "",
      punjabiFilm: ``,
      punjabiFilmImgSrc: "",
      bollywoodFilm: `Gaman (1978)`,
      bollywoodFilmImgSrc: "",
      hollywoodFilm: ``,
      hollywoodFilmImgSrc: "",
      tollywoodFilm: ``,
      tollywoodFilmImgSrc: "",
      tamilFilm: '',
      tamilFilmImgSrc: "",
      kannadaFilm: '',
      kannadaFilmImgSrc: "",
      punjabiAlbum: '',
      punjabiAlbumImgSrc: "",
      hindiAlbum: '',
      hindiAlbumImgSrc: "",
      singles: ``,
      singlesImgSrc: "",
      musicDirection: "",
      musicDirectionImgSrc: "",
      filmDirection: "Prahaar: The Final Attack (1991)",
      filmDirectionImgSrc: "",
      tv: ``,
      tvImgSrc: "",
      webSeries: "",
      webSeriesImgSrc: "",
      production: "",
      productionImgSrc: "",
      filmWriter: "",
      filmWriterImgSrc: "",
      lastSong: ``,
      lastSongImgSrc: ``,
      lastFilm: `The Body (2019); as "SP Jairaj Rawal"`,
      lastFilmImgSrc: ``
    },
    awards: [
      {
        year:`1990`,
        award:`Best Supporting Actor for Parinda`
      },
      {
        year:`1995`,
        award:`Best Actor for Krantiveer`
      },
      {
        year:`1997`,
        award:`Best Supporting Actor for Agni Sakshi`
      },
      {
        year:`1990`,
        award:`Best Supporting Actor for Parinda`
      },
      {
        year:`1992`,
        award:`Best Villain for Angaar`
      },
      {
        year:`2013`,
        award:`Padma Shri by the Government of India`
      },
    ],
    controversies: [
      {
        title:``,
        controversy:`In 2008, during the shooting of the movie "Horn O.K. Pleassse," Bollywood actress Tanushree Dutta levelled allegations of 'indecent behaviour' against Nana Patekar. After 10 years, she re-erupted the incident during the MeToo campaign and filed an FIR against "Nana Patekar" on 6 October 2018.`
      },
      {
        title:``,
        controversy:`In 2014, he slammed the extension of parole to the jailed actor Sanjay Dutt and vowed to never work with the convicted star.`
      },
      {
        title:``,
        controversy:`In 2016, he supported the ban of Pakistani artists in the Bollywood and said, "Pakistan, artistes come later. My nation comes first. I don’t know anyone except my country and don’t want to know anything else. Artistes are small insects in front of the nation, we are worth nothing compared to the country. I don’t want to know what Bollywood says. I was in the army for two years. Our jawans are the real heroes. We are ordinary, useless people. Do not pay attention to what we say. Do you understand whom am I talking about? Humlog jo patar patar karte hain, unpe dhyan mat do. Unki aukat nahi utni."`
      },
    ],
    maritalStatus: `Separated`,
    affairs: `• Manisha Koirala (Actress)<br />
    • Ayesha Jhulka (Actress)<br />`,
    affairsImgSrc: ``,
    wifeOrHusband: `Neelakanthi Patekar (a former Bank Officer)`,
    wifeOrHusbandImgSrc: ``,
    fiance: '',
    fianceImgSrc: '',
    children: {
      son: `Malhar Patekar &amp; 1 More (died)`,
      sonImgSrc: ``,
      sonImgSrc1: '',
      sonImgSrc2: '',
      daughter: `None`,
      daughterImgSrc: ''
    },
    parents: {
      father: 'Gajanand Patekar (Businessman)',
      fatherImgSrc: '',
      mother: 'Nirmala Patekar (Homemaker)',
      motherImgSrc: ''
    },

    siblings: {
      brother: `Ashok and Dilip Patekar`,
      brotherImgSrc: '',
      sister: `Not known`,
      sisterImgSrc: ''
    },
    favourites: {
      food: `Mutton Dishes, Malai Kabab, Prawns, Konkani Style Fish Curry, Goan Fish Curry`,
      fruit: ``,
      beverages: ``,
      actor: ``,
      actress: `Smita Patil, <a href="https://www.newsfarmers.com/madhuri-dixit" class="celebrity" target="_blank" rel="noopener">Madhuri Dixit</a>`,
      singer: `Kishore Kumar, Lata Mangeshkar`,
      fashionBrand: ``,
      colour: ``,
      destination: ``,
      sports: ``,
      sportsman: ``,
      dress: '',
      song: `"Itni shakti hame dena daata, man ka vishwas kamjor ho na" from the film Ankush (1986)`,
      film: ``,
      director: ``
    },
    styleQoutient: {
      carsCollection: "",
      imgSrc: '',
    },
    // INR 3 to 4 Crore+/movie (as in 2021)
    moneyFactor: {
      earning: `INR 4 to 5 Crore+/movie (as in 2021)`,
      netWorth: 'INR  55 Crore (as in 2022)',
      imgSrc: 'assets/images/august2022/nana_patekar-net.jpg'
    },
    tattoos: [],
    facts: {
      smoke: 'No (quit at the age of 56)',
      alcoholic: 'Yes'
    },
    otherFacts: [
      // {
      //   fact: 'Instagram',
      //   imgSrc: '',
      //   imgCaption: '',
      //   videoSrc: '',
      //   instaLink: 'https://www.instagram.com/p/ChHTXyYhGlI/embed/'
      // },
      {
        fact: "Interview",
        imgSrc: '',
        imgCaption: '',
        videoSrc: 'https://www.youtube.com/embed/3xB9AXldYlo?feature=oembed'
      },
      {
        fact: `He was born to a textile businessman in Murud-Janjira (in the then Bombay State).`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `When Nana was in his seventh standard, his mother sent him to her sister&#8217;s house in Mumbai as he was very mischievous. A year later, his aunt packed his bags and sent him back to Murud because she felt that her children were getting spoilt under Nana&#8217;s influence.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Before coming into the acting profession, he did odd jobs like painting Zebra crossings, painting movie posters, etc., to earn a living.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Since the age of 5, he started acting and worked for long on the Marathi stage, acting in various award-winning plays including Hamidabaichi Kothi and Purush before moving to Marathi films and television and then making his foray into Bollywood.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `When he was 13-year-old, he used to paint cinema posters; for which, he was paid ₹35 and one meal.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `In the begging of his career, Nana worked as a commercial artist and visualizer at Strusa Advertising.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `He also worked in an advertising agency for some time.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `During an interview, he revealed that, during his initial days in the Bollywood, he had to face discrimination for not being a handsome hunk. To this, he says, &#8220;Mein jaanta hoon ki mein khoobsurat nahin hoon (I know I am not beautiful). But I wanted to make my performances beautiful. They should talk for you. Always let your work talk for yourself. No matter how much you give interviews, or how much you are written about, it is always the performance which counts.&#8221;`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `For his entry into the Bollywood, he gives credit to the Bollywood actress Smita Patil, as she knew him from Pune and took him to Ravi Chopra for a role.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `When Nana was 28-year-old, he lost his father, and within two-and-a-half years of that, he lost his first son.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Once, he used to criticise the Filmfare Jury for its awards management. However, when he won the best actor award for Krantiveer in 1995, he accepted the award, cried in public and told that he had thought the awards were a farce till he himself won one.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Despite his close links with the Shiv Sena, Nana got involved with the &#8216;Citizen of Peace Movement&#8217; during the 1992 riots in Bombay.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `His son Malahar also acted in Prahaar, as the young Nana Patekar.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Nana counts himself among the modest citizens of India, and he substantiates it by living in a 1 BHK apartment with his mother.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Even after becoming a famous actor, he used to hang out with his old friends in a Mahim bar and drink himself silly.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `During an interview, he revealed that he celebrates his son&#8217;s birthday in an orphanage.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Nana has also revealed about his smoking habit and said, &#8220;I used to smoke 60 cigarettes per day till I was 56. But then I just threw it and left it.&#8221;`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Nana had a narrow escape from getting burned during the filming of the last scene of the film Parinda.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `He is very popular for his quintessential laughing and dialogue delivery.`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
      {
        fact: `Around 40 years after making his acting debut, in 2017, he did his first commercial for &#8216;Vikram Tea.&#8217;`,
        imgSrc: '',
        imgCaption: '',
        videoSrc: ''
      },
    ],
    description: `Vishwanath Patekar (born 1 January 1951), better known as Nana Patekar, is an Indian actor, writer, film maker, and a former Indian Territorial Army officer, mainly working in Hindi and Marathi cinema. He is regarded as one of finest actors in Indian Cinema.`
  }
]

  ngOnInit(): void {
    // alert( "JanFebMarAprMayJunjulAugSepOctNovDec".indexOf("jul") / 3 + 1 );
    const domain = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    this.isLoading = true;
    // this.recentPost = this.celebritiesService.getCelebrities().slice(-8).reverse();
    // this.celebrities = this.celebritiesService.getCelebrities();

    if(this.celebritiesService.celebrities){
      const celebrities = this.celebritiesService.getCel();
      // const celebrities = this.curetCel;
      celebrities.map((celebrity: any) => {
        this.recentPost = celebrities.slice(-8).reverse();
        this.celebrities = celebrities;
        if (this.router.url.toLowerCase() == "/" + celebrity.name?.toLowerCase().split(' ').join('-')) {
          this.router.url.toLowerCase();
          this.celebrity = celebrity;
          // this.toastService.success(`${this.celebrity.name}`);
          this.dobOfCelebrity = this.celebrity.dob.year;
          this.dodOfCelebrity = this.celebrity.dod?.year;
          this.exactDOB = this.celebrity.dob.year + '-' + this.celebrity.month + '-' + this.celebrity.date;
          this.relatedPostArray = [];
          const Celebrities = celebrities.slice();
          const suffledArray = Celebrities.sort(() => 0.5 - Math.random());
          // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
          const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
          suffledArray.filter((shuffleCelebrity: any) => {
            let randomCelebrity = shuffleCelebrity.categoryId.map((a: any) => a?.toLowerCase());
            if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
              this.relatedPostArray.push(shuffleCelebrity);
            }
          });
          // this.toastService.success(`${a.name}`);
          this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${celebrity.name?.toLowerCase().split(' ').join('-')}` });
          this.isLoading = false
        }
      })
      if (this.router.url.toLowerCase() !== "/" + this.celebrity?.name?.toLowerCase().split(' ').join('-')) {
        this.router.navigate(['/404notfound']);
        this.isLoading = false;

      }
    }
    else{
      this.celebritiesService.getCelebrities().then((celebrities: any) => {
        celebrities.map((celebrity: any) => {
          this.recentPost = celebrities.slice(-8).reverse();
          this.celebrities = celebrities;
          if (this.router.url.toLowerCase() == "/" + celebrity.name?.toLowerCase().split(' ').join('-')) {
            this.router.url.toLowerCase();
            this.celebrity = celebrity;
            // this.toastService.success(`${this.celebrity.name}`);
            this.dobOfCelebrity = this.celebrity.dob.year;
            this.dodOfCelebrity = this.celebrity.dod?.year;
            this.exactDOB = this.celebrity.dob.year + '-' + this.celebrity.month + '-' + this.celebrity.date;
            this.relatedPostArray = [];
            const Celebrities = celebrities.slice();
            const suffledArray = Celebrities.sort(() => 0.5 - Math.random());
            // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
            const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
            suffledArray.filter((shuffleCelebrity: any) => {
              let randomCelebrity = shuffleCelebrity.categoryId.map((a: any) => a?.toLowerCase());
              if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
                this.relatedPostArray.push(shuffleCelebrity);
              }
            });
            // this.toastService.success(`${a.name}`);
            this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${celebrity.name?.toLowerCase().split(' ').join('-')}` });
            this.isLoading = false;
            this.isError = false;
          }
        })
        if (this.router.url.toLowerCase() !== "/" + this.celebrity?.name?.toLowerCase().split(' ').join('-')) {
          this.router.navigate(['/404notfound']);
          this.isLoading = false;
          this.isError = false;
        }
      }).catch((err) => {
        this.celebrityWhileError = this.router.url.slice(1).toUpperCase().split('-').join(' ');
        this.toastService.error(err.message);
        this.isLoading = false;
        this.isError= true;
      })
    }
    




    // this.celebritiesService.getCelebrities().map((a: any) => {
    //   if (this.router.url.toLowerCase() == "/" + a.name?.toLowerCase().split(' ').join('-')) {
    //     this.router.url.toLowerCase();
    //     this.celebrity = a;
    //     this.dobOfCelebrity = this.celebrity.dob.year;
    //     this.dodOfCelebrity = this.celebrity.dod?.year;
    //     this.exactDOB= this.celebrity.dob.year+'-'+this.celebrity.month+'-'+this.celebrity.date;
    //     this.relatedPostArray = [];
    //     const celebrities = this.celebritiesService.getCelebrities().slice();
    //     const suffledArray = celebrities.sort(() => 0.5 - Math.random());
    //     // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
    //     const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
    //     suffledArray.filter((celebrity: any) => {
    //       let randomCelebrity = celebrity.categoryId.map((a: any) => a?.toLowerCase());
    //       if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
    //         this.relatedPostArray.push(celebrity);
    //       }
    //     });
    //     this.toastService.success(`${a.name}`);
    //     this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${a.name?.toLowerCase().split(' ').join('-')}` });
    //     setTimeout(() => {
    //       this.isLoading = false
    //     }, 0);
    //   }
    // })
    // if (this.router.url.toLowerCase() !== "/" + this.celebrity?.name?.toLowerCase().split(' ').join('-')) {
    //   this.router.navigate(['/404notfound']);
    //   this.isLoading = false;
    // }

    this.subscription = this.celebritiesService.getSearchedCelebrity
      .subscribe(
        (selectedCelebrity: any) => {
          this.relatedPostArray = []
          this.celebrity = selectedCelebrity;
          this.dobOfCelebrity = selectedCelebrity.dob.year;

          this.dodOfCelebrity = this.celebrity?.dod?.year;
          let celebrities = this.celebrities.slice();
          const suffledArray = celebrities.sort(() => 0.5 - Math.random());
          const targetedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
          suffledArray.filter((celebrity: any) => {
            let randomCelebrity = celebrity.categoryId.map((a: any) => a?.toLowerCase());
            if ((randomCelebrity.filter((n: any) => { return targetedCelebrity.indexOf(n) >= 0; })?.length >= 1)) {
              this.relatedPostArray.push(celebrity);
            }
          });
          // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
          this.isLoading = false;
          this.isError = false;
        }
      );


  }

  onNavigate(selected: any) {
    this.isLoading = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.relatedPostArray = [];
    this.celebrity = selected;
    this.dobOfCelebrity = selected.dob.year;
    this.dodOfCelebrity = selected.dod?.year;
      // this.celebrities = celebrities
      const Celebrities = this.celebrities.slice();
      const suffledArray = Celebrities.sort(() => 0.5 - Math.random());
      const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
      suffledArray.filter((celebrity: any) => {
        let randomCelebrity = celebrity.categoryId.map((a: any) => a?.toLowerCase());
        if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
          this.relatedPostArray.push(celebrity);
        }
      });

    this.recentPost = this.celebrities.slice(-8).reverse();
    this.router.navigate(['/', selected.name?.toLowerCase().split(' ').join('-')]);
    this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${selected.name?.toLowerCase().split(' ').join('-')}` });
    this.isLoading = false;
    this.isError = false;
    // this.toastService.success(`${selected.name}`);
   
    
    // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === selected.categoryId?.toLowerCase());

  }

  // onNavigate(selected: any) {
  //   this.isLoading = true;
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  //   this.relatedPostArray = [];
  //   this.celebrity = selected;
  //   this.dobOfCelebrity = selected.dob.year;
  //   this.dodOfCelebrity = selected.dod?.year;
  //   this.celebrities = this.celebritiesService.getCelebrities();
  //   const celebrities = this.celebritiesService.getCelebrities().slice();
  //   const suffledArray = celebrities.sort(() => 0.5 - Math.random());
  //   const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
  //   suffledArray.filter((celebrity: any) => {
  //     let randomCelebrity = celebrity.categoryId.map((a: any) => a?.toLowerCase());
  //     if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
  //       this.relatedPostArray.push(celebrity);
  //     }
  //   });
  //   this.toastService.success(`${selected.name}`);
  //   // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === selected.categoryId?.toLowerCase());
  //   this.recentPost = this.celebritiesService.getCelebrities().slice(-8).reverse();
  //   this.router.navigate(['/', selected.name?.toLowerCase().split(' ').join('-')]);
  //   this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${selected.name?.toLowerCase().split(' ').join('-')}` });
  //   this.isLoading = false;


  // }

  getAge() {
    return this.dobOfCelebrity ? this.currentYear - this.dobOfCelebrity : 'NA'
  }

  getAgeAtTimeOfDeath() {
    return this.dodOfCelebrity ? this.dodOfCelebrity - this.dobOfCelebrity : 'NA';
  }

  selectedCelebrity: string | any;
  onGetSelectedCelebrity(selected: any) {
    this.selectedCelebrity = this.celebritiesService.selectedCelebrity(selected);
  }

  getExactAge(dateString: string) {
    debugger;
    const ageInMilliseconds = +new Date() - +new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }
  //  console.log(getAge('1997-04-23'));

  ngOnDestroy(): void {
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("name='description'");
    this.subscription.unsubscribe();
  }
}
