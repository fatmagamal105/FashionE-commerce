import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContactusDialogComponent } from 'src/app/contactus-dialog/contactus-dialog.component';
import { WhousDialogComponent } from 'src/app/whous-dialog/whous-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  islogged:boolean=false
  showFiller = false;
  subscription: Subscription = new Subscription;
  myProd : any[] = [];
  wishListCounter=0;
  cartCounter=0;
  constructor(private as: AuthService, private router:Router, private dialog:MatDialog,public translate:TranslateService){
    this.as.user.subscribe(user => {
      if(user)
        this.islogged = true;
      else this.islogged = false
    })

    translate.addLangs([
      'en',
      'ar'
    ]);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    
  }
  ngOnInit(): void {
    // this.as.currentStatus.subscribe(status =>{
    //   this.islogged = status
    // })
  }
  logout(){
    this.as.logout();
  }
  women(){
    //this.categ.setCategoryName("women");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products/:women']);
  }
  men(){
    //this.categ.setCategoryName("men");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products/:men']);
  }
  boys(){
    //this.categ.setCategoryName("boys");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products/:boys']);
  }
  girls(){
    //this.categ.setCategoryName("girls");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products/:girls']);
  }
  openContactInfo(){
    const dialogRef = this.dialog.open(ContactusDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openWhoUs(){
    const dialogWhoUs = this.dialog.open(WhousDialogComponent);
    dialogWhoUs.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}
