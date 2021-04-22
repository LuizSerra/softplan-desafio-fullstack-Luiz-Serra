import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosCadastroComponent } from './processos-cadastro.component';

describe('ProcessosCadastroComponent', () => {
  let component: ProcessosCadastroComponent;
  let fixture: ComponentFixture<ProcessosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessosCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
