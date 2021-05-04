const log = console.log;
// const Shape= require('../src/baseShape/BaseShape');
// const b = new Shape();
const ArrayOfObjects = require("../src/index");
const aoo = new ArrayOfObjects();
aoo.add({ name: "test", value: 100, comments: "100" });
// console.log(c);
const c = aoo.getAttr("test");  
log(c);
// test('Testing Attributes', () => {
//     expect(c).toBe(100);
// const d = aoo.getProperty("test","comments");  
//     expect(d).toMatch("100");

// aoo.setProperty("test","new comment","comments" );  
    
// const f = aoo.getProperty("test","comments");  
//     expect(f).toMatch("new comment");
//     });
