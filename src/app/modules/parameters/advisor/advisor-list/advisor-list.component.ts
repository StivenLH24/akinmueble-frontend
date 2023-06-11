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

  approve(advisorId:number){
    this.advisorService.changeStatus(advisorId, 1).subscribe({
      next: (data) => {
        this.listAdvisors();
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    })
  }
  
  reject(advisorId:number){
    this.advisorService.changeStatus(advisorId, 3).subscribe({
      next: (data) => {
        this.listAdvisors();
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    })
  }
}
