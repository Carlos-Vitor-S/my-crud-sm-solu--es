import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewUSerComponent } from './modal-new-user.component';

describe('ModalNewUSerComponent', () => {
  let component: ModalNewUSerComponent;
  let fixture: ComponentFixture<ModalNewUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewUSerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
