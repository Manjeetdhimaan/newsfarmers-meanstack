import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private newsService: NewsService) { }
  newsArray: any
  searchText: any;
  searchNewsArray: any;
  p: number = 1;
  ngOnInit(): void {
    this.newsService.getNews().then((news: any) => {
      this.newsArray = news.reverse();
      const newsArray = news;
      this.searchNewsArray = newsArray.reverse();
    }).catch((err) => {
      console.log(err);
    })
  }

  onNavigate(selected: any) {
    this.newsService.selectedNews = selected
    this.newsService.getSearchedNews.next(selected);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    //  this.selectedNews.emit(selected)
    this.router.navigate(['news/', selected.title.toLowerCase().split(' ').join('-')]);
    this.searchText = '';
  }

}
