import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact('1', 'Brother Jackson', 'jacksonk@byui.edu',
    "2084963771",'https://web.byui.edu/Directory/Employee/jacksonk.jpg', "null"),
    new Contact("2", "Brother Barzee", "barzeer@byui.edu", "2084963768",
    "https://web.byui.edu/Directory/Employee/barzeer.jpg", "null")
  ];

  constructor() { }

  ngOnInit() {
  }

}
