import { ActivatedRoute } from '@angular/router';
import { AuthenthicationService } from './../core/providers/authentication/authenthication.service';
import { PortfolioService } from './../core/providers/portfolio/portfolio.service';
import { Portfolio } from './../models/portfolio-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-portfolio-form',
  templateUrl: './my-portfolio-form.component.html',
  styleUrls: ['./my-portfolio-form.component.css']
})
export class MyPortfolioFormComponent implements OnInit {
  isEdit: boolean;
  routerSubscription: any;

  portfolio: Portfolio;
  rForm: FormGroup;

  constructor(private fb: FormBuilder, private portfolioService: PortfolioService,
    private authService: AuthenthicationService, private route: ActivatedRoute) {


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
      window.alert("same form");
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
    } else {
      this.portfolioService.addPortfolio(this.portfolio);
    }
    window.alert("Sucessfully modified form");
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

}
