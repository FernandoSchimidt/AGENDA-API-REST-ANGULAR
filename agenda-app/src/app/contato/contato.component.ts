import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './Contato';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component'
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {


  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'email', 'favorito', 'editar', 'apagar'];

  pageSizeOptions: number[] = [10];
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  contatoSel: Contato;

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]]
    })
    this.listarContatos(this.pagina, this.tamanho);
  }
  listarContatos(pagina = 0, size = 10) {
    this.service.list(pagina, size).subscribe(response => {
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
  }
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho)
  }

  favoritar(contato: Contato) {
    this.service.favorite(contato).subscribe(res => {
      contato.favorito = !contato.favorito;

    })
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service.save(contato)
      .subscribe(res => {
        this.listarContatos()
        this.snackBar.open('Contato salvo com sucesso', 'Sucesso', {
          duration: 2000
        })
        this.formulario.reset();
      })
  }
  uploadFoto(event, contato) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
        .upload(contato, formData)
        .subscribe(response => this.listarContatos());
    }
  }
  openDialog(contato: Contato) {
    this.dialog.open(DialogComponent, {
      width: '700px',
      height: '250px',
      data: contato
    });
    console.log(contato)

  }
  visualizarContato(contato: Contato) {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }
  preparaDelecao(contato: Contato) {
    this.contatoSel = contato;
    this.deletarContato();
  }

  deletarContato() {
    this.service.deletar(this.contatoSel)
      .subscribe(res => {
        this.snackBar.open('Contato deletado com sucesso', 'Sucesso', {
          duration: 2000
        })
      })
  }

}
