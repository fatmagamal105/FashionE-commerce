import { UsersService } from './../../../services/users.service';
import { User } from './../../../interfaces/user.interface';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg : string = '';
  constructor(private as: AuthService, private us:UsersService, private router:Router) { }

  ngOnInit(): void {
  }
  signup(form:any){
    //console.log("done")
    //console.log(form);
    let data : User = form.value;
    this.as.signup(data.email,data.password)
    .then(result => {
      this.errorMsg = '';
      this.us.addNewUser(result.user?.uid,data.fname,data.lname,data.phone,data.city,data.email)
      .then(()=>{
        //this.us.SetUserId(result.user?.uid);
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log('fs'+err)
      })
    })
    .catch(err => {
      this.errorMsg = err.message
    })
  }
}
