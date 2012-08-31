/// <reference path="qunit/qunit.js" />
/// <reference path="../massage.js" />

var ms = massage;

module("constructor");

test("should get a collection by call ms()", function () {
    notEqual(ms(), null);
});

test("given a array that length is 3, then collection's length should be 3", function () {
    equal(ms([{ a: 1 }, { b: 2 }, { c: 3}]).length, 3);
});

module("insert");

test("should insert data", function () {
    var collection = ms();
    collection.insert({ name: 'kino', age: 29 });
    equal(collection.length, 1);
});

var collection = null;

module("find", {
    setup: function () {
        collection = ms();
        collection.insert({ name: 'kino', age: 29 });
        collection.insert({ name: 'tom', age: 59 });
        collection.insert({ name: 'jacky', age: 29 });
        collection.insert({ name: 'jobs', age: 29, location: { address: 'king street'} });
        collection.insert({ name: 'rose', age: 17, location: { address: 'rose street'} });
        collection.insert({ club: 'ysh', members: [{ name: 'james', age: 19 }, { name: 'marry', age: 33}] });
        collection.insert({ club: 'kodomo', members: [{ name: 'angela', age: 9 }, { name: 'honda', age: 8}] });
    }
});

test("should find data", function () {
    var list = collection.find();
    equal(list.length, 7);
});


test("should find data with selector", function () {
    var result = collection.find({ name: 'jacky' });
    equal(result[0].name, 'jacky');
    equal(result[0].age, 29);
});

test("should find item in more than one level", function () {
    var result = collection.find({ location: { address: 'king street'} });
    equal(result[0].name, 'jobs');
});

test("should find item in array", function () {
    var result = collection.find({ members: { name: 'honda'} });
    equal(result[0].club, 'kodomo');
});

test("findOne() should return one row", function () {
    var result = collection.findOne({ members: { name: 'honda'} });
    equal(result.club, 'kodomo');
});

module("update", {
    setup: function () {
        collection = ms([
            { name: 'kino', age: 29 },
            { name: 'tom', age: 59 }
        ]);
    }
});

test("should update row item", function () {
    var x = collection.findOne({ name: 'tom' });
    x.age = 60;
    collection.update({ name: 'tom' }, x);
    equal(collection.findOne({ name: 'tom' }).age, 60);
});