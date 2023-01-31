import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  public async createUser(userData: IUser) {
    const { name, email, password, age, phoneNumber } = userData;
    const userCreated = await this.auth.createUserWithEmailAndPassword(
      email as string,
      password as string
    );
    this.db.collection('users').add({
      name: name,
      email: email,
      age: age,
      phoneNumber: phoneNumber,
    });
    console.log(userCreated);
  }
}
