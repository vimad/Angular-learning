import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowedNewServer = false;
  serverCreateStatus = 'No server was created';
  serverName = 'Test Server';
  serverCreated = false;
  servers = ['testServer', 'testServer2'];

  constructor() { 
     setTimeout(() => this.allowedNewServer = true, 2000);
  }

  ngOnInit() {
  }

  onServerCreate(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreateStatus = 'New server created and the name is ' + this.serverName;
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
