import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { csvMask, CsvMaskForm } from 'src/app/shared/types/account';

@Component({
  selector: 'app-csv-form',
  templateUrl: './csv-form.component.html',
  styleUrls: ['./csv-form.component.scss']
})
export class CsvFormComponent implements OnChanges {

  @Input() csv?: csvMask;

  public csvForm: FormGroup = new FormGroup(CsvMaskForm);
  public modalTitle: string = 'create';

  constructor() { }

  hideModal() {
    document.getElementById('csv-mask-form')?.classList.remove('is-active');
    this.csvForm.reset();
  }

  submitCsvForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();

    console.log(this.csvForm);

    if (this.csvForm.valid && this.csvForm.dirty) {

      // store or create

      form.resetForm();
      this.csvForm.reset();
      this.csvForm.markAsUntouched();

      this.hideModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['csv']?.currentValue?.name) {
      this.csvForm.patchValue(changes['csv'].currentValue);
      this.modalTitle = 'edit';
    }
  }
}
