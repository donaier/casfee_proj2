import { Component, ElementRef, Inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { csvMask } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';

import { UploadService } from 'src/app/model/upload.service';

@Component({
  selector: 'app-csv-form',
  templateUrl: './csv-form.component.html',
  styleUrls: ['./csv-form.component.scss']
})
export class CsvFormComponent implements OnChanges {
  @ViewChild('modal', { static: false }) modal!: ElementRef
  @Input() csv?: csvMask
  @Input() selector?: string

  csvForm!: FormGroup
  name!: FormControl
  delimiter!: FormControl
  mask!: FormControl
  dateMask!: FormControl

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private upload : UploadService ) {
    this.csvForm = new FormGroup({
      name: this.name = new FormControl('', [Validators.required]),
      delimiter: this.delimiter = new FormControl('', [Validators.required]),
      mask: this.mask = new FormControl('', [Validators.required]),
      dateMask: this.dateMask = new FormControl('', [Validators.required]),
    })
  }

  hideModal() {
    this.modal.nativeElement.classList.remove('is-active');
    this.csvForm.reset();
  }

  submitCsvForm(e: Event) {
    e.preventDefault();
    if(this.csvForm.valid && this.csvForm.dirty) {
      this.dispatcher.next(new FluxAction(FluxActionTypes.Create,'csvMask', null, null, null, null, this.csvForm.value))
      this.hideModal()
    }
  }

  UpdateCsv(){
    if(this.csvForm.valid && this.csvForm.dirty) {
      this.dispatcher.next(new FluxAction(FluxActionTypes.Delete,'csvMask', null, null, null, null, this.csv))
      this.dispatcher.next(new FluxAction(FluxActionTypes.Create,'csvMask', null, null, null, null, this.csvForm.value))
    }
    this.hideModal()
  }

  deleteCsvMask(){
    this.dispatcher.next(new FluxAction(FluxActionTypes.Delete,'csvMask', null, null, null, null, this.csv))
    this.hideModal()
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['csv']?.currentValue?.name) {
      this.csvForm.patchValue(this.csv!);
    }
  }

}
