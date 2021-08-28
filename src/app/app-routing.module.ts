import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { PathComponent } from './components/path/path.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home page/home/home.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Login/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfilePageComponent } from './components/user-profile/profile-page/profile-page.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AuthGuard } from './guard/auth.guard';
import { TestComponent } from './components/test/test.component';
import { ContactusDialogComponent } from './contactus-dialog/contactus-dialog.component';
import { WhousDialogComponent } from './whous-dialog/whous-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'home', component: HomeComponent },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'profile', component: ProfilePageComponent,canActivate:[AuthGuard]},
  { path:'products/:name', component:ProductsComponent},
  { path:'product-details/:name/:id', component:ProductDetailsComponent},
  { path:'cart', component:CartComponent,canActivate:[AuthGuard]},
  { path: 'wishlist', component:WishlistComponent,canActivate:[AuthGuard]},
  { path: 'checkout', component:CheckoutComponent,canActivate:[AuthGuard]},
  { path: 'path', component:PathComponent},
  { path: 'reviews/:id', component:ReviewsComponent },
  { path:'test', component:LiveChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
