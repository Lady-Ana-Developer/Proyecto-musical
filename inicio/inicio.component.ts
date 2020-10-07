import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Colegio } from '../models/model.colegio';
import { Contratante } from '../models/model.contratante';
import { Musico } from '../models/model.musico';
import { SeccionesService } from '../services/secciones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  Colegios: Colegio[];
  Contratantes: Contratante[];
  Musicos: Musico[];

  constructor(private seccionesService: SeccionesService) { }


  async ngOnInit() {
    this.Colegios = await this.seccionesService.getAllColegios();
    this.Contratantes = await this.seccionesService.getAllContratantes();
    this.Musicos = await this.seccionesService.getAllMusicos();
  }

}

