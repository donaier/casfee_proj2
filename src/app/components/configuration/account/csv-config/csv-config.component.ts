import { Component, Input } from '@angular/core';
import { csvMask } from 'src/app/shared/types/account';

@Component({
  selector: 'app-csv-config',
  templateUrl: './csv-config.component.html',
  styleUrls: ['./csv-config.component.scss']
})
export class CsvConfigComponent {

  @Input() csvMasks: csvMask[] = []

  public csvForForm?: csvMask

  constructor() { }

  createCsv() {
    this.csvForForm = undefined
    document.getElementById('csv-mask-form')?.classList.add('is-active');
  }

  editCsv(csv: csvMask) {
    this.csvForForm = csv
    document.getElementById('csv-mask-form')?.classList.add('is-active');
  }
}
