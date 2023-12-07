import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.scss'],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  providers: [],
})
export class InputViewComponent {
  @Input() inputType!: string;
  @Input() errorMessages!: string[] | '';
  @Input() isMandatoryField!: boolean;
  @Input() value!: FormControl;
  @Input() hint?: string;
  @Input() formControlName!: string;
  protected getErrorMessage() {
    if (this.value.hasError('required')) {
      return this.errorMessages[0];
    }
    if (this.value.hasError('email')) {
      return this.errorMessages[1];
    }

    return '';
  }
}
