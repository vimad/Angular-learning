import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHeighlight]'
})
export class BasicHeighlightDirective implements OnInit{

    constructor(private elementRef: ElementRef){}

    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

}