import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanCategoryComponent } from './kanban-category.component';

describe('KanbanCategoryComponent', () => {
  let component: KanbanCategoryComponent;
  let fixture: ComponentFixture<KanbanCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
