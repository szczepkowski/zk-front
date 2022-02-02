import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../services/product-service';
import {Product} from './product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[] = [];
  private categoryName: string;
  private paramsSubscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.categoryName = params.category;
        console.log('route param id' + this.categoryName);

        this.productService.getAll()
          .subscribe(apiProducts => {
            this.products = apiProducts;
          });
      });

  }



  onTitleClick(title: string) {
    this.router.navigate(['/produkt/' + title]);
  }

}
