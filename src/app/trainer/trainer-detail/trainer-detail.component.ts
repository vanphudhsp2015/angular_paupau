import { Component, OnInit } from '@angular/core';
import {Trainer} from '../../core/model/trainer';
import{Router} from '@angular/router';
import {TrainerService} from '../../core/service/trainer.service';
@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent implements OnInit {
  private  trainer:Trainer[];
  limit: number;
  numberOfBooks: number;
  page: number = 1;
  filter: Trainer = new Trainer()
  pagesIndex =[];
  maxpage:number=0;
  max:number=0;
  constructor(private  trainerService:TrainerService,private _router:Router) { }

  ngOnInit() {
    this.init();
  }
  // delete
  deleteTrainer(trainer){
    var answer = confirm("Bạn Muốn Xóa ?")
    if (answer) {
      this.trainerService.deleteTrainer(trainer.idTrainer).subscribe((data)=>{
        this.trainer.splice(this.trainer.indexOf(trainer),1);
    },(error)=>{
      console.log(error);
    });
    }
    else {
        //some code
       
    }
   
  }
  // update
  updateTrainer(trainer){
    var answer = confirm("Bạn Muốn Sửa ?")
    if (answer) {
      this.trainerService.setter(trainer);
    this._router.navigate(['/trainer']);
    }
    else {
        //some code
        console.log("end");
    }
   
  }
  init(){
    this.trainerService.getTrainer().subscribe((data)=>{
      this.trainer=data;
      this.numberOfBooks = this.trainer.length;
      this.limit = 6;
      if(this.numberOfBooks<this.limit){
        this.maxpage=1
      }else if(this.numberOfBooks%6==0){
        this.maxpage=(this.numberOfBooks/6);
      }else{
        this.maxpage=((this.numberOfBooks%6)/(this.numberOfBooks%6))+(this.numberOfBooks/6);
      }
      // cover number
      this.max=Math.floor(this.maxpage);
      // push item page
      for(var i=1;i<=this.max;i++){
        this.pagesIndex.push(i);
      }
    },(error)=>{
      console.log(error);
    })
  }
   // prevpage
   prevPage(){
    this.page --;
  }
  // nextpage
  nextPage(){
    this.page ++;
  }
  // set page
  setPage(pagenumber:number){
    this.page=pagenumber;
  }

}