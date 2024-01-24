import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrNumberComponent } from './entr-number.component';

describe('EntrNumberComponent', () => {
  let component: EntrNumberComponent;
  let fixture: ComponentFixture<EntrNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
