import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model'
import { DocumentService } from './document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  documents: Document[];
  private subscription: Subscription
  
  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentSelected
      .subscribe((document: Document) => {
        this.selectedDocument = document;
      });
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        }
      );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}