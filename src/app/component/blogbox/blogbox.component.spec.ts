import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogboxComponent } from './blogbox.component';

describe('BlogboxComponent', () => {
  let component: BlogboxComponent;
  let fixture: ComponentFixture<BlogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
