import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductListComponent} from './product-list/product-list.component';
import {CommentComponent} from './product-list/product-details/comment/comment.component';
import {ProductDetailsComponent} from './product-list/product-details/product-details.component';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {AccountComponent} from './account/account.component';
import {ProductService} from './services/product-service';
import {OrderService} from './services/order-service';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {MessageService} from './services/message-service';
import {CategoryService} from './services/category-service';
import {PhotoAlbumService} from './services/photo-album-service';
import {NgImageSliderModule} from 'ng-image-slider';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AccountService} from './services/account-service';
import {HomeComponent} from './home/home.component';
import {KeycloakAngularModule} from 'keycloak-angular';
import {initializeKeycloak} from './init/keycloak-init.factory';
import {AuthGuard} from './guard/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produkty/:title', component: ProductDetailsComponent},
  {path: 'produkty', component: ProductListComponent},
  {path: 'konto', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'kontakt', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    CommentComponent,
    ProductDetailsComponent,
    ContactComponent,
    AccountComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgImageSliderModule,
    FontAwesomeModule,
    KeycloakAngularModule,
  ],
  providers: [ProductService, OrderService, MessageService, CategoryService, PhotoAlbumService, AccountService, {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true
  }]
  ,
  bootstrap: [AppComponent]
})
export class AppModule {
}
