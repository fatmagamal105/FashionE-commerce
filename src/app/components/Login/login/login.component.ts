import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg : string = '';
  constructor(private as: AuthService, private router:Router,private us : UsersService) { }

  ngOnInit(): void {
  }
  signin(form:any){
    //console.log(form);
    let data = form.value;
    this.as.login(data.email,data.password)
    .then(result => {
      //this.us.SetUserId(result.user?.uid);
      //console.log(result);
      this.errorMsg = '';
      this.router.navigate(['/home'])
    })
    .catch(err => {
      this.errorMsg = err.message
    })
  }
}
