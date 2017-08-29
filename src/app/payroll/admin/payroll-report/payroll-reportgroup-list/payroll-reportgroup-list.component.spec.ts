import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportgroupListComponent } from './payroll-reportgroup-list.component';

describe('PayrollReportgroupListComponent', () => {
  let component: PayrollReportgroupListComponent;
  let fixture: ComponentFixture<PayrollReportgroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollReportgroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollReportgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
