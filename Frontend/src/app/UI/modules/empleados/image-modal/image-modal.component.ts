import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss'
})
export class ImageModalComponent {
  @Input() currentImage: any;
  @Output() close = new EventEmitter<void>();
 @Output() croppedImageChanged = new EventEmitter<any>();
  imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    faX = faX;
    transform: ImageTransform = {};
  constructor(
  ) {
  }

  save(){
    this.croppedImageChanged.emit(this.croppedImage);
    this.closeModal()
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}

imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}

imageLoaded() {
    this.showCropper = true;
}
zoomOut() {
  this.scale -= 0.1;
  this.transform = {
    ...this.transform,
    scale: this.scale,
  };
}

zoomIn() {
  this.scale += 0.1;
  this.transform = {
    ...this.transform,
    scale: this.scale,
  };
}
cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
}
loadImageFailed() {
  console.log('Load failed');
}
  closeModal (){
    this.close.emit();
  }
}
