import { Component } from '@angular/core';
import { NgForm, FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http'
//import { format } from 'path';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forgotpassword';
  forgot=""
  create=""
  reset=""
  onetime=""
  resetmail=""
  constructor(private http:HttpClient){}


  loginform(form)
  {
    if(form.invalid){return}

    var login={
      email:form.value.email,
      password:form.value.password
    }
   
    this.http.post<any>('http://localhost:3000/login',login).subscribe(data=>{
      console.log(data)
      return new alert(data.message)
    })
    form.resetForm()


  }


  forgotform(form){
    this.onetime="hi"
    if(form.invalid){return}
    this.http.post<any>('http://localhost:3000/forgotpassword',{email:this.resetmail}).subscribe(data=>{
      console.log(data)
      return new alert(data.message)
      
    })
   
    
  }


  createform(form){
    if(form.invalid){return}
    var create={
      email:form.value.email,
      password:form.value.password
    }
   
    this.http.post<any>('http://localhost:3000/createuser',create).subscribe(data=>{
      var message=data.message
      return new alert(message)
    })
  }

  OneTimePassword(form){
    this.onetime=""
    this.reset="hi"
    console.log(this.resetmail,form.value.pass1)
    if(form.invalid){return}
    this.http.post<any>('http://localhost:3000/OneTimePassword',{email:this.resetmail,password:form.value.pass1}).subscribe(data=>{
      return new alert(data.message)
    })
  }


resetpassword(form){
  if(form.invalid){return}
  if(form.value.pass1!=form.value.pass2){return new alert("password Dosen't Match")}
  this.http.post<any>('http://localhost:3000/resetpassword',{email:this.resetmail,password:form.value.pass2}).subscribe(data=>{
    return new alert(data.message)
  })
}

  login(){
    this.forgot=""
    this.create=""
    this.onetime=""
    this.reset=""
    
  }


  forgotpass(){
   this.create=""
   this.forgot="hi"
   this.reset=""
   
  }


  register(){
   this.forgot=""
   this.create="1"
   this.onetime=""
  }
 



}
