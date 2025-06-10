import { Component } from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  shipmentCounts!: any[];
  constructor(private shipments: ShipmentService) {}
  ngOnInit(): void {
    this.shipments.getAllShipments().subscribe(
      (res) => {
        this.shipmentCounts = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
