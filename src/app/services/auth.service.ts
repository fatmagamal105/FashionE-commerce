import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Observable<firebase.User|null>= new Observable;

  constructor(private afAuth : AngularFireAuth) { 
    this.user = this.afAuth.user
  }
  signup(email:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
  }
  login(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password)
  }
  logout(){
    return this.afAuth.signOut()
  }
}
