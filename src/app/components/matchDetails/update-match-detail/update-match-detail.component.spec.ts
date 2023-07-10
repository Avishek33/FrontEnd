import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatchDetailComponent } from './update-match-detail.component';

describe('UpdateMatchDetailComponent', () => {
  let component: UpdateMatchDetailComponent;
  let fixture: ComponentFixture<UpdateMatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMatchDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
