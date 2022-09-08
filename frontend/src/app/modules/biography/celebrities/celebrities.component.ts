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
      id: 'ce374', 
      category: ['Bollywood', 'Instagram', 'Acting', 'Bollywood actor', 'actor'],
      categoryId: ['Bollywood Actor/Actress, Model'],
      name: `Manoj Pahwa`,
      otherName: `ManojPahwa, Manoj Pawa`,
      nickName: ``,
      fullname: ``,
      height: `in feet inches - 5’ 7”`,
      weight: '95 Kg',
      gender: 'Male',
      boyfriend: '',
      profession: `Actor`,
      professionId: ``,
      eyeColor: 'Dark Brown',
      hairColor: 'Black ',
      imgSrc: "assets/images/august2022/manoj-pahwa.jpg",
      politicalParty: "",
      politicalPartyImgSrc: "",
      dob: {
        date: '8',
        month: 'December',
        year: '1963'
      },
      dod: {
        date: '',
        month: '',
        year: ''
      },
      deathCause: ``,
      placeOfDeath: ``,
      birthPlace: `Delhi`,
      nationality: 'Indian',
      hometown: 'Delhi',
      school: `National Public School, New Delhi`,
      collegeUniversity: `N/A`,
      qualification: `N/A`,
      religion: '',
      zodiacSign: 'Sagittarius',
      bloodGroup: '',
      foodHabit: '',
      address: `61, Sai Shakti, Yari Road, Versova, Andheri, Mumbai`,
      hobbies: ``,
      debut: {
        lyrical: "",
        lyricalImgSrc: "",
        punjabiFilm: ``,
        punjabiFilmImgSrc: "",
        bollywoodFilm: `Tere Mere Sapne (1996)`,
        bollywoodFilmImgSrc: "assets/images/august2022/Manoj-Pahwas-Debut-Film.jpg",
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
        filmDirection: "",
        filmDirectionImgSrc: "",
        tv: `Hum Log (1984)`,
        tvImgSrc: "",
        webSeries: "",
        webSeriesImgSrc: "",
        production: "",
        productionImgSrc: "",
        filmWriter: "",
        filmWriterImgSrc: "",
        lastSong: ``,
        lastSongImgSrc: ``,
        lastFilm: ``,
        lastFilmImgSrc: ``
      },
      awards: [],
      controversies: [],
      maritalStatus: `Married`,
      affairs: `Seema Pahwa`,
      affairsImgSrc: ``,
      wifeOrHusband: `Seema Pahwa (Actress)`,
      wifeOrHusbandImgSrc: `assets/images/august2022/Manoj-Pahwa-With-His-Wife.jpg`,
      fiance: '',
      fianceImgSrc: '',
      children: {
        son: `Mayank`,
        sonImgSrc: ``,
        sonImgSrc1: '',
        sonImgSrc2: '',
        daughter: `Manukriti`,
        daughterImgSrc: ''
      },
      parents: {
        father: 'Not Known',
        fatherImgSrc: '',
        mother: 'Not Known',
        motherImgSrc: ''
      },
  
      siblings: {
        brother: `1 Brother`,
        brotherImgSrc: '',
        sister: `Sunita Gupta and Rekha Pathak`,
        sisterImgSrc: ''
      },
      favourites: {
        food: ``,
        fruit: ``,
        beverages: ``,
        actor: ``,
        actress: ``,
        singer: ``,
        fashionBrand: ``,
        colour: ``,
        destination: ``,
        sports: ``,
        sportsman: ``,
        dress: '',
        song: ``,
        film: ``,
        director: ``
      },
      styleQoutient: {
        carsCollection: "",
        imgSrc: '',
      },
      // INR 3 to 4 Crore+/movie (as in 2021)
      moneyFactor: {
        earning: `Not Known`,
        netWorth: '$ 3 million (as in 2022)',
        imgSrc: 'assets/images/august2022/manoj-pahwa-net.jpg'
      },
      tattoos: [],
      facts: {
        smoke: 'Not Known',
        alcoholic: 'Not Known'
      },
      otherFacts: [
        // {
        //   fact: 'Instagram',
        //   imgSrc: '',
        //   imgCaption: '',
        //   videoSrc: '',
        //   instaLink: 'https://www.instagram.com/p/Chgmm2voksY/embed/'
        // }, 
        {
          fact: "Interview",
          imgSrc: '',
          imgCaption: '',
          videoSrc: 'https://www.youtube.com/embed/UrGLLholP4M?feature=oembed'
        },
        {
          fact: `Manoj Pahwa is a well-known Indian television and film actor.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `His father was born in Pakistan, and his mother was from Uttar Pradesh. While talking about his family in an interview, Manoj said,<br>
          <blockquote><p>My mother is from Uttar Pradesh while my father’s roots are in Pakistan. I have stayed in Punjab for a long time since we had relatives in Jalandhar, Ludhiana and in Ambala Cantt in Haryana. After my father expired, I had to look after our business of automotive parts since I am the eldest child. But, after I had married off my two younger sisters, I handed over the business to my younger brother and moved to Mumbai in 1994 along with my wife, two children and my mother.”</p></blockquote>`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `His father had a garage shop in Delhi, and he wanted Manoj to look after their own business, but Manoj wanted to make his career in acting. In an interview, Manoj said,<br>
          <blockquote><p>I started doing Ramleela and theatre. One day when I told my father that I wanted to join this field, I was heavily scolded. His dialogues still echoes: ‘Ghar ke dhandha chor kar bhaandgiri karange’. But acting was destined and here I am. But my advice to people interested in this field is to first attain qualification and then jump into it.”</p></blockquote>`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `After his father’s death, he looked after his family business for a few years.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He met the popular Indian actress Seema Bhargavawhile he was working with the theatre group ‘Sambhav Group.’ Soon, they became friends and fell in love with each other, and on 23 January 1988, they got married to each other.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `In 2017, there were rumours that his son got engaged to Shahid Kapoor’s sister, Sanah Kapur`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He has worked in various theatrical productions of ‘Mandi House,’ ‘Sambhav Group,’ ‘All India Radio,’ and ‘Doordarshan.’`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Later, he moved to Mumbai from Delhi with his family to pursue his career in acting. He has acted in various Hindi television shows like ‘Shanti’ (1995), ‘Just Mohabbat’ (1996), ‘Sab Golmaal Hai’ (1997), ‘Gudgudee’ (1998), ‘Office Office’ (2001), and ‘A Suitable Boy’ (2020).`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Some of his popular Hindi films are ‘Dhamaal’ (2007), ‘Singh is King’ (2008), ‘Ready’ (2011), ‘Mausam’ (2011), ‘Dabangg 2’ (2012), ‘Jolly LLB’ (2013), ‘Dil Dhadakne Do’ (2015), ‘Mulk’ (2018), and ‘Article 15’ (2019).`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Manoj has acted in a few regional films like ‘Engeyum Kadhal’ (2011, Tamil), and ‘Disco Singh’ (2014, Punjabi).`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `In 2011, during the shoot for the Bollywood film ‘Mausam’ (directed by Pankaj Kapur) in Chandigarh, he met the regional producers, which led to his Punjabi film debut &#8216;Heer &amp; Hero&#8217; (2013).`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He has appeared in more than 200 TV commercials. After appearing in the ‘8 PM whiskey commercial’ in which he played the role of a Pakistani army officer, the famous Indian actor Kamal Haasan spotted him in the advertisement and offered him a role in the film ‘Hey Ram’ (2000).`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `In the late 1990s, he used to get Rs. 8,000 per day for a shoot.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `In an interview, he talked about his love for theatres, he said,<br>
          <blockquote><p>Theatre is the gym for actors. For a performer, theatre is the medium that gives an opportunity to work on your skill, your imagination, physical and mental strength as an actor. You upgrade yourself in theatre to stay relevant.”</p></blockquote>`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
      ],
      description: `Manoj Pahwa (born 8 December 1963) is an Indian film and television actor who is noted for his role as Bhatia in the comedy series Office Office (2001). He has acted in over 70 films as a character actor, including 7½ Phere (2005), Being Cyrus (2005), Singh Is King (2008), Dabangg 2 (2012), Jolly LLB (2013), Dil Dhadakne Do (2015), Mulk (2018), Article 15.`
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
