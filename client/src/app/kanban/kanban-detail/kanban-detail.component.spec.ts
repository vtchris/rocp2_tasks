import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanDetailComponent } from './kanban-detail.component';

describe('KanbanDetailComponent', () => {
  let component: KanbanDetailComponent;
  let fixture: ComponentFixture<KanbanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
