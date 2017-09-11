import { ISubscription } from 'rxjs/Subscription';
import { ModalService } from './../core/modal/modal.service';
import { AppComponent } from './../app.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenthicationService } from './../core/providers/authentication/authenthication.service';
import { PortfolioService } from './../core/providers/portfolio/portfolio.service';
import { Portfolio } from './../models/portfolio-model';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CanComponentDeactivate } from '../core/providers/guards/can-deactivate-guard.service';

@Component({
  templateUrl: './my-portfolio-form.component.html',
  styleUrls: ['./my-portfolio-form.component.css']
})
export class MyPortfolioFormComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  private routerSubscription: ISubscription;

  toastr;
  isEdit: boolean;
  portfolio: Portfolio;
  rForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private authService: AuthenthicationService,
    private route: ActivatedRoute,
    private appComp: AppComponent,
    private modalService: ModalService
  ) {
    this.toastr = appComp.toastr;
  }

  createForm() {
    this.rForm = this.fb.group({
      'firstName': [this.portfolio.firstName, Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': [this.portfolio.lastName, Validators.compose([Validators.required, Validators.minLength(3)])],
      'imgUrl': [this.portfolio.imgUrl, Validators.compose([Validators.required, Validators.pattern('https?://.+')])],
      'age': [this.portfolio.age, Validators.compose([Validators.required, Validators.pattern('^([1-9]|[0-6][0-9])$')])],
      'profession': [this.portfolio.profession, Validators.compose([Validators.required, Validators.minLength(3)])],
      'workingExperience': [this.portfolio.workingExperience,
      Validators.compose([Validators.required, Validators.pattern('^([1-9]|[0-6][0-9])$')])],
      'interests': this.portfolio.interests.join(','),
      'projects': this.portfolio.projects.join(','),
      'languages': this.portfolio.languages.join(','),
      'hobbies': this.portfolio.hobbies.join(','),
      'additionalInfo': this.portfolio.additionalInfo,
    });
  }

  addPortfolio(rForm) {
    if (this.isFormSame(rForm)) {
      window.scrollTo(0, 0);
      this.toastr.warning('You do not commit any changes!');
      return false;
    }
    this.portfolio.firstName = rForm.firstName;
    this.portfolio.lastName = rForm.lastName;
    this.portfolio.imgUrl = rForm.imgUrl;
    this.portfolio.age = rForm.age;
    this.portfolio.profession = rForm.profession;
    this.portfolio.workingExperience = rForm.workingExperience;
    this.portfolio.interests = rForm.interests.split(',');
    this.portfolio.projects = rForm.projects.split(',');
    this.portfolio.languages = rForm.languages.split(',');
    this.portfolio.hobbies = rForm.hobbies.split(',');
    this.portfolio.additionalInfo = rForm.additionalInfo;
    if (this.isEdit) {
      this.portfolioService.updatePortfolio(this.portfolio);
      window.scrollTo(0, 0);
      this.toastr.success('Sucessfully modified portfolio');
    } else {
      this.portfolioService.addPortfolio(this.portfolio);
      window.scrollTo(0, 0);
      this.toastr.success('Sucessfully added your first portfolio!');
    }

  }

  ngOnInit() {
    this.routerSubscription = this.route.data.subscribe(data => {
      this.portfolio = data['myportfolio'];
      if (!this.portfolio) {
        this.portfolio = new Portfolio({});
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
      this.createForm();
    });
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private isFormSame(rForm) {
    if (this.portfolio.firstName === rForm.firstName &&
      this.portfolio.lastName === rForm.lastName &&
      this.portfolio.imgUrl === rForm.imgUrl &&
      this.portfolio.age === rForm.age &&
      this.portfolio.profession === rForm.profession &&
      this.portfolio.workingExperience === rForm.workingExperience &&
      this.portfolio.interests.join(',') === rForm.interests &&
      this.portfolio.projects.join(',') === rForm.projects &&
      this.portfolio.languages.join(',') === rForm.languages &&
      this.portfolio.hobbies.join(',') === rForm.hobbies &&
      this.portfolio.additionalInfo === rForm.additionalInfo) {
      return true;
    }

    return false;
  }

  canDeactivate() {
    console.log('i am navigating away');
    if (!this.isFormSame(this.rForm.value)) {
      return window.confirm('Discard changes?');
      // return this.modalService.activate();
    }

    return true;
  }

}
