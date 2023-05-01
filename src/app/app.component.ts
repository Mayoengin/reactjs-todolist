import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  designationList: any[] =[];
  roleList: any[] =[];
  stepsList: any[] = [
    { stepName: 'Basic Details', isComplete: false },
    { stepName: 'Skills', isComplete: false },
    { stepName: 'Experiences', isComplete: false }
  ];
  activeStep: any = this.stepsList[0];

  employeeObj: any = {
    roleId: 0,
    empId: 0,
    empName: '',
    empEmailId: '',
    empDesignationId: 0,
    empContactNo: '',
    empAltContactNo: '',
    empPersonalEmailId: '',
    empExpTotalYear: 0,
    empExpTotalMonth: 0,
    empCity: '',
    empState: '',
    empPincode: '',
    empAddress: '',
    empPerCity: '',
    empPerState: '',
    empPerPinCode: '',
    empPerAddress: '',
    password: '',
    erpEmployeeSkills: [],
    ermEmpExperiences: []
  };

  empSkillObj: any = {
    empSkillId: 0,
    empId: 0,
    skill: '',
    totalYearExp: 0,
    lastVersionUsed: ''
  };

  empExpObj: any = {
    empExpId: 0,
    empId: 0,
    companyName: '',
    startDate: '',
    endDate: '',
    designation: '',
    projectsWorkedOn: ''
  };
  constructor(private http: HttpClient){

  }
  setActiveStep(activeStep: any) {
    this.activeStep = activeStep;
    this.updateLineProgress();
  }

  updateLineProgress() {
    const stepIndex = this.stepsList.findIndex(step => step.stepName === this.activeStep.stepName);
    const progressElement = document.getElementById('line-progress');
    const widths = [9, 50, 90]; // Widths for the progress line
    if (progressElement) {
      progressElement.style.width = `${widths[stepIndex]}%`;
    }
  }

  ngAfterViewInit() {
    this.updateLineProgress();
  }
  ngOnInit(): void {
    this.loadDesignations();
    this.loadRoles();
  }
  addSkills() {
    this.employeeObj.erpEmployeeSkills.push({ ...this.empSkillObj });
    this.empSkillObj = {
      empSkillId: 0,
      empId: 0,
      skill: '',
      totalYearExp: 0,
      lastVersionUsed: ''
    };
  }

  addExperience() {
    this.employeeObj.ermEmpExperiences.push({ ...this.empExpObj });
    this.empExpObj = {
      empExpId: 0,
      empId: 0,
      companyName: '',
      startDate: '',
      endDate: '',
      designation: '',
      projectsWorkedOn: ''
    };
  }
  loadDesignations(){
    this.http.post("http://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation", this.employeeObj).subscribe((res:any)=>{
      this.designationList = res.data;

    })
  }
  loadRoles(){
    this.http.post("http://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles", this.employeeObj).subscribe((res:any)=>{
      this.designationList = res.data;
  })
}
  saveEmployee(){
    this.http.post("http://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee", this.employeeObj).subscribe((res:any)=>{
      if(res.result){
        alert('Employee Created Sucessfully')

      }else{
        alert(res.message)
      }
    })

  }
}
