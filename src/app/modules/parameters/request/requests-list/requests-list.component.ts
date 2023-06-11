import { AfterViewInit, Component } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { RequestService } from "src/app/services/parameters/request.service";
import * as M from 'materialize-css';

@Component({
  selector: "app-requests-list",
  templateUrl: "./requests-list.component.html",
  styleUrls: ["./requests-list.component.css"],
})
export class RequestsListComponent implements AfterViewInit {
  constructor(private requestService: RequestService) {}
  table: Table = {
    columnNames: [],
    rows: [],
  };

  ngOnInit() {
    this.buildTable();
  }

  buildTable() {
    this.table.columnNames = [
      "Código solicitud",
      "Asesor",
      "Departamento",
      "Ciudad",
      "Dirección",
      "Tipo propiedad",
      "Estado",
      "Acciones",
    ];
    this.listRequests();
  }

  listRequests() {
    this.requestService.listRequests().subscribe({
      next: (data) => {
        this.table.rows = data;
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
  }

  downLoadContract(contractSource: string) {
    this.requestService.downloadContract(contractSource).subscribe({
      next: (body: Blob) => {
        if (!body) {
          console.log("Es null")
          /**TODO: Tratar este caso */
          return;
        }
        const blob = new Blob([body], { type: "application/pdf" });
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `${contractSource}.pdf`;
        downloadLink.click();
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
  }


  viewPropertyDetails(){

    console.log("Ver detalles propiedad")
  }
  
  ngAfterViewInit() {
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  }
}
