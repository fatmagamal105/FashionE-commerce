import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';

import { SliderComponent } from './components/home page/slider/slider.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Login/register/register.component';
import { FooterComponent } from './components/shared components/footer/footer.component';
import { HeaderComponent } from './components/shared components/header/header.component';
import { ProfileAsideComponent } from './components/user-profile/profile-aside/profile-aside.component';
import { ProfilePageComponent } from './components/user-profile/profile-page/profile-page.component';
import { HomeComponent } from './components/home page/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/home page/categories/categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PathComponent } from './components/path/path.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FeaturesComponent } from './components/home page/features/features.component';
import { TestComponent } from './components/test/test.component';
import { ContactusDialogComponent } from './contactus-dialog/contactus-dialog.component';
import { WhousDialogComponent } from './whous-dialog/whous-dialog.component';
import { ShippingInfoDialogComponent } from './shipping-info-dialog/shipping-info-dialog.component';
import { MaterialModule } from './material/material.module';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { SizeChartComponent } from './size-chart/size-chart.component';
import { NgxPayPalModule } from 'ngx-paypal';

export function HttpLoaderFactory(http:HttpClient) {
	return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    FooterComponent,
    HeaderComponent,
    SliderComponent,
    LoginComponent,
    RegisterComponent,
    ProfilePageComponent,
    ProfileAsideComponent,
    ProductsComponent,
    PathComponent,
    ProductDetailsComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    ReviewsComponent,
    FeaturesComponent,
    TestComponent,
    ContactusDialogComponent,
    WhousDialogComponent,
    ShippingInfoDialogComponent,
    WelcomeDialogComponent,
    LiveChatComponent,
    SizeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCUXhu3orefq_ailE0SkR-1c3axM_WZHPE",
      authDomain: "e-commerce-project-7.firebaseapp.com",
      projectId: "e-commerce-project-7",
      storageBucket: "e-commerce-project-7.appspot.com",
      messagingSenderId: "655024452506",
      appId: "1:655024452506:web:b93e337c799aed09638023"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule,
    NgxPaginationModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
