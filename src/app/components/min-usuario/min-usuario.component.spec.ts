import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinUsuarioComponent } from './min-usuario.component';

describe('MinUsuarioComponent', () => {
  let component: MinUsuarioComponent;
  let fixture: ComponentFixture<MinUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
