import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contratante } from '../models/model.contratante';
import { ContratanteService } from 'src/app/contratante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratante',
  templateUrl: './contratante.component.html',
  styleUrls: ['./contratante.component.css']
})
export class ContratanteComponent implements OnInit {

  contrId: number;
  contratantePublico: Contratante;

  constructor(private contratanteService: ContratanteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      let contrId = (params.contrId);
      this.contratantePublico = await this.contratanteService.getById(contrId);
      console.log(this.contratantePublico);
    });
  }
}
