import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ObservableService{
  searchProduct = new Subject<string>();

  filterBrand = new Subject<number>();
}