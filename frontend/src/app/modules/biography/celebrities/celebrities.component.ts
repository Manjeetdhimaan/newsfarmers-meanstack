import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CelebritiesService } from 'src/app/services/celebrities.service';
import { Meta } from '@angular/platform-browser';
import { ToasTMessageService } from 'src/app/services/toastr.service';
import { Celebrity } from 'src/app/models/celebrity.model';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css'],
})

export class CelebritiesComponent implements OnInit, OnDestroy {
  imgUrl: any = 'assets/images/no-preview.png';
  celebrities: Celebrity[] = [];
  celebrity: any;
  currentYear: number = new Date().getFullYear();
  dobOfCelebrity: any;
  dodOfCelebrity: any;
  exactDOB: any;
  relatedPostArray: any[] = [];
  searchText: any;
  recentPost: any;
  isLoading = false;
  isLoadingMoreCel = false;
  isLoadingRecentCelbs = false;
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
      id: 'ce375', 
      category: ['Bollywood', 'Instagram', 'Acting', 'Bollywood actor', 'actor', 'Director'],
      categoryId: ['Bollywood Actor/Actress, Model'],
      name: `Naseeruddin Shah`,
      otherName: `NaseeruddinShah, Shah Naseeruddin`,
      nickName: ``,
      fullname: ``,
      height: `in feet inches - 5’ 7”`,
      weight: '71 Kg',
      gender: 'Male',
      boyfriend: '',
      profession: `Actor, Director`,
      professionId: ``,
      eyeColor: 'Dark Brown',
      hairColor: 'White',
      imgSrc: "assets/images/october2022/naseerudin-shah.jpg",
      politicalParty: "",
      politicalPartyImgSrc: "",
      dob: {
        date: '20',
        month: 'July',
        year: '1950'
      },
      dod: {
        date: '',
        month: '',
        year: ''
      },
      deathCause: ``,
      placeOfDeath: ``,
      birthPlace: `Barabanki, Uttar Pradesh, India`,
      nationality: 'Indian',
      hometown: 'Barabanki, Uttar Pradesh, India',
      school: `St. Anselm's Ajmer, Rajasthan<br />
      St Joseph's College, Nainital`,
      collegeUniversity: `Aligarh Muslim University, Uttar Pradesh<br />
      National School of Drama, Delhi`,
      qualification: `Graduate in Arts`,
      religion: 'Islam',
      zodiacSign: 'Leo',
      bloodGroup: '',
      foodHabit: '',
      address: `04, Sand Pebbles, Perry Cross Road, Bandra (West), Mumbai`,
      hobbies: `Playing Tennis, Reading`,
      debut: {
        lyrical: "",
        lyricalImgSrc: "",
        punjabiFilm: ``,
        punjabiFilmImgSrc: "",
        bollywoodFilm: `Nishant (1975)`,
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
        filmDirection: "Yun Hota to Kya Hota (2006)",
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
        lastFilm: ``,
        lastFilmImgSrc: ``
      },
      awards: [],
      controversies: [
        {
          title:``,
          controversy:`In an interview in 2016, Naseeruddin Shah referred to late superstar Rajesh Khanna as a "mediocre actor". He further added that a 'poor actor' like Rajesh Khanna was responsible for the mediocrity in films in the 70's. However, the comments did not go well with Khanna's fans and family and Shah was heavily criticized for defaming a deceased superstar.`
        },
        {
          title:``,
          controversy:`In May 2016, Anupam Kher raked up a storm on Twitter when he shared a collage of Kashmiri Pandits killed during the 1990 exodus. The tweet came in regard to the killing of Hizbul Mujahideen's 'poster boy' Burhan Wani in an encounter. Shah, however, did not like Kher's tweet and took a dig at his former co-star. He said, "A person who has never lived in Kashmir has started a fight for Kashmiri Pandits. Suddenly, he has become a displaced person." Infuriated by Shah's take, Kher then tweeted, "Shah Saab ki Jai Ho. By that logic, NRIs should not think about India at all.:)"`
        },
        {
          title:``,
          controversy:`Shah went to Pakistan in early 2015 to promote his memoir, And Then One Day, at the Lahore Literary Festival. While addressing media and fans at the venue, Shah started talking about the animosity between the two countries. "Indians are being brainwashed into believing that Pakistan is an enemy country without being aware of the historical background. Politicians will change colors whenever it suits them. But artists from both countries must look beyond the political animosity", Shah said. This statement, however, hurt Indian sentiments. Pressure group Shiv Sena even issued a statement saying that only the near and dear ones of the 26/11 victims would understand that why there is so much hatred against Pakistan.`
        },
      ],
      maritalStatus: `Widower`,
      affairs: ``,
      affairsImgSrc: ``,
      wifeOrHusband: `Late Parveen Murada aka Manara Sikri(First wife), Ratna Pathak, Actress`,
      wifeOrHusbandImgSrc: `assets/images/october2022/Naseeruddin-Shah-present-wife-Ratna-Pathak.jpg`,
      fiance: '',
      fianceImgSrc: '',
      children: {
        son: `Imaad Shah, Vivaan Shah (Both Actors)`,
        sonImgSrc: ``,
        sonImgSrc1: '',
        sonImgSrc2: '',
        daughter: `Heeba Shah, Actress (Daughter from first wife)`,
        daughterImgSrc: ''
      },
      parents: {
        father: 'Aley Mohammed Shah',
        fatherImgSrc: '',
        mother: 'Farrukh Sultan',
        motherImgSrc: ''
      },
  
      siblings: {
        brother: `Retd. Lt. General Zameerud-din Shah and 2 more`,
        brotherImgSrc: '',
        sister: `N/A`,
        sisterImgSrc: ''
      },
      favourites: {
        food: ``,
        fruit: ``,
        beverages: ``,
        actor: `Mohanlal, Nedumudi Venu, Shammi Kapoor, Dara Singh, Boman Irani`,
        actress: ``,
        singer: ``,
        fashionBrand: ``,
        colour: `Black`,
        destination: `Dubai`,
        sports: `Tennis`,
        sportsman: ``,
        dress: '',
        song: ``,
        film: `<strong>Bollywood:</strong> Masaan (2015), Dil Chahta Hai (2001)`,
        director: `Neeraj Pandey, Rajkumar Hirani, Neeraj Ghaywan`
      },
      styleQoutient: {
        carsCollection: "",
        imgSrc: '',
      },
      // INR 3 to 4 Crore+/movie (as in 2021)
      moneyFactor: {
        earning: `Not Known`,
        netWorth: 'Not Known',
        imgSrc: 'assets/images/october2022/naseerudin-shah-net.jpg'
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
          instaLink: 'https://www.instagram.com/p/B_2G-UVp2HV/embed/'
        }, 
        {
          fact: "Interview",
          imgSrc: '',
          imgCaption: '',
          videoSrc: 'https://www.youtube.com/embed/XvjLyUU6FG0?feature=oembed'
        },
        {
          fact: `Naseeruddin started acting (Theatre) at a young age of 14. Shakespeare&#8217;s <em>Merchant of Venice</em> was his first theatrical show.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Not many people know that Naseeruddin is a descendant of a 19th-century warlord named <em>Jan-Fishan Khan</em>. The latter helped the British during the Indian Rebellion of 1857.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Shah&#8217;s debut movie, Nishant (1975), was awarded the National Award in the Best Film category. The film was subsequently nominated for the Oscars.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Rajendra Jaspal, a fellow actor and classmate of Shah, once stabbed him in the canteen of FTII. The former was envious of Shah signing certain films which he believed should have been his.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `His first wife, Late Parveen Murad, was 16 years older than him at the time of their marriage. 2 years later, the couple had a tiff and decided to part ways. However, Shah did not divorce his wife, as in his <i>nikaahnama</i> (Muslim marriage contract), Shah had not only promised a huge amount of money to his wife as alimony but had also disclaimed the right to bigamy.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Even after becoming an established actor, Shah did not give up his love for theater. As a result, he along with a few friends founded a theater group named <em>Motley Productions</em> in the year 1977.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Interestingly, Shah was the first choice to play the role of Mahatma Gandhi in the film- Gandhi (1982). However, Ben Kingsley overshadowed him at the auditions and grabbed the role.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `For his immense contribution to the field of acting/theater, Shah was awarded the <em>Padma Shri</em> in 1987 followed by the <em>Padma Bhushan</em> in 2003.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Aside from Bollywood, Shah has also acted in a number Hollywood and Pakistani movies. His role of <em>Captain Nemo</em> in the 2003 Hollywood flick, <i>The League of Extraordinary Gentlemen, </i>was widely appreciated. Additionally, his second Pakistani film, <i>Zinda Bhaag </i>was selected as the country&#8217;s official entry into the 86th Academy Awards in the Best Foreign Language Film category.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Notably, Shah has been honored with the lifetime membership of International Film And Television Club of Asian Academy of Film and Television.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `His brother, Retd. Lt. General Zameerud-din Shah, is the present (2016) vice-chancellor of Aligarh Muslim University (AMU), UP.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Bad luck has constantly followed Shah as to date more than 20 feature films starring him have been shelved.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `Shah released his memoir titled <em>And Then One day</em> in 2014. In the memoir, the actor has admitted to having consumed marijuana (gaanja) in various phases of his life and credits it with giving him clarity of thought.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
        {
          fact: `According to reports, the directors of Harry Potter wanted to audition Naseeruddin Shah for the role of <em>Albus Dumbledore</em>, after the actor who played it passed away prior to the shooting of the third installment of the movie series. Shah, however, refused to audition and the role was passed over to English actor Michael Gambon.`,
          imgSrc: '',
          imgCaption: '',
          videoSrc: ''
        },
      ],
      description: `Naseeruddin Shah (born 20 July 1950) is an Indian actor. He is notable in Indian parallel cinema. He has also starred in international productions. He has won numerous awards in his career, including three National Film Awards, three Filmfare Awards and the Volpi Cup for Best Actor at the Venice Film Festival. The Government of India honoured him with the Padma Shri and the Padma Bhushan awards for his contributions to Indian cinema.`
    }
  ]

  ngOnInit(): void {
    
    // alert( "JanFebMarAprMayJunjulAugSepOctNovDec".indexOf("jul") / 3 + 1 );

    // const domain = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

    // console.log('Domain', domain)
    this.isLoading = true;
    this.isLoadingMoreCel = true;
    this.isLoadingRecentCelbs = true;
    // this.recentPost = this.celebritiesService.getCelebrities().slice(-8).reverse();
    // this.celebrities = this.celebritiesService.getCelebrities();

    if (this.celebritiesService.celebrities) {
      const celebrities = this.celebritiesService.getCel();
      // const celebrities = this.curentCel;
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
          const celebritiesSlice = celebrities.slice();
          const suffledArray = celebritiesSlice.sort(() => 0.5 - Math.random());
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
          this.isLoadingMoreCel = false;
          this.isLoadingRecentCelbs = false;
        }
      })
      if (this.router.url.toLowerCase() !== "/" + this.celebrity?.name?.toLowerCase().split(' ').join('-')) {
        this.router.navigate(['/404notfound']);
        this.isLoading = false;
        this.isLoadingMoreCel = false;
        this.isLoadingRecentCelbs = false;
      }
    }
    else {
      this.celebritiesService.getCelebrity(this.router.url.slice(1).toLowerCase()).then((celebrity: any) => {
        this.celebrity = celebrity;
        this.isLoading = false;
        this.isError = false;
      }).catch(err => {
        this.celebrityWhileError = this.router.url.slice(1).toUpperCase().split('-').join(' ');
        // this.toastService.error(err.message);
        console.log(err)
        this.isLoading = false;
        this.isError = true;
      });

      // getting recent post...
      this.celebritiesService.getRecentCelebrities().then(recentCelebrities => {
        this.recentPost = recentCelebrities;
        this.isLoadingRecentCelbs = false;
        // this.isError = false;
      }).catch(err =>{
        this.isLoading = false;
        this.isError = true;
        this.isLoadingRecentCelbs = false;
      })
     
      this.celebritiesService.getCelebrities().then((celebrities: any) => {
        this.isLoadingMoreCel = false;
        celebrities.map((celebrity: any) => {
          // this.recentPost = celebrities.slice(-8).reverse();
          this.celebrities = celebrities;
          if (this.router.url.toLowerCase() == "/" + celebrity.name?.toLowerCase().split(' ').join('-')) {
            this.router.url.toLowerCase();
            // this.celebrity = celebrity;
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
            this.isLoadingMoreCel = false;
            this.isError = false;
          }
        })
        if (this.router.url.toLowerCase() !== "/" + this.celebrity?.name?.toLowerCase().split(' ').join('-')) {
          // this.router.navigate(['/404notfound']);
          this.celebrityWhileError = this.router.url.slice(1).toUpperCase().split('-').join(' ');
          this.isLoading = false;
          this.isError = true;
          this.isLoadingMoreCel = false;
        }
      }).catch((err) => {
        // this.celebrityWhileError = this.router.url.slice(1).toUpperCase().split('-').join(' ');
        // this.toastService.error(err.message);
        this.isLoading = false;
        this.isLoadingMoreCel = false;
        this.isError = true;
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
          this.isLoadingMoreCel = false;
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
    this.isLoadingMoreCel = false;
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