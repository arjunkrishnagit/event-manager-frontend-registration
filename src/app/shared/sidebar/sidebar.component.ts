import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SidebarService } from "./sidebar.service";
import { RouteInfo } from './sidebar.metadata';
import * as $ from 'jquery';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    public menuItems: any[];


    constructor( public sidebarservice: SidebarService,private router: Router) {

        router.events.subscribe( (event: Event) => {

            if (event instanceof NavigationStart) {
                // Show loading indicator
            }

            if (event instanceof NavigationEnd && $(window).width() < 1025 && ( document.readyState == 'complete' || false ) ) {

                this.toggleSidebar();
                // Hide loading indicator

            }

            if (event instanceof NavigationError) {
                // Hide loading indicator

                // Present error to user
                console.log(event.error);
            }
        });

    }


    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());

        if ($(".wrapper").hasClass("nav-collapsed")) {
            // unpin sidebar when hovered
            $(".wrapper").removeClass("nav-collapsed");
            $(".sidebar-wrapper").unbind( "hover");
        } else {
            $(".wrapper").addClass("nav-collapsed");
            $(".sidebar-wrapper").hover(
                function () {
                    $(".wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $(".wrapper").removeClass("sidebar-hovered");
                }
            )

        }

    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }


    ngOnInit() {
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
        const ROUTES: RouteInfo[] = routes;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        $.getScript('./assets/js/app-sidebar.js');

    }

}
