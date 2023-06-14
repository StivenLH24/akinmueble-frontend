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
  userRole: string | null = this.securityService.getRolUserValidated();
  isAdmin: boolean = false;
  isAdvisor: boolean = false;
  isCustomer: boolean = false;

  @ViewChild("requestDetail")
  requestDetail!: RequestDetailComponent;

  ngOnInit() {
    this.defineMaterializeModalsIds();
    this.setCurrentlyRole();
    this.buildTable();
  }

  defineMaterializeModalsIds() {
    this.idProjectModalViewDetails =
      modalsConfig.projectorModal.modalUno.modalId;
    this.idProjectChangeAdvisor = modalsConfig.projectorModal.modalDos.modalId;
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
    if (!role) return;

    if (this.isAdmin) {
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

    if (this.isAdvisor) {
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

    if (this.isCustomer) {
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

  downLoadCodeptorDocuments() {
    /**TODO:
     * Si el rol(this.userRole) es advisor →
     * http://localhost:3001/advisors/{advisorId}/download-documents-codeptor/{requestId}
     * Si el rol(this.userRole) es cliente →
     * http://localhost:3001/customer/{customerId}/download-document/{requestId}
     */
  }

  changeRequestStatus(
    advisorId: string,
    requestId: number,
    newStatusId: number
  ) {
    const commentary: string = "";
    this.requestService
      .changeStatus(advisorId, requestId, newStatusId, commentary)
      .subscribe({
        next: (data) => {
          console.log("Respuesta ", data);
          this.listRequests();
        },
        error: (err) => {
          if (err.status == 400) {
            alert(err.error.error.message);
            return;
          }
          if (err.status == 404) {
            alert("No se encontrró el registro");
          }
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
