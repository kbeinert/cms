import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentsComponent } from './Documents/Documents.component';
import { DocumentEditComponent } from './Documents/Document-list/Document-edit/Document-edit.component';
import { DocumentDetailComponent } from './Documents/Document-detail/Document-detail.component';
import { ContactEditComponent } from './contacts/contact-list/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, children: [
        {path: 'new', component: ContactEditComponent},
        {path: ':id', component: ContactDetailComponent },
        {path: ':id/edit', component: ContactEditComponent}
    ] },
  { path: 'Documents', component: DocumentsComponent, children: [
      {path: 'new', component: DocumentEditComponent},
      {path: ':id', component: DocumentDetailComponent },
      {path: ':id/edit', component: DocumentEditComponent}
  ] },
    { path: 'messages', component: MessageListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}