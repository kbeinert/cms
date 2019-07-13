import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model' 
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  subscription: Subscription;
  
  constructor(private documentService: DocumentService) {
  
  }

  ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documents: Document[])=> {
        this.documents = documents;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}