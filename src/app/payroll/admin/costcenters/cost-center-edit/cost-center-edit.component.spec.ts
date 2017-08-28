import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterEditComponent } from './cost-center-edit.component';

describe('CostCenterEditComponent', () => {
  let component: CostCenterEditComponent;
  let fixture: ComponentFixture<CostCenterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
