import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReticulaComponent } from './reticula.component';

describe('ReticulaComponent', () => {
  let component: ReticulaComponent;
  let fixture: ComponentFixture<ReticulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReticulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReticulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
