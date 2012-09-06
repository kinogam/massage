/*
    create by kinogam
    https://github.com/kinogam/massage
*/

(function (window) {
    'use strict';

    var ms = function (array) {
        var _ms = array || [];
        _ms.insert = _insert;
        _ms.match = _match;
        _ms.matchOne = _matchOne;
        _ms.find = _find;
        _ms.findOne = _findOne;
        return _ms;
    };


    /* match module */

    var _match = function (selector) {
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

    var _matchOne = function (selector) {
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

    /* end match module */

    /* find module */

    var _find = function (selector) {
        if (selector != null) {

            if (Object.prototype.toString.call(this) === '[object Array]') {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    var item = nodeFind(this[i], selector);
                    if (item != null) {
                        result.push(item);
                    }
                }
                return result;
            }
            else {
                var item = nodeFind(this, selector);
                if (Object.prototype.toString.call(item) === '[object Array]') {
                    return item;
                }
                var list = [];
                list.push(item);
                return list;
            }

        }
        else {
            return this;
        }
    };

    var nodeFind = function (node, selector) {
        for (var i in selector) {
            var nodeItem = node[i];
            //if no such property then return null
            if (nodeItem == null) {
                return null;
            }
            //check if property is object or literal
            if (typeof selector[i] === 'object') {
                if (Object.prototype.toString.call(nodeItem) === '[object Array]') {
                    for (var j = 0; j < nodeItem.length; j++) {
                        var item = nodeFind(nodeItem[j], selector[i]);
                        if (item != null) {
                            return item;
                        }
                    }
                    return null;
                }
                else {
                    return nodeFind(node[i], selector[i]);
                }
            }
            else if (node[i] != selector[i]) {
                return null;
            }
        }
        return node;
    };

    var _findOne = function (selector) {
        if (selector != null) {
            if (Object.prototype.toString.call(this) === '[object Array]') {
                for (var i = 0; i < this.length; i++) {
                    var item = nodeFind(this[i], selector);
                    if (item != null) {
                        return item;
                    }
                }
            }
            else {
                var item = nodeFind(this, selector);
                if (item != null) {
                    return item;
                }
            }
            return null;

        }
        else {
            return this.length > 0 ? this[0] : null;
        }
    };

    /* end find module */

    var _insert = function (item) {
        this.push(item);
    };



    window.massage = ms;

})(window);