import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class DataPropertyService {
  private inputValueSubject: BehaviorSubject<Property> =
    new BehaviorSubject<Property>(new Property());
  private interesBandera: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private idProperty: BehaviorSubject<string> = new BehaviorSubject<string>('');
  getInputValueObservable() {
    return this.inputValueSubject.asObservable();
  }
  getInteresBanderaObservable() {
    return this.interesBandera.asObservable();
  }
  getIdProperty(){
    return this.idProperty.asObservable();
  }

  setIdProperty(value: string) {
    this.idProperty.next(value);
  }

  setInputValue(value: Property, bool: boolean): void {
    this.inputValueSubject.next(value);
    this.interesBandera.next(bool);
  }

  setDefault(): void {
    this.inputValueSubject.next(new Property());
    this.interesBandera.next(false);
  }
}
