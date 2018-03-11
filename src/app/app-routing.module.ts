import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { SubjectComponent } from './Subject/Subject.component';
import { VoteComponent } from './Vote/Vote.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: SignInComponent},

		{ path: 'Subject', component: SubjectComponent},

		{ path: 'Vote/:id', component: VoteComponent},

		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
