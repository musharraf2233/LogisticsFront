import { Component } from '@angular/core';
import { Shipment } from '../../model/shipment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-shipment',
  standalone: false,
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.css',
})
export class ShipmentComponent {
  shipments: Shipment[] = [];
  selectedShipment?: Shipment;
  shipmentForm!: FormGroup;
  isEditing = false;

  constructor(
    private shipmentService: ShipmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadShipments();
    this.initForm();
  }

  loadShipments(): void {
    this.shipmentService.getAllShipments().subscribe(
      (data: any) => (this.shipments = data),
      (err: any) => console.error(err)
    );
  }

  initForm(): void {
    this.shipmentForm = this.fb.group({
      origin: ['', Validators.required],
      destination: [''],
      status: ['', Validators.required],
      transport: ['', Validators.required],
    });
  }

  selectShipment(shipment: Shipment): void {
    this.selectedShipment = shipment;
    this.isEditing = true;
    this.shipmentForm.patchValue({
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      transport: shipment.transport,
    });
  }

  updateShipment(): void {
    if (this.selectedShipment && this.shipmentForm.valid) {
      const updatedShipment: Shipment = this.shipmentForm.value;
      this.shipmentService
        .updateShipment(this.selectedShipment.id, updatedShipment)
        .subscribe(
          (res: any) => {
            alert('Shipment updated successfully!');
            this.isEditing = false;
            this.selectedShipment = undefined;
            this.loadShipments();
            this.shipmentForm.reset();
          },
          (err: any) => console.error(err)
        );
    }
  }

  deleteShipment(id: number): void {
    if (confirm(`Are you sure you want to delete shipment with ID ${id}?`)) {
      this.shipmentService.deleteShipment(id).subscribe(
        (res: any) => {
          alert(res);
          this.loadShipments();
        },
        (err: any) => console.error(err)
      );
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedShipment = undefined;
    this.shipmentForm.reset();
  }
}
