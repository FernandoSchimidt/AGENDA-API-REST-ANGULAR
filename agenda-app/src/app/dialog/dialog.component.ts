import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ContatoService } from '../contato.service';
import { Contato } from '../contato/Contato';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  contatoAtt: Contato
  formulario: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato,
    private fb: FormBuilder,
    public service: ContatoService,

  ) { }

  ngOnInit(): void {

  }

  fechar() {
    this.dialogRef.close()
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service.editar(contato)
      .subscribe(res => {
        this.formulario.reset();
      })
  }

}
