import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model' 
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
  
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {
  
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentListChangedEvent
      .subscribe((documents: Document[])=> {
        this.documents = documents;
      })
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentsList: Document[]) => {
        this.documents = documentsList;
      })
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}