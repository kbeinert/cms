import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {DocumentService} from "../../document.service";
import {Document} from "../../documents.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  editMode:boolean = false;
  document: Document;
  originalDocument: Document;

  constructor(private documentService: DocumentService,
              private  router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params.id;
          if (id == undefined || id == null) {
            return;
          }
          this.originalDocument = this.documentService.getDocument(id);
          if (this.originalDocument == undefined || this.originalDocument == null) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
         }
      )
  }
            
  onSubmit(form: NgForm) {
    const values = form.value;
    console.log(values);
         
    var newDocument = new Document(null, values.documentTitle, values.documentDescription, values.documentUrl, null);
         
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
            
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}