import { ThisReceiver } from '@angular/compiler';
import { Folder } from 'src/app/shared/models/folder.model';
import { Image } from 'src/app/shared/models/image.model';
import { Lane } from 'src/app/shared/models/lane.model';
import { PortalService } from '../services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { concat } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoginService } from 'src/app/login/services/login.service';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  imagens: any[] = [];
  imagensL1: any[] = [];
  imagensL2: any[] = [];
  imagensL3: any[] = [];
  imagensL4: any[] = [];
  imgs: Image[] = [];
  folders: Folder[] = [];
  subFolders: Folder[] = [];
  xlanes: Lane[] = [];
  sources: Folder[] = [];

  loading: boolean = false;
  firstTime: boolean = true;
  _folder: string = '';
  _lane: any;
  _source!: string;
  _dir!: string;
  _msg!: string;

  constructor(private portalService: PortalService, 
              private _sanitizer: DomSanitizer,  
              private idleService: BnNgIdleService,
              private loginService: LoginService) {
    
    this.portalService.listarPastas().subscribe({
      next: (data: Folder[]) => {
        if(data == null) {
            this.sources = [];
        }
         else {
           this.sources = data;
           this.sources.sort((a: any, b: any) => (a.name < b.name) ? -1 : 1);
         }
      }
    });
    
  }

  public panelOpenState = false;
  public view = false;

  ngOnInit(): void {
    this.loginService.time().subscribe({
      next: (s: any) => {
        if(s != null) {
          this.idleService.startWatching(s);
        }
      }
    });
    
    this.carregaDiretorioBase();
    console.log(this._dir);
    this.loading = false;
  }
  
  listarTodos(source: any): Folder[] {
    this.loading = true;
    this.limparImagens();
    this.limparCampos();

    this._source = source;

    this.portalService.abrir(this._dir + source).subscribe({
      next: (data: Folder[]) => {
        if(data == null) {
          this._folder = '';
          this.folders = [];
        }
        else {
          this.firstTime = false;
          if(data.length == 0) {
            this._folder = '';
            this.folders = [];
          } 
          else {
            this.folders = data;
            this.folders.sort((a: any, b: any) => (a.name < b.name) ? -1 : 1);
          }
        }
      }
    });
    
    this.loading = false;
    return this.folders;
  }

  abrir(source: any, dir: any): Folder[] {
    this.loading = true;
    this._folder = dir;
    this._source = source;
    this.imagens = [];

     console.log("dir" + dir.value + "/" + this._folder);
    this.portalService.abrir(this._dir + source + '/' + dir).subscribe({
      next: (data: Folder[]) => {
        if(data == null) {
          this.subFolders = [];
        }
        else {
          const lanes: Lane[] = [];

          data.forEach(function (value) {
            let lane: Lane = new Lane;
            lane.name = value.name?.substring(value.name.length-1, value.name.length);
            lanes.push(lane);
          });

          this.xlanes = lanes;
          if(this.xlanes.length > 0) {
            this.subFolders = data;
            this.abrirImagemPorDir(this._dir + source + '/' + dir);
          }
          else {
            this._msg = "Não há pastas registradas.";
          }
          
        }
      }
    });
    this.loading = false;
    return this.subFolders;
  }

  abrirImagem(dir: any, nm: any) {
    this.loading = true;
    console.log(dir + "/" + nm);
    this.portalService.abrirImagem(dir + "/" + nm).subscribe({
      next: (img: any[]) => {
        const iii: any[] = [];
        if(img != null) {

          this.imagens = img;
          
        }
      }
    });
    this.loading = false;
  }

  atualizaTitulos(s: any) {
    this._folder = s;
  }

  abrirImagemPorDir(dir: any) {
    this.loading = true;
    this.limparImagens();

    for(let i = 0; i < this.xlanes.length; i++) {
      this.portalService.abrirImagem(dir + "/" + this.xlanes[i].name).subscribe({
        next: (img: any[]) => {
          const iii: any[] = [];
          if(img != null) {

            if(img.length == 0) this._msg = "Não há imagens disponíveis.";

            if(this.xlanes[i].name == '1') {
              this.imagensL1 = img;
            }
            else if(this.xlanes[i].name == '2') {
              this.imagensL2 = img;
            }
            else if(this.xlanes[i].name == '3') {
              this.imagensL3 = img;
            }
            else if(this.xlanes[i].name == '4') {
              this.imagensL4 = img;
            }
          }
        }
      });
    }
    this.loading = false;
  }

  mostrarImagem(img: any)
  {
    const imagemGrande:any=document.getElementById("imagemGrande") as HTMLInputElement;
    imagemGrande.src='data:image/jpg;base64,' + img;
    imagemGrande.parentElement.style.display="block";
  }

  carregaDiretorioBase() {
    this.portalService.carregtarPropriedade().subscribe({
      next: (s: any) => {
        if(s != null) {
          this._dir = s;
        }
      }
    });
  }

  limparImagens() {
    this.imagensL1 = [];
    this.imagensL2 = [];
    this.imagensL3 = [];
    this.imagensL4 = [];
  }

  limparCampos() {
    this._msg = '';
    this._source = '';
  }

}

