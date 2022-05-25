import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {Observable} from 'rxjs';
import { Country } from '../country';
import { CountryService } from '../country.service';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class ContactListComponent {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  /*  ngOnInit(): void {
    this.countryService.get()
      .subscribe(c => this.countries = c);
  } */

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
