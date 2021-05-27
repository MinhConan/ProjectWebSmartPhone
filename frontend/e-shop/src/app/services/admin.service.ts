import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn:'root'
})
export class AdminService{

  constructor(private http: HttpClient){}

  login(username, password){
    const url = environment.login;

    return this.http.post(url, {
      "Phone":username,			
			"Password":password	
    })
  }
}