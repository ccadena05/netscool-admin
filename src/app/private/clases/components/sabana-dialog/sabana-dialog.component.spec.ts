import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabanaDialogComponent } from './sabana-dialog.component';

describe('SabanaDialogComponent', () => {
  let component: SabanaDialogComponent;
  let fixture: ComponentFixture<SabanaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SabanaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SabanaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
