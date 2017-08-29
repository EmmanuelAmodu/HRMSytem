import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportgroupEditComponent } from './payroll-reportgroup-edit.component';

describe('PayrollReportgroupEditComponent', () => {
  let component: PayrollReportgroupEditComponent;
  let fixture: ComponentFixture<PayrollReportgroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollReportgroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollReportgroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
