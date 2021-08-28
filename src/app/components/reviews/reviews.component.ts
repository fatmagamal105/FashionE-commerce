import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  currentRate1 = 8;
  //currentRate2 = 0;
  id:any;
  reviews:any[]=[];
  average=0;
  totalrate=0;
  lenght=0;
  constructor(active:ActivatedRoute,private pr:ProductsService) {
    this.id = active.snapshot.params.id.slice(1);
   }
   
  ngOnInit(): void {
    
    this.pr.getReviews(this.id).subscribe(res => {
      this.totalrate=0;
      this.average=0;
      this.lenght=0;
      this.reviews = res.map(element => {
        let x :any = element.payload.doc.data();
        this.totalrate += x.rate;
        return{
          rate : x.rate,
          review : x.review,
          username : x.username,
          date : x.date
        }
      })
      this.lenght = this.reviews.length;
      this.getAverage()
    })
  }
  getAverage(){
    this.average = this.totalrate/this.lenght;
    this.average = Math.floor(this.average)
  }

}
