import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User = null;
  resolveToken = null;
  qToken = new Promise(resolve => this.resolveToken = resolve);

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('user', user);
      this.resolveToken();
      if (user) {
        this.userData = user;
      }
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }
}
