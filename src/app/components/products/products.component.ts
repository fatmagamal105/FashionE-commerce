import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from './../../services/products.service';
import { product } from './../../interfaces/products';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  p: number=1;
  i: number =0;
  
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selected = -1;
  //categoryName: string = "";
  onChange(event:any) {
    console.log(event)
  }

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
/////////////////////////////////
  prod : product[] = [];
  //type = "";
  //Mtype : string = "polos";
  sort="sort by";
  categoryName : string = "";
  type: string | null = "";
  filteredProd = "";
  currentUrl = "";
  color :string | null="";
  size :string | null=""
  userStatus : Subscription = new Subscription;
  constructor(private pr:ProductsService, private active:ActivatedRoute,private route:Router, private us : UsersService,private au:AuthService){
    this.active.queryParamMap.subscribe(params => {
      this.type = params.get('type');
      this.color = params.get('color');
      this.size = params.get('size');
    })
    this.categoryName = active.snapshot.params.name.slice(1);
  }

  ngOnInit(): void {
    // setTimeout(() => this.staticAlert.close(), 1000);

    // this._success.subscribe(message => this.successMessage = message);
    // this._success.pipe(debounceTime(1000)).subscribe(() => {
    //   if (this.selfClosingAlert) {
    //     this.selfClosingAlert.close();
    //   }
    // });
    /////////////////////////////////////////////////////////////////
    if(this.categoryName === "women"){
      if(this.type)
        this.getItemsWithType() 
      else if(this.color)
        this.getItemWithColor()
      else if (this.size) 
        this.getItemWithSize()
      else this.getItems()
    }
    else if(this.categoryName === "men"){
      if(this.type)
        this.getItemsWithType() 
      else if(this.color)
        this.getItemWithColor()
      else if (this.size) 
        this.getItemWithSize()
      else this.getItems()
    }
    else if(this.categoryName === "boys"){
      if(this.type)
        this.getItemsWithType() 
      else if(this.color)
        this.getItemWithColor()
      else if (this.size) 
        this.getItemWithSize()
      else this.getItems()
    }
    else if(this.categoryName === "girls"){
      if(this.type)
        this.getItemsWithType() 
      else if(this.color)
        this.getItemWithColor()
      else if (this.size) 
        this.getItemWithSize()
      else this.getItems()
    }
  }
  public changeSuccessMessage() { 
    this._success.next(  `Item added to cart.`); 
  }
  getItemsWithType(){
    this.pr.getItemByType(this.categoryName,this.type).subscribe(data => {
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
  getItems(){
    this.pr.getAllItems(this.categoryName).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      //console.log(this.prod)
    })
  }
  getItemWithColor(){
    this.pr.getItemByColor(this.categoryName,this.color).subscribe(data => {
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
  getItemWithSize(){
    this.pr.getItemBySize(this.categoryName,this.size).subscribe(data => {
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
  sortItemsLowPrice(){
    this.pr.getSortedItemsAsc(this.categoryName).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemsLowPriceWithType(){
    this.pr.getSortedItemsAscWithType(this.categoryName,this.type).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemsLowPriceWithColor(){
    this.pr.getSortedItemsAscWithColor(this.categoryName,this.color).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemsLowPriceWithSize(){
    this.pr.getSortedItemsAscWithSize(this.categoryName,this.size).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemshighPriceWithColor(){
    this.pr.getSortedItemsDescWithColor(this.categoryName,this.color).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemshighPriceWithSize(){
    this.pr.getSortedItemsDescWithSize(this.categoryName,this.size).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemsHighPrice(){
    this.pr.getSortedItemsDesc(this.categoryName).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  sortItemsHighPriceWithType(){
    this.pr.getSortedItemsDescWithType(this.categoryName,this.type).subscribe(data => {
      this.prod = data.map(element => {
        let x : any = element;
        x = element.payload.doc.data();
        return{
          id : element.payload.doc.id,
          ...x
        }
      })
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
    })
  }
  //////////////////////////////////////////////
  addType(){
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
  }
  SortByLowerPrice(){
    this.sort = "low price";
    if(this.type){ this.sortItemsLowPriceWithType() }
    else if(this.color) {this.sortItemsLowPriceWithColor()}
    else if(this.size) this.sortItemsLowPriceWithSize()
    else this.sortItemsLowPrice()
  }
  SortByHighPrice(){
    this.sort = "high price"
    if(this.type){
      this.sortItemsHighPriceWithType() }
      else if(this.color) this.sortItemshighPriceWithColor()
      else if(this.size) this.sortItemshighPriceWithSize()
    else this.sortItemsHighPrice()
  }
  subscription: Subscription = new Subscription;
  addToWishList(id:string,imageUrl:string,name:string,price:number){
    this.au.user.subscribe(user => {
      if(user){
        this.pr.setItemsToWishList(user.uid,id,imageUrl,name,price,this.categoryName)
      } else this.route.navigateByUrl("/login")
    })
  }
}