import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {
  republic_id: number;
  republic: any;
  commentId: number;
  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;
  text_edit:string = '';
  username = localStorage.getItem('username');

  comments = [];

  constructor( public formbuilder: FormBuilder,
    public commentService: CommentService, ) { 
    this.republic_id = JSON.parse(localStorage.getItem('republica')).id;
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() {
   showRepublicComment(this.republic_id);

    this.comments = [{
      id: 1,
      username: 'Kujo Jotaro',
      text: 'Oraoraoraoraoraoraororaoraoraoraoroaroarraoao!'
    },
    {
      id: 2,
      username: 'Josuke Higashikata',
      text: 'Dorarararararararararararara!'
    },
    {
      id: 3,
      username: 'Joseph Joestar',
      text: 'Oh my god!!!'
    },
    {
      id: 4,
      username: 'Giorno Giovanna',
      text: 'Mudamudamudamudamudamudamuda!'
    }];
    
  }

  showRepublicComment(republic_id){
    this.commentService.showRepublicComment(republic_id).subscribe((res)=>{
      console.log(res);
      this.republic = res.republic;
      console.log(this.republic);
      this.comments = res.comments;
      console.log(this.comments);

    }
    )
  }
 
  getComment(id){
    console.log(id);
    this.commentId = id;
    console.log(this.commentId);
    for(let commen of this.comments){
      if(this.commentForm.id === id){
        this.text_edit = comment.text;
      }
    }
  }
  {
    this.editMode = true;
  }

  updateComment(id, editCommentForm){
    console.log(editCommentForm);
    console.log(editCommentForm.value);
    this.canEdit = false;
    this.editMode = false;
    this.commentService.updateComment(this.comment_id, editCommentForm.value).subscribe(res)=>{
      console.log(res);
      this.text_edit = '';
      this.editCommentForm.rest();
      this.showRepublicComment(this.republic_id);
    };

  }

  sendComment(commentForm){
    console.log(commentForm);
    console.log(commentForm.value);
    commentForm.value.republic_id = this.username;
    commentForm.value.username = this.username;
    this.editMode = false;
    this.commentService.creatComment(commentForm.value).subscribe((rest) => { console.log(rest)},
    console.log(res);
    this.commentForm.reset();
      this.showRepublicComment(this.republic_id)
    );
  }

  deleteComment(id){
    console.log('Mais que cancelado: ' + id);
    this.commentService.delDeleteComment(id).subscribe((res)) => {
      console.log(res);
      this.showRepublic(this.republic_id);
    }
  }

}


  // sendEditComment(commentForm){
  //   console.log(commentForm);
  //   console.log(commentForm.value);
  //   this.editMode = false;
  // }
  // toggleEdit(id){
  //   this.editMode = true;
  //   console.log(id)
  // }


    
  // republic = JSON.parse(localStorage.getItem('republica'));
  // republic_id = this.republic.id