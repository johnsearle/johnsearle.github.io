import { Component, OnInit } from '@angular/core';
import {  Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
import { NavLink } from '../navLinkModel';
import { NavlinkService } from '../navlink.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  event$;
  active = 1;
  navLinks: NavLink[] = [];
  
  constructor(private router: Router, private navlinkService: NavlinkService) {
    
    // When entering the route directly in browser, or using browser navigation, the active
    // nav tab will not be in sync with the route, so set it manually here.
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                const currentLink = this.navLinks.find((obj) => {
                  return obj.route === event.url;
                });
                if (currentLink) {                  
                  this.active = currentLink.id ;
                }  else {
                  console.log(`No nav link found for route ${event.url}`);
                }          
              }
            });
  }

  ngOnInit(): void {
    this.navlinkService.getLinks()
      .subscribe(links => this.navLinks = links);
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }
}



   