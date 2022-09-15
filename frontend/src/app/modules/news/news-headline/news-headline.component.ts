import { Component, OnInit, OnDestroy} from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { ToasTMessageService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-news-headline',
  templateUrl: './news-headline.component.html',
  styleUrls: ['./news-headline.component.css', '../../pagenotfound/pagenotfound.component.css']
})
export class NewsHeadlineComponent implements OnInit, OnDestroy {

  constructor(private newsService: NewsService, private router: Router, private toastService: ToasTMessageService) { }

  newsArray:any;
  isLoading = false;
  isError = false;
  borderColor = "black";
  hoveredNews:any="";
//pagination properties
  p:any;
  responsive:boolean = true;
  

  ngOnInit(): void {
    this.isLoading=true;
    if(this.newsService.newsArray) {
      this.newsArray = this.newsService.newsArray.slice().reverse();
      this.isLoading = false;
    }
    else {
      this.newsService.getNews().then((news:any) => {
        this.newsArray = news.reverse();
        // this.toastService.success('News Headline loaded successfully');
        this.isLoading = false;
        this.isError = false;
      }).catch((err) => {
        console.log(err);
        this.isLoading = false;
        this.isError = true;
        this.toastService.error(err.message);
      })
    }
    

    
    // this.isLoading= true;
    // this.newsArray = this.newsService.getNews().reverse();
    // this.meta.updateTag({ name: 'description', content: 'News Headlines'});
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 200);
  }

  onNavigate(news:any) {
    window.scrollTo(0,0);
    const selectedNews = news.urlTitle?.toLowerCase().split(' ').join('-') ? news.urlTitle?.toLowerCase().split(' ').join('-'): news.title.toLowerCase().split(' ').join('-');
    this.router.navigate(['/news', selectedNews]);
  }

  onHoverSelectedNews(news:any){
    this.hoveredNews = this.newsService.hoverSelectedNews(news);
  }

  scrollTop() {
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this.hoveredNews = "";
  }
}