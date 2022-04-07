/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';


const TOKEN_KEY = 'token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
   }

  async loadToken()
  {
    const token = Storage.get({key: TOKEN_KEY});
    if(token && (await token).value)
    {
      console.log('Token: ',(await token).value);
      this.isAuthenticated.next(true);
    }
    else{
      this.isAuthenticated.next(false);
    }
  }

  login(credential: {email; password}): Observable<any>{

    return this.http.post(`https://reqres.in/api/login`, credential).pipe(
      map((data: any) => {
        Storage.set({key: TOKEN_KEY, value: data.token});
        this.isAuthenticated.next(true);
      }
    ));
  }

  async isLoggedIn(): Promise<boolean>{
    const token = Storage.get({key: TOKEN_KEY});
    if(token && (await token).value) {
      return true;
    }
    return false;
  }

  async logout(): Promise<void>{
    this.isAuthenticated.next(false);
    return await Storage.remove({key: TOKEN_KEY});
  }
}


