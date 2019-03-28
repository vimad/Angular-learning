import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(reqBody){
    return this.http.post("http://hospital-dev-v1.us-east-1.elasticbeanstalk.com/api/hospital/user/login",reqBody);
  }
}
