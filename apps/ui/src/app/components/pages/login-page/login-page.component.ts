import {Component, EventEmitter, OnInit} from '@angular/core';
import {HeaderViewComponent} from "../../views/header-view/header-view.component";
import {GenericFormViewComponent} from "../../views/generic-form-view/generic-form-view.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InputComponent} from "../../container/input/input.component";
import {AuthService} from "../../../services/auth.service";
import {RouterService} from "../../../services/router.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-login-page',
  standalone: true,
  styleUrl: 'login-page.component.scss',
  imports: [HeaderViewComponent, GenericFormViewComponent],
  template: `
      <app-header [onlyHasHeader]="true" [isUserAuthenticated]="isAuthenticated"
      ></app-header>
      <div class="login-form-wrapper">
          <generic-form
                  [givenInputs]="loginInputs"
                  [formTitle]="'Login'"
                  [confirmationButtonName]="'Login'"
                  [formGroup]="loginFormGroup"
                  (buttonEvent)="onLoginClick()"
          ></generic-form>
      </div>
  `
})
export class LoginPageComponent implements OnInit {
  password?: FormControl;
  email?: FormControl;
  loginInputs!: InputComponent[];
  loginFormGroup!: FormGroup;
  genericFormGroupArray!: GenericFormViewComponent[];
  onlyHasHeader!: boolean;
  isAuthenticated!:boolean;

  constructor(private authService: AuthService, private routerService: RouterService) {
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.onlyHasHeader = true;
    this.isAuthenticated=this.authService.getAuthenticated();
    this.loginFormGroup = new FormGroup({
      email: this.email,
      password: this.password,
    });
    this.loginInputs = [
      {
        errorMessages: ['This field is required', 'invalid email'],
        value: this.email,
        isMandatoryField: true,
        inputType: 'Email',
        formControlName: '',
      },
      {
        errorMessages: ['This field is required'],
        value: this.password,
        isMandatoryField: true,
        inputType: 'Password',
        formControlName: '',
      },
    ];


    this.genericFormGroupArray = [
      {
        givenInputs: this.loginInputs,
        formTitle: 'Login',
        confirmationButtonName: 'Login',
        formGroup: this.loginFormGroup,
        buttonEvent: new EventEmitter<void>(),
      },
    ];
  }

  onLoginClick() {
    console.log(this.authService.login(
      {
        email: this.email?.value,
        password: this.password?.value
      })
      .pipe(untilDestroyed(this))
      .subscribe());
  }
}
