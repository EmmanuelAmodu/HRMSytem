import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionAdminListComponent } from './pension-admin-list.component';

describe('PensionAdminListComponent', () => {
  let component: PensionAdminListComponent;
  let fixture: ComponentFixture<PensionAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
