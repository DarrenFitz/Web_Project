import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  blog;
  processingInfo = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }

  updateBlogSubmit(){
    this.processingInfo = true;
    this.blogService.editBlog(this.blog).subscribe(data => {

      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // bootstrap msg
        this.message = data.message; // error message
        this.processingInfo = false; // form fields are unlocked
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/blog']); // Navigate to blog page after
        }, 2000);
      }
    });
  }

  goBack(){
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Bootstrap error
        this.message = data.message;
      } else {
        this.blog = data.blog; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });
  }

}
