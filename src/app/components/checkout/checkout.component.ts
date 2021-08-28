import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShippingInfoDialogComponent } from 'src/app/shipping-info-dialog/shipping-info-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private pr : ProductsService,private au:AuthService,private dialog:MatDialog) { }
  prod : {name:string,price:number,size:string,color:string,quantity:number,itemId:string,imageUrl:string,category:string} []
      = [];
  totalPrice=0;
  shippingPrice=0;
  total=0;
  username:any;
  userId:any;
  public payPalConfig ? : IPayPalConfig;
  ngOnInit(): void {
    this.initConfig();
    this.au.user.subscribe(user => {
      this.userId = user?.uid;
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
        this.shippingPrice = this.totalPrice*15/100;
        this.total = this.shippingPrice+this.totalPrice;
        this.pr.getUserName(user?.uid).subscribe(res => {
          let x :any = res
          this.username = x.fname +" "+ x.lname;
        })
      })
    })
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb', //add client id
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: `${this.total}`,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: `${this.total}`
                        }
                    }
                },
                // items: [{
                //     name: 'Enterprise Subscription',
                //     quantity: '1',
                //     category: 'DIGITAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'USD',
                //         value: '9.99',
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical',
            size: 'small',
            color: 'black'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            //this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            //this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        },
    };
}
  shippingInfo:any;
  isSubmit=false;
  onSubmit(f:any){
    this.shippingInfo = f.value;
    this.isSubmit = true;
  }
  
  promo: {code:string,discount:number}[]=[];
  code:string="";
  disc = 0;
  totaldisc=0;
  check=0;

  checkpromo(promo:string){
    this.pr.getVoucherCode().subscribe(res => {
      this.promo = res.map(element => {
        let x : any = element.payload.doc.data();
        this.code = x.code;
        this.disc = x.discount;
        if(promo == this.code){
          this.check=1;
          this.totaldisc = this.totalPrice*this.disc/100;
          this.total -= this.totaldisc;
        }else this.check = 2
        return{
          ...x
        }
      })
    })
  }
pay = "";
  date = new Date().toLocaleString()
  confirmMsg="";
  confirmOrder(){
    //console.log(this.username,this.userId,this.shippingInfo,this.prod,this.total,this.date)
    this.pr.addToOrders(this.username,this.userId,this.shippingInfo,this.prod,this.total,this.date).then(()=>{
      this.confirmMsg="done"
    })
  }
  paypal(){
    this.pay="paypal";
  }
  cash(){
    this.pay="cash";
  }

  openDialog(){
    const dialogRef = this.dialog.open(ShippingInfoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
