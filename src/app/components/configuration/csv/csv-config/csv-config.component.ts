import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { csvMask } from 'src/app/shared/types/account';
import { CsvFormComponent } from '../csv-form/csv-form.component';

@Component({
  selector: 'app-csv-config',
  templateUrl: './csv-config.component.html',
  styleUrls: ['./csv-config.component.scss']
})
export class CsvConfigComponent implements OnInit, OnDestroy {
  @ViewChild('csvModal') csvModal!: CsvFormComponent

  csvMasks: csvMask[] = []
  csvForForm?: csvMask
  selector: string | undefined
  private subscription : Subscription | undefined

  constructor(public store: FluxStore) { }

  ngOnInit() {
    this.subscription = this.store.CsvMasks.subscribe(data => {
      if (data.length) {
        this.csvMasks = data
      }
    })
  }

  createCsv() {
    this.csvForForm = undefined
    this.selector = 'create'
    this.csvModal.modal.nativeElement.classList.add('is-active')
  }

  editCsv(csv: csvMask) {
    this.csvForForm = csv
    this.selector = 'edit'
    this.csvModal.modal.nativeElement.classList.add('is-active')
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
