import { Component } from "@angular/core";
import { Table } from "src/app/models/interfaces/table.interface";
import { AdvisorService } from "src/app/services/parameters/advisor.service";
import * as M from "materialize-css";

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
  confirmModalTitle: string = "";
  descriptionConfirmModal: string = "";
  selectActionId!: number;
  accept: boolean = false;

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

  responseModal(response: boolean) {
    response;
    if (!response) {
      return;
    }

    if (this.accept) {
      this.approve();
      return;
    }

    if (!this.accept) {
      this.reject();
      return;
    }
  }

  changeSelectActionId(advisorId: number, accept: boolean) {
    if (!accept) {
      this.confirmModalTitle =
        "¿Está seguro de rechazar la solicitud de este asesor?";
      this.descriptionConfirmModal =
        "Si rechaza el asesor no ´podrá tener acceso al sistema";
    } else {
      this.confirmModalTitle = "¿Está seguro de aprobar este asesor?";
      this.descriptionConfirmModal =
        "Si acepta el asesor comenzará a tener acceso al sistema";
      this.selectActionId = advisorId;
    }
    this.accept = accept;
  }

  approve() {
    this.advisorService.changeStatus(this.selectActionId, 1).subscribe({
      next: (data) => {
        this.listAdvisors();
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
    console.log("approve");
  }

  reject() {
    this.advisorService.changeStatus(this.selectActionId, 3).subscribe({
      next: (data) => {
        this.listAdvisors();
      },
      error: (err) => {
        alert("Error leyendo la información.");
      },
    });
  }

  ngAfterViewInit() {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
    console.log(modals);
  }
}
