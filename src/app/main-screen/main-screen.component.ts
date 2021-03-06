import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {


  products : Product[];  //blank my_array array
 
  constructor(private http:HttpClient) { }

  ngOnInit(): void    //page refresh
   {
    
    this.http.get<{[key:string]:Product}>("http://localhost:3006/api/product/")
    .pipe(map(
      responseData =>
      {
        const postArray =[];
        for (const key in responseData)
        {
            if(responseData.hasOwnProperty(key))     
            {
                postArray.push({...responseData[key],id:key})
            }
        }

        //console.log(postArray);
        return postArray;

           
    })).subscribe(postArray =>{
     //   console.log("array"+posts);
  
       this.products = postArray;
     })
   
    ;

   
   
  }

}
