import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGlaccountComponent } from './edit-glaccount.component';

describe('EditGlaccountComponent', () => {
  let component: EditGlaccountComponent;
  let fixture: ComponentFixture<EditGlaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGlaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGlaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
