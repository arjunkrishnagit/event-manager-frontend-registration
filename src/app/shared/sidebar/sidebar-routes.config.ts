import { RouteInfo } from './sidebar.metadata';
var userType = localStorage.getItem("userType");

if(userType=='admin'){
  var routes = [
    {
      path: '/dashboard', title: 'Dashboard', icon: 'fa fa-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
      path: '/attendee-manager', title: 'Attendee Manager', icon: 'fa fa-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
      path: '/attendee-checkin-checkout', title: 'Attendee In & Out', icon: 'fa fa-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }
  ]
}
else if(userType=='volunteers'){
  var routes = [
    {
      path: '/dashboard', title: 'Dashboard', icon: 'fa fa-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
      path: '/attendee-checkin-checkout', title: 'Attendee In & Out', icon: 'fa fa-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }
  ]
}
else{
  var routes = [{
    path: '/dashboard', title: 'Dashboard', icon: 'fa fa-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  }];
}

export const ROUTES: RouteInfo[] = routes;
