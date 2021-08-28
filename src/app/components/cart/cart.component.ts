import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  constructor(private pr:ProductsService,private router:Router,private au:AuthService){}
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
prod : {name:string,price:number,size:string,color:string,quantity:number,itemId:string,imageUrl:string,category:string} []
      = [];
totalPrice=0;
price=0;
ngOnInit(): void {
  this.au.user.subscribe(user => {
    this.pr.getItemsFromCart(user?.uid).subscribe(res => {
      this.totalPrice= 0;
      this.prod = res.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        this.totalPrice += element.payload.doc.data().price;
        return{
          ...x
        }
      })
    })
  })
}
remove(itemId:string,price:number){
  this.au.user.subscribe(user => {
    if(confirm("Are you sure ?")){
      this.pr.deleteFromCart(user?.uid,itemId).then(() => {
        this.router.navigate(['/cart'])
      })
    }
  })
}
addToWishList(itemId:string,imageUrl:string,name:string,price:number,quantity:number,category:string){
  price = price/quantity;
  this.au.user.subscribe(user => {
    this.pr.setItemsToWishList(user?.uid,itemId,imageUrl,name,price,category)
  })
}
goToCheckout(){
  //console.log(this.prod)
  this.router.navigateByUrl('/checkout')
}
}
