import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollRegionEditComponent } from './payroll-region-edit.component';

describe('PayrollRegionEditComponent', () => {
  let component: PayrollRegionEditComponent;
  let fixture: ComponentFixture<PayrollRegionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollRegionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollRegionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
