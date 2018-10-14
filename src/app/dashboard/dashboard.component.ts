import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Langformy';
  description = "A tool to ease the change of a project from a language to another.";
  disclaimer = "Langformy is still in Alpha development ...";

  constructor() { }

  ngOnInit() {
  }

}
