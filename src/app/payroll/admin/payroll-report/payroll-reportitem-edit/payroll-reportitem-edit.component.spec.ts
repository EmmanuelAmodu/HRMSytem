import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportitemEditComponent } from './payroll-reportitem-edit.component';

describe('PayrollReportitemEditComponent', () => {
  let component: PayrollReportitemEditComponent;
  let fixture: ComponentFixture<PayrollReportitemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollReportitemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollReportitemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
