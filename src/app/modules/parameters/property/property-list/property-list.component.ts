import { Component } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { PropertyService } from "src/app/services/parameters/property.service";
import { SecurityService } from "src/app/services/security.service";

@Component({
  selector: "app-property-list",
  templateUrl: "./property-list.component.html",
  styleUrls: ["./property-list.component.css"],
})
export class PropertyListComponent {
  constructor(
    private propetyService: PropertyService,
    private securityService: SecurityService
  ) {}
  table: Table = {
    columnNames: [],
    rows: [],
  };

  ngOnInit() {
    this.buildTable();
  }

  buildTable() {
    this.table.columnNames = [
      "Id",
      "Dirección",
      "Ciudad",
      "Estado",
      "Acciones",
    ];
    this.listProperies();
  }

  listProperies() {
    const advisorId = this.securityService.getIdUserPkValidated();
    if(!advisorId){
      return;
    }
    this.propetyService.getpropertiesByAdvisor(advisorId).subscribe({
      next: (data) => {
        console.log("data", data);
        this.table.rows = data;
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
  }
}
