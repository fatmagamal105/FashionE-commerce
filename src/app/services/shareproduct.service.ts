import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareproductService {
  private itemId = new BehaviorSubject('');
  //currentItemId = this.itemId.asObservable();

  // private categ = new BehaviorSubject('');
  // currentCateg = this.categ.asObservable();
  constructor() { }
  // SetItemId(id: string) {
  //   this.itemId.next(id)
  // }
  // SetCateg(categName:string){
  //   this.categ.next(categName)
  // }
}
