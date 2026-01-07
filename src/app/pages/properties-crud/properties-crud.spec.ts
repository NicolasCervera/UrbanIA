import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCrudComponent } from './properties-crud';

describe('PropertiesCrud', () => {
  let component: PropertiesCrudComponent;
  let fixture: ComponentFixture<PropertiesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesCrudComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PropertiesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
