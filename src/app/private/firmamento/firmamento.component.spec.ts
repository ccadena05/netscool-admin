import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmamentoComponent } from './firmamento.component';

describe('FirmamentoComponent', () => {
  let component: FirmamentoComponent;
  let fixture: ComponentFixture<FirmamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
