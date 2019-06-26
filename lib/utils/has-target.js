'use strict';
module.exports = function hasTarget(object, target) {
  return (
    object &&
    object.targets &&
    object.targets.includes &&
    object.targets.includes(target)
  );
};
