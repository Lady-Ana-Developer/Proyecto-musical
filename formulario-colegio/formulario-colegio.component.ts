import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColegioService } from 'src/app/colegio.service';
import { Colegio } from '../models/model.colegio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-colegio',
  templateUrl: './formulario-colegio.component.html',
  styleUrls: ['./formulario-colegio.component.css']
})
export class FormularioColegioComponent implements OnInit {

  @Output() colegioCreado: EventEmitter<Colegio>;

  nuevoColegio: Colegio;

  formulariocolegio: FormGroup;
  arrColegios: Colegio[];
  colegioEnviar: Colegio;

  constructor(private colegioService: ColegioService, private router: Router) {
    this.nuevoColegio = new Colegio();
    this.colegioCreado = new EventEmitter();
    this.formulariocolegio = new FormGroup({
      nombre_y_apellidos: new FormControl('', [Validators.required]),
      nombre_colegio: new FormControl('', [Validators.required]),
      descripcion_colegio: new FormControl('', [Validators.required]),
      precio_colegio: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repite_password: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit(){
    this.arrColegios = await this.colegioService.getAll();
  }

  async recogerDatos() {
    const response = await this.colegioService.create(this.formulariocolegio.value);
    console.log(response.colegio.id);
    if (response['success']) {
      this.router.navigate(['/colegio', response.colegio.id]);
    } else {
      console.log(response['error']);
    }
  }
}
//   addColegio(pColegio): Promise<string> {
//     return new Promise((resolve, reject) => {
      
//     });
//   }
//   onClick() {
//   console.log(this.nuevoColegio);
//   this.colegioCreado.emit(this.nuevoColegio);
//   this.nuevoColegio = new Colegio();
//   }
// }
