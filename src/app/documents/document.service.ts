import { Injectable, EventEmitter } from '@angular/core';
import{Document} from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  documents: Document[] = [];

  documentSelected = new EventEmitter<Document>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(index: string): Document{
    return this.documents[index];
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
  }

}