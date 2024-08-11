import { Routes } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
    // {
    //     path: 'error',
    //     loadChildren: () => import('./../../error/error.module').then(m => m.ErrorModule)
    // },
    // {
    //     path: 'login',
    //     loadChildren: () => import('./../../login/login.module').then(m => m.LoginModule)
    // },
    {
      path: '',
      loadChildren: () => import('./../../registration/registration.module').then(m => m.RegistrationModule)
    }
];
