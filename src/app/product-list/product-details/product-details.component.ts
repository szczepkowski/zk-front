import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Product} from '../product';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product-service';
import {AuthenticationService} from '../../services/authentication-service';
import {PhotoAlbumModel} from '../../services/photo-album-model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  private title: string;
  product: Product;
  private paramsSubscription: Subscription;


  imageObjects: Array<object> = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.title = params.title;
        this.getProduct(this.title);
        console.log('route param id' + this.title);
      });
  }


  getProduct(title: string) {
    this.productService
      .get(title)
      .subscribe((product) => {
        this.product = product;
        this.setImageObject();
      });
  }

  onCommentAdd(form: NgForm) {
    console.log(form);
    this.productService
      .addComent(this.authService.getUserLoggedIn(), this.title, form.value.text)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onOrderBuyClick(form: NgForm) {
    const amount = form.value.amount;
    const price = this.product.price;
    this.router.navigate([`produkt/zamowienie/${this.title}`, price, amount]);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  setImageObject() {

    this.imageObjects = []
    if (this.product.sellerId === 'admin') {

      this.imageObjects.push({
        image: 'https://youtu.be/dpXn9Cn9toU',
        thumbImage: 'https://youtu.be/dpXn9Cn9toU',
        alt: 'alt of image',
        title: 'Filmik o gShop',
        imagePopup: true,
      });

    }
    let i = 0;

    for (const imageByteList of this.product.photoAlbum.byteList) {
      const base64 = btoa(
        new Uint8Array(imageByteList)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const image = 'data:image/JPEG;base64, ' + base64;

      i = i + 1;

      this.imageObjects.push({
        image,
        thumbImage: image,
        title: i,
        alt: 'alt of image',
        name: this.product.photoAlbum.name,
        imagePopup: true,
        slideImage: 2
      });
    }

  }

  isLoggedIn() {
    return this.authService.getUserLoggedIn();
  }

}
