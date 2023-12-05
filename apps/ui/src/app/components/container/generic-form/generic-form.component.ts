import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormGroup } from '@angular/forms';
import {GenericFormViewComponent} from "../../views/generic-form-view/generic-form-view.component";

@Component({
  imports:[GenericFormViewComponent],
  selector: 'generic-form',
  template:`<generic-form-view
  [givenInputs]="givenInputs"
  [formTitle]="formTitle"
  [confirmationButtonName]="confirmationButtonName"
  [formGroup]="formGroup"
  (buttonEvent)="this.buttonEvent.emit()"
  ></generic-form-view>
  `,
  standalone:true
})
export class GenericFormComponent {

@Input() givenInputs!:InputComponent[];
@Input() formTitle!:string;
@Input() confirmationButtonName!:string;
@Output() buttonEvent=new EventEmitter<void>;
@Input() formGroup!:FormGroup;
}
