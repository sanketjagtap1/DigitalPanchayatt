import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { addDoc } from '@firebase/firestore';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firestore: Firestore, private toastController: ToastController, private router: Router) { }

  async presentToast(message: any, Color: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: "bottom",
      color: Color
    });

    await toast.present().then((res) => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    });
  }

  getUsers() {
    const users = collection(this.firestore, 'Users');
    return collectionData(users, { idField: 'id' });
  }

  getUserById(id: any) {
    const query = doc(this.firestore, `Users/${id}`);
    return docData(query, { idField: 'id' })
  }

  addUser(user: any) {
    const query = collection(this.firestore, `Users`);
    return addDoc(query, user)
  }

  deleteUser(id: any) {
    const query = doc(this.firestore, `Users/${id}`);
    return deleteDoc(query)
  }

  async updateUser(user: any) {
    const query = doc(this.firestore, `Users/${user.id}`);
    return updateDoc(query, {
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Password: user.Password,
      Mobile: user.Mobile
    })
  }
  searchUserByEmailAndPassword(email: string, password: string) {
    console.log("Inside Search Method======>", email, password)
    const usersCollection = collection(this.firestore, 'Users');
    const q = query(usersCollection, where('Email', '==', email), where('Password', '==', password));
    return collectionData(q, { idField: 'id' });
  }

  checkEmail(email: string) {
    console.log("Inside Search Method======>", email)
    const usersCollection = collection(this.firestore, 'Users');
    const q = query(usersCollection, where('Email', '==', email));
    return collectionData(q, { idField: 'id' });
  }

  checkMobile(mobile: string) {
    console.log("Inside Search Method======>", mobile)
    const usersCollection = collection(this.firestore, 'Users');
    const mobileData = query(usersCollection, where('Mobile', '==', mobile));
    return collectionData(mobileData, { idField: 'id' });
  }
}
