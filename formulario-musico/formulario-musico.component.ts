import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Musico } from '../models/model.musico';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicoService } from 'src/app/musico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-musico',
  templateUrl: './formulario-musico.component.html',
  styleUrls: ['./formulario-musico.component.css']
})
export class FormularioMusicoComponent implements OnInit {

  @Output() musicoCreado: EventEmitter<Musico>;

  nuevoMusico: Musico;

  formulariomusico: FormGroup;
  arrMusicos: Musico[];
  musicoEnviar: Musico;

  constructor(private musicoService: MusicoService, private router: Router ) { 
    this.nuevoMusico = new Musico();
    this.musicoCreado = new EventEmitter();
    this.formulariomusico = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      formacion: new FormControl('', [Validators.required]),
      canciones: new FormControl('', [Validators.required]),
      estilos: new FormControl('', [Validators.required]),
      agrupacion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repite_password: new FormControl('', [Validators.required]),

    });
  }
  
  async ngOnInit(){
    this.arrMusicos = await this.musicoService.getAll();
  }

  // ! Si el de arriba no funciona, dejar este.
  // ngOnInit(): void {
    
  // }

  async recogerDatos(){
    const response = await this.musicoService.create(this.formulariomusico.value);
    console.log(response.musico.id);
    if (response['success']) {
      this.router.navigate(['/musico', response.musico.id]);
    } else {
      console.log(response['error']);
    }
  }


// ! Vamos a dejar fuera esto de momento
  // async ngOnInit(){
  //   this.arrMusicos = await this.musicoService.getAll();
  // }

  // async recogerDatos() {
  //   this.musicoEnviar = this.formulariomusico.value;
  //   const mensaje = await this.musicoService.create(this.musicoEnviar);
  //   console.log(mensaje);
  //   this.router.navigate(['musico']);
  // }

  // addContratante(pMusico): Promise<string> {
  //   return new Promise((resolve, reject) => {

  //   });
  // }

  // onClick(pMusico) {
  //   console.log(this.nuevoMusico);
  //   this.musicoCreado.emit(this.nuevoMusico);
  //   this.router.navigate([pMusico]);
  //   this.nuevoMusico = new Musico();
  // }
  // // Revisar esto ultimo
  // onSubmit(pFormValues) {
  //   console.log(pFormValues);
  //   this.router.navigate(['/'+pFormValues.perfil])
  // }

}
