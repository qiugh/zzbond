let Zzbond = require('./index');

let zzbond = new Zzbond();

console.log(zzbond)

zzbond.queue({uri:'http://www.baidu.com'},function(err,res) {
console.log(res)    
})