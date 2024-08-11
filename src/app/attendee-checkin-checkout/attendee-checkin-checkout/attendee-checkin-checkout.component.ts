import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
  ScannerQRCodeDevice,
} from 'ngx-scanner-qrcode';

import { delay } from 'rxjs';
import { AttendeeCheckinCheckoutService } from '../attendee-checkin-checkout.service'
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-attendee-checkin-checkout',
  templateUrl: './attendee-checkin-checkout.component.html',
  styleUrls: ['./attendee-checkin-checkout.component.scss']
})
export class AttendeeCheckinCheckoutComponent implements AfterViewInit, OnDestroy  {

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      }
    },
    // canvasStyles: {
    //   font: '17px serif',
    //   lineWidth: 1,
    //   fillStyle: '#ff001854',
    //   strokeStyle: '#ff0018c7',
    // } as any // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  };

  isScanned = false;
  scannedUserData: any[] = [];

  @ViewChild('action') action: NgxScannerQrcodeComponent;

  constructor(private qrcode: NgxScannerQrcodeService, private router: Router, private AttendeeCheckinCheckoutService: AttendeeCheckinCheckoutService, private toastr: ToastrService, private ngxUiLoaderService: NgxUiLoaderService) {
    // if (localStorage.getItem("userType") != 'volunteers') {
    //   this.router.navigate(['/dashboard']);
    // }
  }
  ngOnDestroy(): void {
    this.handle(this.action, 'stop');
  }

  ngAfterViewInit(): void {
    this.action.isReady.pipe(delay(200)).subscribe(() => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e?.length && action && action.pause(); // Detect once and pause scan!

    let binArrayToString = function (binArray) {
      let str = "";
      for (let i = 0; i < binArray.length; i++) {
        str += String.fromCharCode(parseInt(binArray[i]));
      }
      return str;

    }
    var attendeeId = binArrayToString(e[0].data);
    const user_data = {
      "user_id": attendeeId
    }
    this.ngxUiLoaderService.start();
    this.AttendeeCheckinCheckoutService.getAttendeeDetails(user_data).subscribe(data => {
      this.isScanned = true;
      this.scannedUserData = data.data;
      this.ngxUiLoaderService.stop();
      this.handle(action, 'stop')
    },
      error => {
        this.ngxUiLoaderService.stop();
        this.toastr.error(error, 'Error')
        // action.play();
      }
    );

  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r));
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r));
    }
  }

  checkInCheckoutAction(id,attendeeId, type) {
    if (id && type && id != null && type != null) {
      const check_data = {
        "id": id,
        "type":type
      }
      this.ngxUiLoaderService.start();
      this.AttendeeCheckinCheckoutService.attendeeCheckAction(check_data).subscribe(data => {
        this.toastr.success(data.message, 'Success');
        const user_data = {
          "user_id": attendeeId
        }
        this.AttendeeCheckinCheckoutService.getAttendeeDetails(user_data).subscribe(data => {
          this.isScanned = true;
          this.scannedUserData = data.data;
          this.ngxUiLoaderService.stop();
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
  }

  refreshComponenet(){
    location.reload()
  }


}
