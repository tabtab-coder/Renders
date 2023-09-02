import { Injectable } from '@angular/core';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketProviderService {
  doc: Y.Doc;
  wsProvider: WebsocketProvider;

  constructor() {
    this.doc = new Y.Doc();
    this.wsProvider = new WebsocketProvider(
      'ws://localhost:3000',
      'room',
      this.doc
    );
  }
}
