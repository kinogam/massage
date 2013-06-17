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

module("match", {
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

test("should match data", function () {
    var list = collection.match();
    equal(list.length, 7);
});


test("should match data with selector", function () {
    var result = collection.match({ name: 'jacky' });
    equal(result[0].name, 'jacky');
    equal(result[0].age, 29);
});

test("should match item in more than one level", function () {
    var result = collection.match({ location: { address: 'king street'} });
    equal(result[0].name, 'jobs');
});

test("should match item in array", function () {
    var result = collection.match({ members: { name: 'honda'} });
    equal(result[0].club, 'kodomo');
});

test("matchOne() should return one object", function () {
    var result = collection.matchOne({ members: { name: 'honda'} });
    equal(result.club, 'kodomo');
});


module("find", {
    setup: function () {
        collection = ms([
            { name: 'kino', age: 29 },
            { name: 'tom', age: 59 },
            { name: 'jacky', age: 29 },
            { name: 'jobs', age: 29, location: { address: 'king street', postCode: '5200'} },
            { name: 'rose', age: 17, location: { address: 'rose street', postCode: '5210'} },
            { club: 'ysh', members: [{ name: 'james', age: 19 }, { name: 'marry', age: 33}] },
            { club: 'kodomo', members: [{ name: 'angela', age: 9 }, { name: 'honda', age: 8 }, { name: 'linda', age: 8}] }
        ]);
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
    equal(result[0].postCode, '5200');
});

test("should find item in sub array", function () {
    var result = collection.find({ members: { name: 'honda'} });
    equal(result[0].age, 8);

    //find members that age is 8
    result = collection.find({ members: { age: 8} });
    equal(result.length, 2);
    equal(result[0].name, 'honda');
    equal(result[1].name, 'linda');

});

test("findOne() should return one object", function () {
    var result = collection.findOne({ members: { name: 'angela'} });
    equal(result.age, 9);
});

test("should use object link", function () {
    var result = collection.findOne({ club: 'kodomo' }).find({ members: { age: 8} });
    equal(result.length, 2);
    equal(result[0].name, 'honda');
    equal(result[1].name, 'linda');
});

//module("index");

//test("can get match index", function () {
//    var result = collection.getMatchIndex({ name: 'jacky' });
//    equal(result, 2);
//});

module("fix bug");

test("fix object parameter bug", function () {
    var md = massage({ club: 'kodomo', members: [{ name: 'angela', age: 9 }, { name: 'honda', age: 8}] });
    var obj = md.findOne({ members: { name: 'honda'} });
    var list = md.find({ members: { name: 'honda'} });
    equal(obj.age, 8);
    equal(list[0].age, 8);
});