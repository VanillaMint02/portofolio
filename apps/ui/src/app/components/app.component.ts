import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InputViewComponent } from './views/input-view/input-view.component';
import { InputComponent } from './container/input/input.component';
import { GenericFormViewComponent } from './views/generic-form-view/generic-form-view.component';
import { GenericButtonViewComponent } from './views/generic-button-view/generic-button-view.component';
import { HeaderViewComponent } from './views/header-view/header-view.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterService } from '../services/router.service';
import { AuthInterceptor } from '../utils/auth.interceptor';
import { AuthService } from '../services/auth.service';
import { PortfolioEntryService } from '../services/portfolio-entry.service';
import { AuthGuard } from '../utils/auth-guard';

@Component({
  template: `<router-outlet></router-outlet>`,
  selector: `app`,
  standalone: true,
  imports: [
    InputViewComponent,
    InputComponent,
    GenericFormViewComponent,
    GenericButtonViewComponent,
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [
    HttpClient,
    RouterService,
    AuthInterceptor,
    PortfolioEntryService,
    AuthService,
    AuthGuard,
  ],
})
export class AppComponent {}
