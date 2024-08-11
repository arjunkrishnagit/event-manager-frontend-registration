import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { RegistrationService } from '../registration.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxImageCompressService } from 'ngx-image-compress';
import {eventName} from '../../../../eventEnv'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,  private httpClient: HttpClient,private toastr: ToastrService, private ngxUiLoaderService: NgxUiLoaderService, private registrationService: RegistrationService, private imageCompress: NgxImageCompressService) {
  }

  hide = true;
  loginForm: FormGroup | any;
  username: string | any;
  password: string | any;
  isLoading=false;
  loginValidation = false;

  createAttendeeForm: FormGroup | any;
  createAttendeeFormValidation = false;
  uploadFileName: string | any;
  uploadFile: File = null;

  public dropdownSettingsCountry: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    limitSelection:1,
  };

  public countryArr: any = [
    { item_id: 'India', item_text: 'India' },
    { item_id: 'Other_Country', item_text: 'Other Country' },
  ];

  countrySelection = '';
  countrySelectionErr = false;
  countryTypeSelected = false;
  indiaSelected = false;

  countryManual = '';
  stateManual = '';
  districtManual = '';
  countryManualErr = false;
  stateManualErr = false;
  districtManualErr = false;

  stateDistrictData = '';

  public dropdownSettingsState: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    limitSelection:1,
  };
  public stateArr: any = [];
  stateSelection = '';
  stateSelectionErr= false;


public dropdownSettingsDistrict: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    limitSelection:1,
  };
  public districtArr: any = [];
  districtSelection = '';
  districtSelectionErr = false;

  file: any;
  localUrl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultAfterCompress: string;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [, [Validators.required,Validators.email]],
      password: [, Validators.required]
    });

    this.createAttendeeForm = this.fb.group({
      Name: [, [Validators.required]],
      Phone: [, [Validators.required, Validators.minLength(10),Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      Email: [, [Validators.required,  Validators.pattern("^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$")]],
      Address: [, [Validators.required]],
      Pincode: [, [Validators.required]],
      CompanyName: [, [Validators.required]],
      GSTNumber: [, [Validators.required]],
      ProfileImage: [, [Validators.required]]
    });
    this.createAttendeeFormValidation = false;


    this.registrationService.getstatedistrictJSON().subscribe(data => {
      this.stateDistrictData = data;
      var dataArr = [];
      for(var key in data){
        dataArr.push({ item_id: key, item_text: key })
      }
      this.stateArr = dataArr;
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );
  }

  handleFileInput(event) {
    if (event.target.files.length > 0) {
      const extension = event.target.files[0].name.split('.').pop();
      if (extension == 'png' || extension == 'jpg' || extension == 'jpeg') {
        if (event.target.files[0].size / 1024 / 1024 > 5) {
          this.toastr.error('File size should be less than 5MB', 'Error')
        }
        else {
          var fileName: any;
          this.file = event.target.files[0];
          fileName = this.file['name'];
          if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            console.log(event.target.files[0])
            reader.onload = (event: any) => {
              this.localUrl = event.target.result;

              this.compressFile(this.localUrl, fileName)
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        }
      }
      else {
        this.toastr.error('Please select image file', 'Error')
      }
    }
  }

  createAttendeeFormAction() {
    this.createAttendeeFormValidation = true;
    if (this.createAttendeeForm.invalid) {
      return;
    }
    var country = '';
    var state = '';
    var district = '';

    if(this.countrySelection){
      this.countrySelectionErr =false;
      var countrysel = this.countrySelection[0]['item_id'];
      if(countrysel == 'India'){
        country = 'India';
        if(this.stateSelection){
          state = this.stateSelection[0]['item_id'];
          this.stateSelectionErr = false;
        }else{
          this.stateSelectionErr = true;
          return ;
        }
        if(this.districtSelection){
          district = this.districtSelection[0]['item_id'];
          this.districtSelectionErr = false;
        }else{
          this.districtSelectionErr = true;
          return ;
        }
      }else{
        if(this.countryManual == ''){
          this.countryManualErr = true;
          return ;
        }else{
          this.countryManualErr = false;
        }
        if(this.stateManual == ''){
          this.stateManualErr = true;
          return ;
        }else{
          this.stateManualErr = false;
        }
        if(this.districtManual == ''){
          this.districtManualErr = true;
          return ;
        }else{
          this.districtManualErr = false;
        }

        country = this.countryManual;
        state = this.stateManual;
        district = this.districtManual;
      }
    }else{
      this.countrySelectionErr =true;
      return;
    }
    this.ngxUiLoaderService.start();
    this.registrationService.uploadProfilePhoto(this.uploadFile).subscribe(data => {
      if (data.data) {
        var user_data = {
          "name": this.createAttendeeForm.get('Name').value,
          "email": this.createAttendeeForm.get('Email').value,
          "phone": this.createAttendeeForm.get('Phone').value,
          "address": this.createAttendeeForm.get('Address').value,
          "country": country,
          "state": state,
          "district": district,
          "pincode": this.createAttendeeForm.get('Pincode').value,
          "profile_image": data.data,
          "company_name": this.createAttendeeForm.get('CompanyName').value,
          "gst": this.createAttendeeForm.get('GSTNumber').value,
          "event" : eventName
        }

        this.registrationService.createAttendee(user_data).subscribe(data => {
          this.toastr.success('New attendee created', 'Success')
          this.resetForm();
          this.ngxUiLoaderService.stop();
        },
          error => {
            this.ngxUiLoaderService.stop();
            this.toastr.error(error, 'Error')
          }
        );

      }
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );

  }

  onCountrySelect(event){
    this.countryTypeSelected = true;
    if(event.item_id == 'India'){
      this.indiaSelected = true;
    }
    else{
      this.indiaSelected = false;
    }
  }

  onCountryDeSelect(event){
    this.countryTypeSelected = false;;
  }

  onStateSelect(event){
    var districts :any =  this.stateDistrictData[event.item_id]
    var dataArr = [];
      for(var key in districts){
        dataArr.push({ item_id: districts[key], item_text: districts[key] })
      }
      this.districtArr = dataArr;
  }

  onStateDeSelect(event){
    this.districtArr=[];
  }

  resetForm(){
    this.createAttendeeForm.reset();
    this.createAttendeeFormValidation = false;
    this.countrySelection = '';
    this.countryTypeSelected = false
    this.indiaSelected=false;
    this.countryManual = '';
    this.stateManual = '';
    this.districtManual = '';
    this.countryManualErr = false;
    this.stateManualErr = false;
    this.districtManualErr = false;
    this.countrySelectionErr = false;
    this.stateSelection = '';
    this.stateSelectionErr= false;
    this.districtSelection = '';
    this.districtSelectionErr = false;
  }

  compressFile(image, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50, 200).then(
      result => {
        this.imgResultAfterCompress = result;
        const imageName = fileName;
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
        const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
        this.uploadFileName = fileName;
        this.uploadFile = imageFile;
      });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
    }

}
