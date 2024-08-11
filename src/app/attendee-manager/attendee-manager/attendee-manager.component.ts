import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AttendeeManagerService } from '../attendee-manager.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-attendee-manager',
  templateUrl: './attendee-manager.component.html',
  styleUrls: ['./attendee-manager.component.scss']
})
export class AttendeeManagerComponent implements OnInit {

  constructor(private fb: FormBuilder, private modalService: NgbModal, private toastr: ToastrService, private ngxUiLoaderService: NgxUiLoaderService, private attendeeManagerService: AttendeeManagerService, private sanitizer: DomSanitizer, private router: Router, private imageCompress: NgxImageCompressService) {

    var userType = localStorage.getItem('userType');
    if (userType != 'admin'){
      this.router.navigate(['/dashboard']);
    }
  }

  event = localStorage.getItem('event');

  attendeeListData: any[] = [];
  itemsPerPage: number = 25;
  totalItems: any = 0;
  currentPage: any = 1;

  @ViewChild('createAttendeeModal') createAttendeeModal: any;

  createAttendeeForm: FormGroup | any;
  createAttendeeFormValidation = false;
  uploadFileName: string | any;
  uploadFile: File = null;

  printData: any = '';
  checkInDetails: any = '';
  checkInDetailsHistory: any[] = [];
  changeProfileImageUser: any = '';

  updateUploadFile: File = null;
  updateUploadFileName: string | any;
  updateUploadFileSelected = false;

  editAttendeeDetails: any = '';
  editAttendeeForm: FormGroup | any;
  editAttendeeFormValidation = false;

  editName = '';
  editPhone = '';
  editEmail = '';
  editAddress = '';
  editCountry = '';
  editState = '';
  editDistrict = '';
  editPincode = '';
  editCompanyName = '';
  editGSTNumber = '';

  searchForm: FormGroup | any;
  searchString: string | any = '';

  public dropdownSettingsCountry: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    limitSelection: 1,
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
    limitSelection: 1,
  };
  public stateArr: any = [];
  stateSelection = '';
  stateSelectionErr = false;


  public dropdownSettingsDistrict: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    limitSelection: 1,
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

    this.createAttendeeForm = this.fb.group({
      Name: [, [Validators.required]],
      Phone: [, [Validators.required, Validators.minLength(10),Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      Email: [, [Validators.required, Validators.pattern("^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$")]],
      Address: [, [Validators.required]],
      Pincode: [, [Validators.required]],
      CompanyName: [, [Validators.required]],
      GSTNumber: [, [Validators.required]],
      ProfileImage: [, [Validators.required]]
    });
    this.createAttendeeFormValidation = false;

    this.editAttendeeForm = this.fb.group({
      editName: [, [Validators.required]],
      editPhone: [, [Validators.required, Validators.minLength(10),Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      editEmail: [, [Validators.required]],
      editAddress: [, [Validators.required]],
      editCountry: [, [Validators.required]],
      editState: [, [Validators.required]],
      editDistrict: [, [Validators.required]],
      editPincode: [, [Validators.required]],
      editCompanyName: [, [Validators.required]],
      editGSTNumber: [, [Validators.required]]
    });
    this.editAttendeeFormValidation = false;

    this.searchForm = this.fb.group({
      searchString: []
    });

    this.attendeeManagerService.getAttendeeList(0, this.itemsPerPage, this.searchString).subscribe(data => {
      this.attendeeListData = data.data;
      this.ngxUiLoaderService.stop();
      this.totalItems = data.totalCount;
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );

    this.attendeeManagerService.getstatedistrictJSON().subscribe(data => {
      this.stateDistrictData = data;
      var dataArr = [];
      for (var key in data) {
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

  paginateAction(currentPage: number) {
    this.ngxUiLoaderService.start();
    this.attendeeManagerService.getAttendeeList(currentPage - 1, this.itemsPerPage, this.searchString).subscribe(data => {
      this.attendeeListData = data.data;
      this.ngxUiLoaderService.stop();
      this.totalItems = data.totalCount;
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );
  }

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }


  createAttendeeModalOpen(modalName) {
    this.modalService.open(modalName, { ariaLabelledBy: 'modal-basic-title', size: 'lg dialog-centered', backdrop: 'static' });
  }

  handleFileInput(event) {
    if (event.target.files.length > 0) {
      const extension = event.target.files[0].name.split('.').pop();
      if (extension == 'png' || extension == 'jpg' || extension == 'jpeg') {
        if (event.target.files[0].size / 1024 / 1024 > 5) {
          this.toastr.error('File size should be less than 500 kb', 'Error')
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

    if (this.countrySelection) {
      this.countrySelectionErr = false;
      var countrysel = this.countrySelection[0]['item_id'];
      if (countrysel == 'India') {
        country = 'India';
        if (this.stateSelection) {
          state = this.stateSelection[0]['item_id'];
          this.stateSelectionErr = false;
        } else {
          this.stateSelectionErr = true;
          return;
        }
        if (this.districtSelection) {
          district = this.districtSelection[0]['item_id'];
          this.districtSelectionErr = false;
        } else {
          this.districtSelectionErr = true;
          return;
        }
      } else {
        if (this.countryManual == '') {
          this.countryManualErr = true;
          return;
        } else {
          this.countryManualErr = false;
        }
        if (this.stateManual == '') {
          this.stateManualErr = true;
          return;
        } else {
          this.stateManualErr = false;
        }
        if (this.districtManual == '') {
          this.districtManualErr = true;
          return;
        } else {
          this.districtManualErr = false;
        }

        country = this.countryManual;
        state = this.stateManual;
        district = this.districtManual;
      }
    } else {
      this.countrySelectionErr = true;
      return;
    }

    this.attendeeManagerService.uploadProfilePhoto(this.uploadFile).subscribe(data => {
      if (data.data) {
        console.log(data)
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
          "event" : localStorage.getItem('event')
        }

        this.attendeeManagerService.createAttendee(user_data).subscribe(data => {
          this.attendeeManagerService.getAttendeeList(0, this.itemsPerPage, this.searchString).subscribe(data => {
            this.currentPage = 1;
            this.attendeeListData = data.data;
            this.ngxUiLoaderService.stop();
            this.totalItems = data.totalCount;
            this.modalService.dismissAll();
            this.toastr.success('New attendee created', 'Success')
            this.resetForm()
          },
            error => {
              this.ngxUiLoaderService.stop();
              this.toastr.error(error, 'Error')
            }
          );
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

  openPrintModal(modalName, row) {
    this.printData = row;
    this.modalService.open(modalName, { ariaLabelledBy: 'modal-basic-title', size: 'dialog-centered', backdrop: 'static' });
  }

  onPrint(divId) {
    var printContents = document.getElementById(divId).innerHTML;
    var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write(printContents);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close();
    this.modalService.dismissAll();
  }

  openCheckInDetailModal(modalName, row) {
    this.checkInDetails = row;
    this.checkInDetailsHistory = []
    this.attendeeManagerService.getAttendeeCheckInDetails(row.id).subscribe(data => {
      if (data.data == null) {
        this.checkInDetailsHistory = []
      }
      else {
        this.checkInDetailsHistory = data.data
      }
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );
    this.modalService.open(modalName, { ariaLabelledBy: 'modal-basic-title', size: 'dialog-centered', backdrop: 'static' });
  }


  openChangeProfileImageModal(modalName, row) {
    this.updateUploadFileSelected = false;
    this.changeProfileImageUser = row;
    this.modalService.open(modalName, { ariaLabelledBy: 'modal-basic-title', size: 'dialog-centered', backdrop: 'static' });
  }

  handleFileInputUpdateProfileImage(event) {
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

              this.compressFileNew(this.localUrl, fileName)
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

  uploadNewProfileImageAction() {
    if (this.updateUploadFileSelected == true) {
      this.attendeeManagerService.updateProfilePhoto(this.updateUploadFile, this.changeProfileImageUser).subscribe(data => {
        this.attendeeManagerService.getAttendeeList(0, this.itemsPerPage, this.searchString).subscribe(data => {
          this.currentPage = 1;
          this.attendeeListData = data.data;
          this.ngxUiLoaderService.stop();
          this.totalItems = data.totalCount;
          this.modalService.dismissAll();
          this.toastr.success('Profile photo updated', 'Success')
        },
          error => {
            this.ngxUiLoaderService.stop();
            this.toastr.error(error, 'Error')
          }
        );
      },
        error => {
          this.ngxUiLoaderService.stop();
          this.toastr.error(error, 'Error')
        }
      );
    }
    else {
      this.toastr.error('Please select file', 'Error')
    }

  }

  openEditAttendeeModal(modalName, row) {
    this.editAttendeeDetails = row;
    this.editName = row.name;
    this.editPhone = row.phone;
    this.editEmail = row.email;
    this.editAddress = row.address;
    this.editCountry = row.country;
    this.editState = row.state;
    this.editDistrict = row.district;
    this.editPincode = row.pincode;
    this.editCompanyName = row.company_name;
    this.editGSTNumber = row.gst;
    this.modalService.open(modalName, { ariaLabelledBy: 'modal-basic-title', size: 'lg dialog-centered', backdrop: 'static' });
  }

  upddateAttndeeDetails() {
    this.editAttendeeFormValidation = true;
    if (this.editAttendeeForm.invalid) {
      return;
    }

    var user_data = {
      "name": this.editAttendeeForm.get('editName').value,
      "email": this.editAttendeeForm.get('editEmail').value,
      "phone": this.editAttendeeForm.get('editPhone').value,
      "address": this.editAttendeeForm.get('editAddress').value,
      "country": this.editAttendeeForm.get('editCountry').value,
      "state": this.editAttendeeForm.get('editState').value,
      "district": this.editAttendeeForm.get('editDistrict').value,
      "pincode": this.editAttendeeForm.get('editPincode').value,
      "company_name": this.editAttendeeForm.get('editCompanyName').value,
      "gst": this.editAttendeeForm.get('editGSTNumber').value,
      "id": this.editAttendeeDetails.id
    }
    this.attendeeManagerService.editAttendee(user_data).subscribe(data => {
      this.attendeeManagerService.getAttendeeList(0, this.itemsPerPage, this.searchString).subscribe(data => {
        this.currentPage = 1;
        this.attendeeListData = data.data;
        this.ngxUiLoaderService.stop();
        this.totalItems = data.totalCount;
        this.modalService.dismissAll();
        this.toastr.success('Attendee details updated', 'Success')
      },
        error => {
          this.ngxUiLoaderService.stop();
          this.toastr.error(error, 'Error')
        }
      );
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );

  }

  searchAction() {
    this.attendeeManagerService.getAttendeeList(0, this.itemsPerPage, this.searchString).subscribe(data => {
      this.currentPage = 1;
      this.attendeeListData = data.data;
      this.ngxUiLoaderService.stop();
      this.totalItems = data.totalCount;
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
      }
    );
  }

  onCountrySelect(event) {
    this.countryTypeSelected = true;
    if (event.item_id == 'India') {
      this.indiaSelected = true;
    }
    else {
      this.indiaSelected = false;
    }
  }

  onCountryDeSelect(event) {
    this.countryTypeSelected = false;;
  }

  onStateSelect(event) {
    var districts: any = this.stateDistrictData[event.item_id]
    var dataArr = [];
    for (var key in districts) {
      dataArr.push({ item_id: districts[key], item_text: districts[key] })
    }
    this.districtArr = dataArr;
  }

  onStateDeSelect(event) {
    this.districtArr = [];
  }

  resetForm() {
    this.createAttendeeForm.reset();
    this.createAttendeeFormValidation = false;
    this.countrySelection = '';
    this.countryTypeSelected = false
    this.indiaSelected = false;
    this.countryManual = '';
    this.stateManual = '';
    this.districtManual = '';
    this.countryManualErr = false;
    this.stateManualErr = false;
    this.districtManualErr = false;
    this.countrySelectionErr = false;
    this.stateSelection = '';
    this.stateSelectionErr = false;
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

  compressFileNew(image, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50, 200).then(
      result => {
        this.imgResultAfterCompress = result;
        const imageName = fileName;
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
        const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
        this.updateUploadFileName = imageName;
        this.updateUploadFile = imageFile;
        this.updateUploadFileSelected = true;
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
