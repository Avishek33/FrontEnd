import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMatchDetailComponent } from './create-match-detail.component';

describe('CreateMatchDetailComponent', () => {
  let component: CreateMatchDetailComponent;
  let fixture: ComponentFixture<CreateMatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMatchDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
