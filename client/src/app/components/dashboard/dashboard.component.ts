import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  summary: any = {};
  data: any[] = [];
  loading = false;
  start: Date | null = null;
  end: Date | null = null;

  constructor(private analyticsSvc: AnalyticsService) {}

  ngOnInit(): void {
    this.fetch();
  }

  // FETCH ANALYTICS DATA
  fetch(): void {
    this.loading = true;
    const st = this.start ? this.start.toISOString().split('T')[0] : undefined;
    const ed = this.end ? this.end.toISOString().split('T')[0] : undefined;

    this.analyticsSvc.getData(st, ed).subscribe(
      (res) => {
        this.data = res;
        this.getSummary(st, ed);
      },
      (err) => {
        this.loading = false;
        console.error('Fetch error:', err);
      }
    );
  }

  // LOAD SUMMARY STATS
  getSummary(st: string | undefined, ed: string | undefined): void {
    this.analyticsSvc.getSummary(st, ed).subscribe(
      (res) => {
        console.log('Summary response:', res);
        this.summary = res;
        this.loading = false;
        this.draw();
      },
      (err) => {
        this.loading = false;
        console.error('Summary error:', err);
      }
    );
  }

  // RENDER ALL CHARTS
  draw(): void {
    setTimeout(() => {
      this.drawLine();
      this.drawBar();
      this.drawPie();
    }, 100);
  }

  // DRAW LINE CHART
  private drawLine(): void {
    const el = document.getElementById('lineChart');
    if (!el || !this.data.length) return;

    d3.select('#lineChart').selectAll('*').remove();

    const m = { top: 20, right: 30, bottom: 30, left: 60 };
    const w = el.clientWidth - m.left - m.right;
    const h = 300 - m.top - m.bottom;

    const svg = d3
      .select('#lineChart')
      .append('svg')
      .attr('width', w + m.left + m.right)
      .attr('height', h + m.top + m.bottom)
      .append('g')
      .attr('transform', `translate(${m.left},${m.top})`);

    // SCALES
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(this.data, (d: any) => new Date(d.date)) as [Date, Date])
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d: any) => d.activeUsers) || 100])
      .range([h, 0]);

    // LINE GENERATOR
    const line = d3.line<any>()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.activeUsers));

    // DRAW PATH
    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#667eea')
      .attr('stroke-width', 2)
      .attr('d', line);

    // AXES
    svg
      .append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));

    // LABEL
    svg.append('text').attr('y', -10).attr('x', -h / 2).attr('text-anchor', 'middle').text('Active Users');
  }

  // DRAW BAR CHART
  private drawBar(): void {
    const el = document.getElementById('barChart');
    if (!el || !this.data.length) return;

    d3.select('#barChart').selectAll('*').remove();

    const m = { top: 20, right: 30, bottom: 30, left: 60 };
    const w = el.clientWidth - m.left - m.right;
    const h = 300 - m.top - m.bottom;

    const d = this.data.slice(-7); // LAST 7 DAYS

    const svg = d3
      .select('#barChart')
      .append('svg')
      .attr('width', w + m.left + m.right)
      .attr('height', h + m.top + m.bottom)
      .append('g')
      .attr('transform', `translate(${m.left},${m.top})`);

    // SCALES
    const xScale = d3
      .scaleBand<number>()
      .domain(d3.range(d.length))
      .range([0, w])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(d, (d: any) => d.revenue) || 100])
      .range([h, 0]);

    // BARS
    svg
      .selectAll('.bar')
      .data(d)
      .enter()
      .append('rect')
      .attr('x', (_: any, i) => xScale(i) || 0)
      .attr('y', (d: any) => yScale(d.revenue))
      .attr('width', xScale.bandwidth())
      .attr('height', (d: any) => h - yScale(d.revenue))
      .attr('fill', '#4c51bf');

    // AXES
    svg
      .append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));

    svg.append('text').attr('y', -10).attr('x', -h / 2).attr('text-anchor', 'middle').text('Revenue');
  }

  // DRAW PIE CHART
  private drawPie(): void {
    const el = document.getElementById('pieChart');
    if (!el || !this.data.length) return;

    d3.select('#pieChart').selectAll('*').remove();

    const w = el.clientWidth;
    const h = 300;
    const r = Math.min(w, h) / 2 - 20;

    const svg = d3
      .select('#pieChart')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', `translate(${w / 2},${h / 2})`);

    // DATA FOR PIE
    const values = [
      { name: 'Active Users', val: this.summary.totalActiveUsers || 0 },
      { name: 'New Signups', val: this.summary.totalNewSignups || 0 },
    ];

    const pie = d3.pie<any>().value((d) => d.val);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(r);

    const colors = ['#667eea', '#764ba2'];

    // ARCS
    svg
      .selectAll('path')
      .data(pie(values))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_: any, i) => colors[i]);

    // LABELS
    svg
      .selectAll('text')
      .data(pie(values))
      .enter()
      .append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d: any) => d.data.name);
}

  // APPLY DATE FILTER
  applyFilter(): void {
    this.fetch();
  }

  // RESET FILTER
  resetFilter(): void {
    this.start = undefined as any;
    this.end = undefined as any;
    this.fetch();
  }

  // EXPORT CSV
  exportCSV(): void {
    const csv = this.toCSV(this.data);
    this.download(csv, 'analytics.csv');
  }

  // CONVERT TO CSV
  private toCSV(rows: any[]): string {
    const hdrs = ['Date', 'Active Users', 'New Signups', 'Revenue', 'Conversion', 'Engagement'];
    const mapped = rows.map((d) => [
      new Date(d.date).toLocaleDateString(),
      d.activeUsers,
      d.newSignups,
      d.revenue,
      d.conversionRate,
      d.userEngagement,
    ]);

    return [hdrs, ...mapped].map((row) => row.join(',')).join('\n');
  }

  // DOWNLOAD FILE
  private download(content: string, fname: string, mime = 'text/csv'): void {
    const blob = new Blob([content], { type: mime });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fname;
    link.click();
  }
}
