import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/models/property.model";
import { Report } from "src/app/models/report.model";
import { PropertyService } from "src/app/services/parameters/property.service";

@Component({
  selector: "app-request-detail",
  templateUrl: "./request-detail.component.html",
  styleUrls: ["./request-detail.component.css"],
})
export class RequestDetailComponent implements OnInit {
  constructor(private propertyService: PropertyService) {}

  property!: Property;
  
  reports:Report[]=[];

  ngOnInit() {
  }

  getData(propertyId: number, reports:Report[]) {
    this.reports = reports;
    this.propertyService.getPropertyDetail(propertyId).subscribe({
      next: (data) => [(this.property = data)],

      error: (err) => {
        alert("Ocurrió un error leyendo los datos");
      },
    });
  }
}
