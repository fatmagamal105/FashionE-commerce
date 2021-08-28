import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/interfaces/products';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SizeChartComponent } from 'src/app/size-chart/size-chart.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  currentRate1 = 8;
  currentRate2 = 0;

  inputnumber = 1;
  plus()
  {
   this.inputnumber = this.inputnumber+1;
  }
  minus()
  {
    if(this.inputnumber != 1)
  {
   this.inputnumber = this.inputnumber-1;
  }
}


  subscription: Subscription = new Subscription;
  userStatus : Subscription = new Subscription;
  prod : any;
  id : string = "";
  categoryName = "";
  relatedProd: product[] = [];
  type : any;
  prodDetails : any[] =[];
  prodColor : any[] = [];
  prodSize : any[] = [];
  reviews:any[]=[];
  oneReview:{rate:number,review:string,date:any,username:string}={rate:0,review:"",date:"",username:""}
  constructor(active:ActivatedRoute,private pr:ProductsService,
             private route:Router,
             private us:UsersService,
             private au:AuthService,
             public dialog:MatDialog){
    this.categoryName = active.snapshot.params.name.slice(1)
    this.id = active.snapshot.params.id.slice(1)
  }
  ngOnInit(): void {
    this.pr.getItemById(this.categoryName,this.id).subscribe(res =>{
      let x = res.payload.data()
      //console.log(x)
      this.prod = x;
      this.type = this.prod.type;
      this.prodDetails = this.prod.details;
      this.prodColor = this.prod.color;
      this.prodSize = this.prod.size;
      this.pr.getRelatedItems(this.categoryName,this.type).subscribe(data => {
        this.relatedProd = data.map(element => {
          let x : any = element;
          x = element.payload.doc.data();
          //console.log(element.payload.doc.data)
          return{
            id : element.payload.doc.id,
            ...x
          }
        })
      })
    })
    this.pr.getReviews(this.id).subscribe(res => {
      this.reviews = res.map(element => {
        let x :any = element.payload.doc.data();
        return{
          rate : x.rate,
          review : x.review,
          username : x.username,
          date : x.date
        }
      })
      this.oneReview = this.reviews[0]
    })
}
addToWishList(imageUrl:string,name:string,price:number){
  this.au.user.subscribe(user => {
    if(user)
    {
      this.pr.setItemsToWishList(user.uid,this.id,imageUrl,name,price,this.categoryName)
    }else this.route.navigateByUrl("/login");
  })
  
}
price=0;
addToCart(prodColor:string,prodSize:string,prodQuantity:string,prodName:string,
  prodPrice:number,prodImageUrl:string){
  this.au.user.subscribe(user => {
    if(user){
      let q : number = parseInt(prodQuantity);
      this.price = q*prodPrice;
      this.pr.setItemsIdToCart(user.uid,this.id,prodColor,prodSize,q,prodName,this.price,prodImageUrl,this.categoryName)
    }else this.route.navigateByUrl("/login");
  })
}
goToCart(prodColor:string,prodSize:string,prodQuantity:string,
  prodName:string,prodPrice:number,prodImageUrl:string){
  this.au.user.subscribe(user => {
    if(user){
    let q : number = parseInt(prodQuantity);
    this.price = q*prodPrice;
    this.pr.setItemsIdToCart(user.uid,this.id,prodColor,prodSize,q,prodName,this.price,prodImageUrl,this.categoryName).then(()=>{
      this.route.navigate(["/cart"])
    })
    }else this.route.navigateByUrl("/login");
  })
}
username="";
msg="";
date = new Date().toLocaleString()
  addReview(f:any){
    this.au.user.subscribe(user => {
      if(user)
      {
        this.pr.getUserName(user.uid).subscribe(res => {
          let x :any = res;
          this.username = x.fname +" "+ x.lname;
          let data = f.value;
          console.log(this.currentRate2,this.username,data.review);
          this.pr.setReview(user.uid,this.username,this.id,this.currentRate2,data.review,this.date).then(()=> this.msg = "done")
        })
      }else this.route.navigateByUrl("/login");
    })
    
  }
  sizeChartDialog(){
    const sizeRef = this.dialog.open(SizeChartComponent);
    sizeRef.afterClosed().subscribe( result => {
      console.log(`Dialog result ${result}`)
    });
  }
}
