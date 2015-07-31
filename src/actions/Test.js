import Frill from '../core';

class TestAction extends Frill.Action {

  constructor() {
    super();
    console.log(this.request);
  }
  // //   @socket.on("test:hello:connection", @test)
  // //   @socket.on "test:abc", @hello
  // }

  // hello(data) {
  //   // Frill.Log.info(data)
  // }
  //
  // test(data) {
  //   // Frill.Log.silly data
  //   // Frill.Log.verbose data
  //   // Frill.Log.debug data
  //   // Frill.Log.info data
  //   // Frill.Log.warn data
  //   // Frill.Log.error data
  //
  // }

  countUp(data) {
    this.dispatch("COUNT_UP", data);
  }
}

export default new TestAction();
