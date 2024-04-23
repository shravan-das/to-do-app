import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  form!: FormGroup;
  constructor(public postService:PostService , private router:Router) { 

  }
  ngOnInit():void{

    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      IsLiked: new FormControl(false, [Validators.required])
    })

  }

  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res)=>{
      console.log('Post created successfully!');
      this.router.navigate(['/post/index']);
    })
  }

  


}
