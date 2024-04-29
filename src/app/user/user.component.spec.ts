import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ]
    })
  })

  it('should create the app', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })
  
  it('should use the username from the service', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService)
    fixture.detectChanges();
    expect(app.user.name).toEqual(userService.user.name)
  })
  
  it('should display the username if user is logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(app.user.name)
  })
  
  it('should\'t display the username if user is not logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).not.toContain(app.user.name)
  })
  
  it('should\'t fetch data successfully if not called async', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService)
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'))
    fixture.detectChanges();
    expect(app.data).toBe(undefined)
  })
  
  // async data testing
  it('should fetch data successfully if called async', async(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService)
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'))
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.data).toBe('Data')
    })
  }))

  // fake async task testing finishes async tasks in less than the given time in async
  it('should fetch data successfully if called fakeAsync', fakeAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService)
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'))
    fixture.detectChanges();
    tick()
    expect(app.data).toBe('Data')
  }))
});
