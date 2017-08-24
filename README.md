# zzbond
This is a small and light web spider! <br>
This is also an invisible task scheduler after extending the Task's execute function!

Features:

 * Very simple priority queue
 * Configurable task channel:ratelimit and parallel
 * Global scheduler for multiple channel and timely reassign task
 * Simple constructor with one options for all entity 
 * Flexiable extension for task preproces and callback
 * From top to buttom, any level can be overloaded
# How to install
    $ npm install zzbond
# Get started

```javascript
var Zzbond = require("zzbond");

var zz = new Zzbond();
var task_options = {
    uri:'http://www.baidu.com'
    }
var task_callback=function(task,result,done){

    //process result,eg:
    console.log(result.body);
    done();//inform zzbond this task is done!
}
zz.queue(task_options,task_callback);

```
# All supported config
As the config.json file show, all supported options are as follows:<br>
request_options
* support all options that [request module](https://github.com/mikeal/request#requestoptions-callback) supports and will be directly passed to the request() method 

schedule_options 
* noidle: When this option is true, tasks will be reassign timely to idle channel. Default value is false 

channel_options 
* parallel: means the max num of running tasks parallelly 
* ratelimit: means the time rate of executing task 

queue_options 
* prioritylimit: the range of priority 

log_options<br>
* logtype: log or rotatelog. A short map to winston's transports.File and winston-daily-rotate-file
* logopt: supports partial options from winston or winston-daily-rotate-file module. Need to be in line with logtype 
# EventListener on Zzbond
* schedule: before one task get queued, you can dowith the task_options as you wish
* drain: after all tasks are done, you can do what you want do do



