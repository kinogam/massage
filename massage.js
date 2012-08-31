(function (window) {
    'use strict';

    //    var Collection = function (name) {
    //        var _name = name;
    //        this._data = [];
    //        this.getName = function () {
    //            return _name;
    //        };
    //    };

    //    Collection.prototype = {
    //        drop: function () {
    //            var name = this.getName();
    //            if (CollectionMap[name] != null) {
    //                delete CollectionMap[name];
    //                return true;
    //            }
    //            else {
    //                return false;
    //            }
    //        },
    //        count: function () {
    //            return this._data.length;
    //        },
    //        insert: function (obj) {
    //            this._data[this._data.length] = obj;
    //        },
    //        find: function (selector) {
    //            if (selector != null) {
    //                var result = [];
    //                for (var i = 0; i < this._data.length; i++) {
    //                    var row = this._data[i];
    //                    if (nodeMatch(row, selector)) {
    //                        result.push(row);
    //                    }
    //                }
    //                return result;
    //            }
    //            else
    //                return this._data;
    //        }
    //    };



    //    var CollectionMap = {};


    //    window.kinodb = db;

    var ms = function (array) {
        var _ms = array || [];
        _ms.insert = _insert;
        _ms.find = _find;
        return _ms;
    };

    var _insert = function (item) {
        this.push(item);
    };

    var _find = function (selector) {
        if (selector != null) {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                var row = this[i];
                if (nodeMatch(row, selector)) {
                    result.push(row);
                }
            }
            return result;
        }
        else {
            return this;
        }
    };


    var nodeMatch = function (node, selector) {
        for (var i in selector) {
            var nodeItem = node[i];
            if (nodeItem == null) {
                return false;
            }
            if (typeof selector[i] === 'object') {
                if (Object.prototype.toString.call(nodeItem) === '[object Array]') {
                    for (var j = 0; j < nodeItem.length; j++) {
                        if (nodeMatch(nodeItem[j], selector[i])) {
                            return true;
                        }
                    }
                    return false;
                }
                else if (!nodeMatch(node[i], selector[i])) {
                    return false;
                }
            }
            else if (node[i] != selector[i]) {
                return false;
            }
        }
        return true;
    }

    window.massage = ms;

})(window);