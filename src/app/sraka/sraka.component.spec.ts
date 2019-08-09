import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrakaComponent } from './sraka.component';

describe('SrakaComponent', () => {
  let component: SrakaComponent;
  let fixture: ComponentFixture<SrakaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrakaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
