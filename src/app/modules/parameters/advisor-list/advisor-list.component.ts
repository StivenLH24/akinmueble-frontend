import { Component } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { AdvisorService } from "src/app/services/parameters/advisor.service";

@Component({
  selector: "app-advisor-list",
  templateUrl: "./advisor-list.component.html",
  styleUrls: ["./advisor-list.component.css"],
})
export class AdvisorListComponent {
  constructor(protected advisorService: AdvisorService) {}

  table: Table = {
    columnNames: [],
    rows: [],
  };
  status = { uno: "activo", dos: "pendiente", tres: "rechazado" };

  ngOnInit() {
    this.buildTable();
  }

  buildTable() {
    this.table.columnNames = [
      "CC",
      "Nombres",
      "Correo electrónico",
      "Estado",
      "Acciones",
    ];
    this.listAdvisors();
  }

  listAdvisors() {
    this.advisorService.listAdvisors().subscribe({
      next: (data) => {
        this.table.rows = data;
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
  }


  approve(id:number){
    console.log(id)
  }
}
