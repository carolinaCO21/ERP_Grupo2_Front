import { Injectable } from '@angular/core';
// Firebase Auth comentado temporalmente por incompatibilidad de versiones
// TODO: Descomentar cuando se instale @angular/fire
// import { Auth, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';

// Interfaces temporales para mock
interface User {
  uid: string;
  email: string | null;
  getIdToken(): Promise<string>;
}

interface UserCredential {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  // constructor(private auth: Auth) {}

  async signIn(email: string, password: string): Promise<UserCredential> {
    // Mock implementation
    console.warn('Firebase Auth no está configurado - usando mock');
    return {
      user: {
        uid: 'mock-uid',
        email: email,
        getIdToken: async () => 'mock-token'
      }
    };
  }

  async signOut(): Promise<void> {
    // Mock implementation
    console.warn('Firebase Auth no está configurado - usando mock');
  }

  getCurrentUser(): User | null {
    // Mock implementation
    return null;
  }

  async getIdToken(): Promise<string> {
    // Mock implementation
    console.warn('Firebase Auth no está configurado - usando mock');
    return 'mock-token';
  }
}
