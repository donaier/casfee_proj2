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

  public csvMasks: csvMask[] = []
  public csvForForm?: csvMask
  private subscription : Subscription | undefined

  constructor(public store: FluxStore) { }

  ngOnInit() {
    this.subscription = this.store.CsvMasks.subscribe((data) => {
      if (data.length) {
        this.csvMasks = data;
      }
    })
  }

  createCsv() {
    this.csvForForm = undefined
    document.getElementById('csv-mask-form')?.classList.add('is-active');
  }

  editCsv(csv: csvMask) {
    this.csvForForm = csv
    document.getElementById('csv-mask-form')?.classList.add('is-active');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
