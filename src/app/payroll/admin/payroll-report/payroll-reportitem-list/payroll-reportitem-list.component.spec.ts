import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportitemListComponent } from './payroll-reportitem-list.component';

describe('PayrollReportitemListComponent', () => {
  let component: PayrollReportitemListComponent;
  let fixture: ComponentFixture<PayrollReportitemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollReportitemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollReportitemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
