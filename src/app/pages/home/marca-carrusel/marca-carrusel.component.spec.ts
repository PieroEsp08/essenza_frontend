import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaCarruselComponent } from './marca-carrusel.component';

describe('MarcaCarruselComponent', () => {
  let component: MarcaCarruselComponent;
  let fixture: ComponentFixture<MarcaCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaCarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
