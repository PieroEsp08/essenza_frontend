import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCarruselComponent } from './banner-carrusel.component';

describe('BannerCarruselComponent', () => {
  let component: BannerCarruselComponent;
  let fixture: ComponentFixture<BannerCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
