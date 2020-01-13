import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientsService } from 'src/app/services/clients.service';
import { Customer } from 'src/app/interfaces/client';

@Component({
  selector: 'app-clients-projection',
  templateUrl: './clients-projection.component.html',
  styles: []
})
export class ClientsProjectionComponent implements OnInit, AfterViewInit {
  labels = ['0-10', '10-21', '21-30', '31-40', '41-'];
  constructor( private clientService: ClientsService) { }
  ngAfterViewInit() {

  }
  getChart(data) {
    return new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: data,
            borderColor: '#3cba9f',
            backgroundColor: [
              '#3cb371',
              '#0000FF',
              '#9966FF',
              '#4C4CFF',
              '#00FFFF',
              '#f990a7',
              '#aad2ed',
              '#FF00FF'
            ],
            //fill: true
          }
        ]
      },
      options: {
        //responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  ngOnInit() {
    this.clientService.findAll().subscribe((customers: Customer[]) => {
      const initial = [
        0, 0, 0, 0, 0
      ];
      const data = customers.map(customer => customer.age).reduce(this.reduceArray, initial);
      this.getChart(data);
    });
  }

  reduceArray(accumulated, current) {
    const indexes = [
      {from: 0, to: 10, index: 0},
      {from: 11, to: 21, index: 1},
      {from: 21, to: 30, index: 2},
      {from: 31, to: 40, index: 3},
      {from: 41, to: 999, index: 4}
    ];
    const range = indexes.filter(it => current >= it.from && current <= it.to).pop();
    if ( range != null) {
      const {index} = range;
      accumulated[index] = accumulated[index] + 1;
    }
    return accumulated;
  }

}
