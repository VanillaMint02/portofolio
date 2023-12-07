import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {InputViewComponent} from "../../views/input-view/input-view.component";

@Component({
  selector: 'app-input',
  imports: [InputViewComponent],
  template: `<app-input-view
    [errorMessages]="errorMessages"
    [inputType]="inputType"
    [isMandatoryField]="isMandatoryField"
    [value]="value"
  ></app-input-view> `,
  standalone: true,
})
export class InputComponent {
  @Input() inputType!: string;
  @Input() errorMessages!: string[];
  @Input() isMandatoryField!: boolean;
  @Input() value!: FormControl;
  @Input() hint?:string;
  @Input() formControlName!:string;
}
