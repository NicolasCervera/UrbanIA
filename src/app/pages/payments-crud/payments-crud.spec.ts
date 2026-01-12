import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsCrud } from './payments-crud';

describe('PaymentsCrud', () => {
  let component: PaymentsCrud;
  let fixture: ComponentFixture<PaymentsCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
