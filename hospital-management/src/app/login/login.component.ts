import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LogingResponceDTO, LoggedUser } from '../services/dtd/loggedUser.dtd';
import { resolveComponentResources } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string;
  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private loginService:LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  onLogin(){
    let userName = this.loginForm.value.userName;
    let password = this.loginForm.value.password;

    this.loginService.login({username:userName,password:password}).subscribe(
      (response:any) =>{
        console.log(response);
        if(!response.message){
          
        }else{
          this.error = "invalid..."
        }
      }
    );
  }

}
