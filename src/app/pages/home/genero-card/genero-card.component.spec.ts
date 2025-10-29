import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroCardComponent } from './genero-card.component';

describe('GeneroCardComponent', () => {
  let component: GeneroCardComponent;
  let fixture: ComponentFixture<GeneroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
