import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogDetailComponent } from './task-dialog-detail.component';

describe('TaskDialogDetailComponent', () => {
  let component: TaskDialogDetailComponent;
  let fixture: ComponentFixture<TaskDialogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
