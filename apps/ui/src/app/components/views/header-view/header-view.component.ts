import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonViewComponent } from '../generic-button-view/generic-button-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    GenericButtonViewComponent,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './header-view.component.html',
  styleUrl: './header-view.component.scss',
})
export class HeaderViewComponent {
  @Input()
  isUserAuthenticated!: boolean;
  @Input()
  onlyHasHeader!: boolean;

  constructor(private routerService: RouterService) {}
  goToLogin() {
    this.routerService.navigateToLogin();
  }
  goHome() {
    this.routerService.navigateToHome();
  }
}
