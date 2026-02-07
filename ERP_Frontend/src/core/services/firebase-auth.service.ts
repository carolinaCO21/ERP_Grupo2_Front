import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(private auth: Auth) {}
  
  async signIn(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
  
  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
  
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
  
  async getIdToken(): Promise<string> {
    const user = this.getCurrentUser();
    if (!user) throw new Error('No hay usuario autenticado');
    return await user.getIdToken();
  }
}
