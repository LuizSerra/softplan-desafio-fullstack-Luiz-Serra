import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosPesquisaComponent } from './processos-pesquisa.component';

describe('ProcessosPesquisaComponent', () => {
  let component: ProcessosPesquisaComponent;
  let fixture: ComponentFixture<ProcessosPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessosPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
