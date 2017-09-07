export class LiteEventEmitter {
  private _e: { [name: string]: Array<(...args) => void>; } = {};
  /** 
   * Add an event-handler for an event name. 
   * @returns disposable to remove the event-handler. 
  */
  on(event: string, cb: (...args) => void): () => void {
    let h = this._e[event] = this._e[event] || [];
    h.push(cb);
    return () => {
      let i = h.indexOf(cb);
      if (i > -1)
        h.splice(i, 1);
    };
  }
  /** 
   * Add a one-time event-handler for an event name. 
   * @returns disposable to remove the event-handler. 
  */
  once(event: string, cb: (...args) => void): () => void {
    let d = this.on(event, (...args) => {
      d();
      cb(...args);
    });
    return d;
  }
  /** 
   * emit an event with args
   */
  emit(event: string, ...args) {
    if (this._e[event] == undefined)
      return;
    for (const h of this._e[event]) {
      h(...args);
    }
  }
}