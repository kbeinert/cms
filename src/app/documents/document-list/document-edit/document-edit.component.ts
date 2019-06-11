import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-Document-edit',
  templateUrl: './Document-edit.component.html',
  styleUrls: ['./Document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
        }
      );
  }

}