import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPieChartBasicComponent } from './dashboard-pie-chart-basic.component';

describe('DashboardPieChartBasicComponent', () => {
  let component: DashboardPieChartBasicComponent;
  let fixture: ComponentFixture<DashboardPieChartBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPieChartBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPieChartBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
