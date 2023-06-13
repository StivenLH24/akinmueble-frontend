import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { RequestService } from "src/app/services/parameters/request.service";
import * as M from "materialize-css";
import { RequestDetailComponent } from "../request-detail/request-detail.component";
import { modalsConfig } from "src/helpers/modals-config";

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

  propertyId!: number;
  idProjectModalViewDetails!: string;
  idProjectChangeAdvisor!: string;

  advisors: string[]=["1","2"];
  advisorSelected:string="1";

  @ViewChild("requestDetail")
  requestDetail!: RequestDetailComponent;

  ngOnInit() {
    this,this.advisors=["1","2"];
    this.advisorSelected = "1";
    this.idProjectModalViewDetails =
      modalsConfig.projectorModal.modalUno.modalId;
    this.idProjectChangeAdvisor =
      modalsConfig.projectorModal.modalDos.modalId;
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
          console.log("Es null");
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
    console.log(modals);
  }
}
