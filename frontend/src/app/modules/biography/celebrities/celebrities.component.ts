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
  celebrityWhileError: string;

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
            if (this.celebritiesService.celebrities) {
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
            else {
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
                this.isError = true;
              })
            }
          })
        }
      });
  }


  // getArraysIntersection(a1: any, a2: any) {
  //   return a1.filter((n: any) => { return a2.indexOf(n) !== -1; });
  // }

  curentCel = [
    {
      id: 'ce365',
      category: ['Bollywood', 'Instagram', 'Acting', 'Bollywood actor', 'actor'],
      categoryId: ['Bollywood Actor/Actress, Model'],
      name: `Manoj Bajpayee`,
      otherName: `ManojBajpayee Manoj Vajpayee`,
      nickName: ``,
      fullname: ``,
      height: `in feet inches - 5’ 11”`,
      weight: '70 Kg',
      gender: 'Male',
      boyfriend: '',
      profession: `Actor`,
      professionId: ``,
      eyeColor: 'Black',
      hairColor: 'Black',
      imgSrc: "assets/images/august2022/manoj-bajpayee.jpg",
      politicalParty: "",
      politicalPartyImgSrc: "",
      dob: {
        date: '23',
        month: 'April',
        year: '1969'
      },
      dod: {
        date: '',
        month: '',
        year: ''
      },
      deathCause: ``,
      placeOfDeath: ``,
      birthPlace: `Belwa, West Champaran district, Bihar, India`,
      nationality: 'Indian',
      hometown: 'His ancestry belonging is a small village called Belwa on the border of Nepal near the town Narkatiaganj in West Champaran, Bihar',
      school: `Khrist Raja High School, Bettiah`,
      collegeUniversity: `Satyawati College, Delhi<br />
      Ramjas College, Delhi`,
      qualification: `Graduate in History<br />
      Drama`,
      religion: 'Hinduism',
      zodiacSign: 'Taurus',
      bloodGroup: '',
      foodHabit: '',
      address: ``,
      hobbies: `Theatre plays`,
      debut: {
        lyrical: "",
        lyricalImgSrc: "",
        punjabiFilm: ``,
        punjabiFilmImgSrc: "",
        bollywoodFilm: `Bandit Queen (1994)`,
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
        filmDirection: "",
        filmDirectionImgSrc: "",
        tv: `Swabhimaan (1995)`,
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
      awards: [
        {
          year:`1998`,
          award:`National Film Award for Best Supporting Actor for Satya<br />
                  Filmfare Critics Award for Best Actor for Satya.`
        },
        {
          year:`1999`,
          award:`Filmfare Critics Award for Best Actor for Shool`
        },
        {
          year:`2003`,
          award:`National Film Award – Special Jury Award / Special Mention for Pinjar`
        },
        {
          year:`2016`,
          award:`Filmfare Short Film Awards Best Actor for Taandav.<br />
           Filmfare Critics Award for Best Actor for Aligarh.<br />
           Asia Pacific Screen Award for Best Performance by an Actor for Aligarh.`
        },
        {
          year:`2019`,
          award:`National Film Award for Best Actor for Bhonsle`
        },
      ],
      controversies: [
        {
          title:``,
          controversy:`He refused the offer to work in Aamir Khan's film Dangal, as he was not happy with his role.`
        },
        {
          title:``,
          controversy:`Juhi Chawla, the producer of the film Chalk N Duster sacked him from her film and replaced him with Rishi Kapoor to play the role of a quizmaster, as she thought that Manoj's looks are not good enough to carry out this role.`
        },
      ],
      maritalStatus: `Married`,
      affairs: ``,
      affairsImgSrc: ``,
      wifeOrHusband: `Shabana Raza (Neha) (Actress)`,
      wifeOrHusbandImgSrc: `assets/images/august2022/manoj-bajpayee-wife-daughter.jpg`,
      fiance: '',
      fianceImgSrc: '',
      children: {
        son: `None`,
        sonImgSrc: ``,
        sonImgSrc1: '',
        sonImgSrc2: '',
        daughter: `Ava Nayla`,
        daughterImgSrc: ''
      },
      parents: {
        father: 'Radhakant Bajpai (Farmer)',
        fatherImgSrc: '',
        mother: 'Not Known',
        motherImgSrc: ''
      },
  
      siblings: {
        brother: `2 Brothers (Names not known)`,
        brotherImgSrc: '',
        sister: `3 Sisters (Names not known)`,
        sisterImgSrc: ''
      },
      favourites: {
        food: `Biryani, Penne pasta`,
        fruit: ``,
        beverages: ``,
        actor: `<a href="https://www.newsfarmers.com/amitabh-bachchan" class="celebrity" target="_blank" rel="noopener">Amitabh Bachchan</a>, <a href="https://www.newsfarmers.com/naseeruddin-shah" class="celebrity" target="_blank" rel="noopener">Naseeruddin Shah</a>, `,
        actress: `<a href="https://www.newsfarmers.com/tabu" class="celebrity" target="_blank" rel="noopener">Tabu</a>, Smita Patil`,
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
        earning: `INR 5 to 6 Crore+/movie (as in 2021)`,
        netWorth: 'INR  140 Crore (as in 2022)',
        imgSrc: 'assets/images/august2022/manoj-bajpayee-net.jpg'
      },
      tattoos: [],
      facts: {
        smoke: 'Not Known',
        alcoholic: 'Not Known'
      },
      otherFacts: [
        {
          fact: 'Instagram',
          imgSrc: '',
          imgCaption: '',
          videoSrc: '',
          instaLink: 'https://www.instagram.com/p/CgydkvUjvaS/embed/'
        },
        {
          fact: "Interview",
          imgSrc: '',
          imgCaption: '',
          videoSrc: 'https://www.youtube.com/embed/pcyBoK3uNlo?feature=oembed'
        },
        {
          fact: `Manoj got famous for his role of Bhiku Mahatre in Ram Gopal Varma’s film <em>Satya </em>and won many awards for his role as a gangster.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `After getting rejected thrice from the National School of Drama, Delhi, he tried to commit suicide.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He learned acting skills from Barry John&#8217;s workshop on the advice of actor Raghubir Yadav. At that time Shah Rukh Khan was his batch-mate in those acting classes.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He was earlier married to a Delhi girl but got divorced later, and then he married actress Shabana Khan, popularly known as Neha, who did films like Kareeb, Fiza, etc.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `In 1995, he did his first TV serial called Swaabhimaan, which also had actors like Ashutosh Rana and Rohit Roy.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `His parents liked veteran actor Manoj Kumar, so they choose his name as Manoj, though he wanted to have the name Samar Bajpai.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He along with Amitabh Bachchan jumped from a big height of 30 feet for a waterfall scene in the film Aks.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `He won National Film Award for films like <em>Pinjar</em> and <em>Satya</em>.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `In September 2020, he gave his voice and performed in a Bhojpuri rap song that rips into the romanticisation of big cities from the point of view of a male migrant worker. Directed by Anubhav Sinha with lyrics by Dr Sagar and music by Anurag Saikia, the song speaks of a male migrant worker&#8217;s longing for home and &#8220;chokha-baati&#8221; while he toils in the big city. Throughout the song, the refrain is &#8220;Bambai Main Ka Ba&#8221; (What is there in Bombay?)`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        
      ],
      description: `Manoj Bajpayee (born 23 April 1969), also called as Manoj Bajpai, is an Indian actor who predominantly works in Hindi cinema and has also done Telugu and Tamil language films. He is the recipient of three National Film Awards, six Filmfare Awards, and two Asia Pacific Screen Awards. Regarded as one of the most successful actors of Hindi cimema, he doesn't let his professional achievements or failures define him as an artist. In 2019, he was awarded India's fourth-highest civilian honour, the Padma Shri, for his contributions in art.`
    }
  ]

  ngOnInit(): void {
    // alert( "JanFebMarAprMayJunjulAugSepOctNovDec".indexOf("jul") / 3 + 1 );

    // const domain = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    
    // console.log('Domain', domain)
    this.isLoading = true;
    // this.recentPost = this.celebritiesService.getCelebrities().slice(-8).reverse();
    // this.celebrities = this.celebritiesService.getCelebrities();

    // if (this.celebritiesService.celebrities) {
    //   const celebrities = this.celebritiesService.getCel();
      const celebrities = this.curentCel;
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
    // }
    // else {
    //   this.celebritiesService.getCelebrities().then((celebrities: any) => {
    //     celebrities.map((celebrity: any) => {
    //       this.recentPost = celebrities.slice(-8).reverse();
    //       this.celebrities = celebrities;
    //       if (this.router.url.toLowerCase() == "/" + celebrity.name?.toLowerCase().split(' ').join('-')) {
    //         this.router.url.toLowerCase();
    //         this.celebrity = celebrity;
    //         // this.toastService.success(`${this.celebrity.name}`);
    //         this.dobOfCelebrity = this.celebrity.dob.year;
    //         this.dodOfCelebrity = this.celebrity.dod?.year;
    //         this.exactDOB = this.celebrity.dob.year + '-' + this.celebrity.month + '-' + this.celebrity.date;
    //         this.relatedPostArray = [];
    //         const Celebrities = celebrities.slice();
    //         const suffledArray = Celebrities.sort(() => 0.5 - Math.random());
    //         // this.relatedPostArray = suffledArray.filter((celebrity: any) => celebrity.categoryId?.toLowerCase() === this.celebrity.categoryId?.toLowerCase());
    //         const selectedCelebrity = this.celebrity.categoryId.map((a: any) => a?.toLowerCase());
    //         suffledArray.filter((shuffleCelebrity: any) => {
    //           let randomCelebrity = shuffleCelebrity.categoryId.map((a: any) => a?.toLowerCase());
    //           if ((randomCelebrity.filter((n: any) => { return selectedCelebrity.indexOf(n) >= 0; }).length >= 1)) {
    //             this.relatedPostArray.push(shuffleCelebrity);
    //           }
    //         });
    //         // this.toastService.success(`${a.name}`);
    //         this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/${celebrity.name?.toLowerCase().split(' ').join('-')}` });
    //         this.isLoading = false;
    //         this.isError = false;
    //       }
    //     })
    //     if (this.router.url.toLowerCase() !== "/" + this.celebrity?.name?.toLowerCase().split(' ').join('-')) {
    //       this.router.navigate(['/404notfound']);
    //       this.isLoading = false;
    //       this.isError = false;
    //     }
    //   }).catch((err) => {
    //     this.celebrityWhileError = this.router.url.slice(1).toUpperCase().split('-').join(' ');
    //     this.toastService.error(err.message);
    //     this.isLoading = false;
    //     this.isError = true;
    //   })
    // }





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