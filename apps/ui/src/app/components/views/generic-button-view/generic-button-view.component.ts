import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  selector: 'generic-button',
  templateUrl: './generic-button-view.component.html',
  styleUrls: ['./generic-button-view.component.scss'],
})
export class GenericButtonViewComponent {
  @Input() buttonName!: string;
  @Input() iconName!: string;
}
