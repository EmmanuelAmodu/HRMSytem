import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollRegionListComponent } from './payroll-region-list.component';

describe('PayrollRegionListComponent', () => {
  let component: PayrollRegionListComponent;
  let fixture: ComponentFixture<PayrollRegionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollRegionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollRegionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
