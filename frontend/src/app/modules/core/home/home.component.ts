import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CelebritiesService } from 'src/app/services/celebrities.service';
import { NewsService } from 'src/app/services/news.service';
import { ToasTMessageService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  menuBtnClick: boolean = false;
  isLoading: boolean = false;
  isLoadingMoreCelbs: boolean = false;
  isLoadingNews: boolean = false;
  isLoadingImage: boolean = false;
  isImg: boolean = true;
  latestNews: any;
  borderColor = "black";

  imgSrc: string = '';
  isToggleImage: boolean = false;
  visibility = "hidden";
  private fragment: string;
  isOpen: boolean = false;
  isDropDownToggle: boolean = false;
  randomCelebrity: any
  shuffled: any
  selected: any;
  isGradientHeader = false;

  socialMediaCategory: any[] = [];
  punjabiSingerCategory: any[] = [];
  lyricistCategory: any[] = [];
  bollywoodCategory: any[] = [];

  isAll: boolean = true;
  isSocialMedia: boolean = false;
  isSinger: boolean = false;
  isLyricist: boolean = false;
  isBollyWoodActor: boolean = false;

  selectedCelebrity: any;
  hoveredNews: any;
  document: any


  constructor(private router: Router,
    private celebritiesService: CelebritiesService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute, private renderer: Renderer2,
    private meta: Meta,
    private newsService: NewsService,
    private toastService: ToasTMessageService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.isToggleImage = false;
      }
      this.menuBtnClick = false;
    });
  }

  preventCloseOnClick() {
    this.menuBtnClick = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isLoadingMoreCelbs = true;
    this.isLoadingNews = true;
    if(this.celebritiesService.celebrities){
      const celebrities = this.celebritiesService.celebrities.slice();
      this.randomCelebrity = celebrities[Math.floor((Math.random() * celebrities.length))];
      this.shuffled = celebrities.slice().sort(() => 0.5 - Math.random());
      this.selected = this.shuffled.slice(0, 1);
      this.onGetCategory();
      this.isLoading = false;
      this.isLoadingMoreCelbs = false;
    }
    else{
      this.celebritiesService.getRandomCelebrityForHome().then((randomRelebrity:any) => {
        this.selected = randomRelebrity;
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
      });

      this.celebritiesService.getRandomCelebrity().then((randomRelebrity:any) => {
        this.randomCelebrity = randomRelebrity[0];
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
      });

      this.celebritiesService.getCelebrities().then((celebrities: any) => {
        // this.randomCelebrity = celebrities[Math.floor((Math.random() * celebrities.length))];
        this.shuffled = celebrities.sort(() => 0.5 - Math.random());
        // this.selected = this.shuffled.slice(0, 1);
        this.onGetCategory();
        this.isLoading = false;
        this.isLoadingMoreCelbs = false;
      }).catch((err) => {
        // this.toastService.error(err.message);
        this.isLoading = false;
        this.isLoadingMoreCelbs = false;
        // this.isError= true;
      })
      // this.shuffled = this.celebritiesService.getCelebrities().sort(() => 0.5 - Math.random());
      // this.selected = this.shuffled.slice(0, 1);
      // this.randomCelebrity = this.celebritiesService.getCelebrities()[Math.floor((Math.random() * this.celebritiesService.getCelebrities().length))];
      
    }
    
    if(this.newsService.newsArray) {
      const news = this.newsService.newsArray.slice();
      this.latestNews = news.slice(-8).reverse();
      this.isLoadingNews = false;
    }
    else{
      this.newsService.getNews().then((news: any) => {
        this.latestNews = news.slice(-8).reverse();
        // this.toastService.success('Blogs loaded successfully');
        this.isLoadingNews = false;
        // this.isError = false;
      }).catch((err) => {
        this.isLoadingNews = false;
        // this.isError = true;
        this.toastService.error(err.message);
      })
  
      // this.latestNews = this.newsService.getNews().slice(-8).reverse();
    }

  
    this.activatedRoute.fragment.subscribe((fragment: any) => {
      this.fragment = fragment;
    });
    this.meta.updateTag({ name: 'description', content: 'Newsfarmers - Biographies of your favourite celebrities' });
    this.document = document.querySelector('#' + this.fragment);
  }


  onToggleImage(imgSrc: string) {
    this.isLoadingImage = true;
    this.imgSrc = imgSrc;
    this.isToggleImage = !this.isToggleImage;
    setTimeout(() => {
      this.isLoadingImage = false;
    }, 200);
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment)?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      console.log(e)
    }
  }

  scrollToContact(fragment: string) {
    try {
      document.querySelector('#' + fragment)?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      console.log(e)
    }
  }

  onNavigateTo(selected: any) {
    window.scrollTo(0, 0);
    const celebrityName = selected.name.toLowerCase().split(' ')
    const celebrityNameJion = celebrityName.join('-');
    this.router.navigate(['/', celebrityNameJion])
  }

  onNavigate() {
    this.router.navigate(['category/biographies']);
  }

  onNavigateToBiographies() {
    window.scrollTo(0, 0);
    this.router.navigate(['category/biographies'])
  }

  public onGetCategory() {
    this.isDropDownToggle = true;
    this.socialMediaCategory = [];
    this.shuffled.map((celebrity: any) => {
      celebrity.category.map((cat: any) => {
        if (cat?.toLowerCase() == 'social media influencer'.toLowerCase()) {
          this.socialMediaCategory.push(celebrity);
          this.isLoading = false;
        }
        if (cat?.toLowerCase() == 'punjabi singer'.toLowerCase()) {
          this.punjabiSingerCategory.push(celebrity);
          this.isLoading = false;
        }
        if (cat?.toLowerCase() == 'lyricist'.toLowerCase()) {
          this.lyricistCategory.push(celebrity);
          this.isLoading = false;
        }
        if (cat?.toLowerCase() == 'bollywood actor'.toLowerCase() || cat?.toLowerCase() == 'bollywood actress'.toLowerCase()) {
          this.bollywoodCategory.push(celebrity);
          this.isLoading = false;
        }
      })
    })
    if (this.socialMediaCategory.length <= 0) {
      this.isLoading = false;
    }
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/mqknapyv',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
    }
  }

  showAll() {
    let shand = document.getElementsByClassName('s-hand') as HTMLCollectionOf<HTMLElement>;
    this.isSocialMedia = false;
    this.isSinger = false;
    this.isLyricist = false;
    this.isBollyWoodActor = false;
    this.isAll = true;
    if (shand.length != 0) {
      for (let i = 0; i < shand.length; i++) {
        shand[i].style.display = 'block'
      }
    }
  }

  showSocialMedia() {
    let singer = document.getElementsByClassName('punjabi-singer') as HTMLCollectionOf<HTMLElement>;
    let lyricist = document.getElementsByClassName('lyricist') as HTMLCollectionOf<HTMLElement>;
    let socialMedia = document.getElementsByClassName('socialMedia') as HTMLCollectionOf<HTMLElement>;
    let bollyWoodActor = document.getElementsByClassName('bollywood-actor') as HTMLCollectionOf<HTMLElement>;
    this.isSocialMedia = true;
    this.isAll = false;
    this.isSinger = false;
    this.isLyricist = false;
    this.isBollyWoodActor = false;
    if (socialMedia.length != 0) {
      for (let i = 0; i < socialMedia.length; i++) {
        socialMedia[i].style.display = 'block';
      }
    }
    for (let i = 0; i < singer.length; i++) {
      singer[i].style.display = 'none';
    }
    for (let i = 0; i < bollyWoodActor.length; i++) {
      bollyWoodActor[i].style.display = 'none';
    }
    for (let i = 0; i < lyricist.length; i++) {
      lyricist[i].style.display = 'none';
    }
  }

  showSinger() {
    let singer = document.getElementsByClassName('punjabi-singer') as HTMLCollectionOf<HTMLElement>;
    let lyricist = document.getElementsByClassName('lyricist') as HTMLCollectionOf<HTMLElement>;
    let socialMedia = document.getElementsByClassName('socialMedia') as HTMLCollectionOf<HTMLElement>;
    let bollyWoodActor = document.getElementsByClassName('bollywood-actor') as HTMLCollectionOf<HTMLElement>;
    this.isSocialMedia = false;
    this.isAll = false;
    this.isSinger = true;
    this.isLyricist = false;
    this.isBollyWoodActor = false;
    if (singer.length != 0) {
      for (let i = 0; i < singer.length; i++) {
        singer[i].style.display = 'block';
      }
    }
    for (let i = 0; i < socialMedia.length; i++) {
      socialMedia[i].style.display = 'none';
    }
    for (let i = 0; i < bollyWoodActor.length; i++) {
      bollyWoodActor[i].style.display = 'none';
    }
    for (let i = 0; i < lyricist.length; i++) {
      lyricist[i].style.display = 'none';
    }
  }

  showLyricist() {
    let singer = document.getElementsByClassName('punjabi-singer') as HTMLCollectionOf<HTMLElement>;
    let lyricist = document.getElementsByClassName('lyricist') as HTMLCollectionOf<HTMLElement>;
    let socialMedia = document.getElementsByClassName('socialMedia') as HTMLCollectionOf<HTMLElement>;
    let bollyWoodActor = document.getElementsByClassName('bollywood-actor') as HTMLCollectionOf<HTMLElement>;
    this.isSocialMedia = false;
    this.isAll = false;
    this.isSinger = false;
    this.isLyricist = true;
    this.isBollyWoodActor = false;
    if (singer.length != 0) {
      for (let i = 0; i < singer.length; i++) {
        singer[i].style.display = 'none'
      }
    }
    for (let i = 0; i < socialMedia.length; i++) {
      socialMedia[i].style.display = 'none';
    }
    for (let i = 0; i < lyricist.length; i++) {
      lyricist[i].style.display = 'block'
    }
    for (let i = 0; i < bollyWoodActor.length; i++) {
      bollyWoodActor[i].style.display = 'none'
    }
  }

  showBollyWoodActor() {
    let singer = document.getElementsByClassName('punjabi-singer') as HTMLCollectionOf<HTMLElement>;
    let lyricist = document.getElementsByClassName('lyricist') as HTMLCollectionOf<HTMLElement>;
    let socialMedia = document.getElementsByClassName('socialMedia') as HTMLCollectionOf<HTMLElement>;
    let bollyWoodActor = document.getElementsByClassName('bollywood-actor') as HTMLCollectionOf<HTMLElement>;
    this.isSocialMedia = false;
    this.isAll = false;
    this.isSinger = false;
    this.isLyricist = false;
    this.isBollyWoodActor = true;
    if (bollyWoodActor.length != 0) {
      for (let i = 0; i < bollyWoodActor.length; i++) {
        bollyWoodActor[i].style.display = 'block'
      }
    }
    for (let i = 0; i < socialMedia.length; i++) {
      socialMedia[i].style.display = 'none';
    }
    for (let i = 0; i < lyricist.length; i++) {
      lyricist[i].style.display = 'none'
    }
    for (let i = 0; i < singer.length; i++) {
      singer[i].style.display = 'none'
    }
  }

  onNavigateToSelectedNews(news: any) {
    window.scrollTo(0, 0);
    const selectedNews = news.urlTitle.toLowerCase().split(' ').join('-')? news.urlTitle.toLowerCase().split(' ').join('-'): news.title.toLowerCase().split(' ').join('-');
    this.router.navigate(['/news', selectedNews]);
  }

  onHoverSelectedNews(news: any) {
    this.hoveredNews = this.newsService.hoverSelectedNews(news);
  }

  onGetSelectedCelebrity(selected: any) {
    this.selectedCelebrity = this.celebritiesService.selectedCelebrity(selected);
  }
}
