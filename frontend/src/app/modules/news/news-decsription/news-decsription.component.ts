import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { ToasTMessageService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-news-decsription',
  templateUrl: './news-decsription.component.html',
  styleUrls: ['./news-decsription.component.css', '../../biography/celebrities/celebrities.component.css']
})
export class NewsDecsriptionComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  news: any;
  newsArray: any; imgUrl: any = 'assets/images/no-preview.png';
  moreNews: any;
  latestNews: any;
  subscription: Subscription;
  borderColor = "black";
  isError: boolean = false;
  hoveredNews:any="";

  constructor(private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta, private toastService: ToasTMessageService) {

    router.events
      .subscribe((event: any) => {
        if (event.navigationTrigger === 'popstate') {
          this.isLoading = true;
          // this.recentPost = this.newsService.getnewsArray().slice(-8).reverse();
          // this.newsArray = this.newsService.getNews();
          activatedRoute.params.subscribe((param: Params) => {
            if(this.newsService.newsArray) {
              const news = this.newsService.newsArray.slice().reverse();
              news.map((a: any) => {
                const urlTitle = a.urlTitle?.toLowerCase().split(' ').join('-') ? a.urlTitle?.toLowerCase().split(' ').join('-') : a.title.toLowerCase().split(' ').join('-')
                if (this.router.url.toLowerCase() == "/blogs/" + urlTitle) {
                  this.router.url.toLowerCase();
                  this.news = a;
                  // this.toastService.success(`${a.title}`);
                  // let blogs = this.blogService.blogsArray.slice(-10).reverse();
                  // this.moreBlogs = blogs.sort(() => 0.5 - Math.random());
                  this.latestNews = a.slice().slice(-8).reverse();
                  this.isLoading = false;
                  this.isError = false;
                }
              })
            }
            else {
              this.newsService.getNews().then((news: any) => {
                news.map((a: any) => {
                  const urlTitle = a.urlTitle?.toLowerCase().split(' ').join('-') ? a.urlTitle?.toLowerCase().split(' ').join('-') : a.title.toLowerCase().split(' ').join('-')
                  if (this.router.url.toLowerCase() == "/blogs/" + urlTitle) {
                    this.router.url.toLowerCase();
                    this.news = a;
                    // this.toastService.success(`${a.title}`);
                    // let blogs = this.blogService.blogsArray.slice(-10).reverse();
                    // this.moreBlogs = blogs.sort(() => 0.5 - Math.random());
                    this.latestNews = a.slice(-8).reverse();
                    this.isLoading = false;
                    this.isError = false;
                  }
                })
                // if (this.router.url.toLowerCase() !== "/blogs/" + this.news?.urlTitle.toLowerCase().split(' ').join('-')) {
                //   this.router.navigate(['/404notfound']);
                //   this.isLoading = false;
                // }
              }).catch((err) => {
                this.toastService.error(err.message);
              })
            }
          })
        }
      });
  }

  ngOnInit(): void {
    this.isLoading = true;
    if(this.newsService.newsArray) {
      const news = this.newsService.onGetNews();
      news.map((a: any) => {
        const urlTitle = a.urlTitle?.toLowerCase().split(' ').join('-') ? a.urlTitle?.toLowerCase().split(' ').join('-') : a.title.toLowerCase().split(' ').join('-')
        if (this.router.url.toLowerCase() == "/news/" + urlTitle) {
          this.router.url.toLowerCase();
          this.news = a;
          // this.toastService.success(`${a.title}`);
          let newsArray = news.slice(-10).reverse();
          this.moreNews = newsArray.sort(() => 0.5 - Math.random());
          this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/news/${a.title.toLowerCase().split(' ').join('-')}` });
          this.latestNews = news.slice().slice(-8).reverse();
          this.isLoading = false;
          this.isError = false;
        }
      })
      const currentUrlTitle = this.news?.urlTitle?.toLowerCase().split(' ').join('-') ? this.news?.urlTitle?.toLowerCase().split(' ').join('-') : this.news?.title.toLowerCase().split(' ').join('-')
      if (this.router.url.toLowerCase() !== "/news/" + currentUrlTitle) {
        this.router.navigate(['/404notfound']);
        this.isLoading = false;
        this.isError = false;
      }
    }
    else{
      this.newsService.getNews().then((news: any) => {
        news.map((a: any) => {
          const urlTitle = a.urlTitle?.toLowerCase().split(' ').join('-') ? a.urlTitle?.toLowerCase().split(' ').join('-') : a.title.toLowerCase().split(' ').join('-')
          if (this.router.url.toLowerCase() == "/news/" + urlTitle) {
            this.router.url.toLowerCase();
            this.news = a;
            // this.toastService.success(`${a.title}`);
            let newsArray = news.slice(-10).reverse();
            this.moreNews = newsArray.sort(() => 0.5 - Math.random());
            this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/news/${a.title.toLowerCase().split(' ').join('-')}` });
            this.latestNews = news.slice(-8).reverse();
            this.isLoading = false;
            this.isError = false;
          }
        })
        const currentUrlTitle = this.news?.urlTitle?.toLowerCase().split(' ').join('-') ? this.news?.urlTitle?.toLowerCase().split(' ').join('-') : this.news?.title.toLowerCase().split(' ').join('-')
        if (this.router.url.toLowerCase() !== "/news/" + currentUrlTitle) {
          this.router.navigate(['/404notfound']);
          this.isLoading = false;
          this.isError = false;
        }
      }).catch((err) => {
        this.toastService.error(err.message);
        this.isLoading = false;
        this.isError = true;
      })
    }
  


    // this.newsService.getNews().map((a: any) => {
    //   if (this.router.url.toLowerCase() == "/news/" + a.title.toLowerCase().split(' ').join('-')) {
    //     this.router.url.toLowerCase();
    //     this.news = a;
    //     // this.dobOfnews = this.news.dob.year;
    //     // this.relatedPostArray = [];
    //     let celebrities = this.newsService.getNews().slice(-10).reverse();
    //     this.moreNews = celebrities.sort(() => 0.5 - Math.random());
    //     // this.relatedPostArray = suffledArray.filter((news: any) => news.categoryId.toLowerCase() === this.news.categoryId.toLowerCase());
    //     this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/news/${a.title.toLowerCase().split(' ').join('-')}` });
    //     this.isLoading = false;
    //   }
    // })
    // if (this.router.url.toLowerCase() !== "/news/" + this.news?.title.toLowerCase().split(' ').join('-')) {
    //   this.router.navigate(['/404notfound']);
    //   this.isLoading = false;
    // }

    this.subscription = this.newsService.getSearchedNews
      .subscribe(
        (selectedNews: {}) => {
          this.news = selectedNews;
        }
      );
  }

  onNavigate(selected: any) {
    this.isLoading = true;
    this.news = selected;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const celebrityName = selected.urlTitle?.toLowerCase().split(' ')? selected.urlTitle?.toLowerCase().split(' '):selected.title.toLowerCase().split(' ');
    const celebrityNameJion = celebrityName.join('-');
    // this.toastService.success(`${selected.title}`);
    this.router.navigate(['news/', celebrityNameJion]);
    this.meta.updateTag({ property: 'og:url', content: `https://www.newsfarmers.com/news/${selected.title.toLowerCase().split(' ').join('-')}` });
    this.isLoading = false;
  }

  onHoverSelectedNews(news:any){
    this.hoveredNews = this.newsService.hoverSelectedNews(news);
  }

  ngOnDestroy(): void {
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("name='description'");
    this.subscription.unsubscribe();
  }
}