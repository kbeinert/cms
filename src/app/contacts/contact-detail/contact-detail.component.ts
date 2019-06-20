import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  id: string;
  nativeWindow: any;
z
  constructor(private contactService: ContactService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

  onEditDocument() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}