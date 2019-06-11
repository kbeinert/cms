import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentsComponent } from './Documents/Documents.component';
import { DocumentListComponent } from './Documents/Document-list/Document-list.component';
import { DocumentItemComponent } from './Documents/Document-item/Document-item.component';
import { DocumentDetailComponent } from './Documents/Document-detail/Document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { DropdownDirective } from './Documents/shared/dropdown.directive';
import { MessageService } from './messages/message.service';
import { ContactEditComponent } from './contacts/contact-list/contact-edit/contact-edit.component';
import { DocumentEditComponent } from './Documents/Document-list/Document-edit/Document-edit.component';
import { AppRoutingModule } from './app-routing';
import { WindRefService } from './wind-ref.service';
import { DocumentViewComponent } from './Documents/Document-view/Document-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageListComponent,
    MessageEditComponent,
    DropdownDirective,
    ContactEditComponent,
    DocumentEditComponent,
    DocumentViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService, WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }