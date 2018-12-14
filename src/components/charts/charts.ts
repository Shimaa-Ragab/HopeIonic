import { Component, ViewChild, OnInit, ElementRef, Input } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "charts",
  templateUrl: "charts.html"
})
export class ChartsComponent implements OnInit {
  @Input() BloodBalanceList: number[];
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor() {}

  // Doughnut events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    console.log(this.BloodBalanceList);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        datasets: [
          {
            label: "% of blood blanace",
            data: [6, 5, 8, 9, 10, 12, 14, 16],
            backgroundColor: [
              "rgba(170, 57, 57, 1)",
              "rgba(128, 21, 21, 0.7)",
              "rgba(212, 106, 106, 1)",
              "rgba(255, 170, 170, 1)",
              "rgba(160, 71, 0, 1)",
              "rgba(203, 90, 0, 1)",
              "rgba(255, 147, 60, 1)",
              "rgba(255, 170, 103, 1)"
            ],
            borderColor: [],
            borderWidth: 0
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Blood Balance",
          fontSize: 20,
          fontColor: "#ddddd"
        },
        scales: {
          display: false
        },
        onClick: (e: any) => {
          console.log(e);
        }
      }
    });

    // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    //   type: "doughnut",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         hoverBackgroundColor: [
    //           "#FF6384",
    //           "#36A2EB",
    //           "#FFCE56",
    //           "#FF6384",
    //           "#36A2EB",
    //           "#FFCE56"
    //         ]
    //       }
    //     ]
    //   }
    // });

    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: "line",
    //   data: {
    //     labels: [
    //       "January",
    //       "February",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July"
    //     ],
    //     datasets: [
    //       {
    //         label: "My First dataset",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: "butt",
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: "miter",
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         spanGaps: false
    //       }
    //     ]
    //   }
    // });
  }
}
