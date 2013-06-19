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
            return ms(result);
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
                    return ms(row);
                }
            }
            return ms();
        }
        else {
            return this.length > 0 ? ms(this[0]) : ms();
        }
    };


    var nodeMatch = function (node, selector) {
        for (var i in selector) {

            //假如当前数据节点为空则返回false
            var nodeItem = node[i],
                selectorItem = selector[i];

            if (nodeItem == null) {
                return false;
            }

            //如果当前节点类型为对象，而且节点属性又不包含以$开头的属性的时候，执行递归遍历处理
            if (typeof selectorItem === 'object' && notInclude$(selectorItem)) {
                if (isArray(nodeItem)) {
                    for (var j = 0; j < nodeItem.length; j++) {
                        if (nodeMatch(nodeItem[j], selectorItem)) {
                            return true;
                        }
                    }
                    return false;
                }
                else if (!nodeMatch(nodeItem, selectorItem)) {
                    return false;
                }
            }
            //执行非对象等值验证，或者含有$属性的条件验证
            else {
                //判断是否使用条件选择,是则做条件验证
                if (!notInclude$(selectorItem)) {
                    if (!matchCondition(nodeItem, selectorItem)) {
                        return false;
                    }
                }
                //否则只做等值验证
                else if (nodeItem != selectorItem) {
                    return false;
                }
            }
        }
        return true;
    };

    var notInclude$ = function (selectorNode) {
        for (var prop in selectorNode) {
            //一击脱出!
            if (!/^\$/.test(prop)) {
                return true;
            }
            return false;
        }
        return false;
    };

    var matchCondition = function (nodeItem, selectorNode) {
        for (var prop in selectorNode) {
            if (prop === '$lt') {
                if (!(nodeItem < selectorNode[prop])) {
                    return false;
                }
            }
            else if (prop === '$gt') {
                if (!(nodeItem > selectorNode[prop])) {
                    return false;
                }
            }
            else if (prop === '$lte') {
                if (!(nodeItem <= selectorNode[prop])) {
                    return false;
                }
            }
            else if (prop === '$gte') {
                if (!(nodeItem >= selectorNode[prop])) {
                    return false;
                }
            }
            else if (prop === '$in') {
                var inVals = selectorNode[prop],
                    isInClude = false;

                for (var i = 0; i < inVals.length; i++) {
                    if (nodeItem == inVals[i]) {
                        isInClude = true;
                    }
                }

                if (!isInClude) {
                    return false;
                }
            }

        }
        return true;
    };

    /* end match module */



    /* find module */

    var _find = function (selector) {
        if (selector != null) {

            if (isArray(this)) {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    var item = nodeFind(this[i], selector);
                    if (item != null) {
                        if (isArray(item)) {
                            result = result.concat(item);
                        }
                        else {
                            result.push(item);
                        }
                    }
                }
                return ms(result);
            }
            else {
                var item = nodeFind(this, selector);
                if (isArray(item)) {
                    return item;
                }
                var list = [];
                list.push(item);
                return ms(list);
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
                if (isArray(nodeItem)) {
                    var result = [];
                    for (var j = 0; j < nodeItem.length; j++) {
                        var item = nodeFind(nodeItem[j], selector[i]);
                        if (item != null) {
                            result.push(item);
                        }
                    }
                    //if sub array match no item,then return null
                    return result.length > 0 ? result : null;
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
            //array
            if (isArray(this)) {
                for (var i = 0; i < this.length; i++) {
                    var item = nodeFind(this[i], selector);
                    if (item != null) {
                        if (isArray(item)) {
                            return ms(item[0]);
                        }
                        else {
                            return ms(item);
                        }
                    }
                }
            }
            //object
            else {
                var item = nodeFind(this, selector);
                if (item != null) {
                    if (isArray(item)) {
                        return ms(item[0]);
                    }
                    else {
                        return ms(item);
                    }
                }
            }
            return ms();
        }
        else {
            return this.length > 0 ? ms(this[0]) : ms();
        }
    };

    /* end find module */

    var _insert = function (item) {
        this.push(item);
    };


    var isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    window.massage = ms;

})(window);