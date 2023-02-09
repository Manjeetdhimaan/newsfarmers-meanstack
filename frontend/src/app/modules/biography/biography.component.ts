import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';

import { CelebritiesService } from 'src/app/services/celebrities.service';
import { ToasTMessageService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css', './celebrities/celebrities.component.css']
})
export class BiographyComponent implements OnInit {
  constructor(private celebritiesService: CelebritiesService,
    private router: Router, private meta: Meta,
    private toastService: ToasTMessageService
    ) { }
  celebrities: any[] = [];
  randomCelebrity: any
  selectedCelebrity: any;
  shuffled: any
  selected: any
  moreCelebrities: any
  recentPost: any
  isLoading = false;
  isLoadingMoreCelbs = false;
  isLoadingRecentCelbs = false;
  isError = false;
  borderColor="black";

  ngOnInit(): void {
    
    this.isLoading=true;
    this.isLoadingMoreCelbs=true;
    this.isLoadingRecentCelbs=true;
    if(this.celebritiesService.celebrities){
      const celebrities = this.celebritiesService.celebrities.slice();
      this.randomCelebrity = celebrities[Math.floor((Math.random() * celebrities.length))];
      // this.toastService.success(`${this.randomCelebrity.name}`);
      this.recentPost = celebrities.slice(-6).reverse();
      this.celebrities = celebrities;
      this.shuffled = celebrities.sort(() => 0.5 - Math.random());
      this.selected = this.shuffled.slice(0, 4);
      this.moreCelebrities = this.shuffled.slice(5, 17);
        this.isLoading=false;
        this.isLoadingMoreCelbs=false;
        this.isLoadingRecentCelbs=false;
        this.isError=false;
        this.meta.updateTag({ name: 'description', content: 'Biography Categories'});
    }
    else{
      this.celebritiesService.getRandomCelebrity().then((randomRelebrity:any) => {
        this.randomCelebrity = randomRelebrity[0];
        this.isLoading = false;
        this.isError = false;
      }).catch(err => {
        this.isLoading = false;
        this.isError = false;
      });

      this.celebritiesService.getRecentCelebrities().then(recentCelebrities => {
        this.recentPost = recentCelebrities;
        this.isLoadingRecentCelbs = false;
        this.isError = false;
      }).catch(err =>{
        this.isLoading = false;
        this.isError = false;
      })

      this.celebritiesService.getCelebrities().then((celebrities: any) => {
        // this.randomCelebrity = celebrities[Math.floor((Math.random() * celebrities.length))];
        // this.toastService.success(`${this.randomCelebrity.name}`);
        // this.recentPost = celebrities.slice(-6).reverse();
        this.celebrities = celebrities;
        this.shuffled = celebrities.sort(() => 0.5 - Math.random());
        this.selected = this.shuffled.slice(0, 4);
        this.moreCelebrities = this.shuffled.slice(5, 17);
          this.isLoading=false;
          this.isLoadingMoreCelbs = false;
          this.isError=false;
          this.meta.updateTag({ name: 'description', content: 'Biography Categories'});
      }).catch((err) => {
        this.toastService.error(err.message);
        this.toastService.error('Unable to load biographies archieve');
        this.isLoading = false;
        this.isLoadingMoreCelbs = false;
        this.isError = true;
        // this.isError= true;
      })
    }
   



    // this.recentPost = this.celebritiesService.getCelebrities().slice(-6).reverse();
    // this.celebrities = this.celebritiesService.getCelebrities();
    // this.randomCelebrity = this.celebritiesService.getCelebrities()[Math.floor((Math.random() * this.celebritiesService.getCelebrities().length))];
    // this.shuffled = this.celebritiesService.getCelebrities().sort(() => 0.5 - Math.random());
    // this.selected = this.shuffled.slice(0, 4);
    // this.moreCelebrities = this.shuffled.slice(5, 17);
    //   this.isLoading=false;
    //   this.meta.updateTag({ name: 'description', content: 'Biography Categories'});
  }

  onNavigate(selected: any) {
    this.isLoading=true;
    window.scrollTo(0,0)
    const celebrityName = selected.name.toLowerCase().split(' ')
    const celebrityNameJion = celebrityName.join('-');
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree([`/`, celebrityNameJion])
    // );
    // window.open(url, '_blank');

    // this.router.navigate([`/${celebrityNameJion}`])
    this.router.navigate(['/', celebrityNameJion]); 
    this.isLoading=false;
    this.isLoadingMoreCelbs = false;
  }

  onHoverCelebrity(selected: any) {
    this.selectedCelebrity = this.celebritiesService.selectedCelebrity(selected);
   }
}
