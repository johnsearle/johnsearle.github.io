import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavLink } from './navLinkModel';

@Injectable({
  providedIn: 'root'
})
export class NavlinkService {

  navLinks: NavLink[] = [
    {id: 1, title: "Home",            route: "/home",           roles:[]},
    {id: 2, title: "Contacts",        route: "/contact-list",   roles:[]},
    {id: 3, title: "Create contact",  route: "/contact-create", roles:[]}   
  ];

  constructor() { }

  public getLinks(): Observable<NavLink[]> {
    return of(this.navLinks);
  }
}
