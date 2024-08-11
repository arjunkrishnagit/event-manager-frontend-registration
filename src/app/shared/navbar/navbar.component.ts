import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { LoginService } from '../../login/login.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

    constructor(public sidebarservice: SidebarService, private login: LoginService, private router: Router) { }
    UserName = localStorage.getItem("userType");
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".search-toggle-icon").on("click", function() {
                $(".top-header .navbar form").addClass("full-searchbar")
            })
            $(".search-close-icon").on("click", function() {
                $(".top-header .navbar form").removeClass("full-searchbar")
            })

        });

    }
    logout(){
      this.login.logout()
      this.router.navigate(['/login']);
    }
}
