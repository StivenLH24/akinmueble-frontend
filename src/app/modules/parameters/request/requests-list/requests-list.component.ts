import { HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { RequestService } from "src/app/services/parameters/request.service";

@Component({
  selector: "app-requests-list",
  templateUrl: "./requests-list.component.html",
  styleUrls: ["./requests-list.component.css"],
})
export class RequestsListComponent {
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
      "Código",
      "Departamento",
      "Ciudad",
      "Dirección",
      "Tipo propiedad",
      "Estado",
      "Contrato",
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
      next: (response: HttpResponse<Blob>) => {
        console.log(response)
        if (!response || !response.body) {
          console.log("Es null")
          return;
        }
        console.log("pasó")
        const blob = new Blob([response.body], { type: "application/pdf" });
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "archivo.pdf";
        downloadLink.click();
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
  }
}
