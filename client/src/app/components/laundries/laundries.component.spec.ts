import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundriesComponent } from './laundries.component';

describe('LaundriesComponent', () => {
  let component: LaundriesComponent;
  let fixture: ComponentFixture<LaundriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaundriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
