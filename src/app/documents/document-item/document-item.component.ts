import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../Document.model';

@Component({
  selector: 'cms-Document-item',
  templateUrl: './Document-item.component.html',
  styleUrls: ['./Document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() Document: Document;
  @Input() index: string;

  constructor() { }

  ngOnInit() {
  }

}