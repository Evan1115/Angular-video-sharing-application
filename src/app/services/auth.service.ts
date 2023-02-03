import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = this.db.collection('users'); //create  a reference to firestore collection
  }

  public async createUser(userData: IUser) {
    const { name, email, password, age, phoneNumber } = userData;

    //firebase will automatically include the token once we created a account (authentication)
    const userCreated = await this.auth.createUserWithEmailAndPassword(
      email as string,
      password as string
    );

    //so everytime u send a request, it will contain token
    await this.userCollection.doc(userCreated.user?.uid).set({
      name: name,
      email: email,
      age: age,
      phoneNumber: phoneNumber,
    });

    await userCreated.user?.updateProfile({
      displayName: name
    })
    console.log(userCreated);
  }
}
