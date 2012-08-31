(function (window) {
    'use strict';

    var ms = function (array) {
        var _ms = array || [];
        _ms.insert = _insert;
        _ms.find = _find;
        _ms.findOne = _findOne;
        _ms.update = _update;
        return _ms;
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

    var _findOne = function (selector) {
        if (selector != null) {
            for (var i = 0; i < this.length; i++) {
                var row = this[i];
                if (nodeMatch(row, selector)) {
                    return row;
                }
            }
            return null;
        }
        else {
            return this.length > 0 ? this[0] : null;
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
    };

    var _insert = function (item) {
        this.push(item);
    };

    var _update = function (criteria, objNew) {
        if (criteria != null) {
            for (var i = 0; i < this.length; i++) {
                if (nodeMatch(this[i], criteria)) {
                    this[i] = objNew;
                }
            }
        }
        return this;
    };



    window.massage = ms;

})(window);