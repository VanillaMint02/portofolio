import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { InputComponent } from '../../container/input/input.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GenericButtonViewComponent} from "../generic-button-view/generic-button-view.component";

@Component({
  selector: 'generic-form-view',
  templateUrl: './generic-form-view.component.html',
  styleUrls: ['./generic-form-view.component.scss'],
  imports: [
    CommonModule,
    InputComponent,
    GenericButtonViewComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  standalone: true,
})
export class GenericFormViewComponent {
  @Input() givenInputs!: InputComponent[];
  @Input() formTitle?: string;
  @Input() confirmationButtonName!: string;
  @Input() formGroup!: FormGroup;
  @Output() buttonEvent= new EventEmitter<void>;

}
