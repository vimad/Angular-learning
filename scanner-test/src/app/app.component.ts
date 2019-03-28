import { Component, ViewChild, ElementRef, OnChanges, ChangeDetectorRef, SimpleChanges, OnInit, DoCheck, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

require('scanner-js')
declare const scanner;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {

  @ViewChild("uiFix", { read: ElementRef })
  uiFix: ElementRef;

  imagesScanned = [];

  constructor(private sanitizer: DomSanitizer, private changeRef:ChangeDetectorRef, private zone:NgZone){}

  ngOnChanges(changes: SimpleChanges): void {

    this.changeRef.markForCheck();

  }

  ngOnInit(){
    
  }

  public getSafeSrc(dataURI: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(dataURI);
  }
  
  
  scanRequest = {
    use_asprise_dialog: false, // Whether to use Asprise Scanning Dialog
    show_scanner_ui: false, // Whether scanner UI should be shown
    twain_cap_setting: {
      // Optional scanning settings
      ICAP_PIXELTYPE: "TWPT_RGB" // Color
    },
    output_settings: [
      {
        type: "return-base64",
        format: "jpg"
      }
    ]
  };

  public scanToJpg() {
    scanner.scan(this.displayImagesOnPage.bind(this), this.scanRequest);
  }

  /** Processes the scan result */
  public displayImagesOnPage(successful, mesg, response) {
    console.log("viewing image");
      if(!successful) { // On error
          console.error('Failed: ' + mesg);
          return;
      }
      if(successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
          console.info('User cancelled');
          return;
      }
      var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
      for(var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
          var scannedImage = scannedImages[i];
          this.imagesScanned.push(scannedImage);
      }
      console.log(this.imagesScanned);
      this.changeRef.detectChanges();
      //this.triggerFalseClick();
  }

  triggerFalseClick() {
    setTimeout(() => {
      let el: HTMLElement = this.uiFix.nativeElement as HTMLElement;
      el.click();
    }, 500);
  }

}
