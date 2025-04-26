import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ProductPreview } from '../../../../../core/models/previews.interface';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { ProductService } from '../../../../../core/services/product.service';
import { DashboardPieChartComponent } from '../../components/dashboard-pie-chart/dashboard-pie-chart.component';
import { DashboardPieChartBasicComponent } from "../../components/dashboard-pie-chart-basic/dashboard-pie-chart-basic.component";

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, DashboardPieChartComponent, DashboardPieChartBasicComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activedProducts: number = 0;
  activedInventories: number = 0;

  totalCustomers: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;
  totalInventories: number = 0;

  products: ProductPreview[] = [];

  platformId = inject(PLATFORM_ID);

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboard().subscribe(data => {
      this.activedProducts = data.activedProducts;
      this.activedInventories = data.activedInventories;

      this.totalCustomers = data.totalCustomers;
      this.totalOrders = data.totalOrders;
      this.totalProducts = data.totalProducts;
      this.totalInventories = data.totalInventories;
    })
  }
}
