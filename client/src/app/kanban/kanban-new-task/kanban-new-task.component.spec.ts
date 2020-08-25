import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanNewTaskComponent } from './kanban-new-task.component';

describe('KanbanNewTaskComponent', () => {
  let component: KanbanNewTaskComponent;
  let fixture: ComponentFixture<KanbanNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
