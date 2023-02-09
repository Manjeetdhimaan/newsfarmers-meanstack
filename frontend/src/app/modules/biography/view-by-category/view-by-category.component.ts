import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CelebritiesService } from 'src/app/services/celebrities.service';

@Component({
  selector: 'app-view-by-category',
  templateUrl: './view-by-category.component.html',
  styleUrls: ['./view-by-category.component.css']
})
export class ViewByCategoryComponent implements OnInit, OnDestroy {
  celebrities: any[] = [];
  category: string = '';
  isLoading = false;
  uniq: any[] = [];
  borderColor = "black";
  selectedCelebrity: any;
  subscription: Subscription;

  constructor(private celebritiesService: CelebritiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    router.events
      .subscribe((event: any) => {
        if (event.navigationTrigger === 'popstate') {
          this.celebrities = [];
          this.uniq = []
          this.isLoading = true;
          activatedRoute.params.subscribe((param: Params) => {
            this.celebrities = [];
            this.celebritiesService.getCelebrities().then((celebrities: any) => {
              celebrities.map((a: any) => {
                a.category.map((n: any) => {
                  if (param.view == n?.toLowerCase().split(' ').join('-')) {
                    this.celebrities.push(a);
                    this.category = n?.toLowerCase().split('-').join(' ').toUpperCase();
                    this.celebrities = [...new Set(this.celebrities)]
                    this.isLoading = false;
                  }
                  if (param.view == "all") {
                    this.category = 'ALL'
                    this.celebrities = this.celebritiesService.celebrities.reverse();
                    this.celebrities = [...new Set(this.celebrities)];
                    this.isLoading = false;
                  }
                })
              })
            })
            // celebritiesService.celebrities.map((a: any) => {
            //   a.category.map((n: any) => {
            //     if (param.view == n.toLowerCase().split(' ').join('-')) {
            //       this.celebrities.push(a);
            //       this.category = n.toLowerCase().split('-').join(' ').toUpperCase();
            //       this.celebrities = [...new Set(this.celebrities)]
            //       this.isLoading = false;
            //     }
            //     if (param.view == "all") {
            //       this.category = 'ALL'
            //       this.celebrities = this.celebritiesService.celebrities.reverse();
            //       this.celebrities = [...new Set(this.celebrities)];
            //       this.isLoading = false;
            //     }
            //   })
            // })
          })
          this.celebrities = this.celebrities.reverse();
        }
      });
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.celebrities = [];
    this.activatedRoute.params.subscribe((param: Params) => {
      this.category = param.view.split('-').join(' ').toUpperCase();
    })
    if (this.celebritiesService.celebrities) {
      const celebrities = this.celebritiesService.getCel().reverse();
      celebrities.map((a: any) => {
        a.category.map((n: any) => {
          if (this.router.url == "/category/" + n?.toLowerCase().split(' ').join('-')) {
            this.celebrities.push(a);
            this.isLoading = false;
          }
        })
      })
      if (this.router.url == "/category/all") {
        this.celebrities = celebrities.slice();
        this.category = 'ALL'
        this.isLoading = false;
      }
      // if (this.celebrities.length <= 0) {
      //   this.activatedRoute.params.subscribe((param: Params) => {
      //     this.category = param.view.split('-').join(' ').toUpperCase();
      //     this.isLoading = false;
      //   })
      // }
    }
    else {
      const categoryFilter = this.router.url.toLowerCase().split('/category/').join(' ').trim()
      this.celebritiesService.getFilteredCelebrities(categoryFilter).then((fiteredCelbs:any) => {
        console.log(fiteredCelbs);
        this.celebrities = fiteredCelbs;
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });

      // this.celebritiesService.getCelebrities().then((celebrities: any) => {
      //   celebrities?.map((a: any) => {
      //     a.category.map((n: any) => {
      //       if (this.router.url == "/category/" + n?.toLowerCase().split(' ').join('-')) {
      //         this.celebrities.push(a);
      //         this.isLoading = false;
      //       }
      //     })
      //     if (this.router.url == "/category/all") {
      //       this.celebrities = celebrities;
      //       this.category = 'ALL'
      //       this.isLoading = false;
      //     }
      //     this.celebrities = this.celebrities.reverse();
      //   })
      // }).catch((err) => {
      //   console.log(err.message);
      //   this.isLoading = false;
      // })
    }



    // this.celebritiesService.celebrities.map((a: any) => {
    //   a.category.map((n: any) => {
    //     if (this.router.url == "/category/" + n.toLocaleLowerCase().split(' ').join('-')) {
    //       this.activatedRoute.params.subscribe((param: Params) => {
    //         this.category = param.view.split('-').join(' ').toUpperCase();
    //       })
    //       this.celebrities.push(a);
    //         this.isLoading = false
    //     }
    //   })
    //   if (this.router.url == "/category/all") {
    //     this.celebrities = this.celebritiesService.celebrities;
    //     this.category = 'ALL'
    //   }
    // })
    // this.celebrities = this.celebrities.reverse();
    // if (this.celebrities.length <= 0) {
    //   this.activatedRoute.params.subscribe((param: Params) => {
    //     this.category = param.view.split('-').join(' ').toUpperCase();
    //   })
    // }
    // setTimeout(() => {
    //   this.isLoading = false
    // }, 300);

    this.subscription = this.celebritiesService.getSelectedCategories
      .subscribe(
        (selectedCategory: any) => {
          this.isLoading = true;
          this.celebrities = [];
          // this.activatedRoute.params.subscribe((param: Params) => {
          //   this.category = param.view.split('-').join(' ').toUpperCase();
          //   this.isLoading = false;
          // })
          this.celebrities = selectedCategory;
          this.isLoading = false;
        }
      );
    this.celebritiesService.getActiveClass.next(true);
  }

  onNavigate(selected: any) {
    this.isLoading = true;
    window.scrollTo(0, 0);
    const selectedCelebrity = selected.name.toLowerCase().split(' ').join('-')
    this.router.navigate(['/', selectedCelebrity]);
    this.isLoading = false;
  }

  onGetSelectedCelebrity(selected: any) {
    this.selectedCelebrity = this.celebritiesService.selectedCelebrity(selected);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.celebritiesService.getActiveClass.next(false)
  }
}
