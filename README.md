[massage](#) - A client-side Array filter tool and looks like mongodb api
==================================================
How to use
--------------------------------------
use on a webpage
```html
	<script type="text/javascript" src="massage.js"></script>
```



you can transfer Array to massage object:
```js
	var mo = massage([{ a: 1 }, { b: 2 }, { c: 3}]);
```

now we use test data:
```js
	var testData = [{ name: 'kino', age: 29 },
					{ name: 'tom', age: 59 },
					{ name: 'jacky', age: 29 },
					{ name: 'jobs', age: 29, location: { address: 'king street'} },
					{ name: 'rose', age: 17, location: { address: 'rose street'} },
					{ club: 'ysh', members: [{ name: 'james', age: 19 }, { name: 'marry', age: 33}] },
					{ club: 'kodomo', members: [{ name: 'angela', age: 9 }, { name: 'honda', age: 8}] }],
		collection = massage(testData);
```

you can match data with selector
```js
    var result = collection.match({ name: 'jacky' });
    //result[0].name 'jacky'
    //result[0].age  29
```

match item in more than one level
```js
	var result = collection.match({ location: { address: 'king street'} });
    //result[0].name 'jobs'
```

 match item in array with selector
```js
    var result = collection.match({ members: { name: 'honda'} });
    //result[0].club 'kodomo'
```

match only one item with selector
```js
    var result = collection.matchOne({ members: { name: 'honda'} });
    //result.club 'kodomo'
```

use $lt,$lte,$gt,$gte as match condition
```js
    var result = collection.match({ age: {"$gt": 10, "$lte": 29 } });
    //result.length  4
```

use $in as match condition
```js
    var result = collection.match({ age: { "$in": [17, 59] } });
    //result.length 2
```

you can also find data with selector,it will return a node
```js
    var result = collection.find({ name: 'jacky' });
    //result[0].name 'jacky'
    //result[0].age 29
```

find only one item with selector,it will return a node
```js
	var result = collection.findOne({ members: { name: 'angela'} });
    //result.age  9
```

you can use object link
```js
    var result = collection.findOne({ club: 'kodomo' }).find({ members: { age: 8} });
    //result.length 2 
    //result[0].name 'honda'
    //result[1].name 'linda'
```