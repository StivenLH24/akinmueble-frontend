import { Component } from "@angular/core";
import { configurationRoles } from "src/app/config/general.config";
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

  isAdmin: boolean = false;
  isAdvisor: boolean = false;
  isCustomer: boolean = false;

  ngOnInit() {
    this.setCurrentlyRole();
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

  setCurrentlyRole() {
    const role = this.securityService.getRolUserValidated();
    /**TODO: Analizar y tratar este caso */
    if (!role) return;

    if (role == configurationRoles.adminRole) {
      this.isAdmin = true;
      return;
    }

    if (role == configurationRoles.advisorRole) {
      this.isAdvisor = true;
      return;
    }

    if (role == configurationRoles.customerRole) {
      this.isCustomer = true;
      return;
    }
  }

  listProperies() {
    if(this.isAdvisor){      
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
      return;
    }

    if(this.isCustomer){
      const advisorId = this.securityService.getIdUserPkValidated();
      if(!advisorId){
        return;
      }
      this.propetyService.getpropertiesByAdmin().subscribe({
        next: (data) => {
          console.log("data", data);
          this.table.rows = data;
        },
        error: (err) => {
          alert("Error leyendo la información.");
        },
      });
      return;
    }
  }
}
