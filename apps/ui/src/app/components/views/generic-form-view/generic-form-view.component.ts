import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GenericButtonViewComponent} from "../generic-button-view/generic-button-view.component";
import {InputViewComponent} from "../input-view/input-view.component";
import {InputComponent} from "../../container/input/input.component";

@Component({
  selector: 'generic-form',
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
