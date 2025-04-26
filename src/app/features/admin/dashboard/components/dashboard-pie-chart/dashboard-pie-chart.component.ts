import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { DashboardDto } from '../../../../../core/models/previews.interface';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-pie-chart',
  imports: [ChartModule],
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrl: './dashboard-pie-chart.component.css'
})
export class DashboardPieChartComponent {
  platformId = inject(PLATFORM_ID);

  data: any;
  options: any;

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboard().subscribe(dashboard => {
      this.initChart(dashboard);
    });
  }

  initChart(dashboard: DashboardDto) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color') || '#495057';
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color') || '#6c757d';
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color') || '#dee2e6';

      this.data = {
        labels: ['Productos', 'Clientes', 'Inventarios', 'Órdenes'],
        datasets: [
          {
            label: 'Totales',
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500') || '#00bcd4',
              documentStyle.getPropertyValue('--p-orange-500') || '#ff9800',
              documentStyle.getPropertyValue('--p-green-500') || '#4caf50',
              documentStyle.getPropertyValue('--p-purple-500') || '#9c27b0'
            ],
            borderColor: [
              documentStyle.getPropertyValue('--p-cyan-500') || '#00bcd4',
              documentStyle.getPropertyValue('--p-orange-500') || '#ff9800',
              documentStyle.getPropertyValue('--p-green-500') || '#4caf50',
              documentStyle.getPropertyValue('--p-purple-500') || '#9c27b0'
            ],
            borderWidth: 1,
            data: [
              dashboard.totalProducts,
              dashboard.totalCustomers,
              dashboard.totalInventories,
              dashboard.totalOrders
            ]
          }
        ]
      };

      this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };

      this.cd.markForCheck();
    }
  }
}
