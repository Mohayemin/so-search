import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionThreadComponent } from './question-thread/question-thread.component';
import { UserCardComponent } from './user-card/user-card.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TaglistComponent } from './taglist/taglist.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionThreadComponent,
    UserCardComponent,
    PostDetailComponent,
    TaglistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
