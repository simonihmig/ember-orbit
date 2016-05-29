import key from 'ember-orbit/fields/key';
import attr from 'ember-orbit/fields/attr';
import hasOne from 'ember-orbit/fields/has-one';
import hasMany from 'ember-orbit/fields/has-many';
import Model from 'ember-orbit/model';

const { get } = Ember;

var Planet,
    Moon,
    Star;

module("Unit - Model", {
  setup: function() {
    Planet = Model.extend({
      name: attr('string'),
      classification: attr('string'),
      sun: hasOne('star'),
      moons: hasMany('moon')
    });

    Moon = Model.extend({
      name: attr('string'),
      planet: hasOne('planet')
    });

    Star = Model.extend({
      name: attr('string'),
      planets: hasMany('planet')
    });
  },

  teardown: function() {
    Planet = null;
    Moon = null;
    Star = null;
  }
});

test("it exists", function() {
  ok(Planet);
});

test("#keys returns no keys by default", function(assert) {
  var keys,
      names;

  keys = get(Planet, 'keys');
  names = Object.keys(keys);
  assert.equal(names.length, 0);
});

test("#keys returns defined custom secondary keys", function() {
  var keys,
      names;

  Planet.reopen({
    remoteId: key('string')
  });

  keys = get(Planet, 'keys');
  names = Object.keys(keys);
  equal(names.length, 1);
  equal(names[0], 'remoteId');
});

test("#attributes returns defined attributes", function() {
  var attributes,
      keys;

  attributes = get(Planet, 'attributes');
  keys = Object.keys(attributes);
  equal(keys.length, 2);
  equal(keys[0], 'name');
  equal(keys[1], 'classification');
});

test("#relationships returns defined relationships", function() {
  var relationships,
      keys;

  relationships = get(Planet, 'relationships');
  keys = Object.keys(relationships);
  equal(keys.length, 2);
  equal(keys[0], 'sun');
  equal(keys[1], 'moons');

  relationships = get(Moon, 'relationships');
  keys = Object.keys(relationships);
  equal(keys.length, 1);
  equal(keys[0], 'planet');

  relationships = get(Star, 'relationships');
  keys = Object.keys(relationships);
  equal(keys.length, 1);
  equal(keys[0], 'planets');
});

test("#create cannot be called directly on models", function() {
  throws(
    function() {
      Planet.create();
    },
    'You should not call `create` on a model'
  );
});