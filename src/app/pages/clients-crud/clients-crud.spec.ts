import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCrud } from './clients-crud';

describe('ClientsCrud', () => {
  let component: ClientsCrud;
  let fixture: ComponentFixture<ClientsCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
