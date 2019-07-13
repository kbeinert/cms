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
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-list/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageEditComponent } from './messages/message-list/message-edit/message-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MessageService } from './messages/message.service';
import { ContactEditComponent } from './contacts/contact-list/contact-edit/contact-edit.component';
import { DocumentEditComponent } from './documents/document-list/document-edit/document-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { WindRefService } from './wind-ref.service';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { DndModule } from 'ng2-dnd';


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
    DocumentViewComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DndModule.forRoot()
  ],
  providers: [MessageService, WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }