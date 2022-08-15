import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParcialesComponent } from './detail-parciales.component';

describe('DetailParcialesComponent', () => {
  let component: DetailParcialesComponent;
  let fixture: ComponentFixture<DetailParcialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailParcialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailParcialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
