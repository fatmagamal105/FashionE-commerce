import { product } from './../../interfaces/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  itemId : string = "";
  categName : string = "";
  subscription: Subscription = new Subscription;
  //products : product[] = [];
  //myArr :string[] = [];
  prod: {name:string,price:number,itemId:string,imageUrl:string,category:string} []
  = []
  //newArr :any
  //myProd : product = {id :"", name :"",price:0, details:[], amount:0,color:[], size:[],imageUrl:"",oldprice:0,discount:0 , type:""}
  myId = "";
  constructor(active:ActivatedRoute,private pr:ProductsService,private router:Router,private au:AuthService) { }

  ngOnInit(): void {
    this.au.user.subscribe(user => {
      if(user){
        this.pr.getItemsFromWishList(user.uid).subscribe(data => {
          this.prod = data.map(element => {
            let x : any = element;
            x = element.payload.doc.data();
            return{
              id : element.payload.doc.id,
              ...x
            }
          })
        })
      }
    })
  
    // this.subscription = this.us.currentUserId.subscribe(uId => {
    //   this.uId = uId;
    //   this.pr.getItemsIdW(this.uId).subscribe(res => {
    //     console.log(res)
    //     this.prod = res.map(element => {
    //       let x : any = element;
    //       console.log(element)
    //       x = element.payload.doc.data();
    //       return{
    //         ...x
    //       }
    //     })
    //     console.log(this.prod)
    //     this.prod.map(element => {
    //       this.myArr.push(element.itemId)
    //     })
    //     console.log(this.myArr)
    //     for(let i=0;i<this.myArr.length;i++){
    //       this.pr.getItemById("men",this.myArr[i]).subscribe(res => {
    //         if(res.payload.data())
    //         {
    //           let x : any = res.payload.data()
    //           this.myProd = x;
    //           this.myProd.id = this.myArr[i];
    //           this.products.push(this.myProd)
    //         }
    //         else {
    //           this.pr.getItemById("women",this.myArr[i]).subscribe(res => {
    //             if(res.payload.data())
    //             {
    //               console.log("done")
    //               let x : any = res.payload.data()
    //               this.myProd = x;
    //               this.myProd.id = this.myArr[i];
    //               this.products.push(this.myProd)
    //             }
    //             else {
    //               this.pr.getItemById("boys",this.myArr[i]).subscribe(res => {
    //                 if(res.payload.data())
    //             {
    //               let x : any = res.payload.data()
    //               this.myProd = x;
    //               this.myProd.id = this.myArr[i];
    //               this.products.push(this.myProd)
    //             }
    //             else {
    //               this.pr.getItemById("girls",this.myArr[i]).subscribe(res => {
    //                 let x : any = res.payload.data()
    //                 this.myProd = x;
    //                 this.myProd.id = this.myArr[i];
    //                 this.products.push(this.myProd)
    //               })
    //             }
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // })
  }
  deleteItem(id:string){
    //console.log(id)
    this.au.user.subscribe(user => {
      if(user){
        if(confirm("Do you want to remove this item from your wishlist ?")){
          this.pr.deleteFromWishList(user.uid,id).then(()=>{
            this.router.navigate(['/wishlist'])
          })
        }
      }
    })
  }
}
