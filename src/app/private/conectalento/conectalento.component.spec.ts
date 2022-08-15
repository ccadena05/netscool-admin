import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectalentoComponent } from './conectalento.component';

describe('ConectalentoComponent', () => {
  let component: ConectalentoComponent;
  let fixture: ComponentFixture<ConectalentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConectalentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConectalentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
