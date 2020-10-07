import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colegio } from '../models/model.colegio';
import { ColegioService } from 'src/app/colegio.service';

@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.css']
})
export class ColegioComponent implements OnInit {

  colId: number;
  colegioPublico: Colegio;

  constructor(private colegioService: ColegioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      let colId = (params.colId);
      this.colegioPublico = await this.colegioService.getById(colId);
      console.log(this.colegioPublico)
    });
  }
  

  // logout() {
  //   this.denegarService.logout();
  //   this.setMessage();
  // }

}
