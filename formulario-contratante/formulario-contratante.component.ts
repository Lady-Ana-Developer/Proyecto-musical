import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { Contratante } from '../models/model.contratante';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContratanteService } from 'src/app/contratante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-contratante',
  templateUrl: './formulario-contratante.component.html',
  styleUrls: ['./formulario-contratante.component.css']
})
export class FormularioContratanteComponent implements OnInit {

  @Output() contratanteCreado: EventEmitter<Contratante>;

  nuevoContratante: Contratante;

  formulariocontratante: FormGroup;
  arrContratantes: Contratante[];
  contratanteEnviar: Contratante;

  constructor(private contratanteService: ContratanteService, private router: Router) {
    this.nuevoContratante = new Contratante();
    this.contratanteCreado = new EventEmitter();
    this.formulariocontratante = new FormGroup({
      nombre_y_apellidos: new FormControl('', [Validators.required]),
      tipo_evento: new FormControl('', [Validators.required]),
      tipo_musica: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repite_password: new FormControl('', [Validators.required]),

    });

  }

  async ngOnInit() {
  }
  
  async recogerDatos() {
    const response = await this.contratanteService.create(this.formulariocontratante.value);
    console.log(response.contratante.id);
    if (response['success']) {
      this.router.navigate(['/contratante', response.contratante.id]);
    } else {
      console.log(response['error']);
    }
  }

  // addContratante(pContratante): Promise<string> {
  //   return new Promise((resolve, reject) => {

  //   });
  // }


  // onClick() {
  //   console.log(this.nuevoContratante);
  //   this.contratanteCreado.emit(this.nuevoContratante);
  //   this.nuevoContratante = new Contratante();
  // }

}
