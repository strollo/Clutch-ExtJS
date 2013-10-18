// Generated by CoffeeScript 1.6.3
/*
Copyright (c) 2012-2013 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/**
* A collection of useful static methods for interacting with (and normalizing differences between) the Sencha Touch and Ext JS class systems.
* @private
*/

Ext.define('Deft.core.Class', {
  alternateClassName: ['Deft.Class'],
  statics: {
    /**
    		* Register a new pre-processor to be used during the class creation process.
    		* 
    		* (Normalizes API differences between the various Sencha frameworks and versions.)
    		*
    		* @param {String} name The pre-processor's name.
    		* @param {Function} fn The callback function to be executed.
    		* @param {String} position Optional insertion position for this pre-processor - valid options: 'first', 'last', 'before' or 'after'.
    		* @param {String} relativeTo Optional name of a previously registered pre-processor, for 'before' and 'after' relative positioning.
    */

    registerPreprocessor: function(name, fn, position, relativeTo) {
      if (Ext.getVersion('extjs') && Ext.getVersion('core').isLessThan('4.1.0')) {
        Ext.Class.registerPreprocessor(name, function(Class, data, callback) {
          return fn.call(this, Class, data, data, callback);
        }).setDefaultPreprocessorPosition(name, position, relativeTo);
      } else {
        Ext.Class.registerPreprocessor(name, function(Class, data, hooks, callback) {
          return fn.call(this, Class, data, hooks, callback);
        }, [name], position, relativeTo);
      }
    },
    /**
    		* Intercept class creation.
    		*
    		* (Normalizes API differences between the various Sencha frameworks and versions.)
    */

    hookOnClassCreated: function(hooks, fn) {
      if (Ext.getVersion('extjs') && Ext.getVersion('core').isLessThan('4.1.0')) {
        Ext.Function.interceptBefore(hooks, 'onClassCreated', fn);
      } else {
        Ext.Function.interceptBefore(hooks, 'onCreated', fn);
      }
    },
    /**
    		* Intercept class extension.
    		*
    		* (Normalizes API differences between the various Sencha frameworks and versions.)
    */

    hookOnClassExtended: function(data, fn) {
      var onClassExtended;
      if (Ext.getVersion('extjs') && Ext.getVersion('core').isLessThan('4.1.0')) {
        onClassExtended = function(Class, data) {
          return fn.call(this, Class, data, data);
        };
      } else {
        onClassExtended = fn;
      }
      if (data.onClassExtended != null) {
        Ext.Function.interceptBefore(data, 'onClassExtended', onClassExtended);
      } else {
        data.onClassExtended = onClassExtended;
      }
    },
    /**
    		* Determines whether the passed Class reference is or extends the specified Class (by name).
    		*
    		* @return {Boolean} A Boolean indicating whether the specified Class reference is or extends the specified Class (by name)
    */

    extendsClass: function(targetClass, className) {
      var error;
      try {
        if (Ext.getClassName(targetClass) === className) {
          return true;
        }
        if (targetClass != null ? targetClass.superclass : void 0) {
          if (Ext.getClassName(targetClass.superclass) === className) {
            return true;
          } else {
            return Deft.Class.extendsClass(Ext.getClass(targetClass.superclass), className);
          }
        } else {
          return false;
        }
      } catch (_error) {
        error = _error;
        return false;
      }
    }
  }
});