import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private pr:ProductsService,private au:AuthService) { }
  //userOrders:any[]=[];
  p: number=1;
  i: number =0;
  userOrders: Order[]=[];
  myDate = new Date()
  ngOnInit(): void {
    this.au.user.subscribe(user => {
      this.pr.getUserOrders(user?.uid).subscribe(res => {
        // this.userOrders = res.map(element => {
        //   let x : any= element.payload.doc.data()
        //   return{
        //     date : x.date,
        //     totalprice : x.totalprice
        //   }
        this.userOrders = res.map(element => {
          let x : any = element.payload.doc.data();
          return{
            date : x.date,
            totalprice : x.totalprice,
            ...x
            // id:element.payload.doc.id,
            // shippingInfo : x.shippingInfo,
            // items : x.items,
            // ...x
          }
        })
      })
    })
  }
  showDetails(id:string){

  }
}
