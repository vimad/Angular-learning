import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from './shared/custom.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employeeForm: FormGroup;

  formErrors = {
    // 'fullName': '',
    // 'email': '',
    // 'confirmEmail':'',
    // 'emailGroup':'',
    // 'phone': '',
    // 'skillName': '',
    // 'experienceInYears': '',
    // 'proficiency': ''
  };

  validationMessages = {
    'fullName': {
      'required': "Full Name is required",
      'minlength': "Full Name must be greater than 2 charactors",
      'maxlength': "Full Name must be less than 10 charactors"
    },
    'email': {
      'required': "Email is required",
      'emailDomain': "Email Domain should be vinod.com"
    },
    'confirmEmail': {
      'required': "Confirm Email is required"
    },
    'emailGroup': {
      'emailMismatch': "Email and Confirm Email do not match"
    },
    'phone':{
      'required': "Phone number is required"
    }
    // 'skillName': {
    //   'required': "Skill Name is required"
    // },
    // 'experienceInYears': {
    //   'required': "Experience In Years is required"
    // },
    // 'proficiency': {
    //   'required': "Proficiency is required"
    // }
  };
  
  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.employeeForm = this.fb.group({
      fullName:['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference:['email'],
      emailGroup: this.fb.group({
        email:['', [Validators.required, CustomValidators.emailDomain('vinod.com')]],
        confirmEmail:['', Validators.required]
      }, {validators: matchEmail}),
      phone:[''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    // this.employeeForm.get('fullName').valueChanges.subscribe(
    //   (value) => console.log(value)
    // )

    this.employeeForm.valueChanges.subscribe(
      (data)=> this.logValidationErrors(this.employeeForm)
    );

    this.employeeForm.get('contactPreference').valueChanges.subscribe(
      (data: string) => this.onContactPreferenceChange(data)
    );

    //console.log(this.employeeForm);
  }

  addSkillButtonClick():  void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup():FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['',Validators.required],
      proficiency: ['',Validators.required]
    });
  }

  //********************************************************************** 
  logValidationErrors(group:FormGroup = this.employeeForm){
    Object.keys(group.controls).forEach( (key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
        const messages = this.validationMessages[key];
        
        for(const errorKey in abstractControl.errors){
          if(errorKey){
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }

      // if(abstractControl instanceof FormArray){
      //   for(const control of abstractControl.controls){
      //     if(control instanceof FormGroup){
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }

    });
  }

  //************************************************************************
  logKeyValuePairs(group:FormGroup){
    Object.keys(group.controls).forEach( (key: string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logKeyValuePairs(abstractControl);
      }else{
        console.log('key = ' + key + ' value = ' + abstractControl.value);
      }
    });
  }

  //*****************************************************************
  onContactPreferenceChange(selectedValue:string){
    const phoneControl = this.employeeForm.get('phone');
    if(selectedValue == 'phone'){
      phoneControl.setValidators(Validators.required);
    }else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  onLoadData(){
    //this.logKeyValuePairs(this.employeeForm);
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }

  onSubmit(){
    //console.log(this.employeeForm.get('email').value);
  }

}

function matchEmail(group: AbstractControl): {[key:string]: any} | null{
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if(emailControl.value == confirmEmailControl.value || confirmEmailControl.pristine){
    return null;
  }else{
    return {'emailMismatch': true};
  }

}