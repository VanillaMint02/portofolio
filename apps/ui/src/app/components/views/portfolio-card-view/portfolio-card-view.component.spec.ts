import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCardViewComponent } from './portfolio-card-view.component';

describe('PortfolioCardViewComponent', () => {
  let component: PortfolioCardViewComponent;
  let fixture: ComponentFixture<PortfolioCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCardViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
