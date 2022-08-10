import { Component, OnInit,OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit,OnDestroy {
categories:Category[] = [];
endsubs$: Subject<any> = new Subject();
  constructor(
    private categoriesService:CategoriesService
  ) { }


  ngOnDestroy() {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  ngOnInit(): void {
  this.categoriesService.getCategories().
  pipe(takeUntil(this.endsubs$)).
  subscribe(categories=>
    this.categories = categories)
  }



}
