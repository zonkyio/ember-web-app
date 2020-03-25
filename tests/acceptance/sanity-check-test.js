import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | sanity check', function (hooks) {
  setupApplicationTest(hooks);

  test('Just a sanity check that the ember app is building ok with the addon', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
