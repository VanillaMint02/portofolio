import {Component, Input, OnInit} from '@angular/core';
import {GenericFormViewComponent} from "../../views/generic-form-view/generic-form-view.component";
import {PortfolioEntry} from "../../../types/portfolio-entry";
import {HeaderViewComponent} from "../../views/header-view/header-view.component";
import {InputComponent} from "../../container/input/input.component";
import {FormControl, FormGroup} from "@angular/forms";
import {UntilDestroy} from "@ngneat/until-destroy";


@UntilDestroy()
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [GenericFormViewComponent,HeaderViewComponent,InputComponent],
  template:`
    <app-header [onlyHasHeader]="true" [isUserAuthenticated]="isAuthenticated"
    ></app-header>
    <div class="login-form-wrapper">
      <generic-form
        [givenInputs]="editInputs"
        [formTitle]="'Login'"
        [confirmationButtonName]="'Login'"
        [formGroup]="editForm"
        (buttonEvent)="onEditClick()"
      ></generic-form>
    </div>`,
  styleUrl: './edit-portfolio-page.component.scss'
})
export class EditPortfolioPageComponent implements OnInit {
  @Input()
  portfolioEntry!:PortfolioEntry;
  @Input()
  isAuthenticated!:boolean;

  editInputs!:InputComponent[];
  title:FormControl=new FormControl('');
  description:FormControl=new FormControl('');
  customerLink:FormControl=new FormControl('');
  editForm!: FormGroup;

  ngOnInit(): void {
    this.title.setValue(this.portfolioEntry.title);
    this.description.setValue(this.portfolioEntry.customerLink);
    this.customerLink.setValue(this.portfolioEntry.customerLink);
    this.editForm=new FormGroup({
      title:this.title,
      description:this.description,
      customerLink:this.customerLink,
    })
    this.editInputs=[{
      errorMessages: [],
      value: this.title,
      isMandatoryField: true,
      inputType: 'title',
      formControlName: '',
    },
      {
        errorMessages: [],
        value: this.description,
        isMandatoryField: true,
        inputType: 'description',
        formControlName: '',
      },
      {
        errorMessages: [],
        value: this.customerLink,
        isMandatoryField: true,
        inputType: 'customer link',
        formControlName: '',
      }];
  }
  onEditClick(){
    console.log("Placeholder Message");
  }
}
