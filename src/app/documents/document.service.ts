import { Injectable } from '@angular/core';
import { Document } from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxID();
  }

  documents: Document[] = [];
  maxDocumentId: number;
  documentSelected = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documentsListClone: Document[];

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
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return
    }
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument == null || originalDocument == undefined || newDocument == null || newDocument == undefined) {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  getMaxID(): number {

    let maxID = 0;

    for (let document of this.documents) {
      let currentID = +document.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  

}