import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { delay, filter, switchMap } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private isRedirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollection = this.db.collection('users'); //create  a reference to firestore collection
    this.isAuthenticated$ = this.auth.user.pipe(
      tap(console.log),
      map((user) => !!user) // !! convert value to boolean. True if is true, false if is false
    ); //return user object when signed in else null

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd), //wait until a navigation ends successfully to prevent error
        map((e) => this.route.firstChild),
        switchMap((e) => e?.data ?? of({}))
      )
      .subscribe((data) => {
        this.isRedirect = data['authOnly'] ?? false; //access the value of property "authOnly"
      });
  }

  public async createUser(userData: IUser) {
    const { name, email, password, age, phoneNumber } = userData;

    //firebase will automatically include the token once we created a account (authentication)
    const userCreated = await this.auth.createUserWithEmailAndPassword(
      email as string,
      password as string
    );

    //so everytime u send a request, it will contain token and this record will be created with the uid passed in
    await this.userCollection.doc(userCreated.user?.uid).set({
      name: name,
      email: email,
      age: age,
      phoneNumber: phoneNumber,
    });

    await userCreated.user?.updateProfile({
      displayName: name,
    });
    console.log(userCreated);
  }

  public async logout(event?: Event) {
    if (event) {
      event.preventDefault(); //prevent the default action of this event (which is redirect to about.html)
    }
    await this.auth.signOut();

    //only redirect when at manage page
    if (this.isRedirect) this.router.navigateByUrl('/');
  }
}
