import { Component } from '@angular/core';
import { GoodsServiceService } from '../../services/goods-service.service';
import { HsCode } from '../../model/hscode.model';
import { Goods } from '../../model/goods.model';

@Component({
  selector: 'app-goods',
  standalone: false,
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.css',
})
export class GoodsComponent {
  goodsList: Goods[] = [];
  hsCodeResults: HsCode[] = [];
  searchKeyword: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private goodsService: GoodsServiceService) {}

  ngOnInit(): void {
    this.loadGoods();
  }

  loadGoods(): void {
    this.goodsService.getGoods().subscribe(
      (data: any) => {
        this.goodsList = data;
      },
      (err: any) => {
        this.errorMessage = 'Error loading goods';
        console.error(err);
      }
    );
  }

  searchHsCode(): void {
    if (!this.searchKeyword.trim()) {
      this.hsCodeResults = [];
      return;
    }
    this.loading = true;
    this.goodsService.searchHsCode(this.searchKeyword).subscribe(
      (data: any) => {
        this.hsCodeResults = data;
        this.loading = false;
      },
      (err: any) => {
        this.errorMessage = 'Error searching HS Codes';
        console.error(err);
        this.loading = false;
      }
    );
  }
}
