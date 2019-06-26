'use strict';
const assert = require('assert');
const Browserconfig = require('../../../lib/browserconfig');

class TestBrowserconfig extends Browserconfig {
  constructor(configuration) {
    super({});
    this._configuration = configuration;
  }

  get configuration() {
    return this._configuration;
  }
}

describe('Unit', function() {
  describe('browserconfig', function() {
    describe('generate()', function() {
      it(`generates the minimal browserconfig.xml if there are no icons with 'ms' target`, function() {
        let browserconfig = new TestBrowserconfig({});

        assert.strictEqual(
          browserconfig.generate(),
          '<?xml version="1.0"?><browserconfig><msapplication/></browserconfig>'
        );
      });

      it(`throws an error if it finds an icon with target 'ms' without the right 'element' property`, function() {
        let browserconfig = new TestBrowserconfig({
          icons: [
            {
              src: 'image.png',
              sizes: '150x150',
              targets: ['ms'],
            },
          ],
        });

        assert.throws(() => browserconfig.generate());
      });

      it(`throws an error if the icon is valid but there's no 'ms.tileColor' property`, function() {
        let browserconfig = new TestBrowserconfig({
          icons: [
            {
              src: 'image.png',
              sizes: '150x150',
              element: 'square150x150logo',
              targets: ['ms'],
            },
          ],
        });

        assert.throws(() => browserconfig.generate());
      });

      it(`adds each icon to the list of tiles`, function() {
        let browserconfig = new TestBrowserconfig({
          icons: [
            {
              src: 'mstile-150x150.png',
              element: 'square150x150logo',
              targets: ['ms'],
            },
            {
              src: 'mstile-310x310.png',
              element: 'square310x310logo',
              targets: ['ms'],
            },
          ],

          ms: {
            tileColor: '#ffffff',
          },
        });

        assert.strictEqual(
          browserconfig.generate(),
          `<?xml version="1.0"?><browserconfig><msapplication><tile><square150x150logo src="mstile-150x150.png"/><square310x310logo src="mstile-310x310.png"/><TileColor>#ffffff</TileColor></tile></msapplication></browserconfig>`
        );
      });
    });
  });
});
