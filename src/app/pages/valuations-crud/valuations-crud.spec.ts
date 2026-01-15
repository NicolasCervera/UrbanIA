import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationsCrud } from './valuations-crud';

describe('ValuationsCrud', () => {
  let component: ValuationsCrud;
  let fixture: ComponentFixture<ValuationsCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuationsCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValuationsCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
