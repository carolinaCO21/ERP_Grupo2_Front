import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

// Firebase - Comentado temporalmente por incompatibilidad de versiones
// TODO: Instalar con: npm install @angular/fire@latest --legacy-peer-deps
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';

// Interceptors
import { authInterceptor } from '../core/interceptors/auth.interceptor';
import { errorInterceptor } from '../core/interceptors/error.interceptor';

// Mock Repositories (para desarrollo)
import { PedidoMockRepository } from '../data/repositories/pedido.repository.mock';
import { ProveedorMockRepository } from '../data/repositories/proveedor.repository.mock';
import { ProductoMockRepository } from '../data/repositories/producto.repository.mock';
import { UsuarioMockRepository } from '../data/repositories/usuario.repository.mock';

// Configuración de Firebase (comentado temporalmente)
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
// const firebaseConfig = {
//   apiKey: "TU_API_KEY",
//   authDomain: "TU_AUTH_DOMAIN",
//   projectId: "TU_PROJECT_ID",
//   storageBucket: "TU_STORAGE_BUCKET",
//   messagingSenderId: "TU_MESSAGING_SENDER_ID",
//   appId: "TU_APP_ID"
// };

export const appConfig: ApplicationConfig = {
  providers: [
    // Router
    provideRouter(routes),

    // HTTP Client con interceptores
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),

    // Animaciones (comentado temporalmente - instalar con: npm install @angular/animations)
    // provideAnimations(),

    // Firebase (comentado temporalmente)
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // provideAuth(() => getAuth()),

    // Mock Repositories (si está habilitado en environment)
    ...(environment.useMocks ? [
      { provide: 'RepositoriosMocking', useValue: true },
      PedidoMockRepository,
      ProveedorMockRepository,
      ProductoMockRepository,
      UsuarioMockRepository
    ] : []),

    // Log de estado de mocks
    ...(() => {
      if (environment.useMocks) {
        console.log('%c🔧 USANDO REPOSITORIOS MOCK', 'color: #ff6b6b; font-weight: bold; font-size: 14px');
      }
      return [];
    })()
  ]
};
