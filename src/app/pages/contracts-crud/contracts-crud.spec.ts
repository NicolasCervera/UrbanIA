import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsCrud } from './contracts-crud';

describe('ContractsCrud', () => {
  let component: ContractsCrud;
  let fixture: ComponentFixture<ContractsCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
