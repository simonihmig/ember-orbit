/* jshint node: true */
'use strict';
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackageToProject('orbit.js');
  }
};
