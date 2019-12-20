import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionThreadComponent } from './question-thread/question-thread.component';


const routes: Routes = [{
  path: 'question',
  component: QuestionListComponent
}, {
  path: 'question/:id',
  component: QuestionThreadComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
