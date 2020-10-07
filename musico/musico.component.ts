import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Musico } from '../models/model.musico';
import { MusicoService } from 'src/app/musico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musico',
  templateUrl: './musico.component.html',
  styleUrls: ['./musico.component.css']
})
export class MusicoComponent implements OnInit {

  musId: number;
  musicoPublico: Musico;

  constructor(private musicoService: MusicoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      let musId = (params.musId);
      this.musicoPublico = await this.musicoService.getById(musId);
      console.log(this.musicoPublico);
    });
  }
}



  // ! Otra posibilidad



//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe(params => {
//       this.musId = params.musicoId;
//     });
//   }

// }



// ! Se podria hacer con esto? 
  // private _musicos: Musico[];
  // public get musicos(): Musico[] {
  //   return this._musicos;
  // }
  // public set musicos(value: Musico[]) {
  //   this._musicos = value;
  // }



// ! Preguntar como activar la ruta ya que no me guarda nada y me sale el array vacio
  // musicoPublico: Musico;
  // SeccionesService: any;

// constructor(private activatedRoute: ActivatedRoute) { }




// musId: number;

// constructor(private activatedRoute: ActivatedRoute) { }

// ngOnInit(): void {
//   this.activatedRoute.params.subscribe(params => {
//     this.musId = params.musicoId;
//   });
// }




// ngOnInit(): void {
//   this.musicoService.getAll()
//     .then(response => {
//       this.musicos = response;
//     })
//     .catch(error => {
//       if (error.status === 401) {
//         this.router.navigate(['/login']);
//       }
//     });
//   }
// }
