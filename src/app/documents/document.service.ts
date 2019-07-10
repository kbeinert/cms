import { Injectable } from '@angular/core';
import{Document} from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  documents: Document[] = [];
  maxDocumentId: number;
  documentSelected = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documentsListClone: Document[];

  getDocuments() {
    this.http
    .get<Document[]>('https://princecms-4f1e5.firebaseio.com/documents.json')
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxID();
      this.documents.sort(compareDocumentsByID);
      this.documentListChangedEvent.next(this.documents.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getDocument(id: string): Document{
    for (var i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id === id) {
        return this.documents[i];
      }
    }
    return null;
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
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

  storeDocuments() {
    let json = JSON.stringify(this.documents);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http
    .put('https://princecms-4f1e5.firebaseio.com/documents.json', json, {
      headers: header
    }).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }
}

  function compareDocumentsByID(lhs: Document, rhs: Document): number {
    if (lhs.id < rhs.id) {
      return -1;
    } else if (lhs.id === rhs.id) {
      return 0;
    } else {
      return 1;
    }
  }
