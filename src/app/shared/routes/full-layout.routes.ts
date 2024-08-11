import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'attendee-checkin-checkout',
      loadChildren: () => import('../../attendee-checkin-checkout/attendee-checkin-checkout.module').then(m => m.AttendeeCheckinCheckoutModule)
    },
    {
      path: 'attendee-manager',
      loadChildren: () => import('../../attendee-manager/attendee-manager.module').then(m => m.AttendeeManagerModule)
    }

];
