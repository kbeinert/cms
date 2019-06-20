import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../../document.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  id: string;
  editMode: boolean = false;
  documentForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentService) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentsService.getDocument(this.id);

        if (!this.originalDocument) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }


  onSubmit(form: NgForm) {
    let values = form.value;

    let newDocument = new Document(' ', values.name, values.description, values.url, null);

    if (this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentsService.addDocument(newDocument);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onCancel() {
    // Simply navigate back to reminders view
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}