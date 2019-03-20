import { Directive, Input } from '@angular/core';

@Directive( {
  selector : '[val]',
  host : {
      '(keydown)' : 'onKeyUp($event)'
  }
} )
export class PreventKeyseDirective {
  @Input( 'val' ) val:number;
  onKeyUp ( $event ) {
    if(this.val){
      if ( this.val.toString().length > 2 ) {
          var key = $event.keyCode || $event.charCode;
          if( key != 8 && key != 46 ){
            $event.preventDefault();
          }else{
            
          }    
      }
    }
  }
}
