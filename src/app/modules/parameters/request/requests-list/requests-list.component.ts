import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { RequestService } from "src/app/services/parameters/request.service";
import * as M from "materialize-css";
import { RequestDetailComponent } from "../request-detail/request-detail.component";
import { modalsConfig } from "src/helpers/modals-config";
import { SecurityService } from "src/app/services/security.service";
import { configurationRoles } from "src/app/config/general.config";


@Component({
  selector: "app-requests-list",
  templateUrl: "./requests-list.component.html",
  styleUrls: ["./requests-list.component.css"],
})
export class RequestsListComponent implements AfterViewInit {
  constructor(
    private requestService: RequestService,
    private securityService: SecurityService
  ) {}
  table: Table = {
    columnNames: [],
    rows: [],
  };

  propertyId!: number;
  idProjectModalViewDetails!: string;
  idProjectChangeAdvisor!: string;
  userRole: string = "";
  isAdmin: boolean = false;

  @ViewChild("requestDetail")
  requestDetail!: RequestDetailComponent;

  ngOnInit() {
    this.idProjectModalViewDetails =
      modalsConfig.projectorModal.modalUno.modalId;
    this.idProjectChangeAdvisor = modalsConfig.projectorModal.modalDos.modalId;
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
    const role = this.securityService.getRolUserValidated();
    if(!role) return;

    if(role == configurationRoles.adminRole){
      this.userRole = configurationRoles.adminRole;
      this.isAdmin = true;
      this.requestService.listRequests().subscribe({
        next: (data) => {
          this.table.rows = data;
        },
        error: (err) => {
          alert("Error leyendo la información.");
        },
      });
      return;      
    }

    if(role == configurationRoles.advisorRole){
      this.userRole = configurationRoles.advisorRole;
      const advisorId = this.securityService.getIdUserPkValidated();
      if (!advisorId) return;      
      this.requestService.getRequestByAdvisor(advisorId).subscribe({
        next: (data) => {
          this.table.rows = data;
        },
        error: (err) => {
          alert("Error leyendo la información.");
        },
      });
      return;
    }

    if(role == configurationRoles.customerRole){
      this.userRole = configurationRoles.customerRole;
      const customerId = this.securityService.getIdUserPkValidated();
      if (!customerId) return;
      this.requestService.getRequestByCustomer(customerId).subscribe({
        next: (data) => {
          this.table.rows = data;
        },
        error: (err) => {
          alert("Error leyendo la información.");
        },
      });
      return;  
    }
  }

  downLoadContract(contractSource: string) {
    this.requestService.downloadContract(contractSource).subscribe({
      next: (body: Blob) => {
        if (!body) {
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

  viewPropertyDetails(propertyId: number) {
    this.requestDetail.getData(propertyId);
    this.propertyId = propertyId;
  }

  ngAfterViewInit() {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
  }
}
