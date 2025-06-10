import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { ShipmentGoodsService } from '../../services/shipment-goods.service';
import { HsCode } from '../../model/hscode.model';
import { HscodeService } from '../../services/hscode.service';
import { GoodsServiceService } from '../../services/goods-service.service';

@Component({
  selector: 'app-shipping-goods',
  standalone: false,
  templateUrl: './shipping-goods.component.html',
  styleUrl: './shipping-goods.component.css',
})
export class ShippingGoodsComponent {
  shipmentForm!: FormGroup;
  hsCodeSuggestions: any[][] = [];
  errorMessage: string = '';
  hsCodeResults: HsCode[] = [];
  searchKeyword: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hsCodeService: GoodsServiceService,
    private shipmentGoods: ShipmentGoodsService
  ) {}

  ngOnInit(): void {
    this.shipmentForm = this.fb.group({
      origin: ['', Validators.required],
      destination: [''],
      status: ['BOOKED', Validators.required],
      transport: ['AIR', Validators.required],
      goodsList: this.fb.array([this.createGoodsGroup()]),
    });
  }

  get goodsList(): FormArray {
    return this.shipmentForm.get('goodsList') as FormArray;
  }

  createGoodsGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      amount: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      hsCode: ['', Validators.required],
    });
  }

  addGoods(): void {
    this.goodsList.push(this.createGoodsGroup());
    this.hsCodeSuggestions.push([]);
  }

  removeGoods(index: number): void {
    this.goodsList.removeAt(index);
    this.hsCodeSuggestions.splice(index, 1);
  }

  searchHsCodeByDescription(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const description = input.value;

    if (!description || description.length < 2) {
      this.hsCodeSuggestions[index] = [];
      return;
    }

    this.hsCodeService.searchHsCode(description).subscribe({
      next: (results: any[]) => {
        this.hsCodeSuggestions[index] = results;
      },
      error: () => {
        this.hsCodeSuggestions[index] = [];
      },
    });
  }

  selectHsCode(code: any, index: number): void {
    const fullText = code.commodity_fullname_english || '';
    const parts = fullText.split(';');
    const goodsName = parts[0]?.trim() || '';
    const description = parts.slice(1).join(';').trim();
    const goodsGroup = this.goodsList.at(index);
    goodsGroup.patchValue({
      name: goodsName,
      hsCode: code.commodity_code,
      description: description,
    });
    this.hsCodeSuggestions[index] = [];
  }

  searchHsCode(): void {
    if (!this.searchKeyword.trim()) {
      this.hsCodeResults = [];
      return;
    }

    this.loading = true;
    this.hsCodeService.searchHsCode(this.searchKeyword).subscribe({
      next: (data: HsCode[]) => {
        this.hsCodeResults = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error searching HS Codes';
        console.error(err);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.shipmentForm.invalid) {
      this.shipmentForm.markAllAsTouched();
      return;
    }

    const shipmentData = this.shipmentForm.value;
    this.shipmentGoods.addShipmentGoods(shipmentData).subscribe(
      () => {
        alert('Shipment added successfully!');
        this.shipmentForm.reset();
        this.goodsList.clear();
        this.addGoods();
      },
      (err: any) => {
        console.error('Error adding shipment:', err);
        alert('Failed to add shipment.');
      }
    );
  }
}
