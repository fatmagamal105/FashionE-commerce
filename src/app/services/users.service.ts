import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private fs:AngularFirestore) { }
  
  addNewUser(id:any,fname:string,lname:string,phone:number,city:string,email:string){
    return this.fs.doc('users/' + id).set({
      fname,lname,phone,city,email
    })
  }
}
