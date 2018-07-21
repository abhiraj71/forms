import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtestComponent } from './formtest.component';

describe('FormtestComponent', () => {
  let component: FormtestComponent;
  let fixture: ComponentFixture<FormtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
