import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPortfolioPageComponent } from './view-portfolio-page.component';

describe('ViewPortfolioPageComponent', () => {
  let component: ViewPortfolioPageComponent;
  let fixture: ComponentFixture<ViewPortfolioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPortfolioPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
