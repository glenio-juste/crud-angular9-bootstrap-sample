import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario } from './models/funcionario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  funcionario = {} as Funcionario;
  funcionarios: Funcionario[];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.getFuncionarios();
  }

  // defini se um funcionario será criado ou atualizado
  saveFuncionario(form: NgForm) {
    if (this.funcionario.id !== undefined) {
      this.funcionarioService.updateFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.funcionarioService.saveFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os funcionarios
  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((Funcionarios: Funcionario[]) => {
      this.funcionarios = Funcionarios;
    });
  }

  // deleta um Funcionarioro
  deleteFuncionario(funcionario: Funcionario) {
    this.funcionarioService.deleteFuncionario(funcionario).subscribe(() => {
      this.getFuncionarios();
    });
  }

  // copia o Funcionarioro para ser editado.
  editFuncionario(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFuncionarios();
    form.resetForm();
    this.funcionario = {} as Funcionario;
  }

}
