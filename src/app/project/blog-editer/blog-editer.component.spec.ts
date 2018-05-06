import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditerComponent } from './blog-editer.component';

describe('BlogEditerComponent', () => {
  let component: BlogEditerComponent;
  let fixture: ComponentFixture<BlogEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
