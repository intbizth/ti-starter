function underscoreDeepExtend (obj) {
  var parentRE = /#{\s*?_\s*?}/,
      source,

      isAssign = function (oProp, sProp) {
        return (_.isUndefined(oProp) || _.isNull(oProp) || _.isFunction(oProp) || _.isNull(sProp) || _.isDate(sProp));
      },

      procAssign = function (oProp, sProp, propName) {
        if (_.isFunction(sProp)) {
          return obj[propName] = sProp;
        }

        // Perform a straight assignment
        // Assign for object properties & return for array members
        return obj[propName] = _.clone(sProp);
      },

      hasRegex = function (oProp, sProp) {
        return ( _.isString(sProp) && parentRE.test(sProp) );
      },

      procRegex = function (oProp, sProp, propName) {
        // Perform a string.replace using parentRE if oProp is a string
        if (!_.isString(oProp)) {
          // We're being optimistic at the moment
          // throw new Error('Trying to combine a string with a non-string (' + propName + ')');
        }
        // Assign for object properties & return for array members
        return obj[propName] = sProp.replace(parentRE, oProp);
      },

      hasArray = function (oProp, sProp) {
        return (_.isArray(oProp) || _.isArray(sProp));
      },

      procArray = function (oProp, sProp, propName) {
        // extend oProp if both properties are arrays
        if (!_.isArray(oProp) || !_.isArray(sProp)){
          throw new Error('Trying to combine an array with a non-array (' + propName + ')');
        }
        var tmp = underscoreDeepExtend(obj[propName], sProp);
        // Assign for object properties & return for array members
        return obj[propName] = _.reject(tmp, _.isNull);
      },

      hasObject = function (oProp, sProp) {
        return (_.isObject(oProp) || _.isObject(sProp));
      },

      procObject = function (oProp, sProp, propName) {
        // extend oProp if both properties are objects
        if (!_.isObject(oProp) || !_.isObject(sProp)){
          throw new Error('Trying to combine an object with a non-object (' + propName + ')');
        }
        // Assign for object properties & return for array members
        return obj[propName] = underscoreDeepExtend(oProp, sProp);
      },

      procMain = function(propName) {
        var oProp = obj[propName],
            sProp = source[propName];

        // The order of the 'if' statements is critical

        // Cases in which we want to perform a straight assignment
        if ( isAssign(oProp, sProp) ) {
          procAssign(oProp, sProp, propName);
        }
        // sProp is a string that contains parentRE
        else if ( hasRegex(oProp, sProp) ) {
          procRegex(oProp, sProp, propName);
        }
        // At least one property is an array
        else if ( hasArray(oProp, sProp) ){
          procArray(oProp, sProp, propName);
        }
        // At least one property is an object
        else if ( hasObject(oProp, sProp) ){
          procObject(oProp, sProp, propName);
        }
        // Everything else
        else {
          // Let's be optimistic and perform a straight assignment
          procAssign(oProp, sProp, propName);
        }
      },

      procAll = function(src) {
        source = src;
        Object.keys(source).forEach(procMain);
      };

  _.each(Array.prototype.slice.call(arguments, 1), procAll);

  return obj;
};

exports.underscoreDeepExtend = underscoreDeepExtend;

