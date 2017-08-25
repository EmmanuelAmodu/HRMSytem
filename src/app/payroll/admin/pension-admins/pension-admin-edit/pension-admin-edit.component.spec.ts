import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionAdminEditComponent } from './pension-admin-edit.component';

describe('PensionAdminEditComponent', () => {
  let component: PensionAdminEditComponent;
  let fixture: ComponentFixture<PensionAdminEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionAdminEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
