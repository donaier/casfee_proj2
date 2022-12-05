import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { csvMask } from 'src/app/shared/types/account';

@Component({
  selector: 'app-csv-config',
  templateUrl: './csv-config.component.html',
  styleUrls: ['./csv-config.component.scss']
})
export class CsvConfigComponent implements OnInit, OnDestroy {

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
    document.getElementById('csv-mask-form')?.classList.add('is-active')
  }

  editCsv(csv: csvMask) {
    this.csvForForm = csv
    this.selector = 'edit'
    document.getElementById('csv-mask-form')?.classList.add('is-active')
  }

  deleteCsv(){
    this.selector = 'delete'
    console.log("delete csv")
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
