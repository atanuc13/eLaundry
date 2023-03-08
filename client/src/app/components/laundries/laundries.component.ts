import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laundries',
  templateUrl: './laundries.component.html',
  styleUrls: ['./laundries.component.scss']
})
export class LaundriesComponent implements OnInit {

  constructor(
    private readonly http: HttpClient
  ) { }
  collegeId!: string;
  colleges: any;
  ngOnInit(): void {
    this.loadColleges();
  }

  loadColleges() {
    this.http.get('http://localhost:4002/admin/institutions').subscribe(colleges => {
      this.colleges = colleges;
    });
  }
  loadLaundries() {
    console.log(this.collegeId);
  }

}
