import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/types/account';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  @Input() accounts: Account[] = []

  constructor() { }
}
