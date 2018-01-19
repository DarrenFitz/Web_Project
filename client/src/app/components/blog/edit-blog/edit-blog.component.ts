import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message = false;
  messageClass = false;
  blog = { title: String, body: String }

  constructor(
    private location: Location
  ) { }

  updateBlogSubmit(){

  }

  goBack(){
    this.location.back();
  }

  ngOnInit() {
  }

}
