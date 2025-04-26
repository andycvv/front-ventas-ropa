import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProductPreview } from '../../../../../core/models/previews.interface';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-dashboard-pie-chart-basic',
  imports: [ChartModule],
  templateUrl: './dashboard-pie-chart-basic.component.html',
  styleUrl: './dashboard-pie-chart-basic.component.css'
})
export class DashboardPieChartBasicComponent {
  products: ProductPreview[] = [];
  basicData: any;
  basicOptions: any;

  platformId = inject(PLATFORM_ID);
  constructor(
    private cd: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllPreview().subscribe(data => {
      this.products = data;
      this.initChart();
    });
  }

  groupProductsByCategory() {
    const countByCategory: { [category: string]: number } = {};

    for (const product of this.products) {
      countByCategory[product.categoryName] = (countByCategory[product.categoryName] || 0) + 1;
    }

    return countByCategory;
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color') || '#495057';
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color') || '#6c757d';
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color') || '#dee2e6';

      const grouped = this.groupProductsByCategory();

      this.basicData = {
        labels: Object.keys(grouped),
        datasets: [
          {
            label: 'Productos por Categoría',
            data: Object.values(grouped),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1
          }
        ]
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      this.cd.markForCheck();
    }
  }
}
