import { Component } from '@angular/core';
import { Post } from '../post';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  id!:number;
  post!:Post;
  form!:FormGroup;
  constructor(public postService:PostService, private router:Router , private route:ActivatedRoute) {
   
  }

  ngOnInit():void{
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data:Post)=>{
      this.post = data; 

    })

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    })
  }
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.post);
    console.log(this.form.value);
    console.log(this.id);
    this.postService.update(this.id,this.form.value).subscribe((res)=>{
      console.log('Post created successfully!');
      this.router.navigate(['/post/index']);
    })
  }

}
