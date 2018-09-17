# BigNightOut

A vanilla js application to show off to Timeout.

### Timings
To be honest I've run out of time. This has been great fun, but now it is late, and I've still got to link up the UI,
but hopefully you like what I've done.

### My Choices
I started with `yo webapp` as I thought that would get me going fast! This was probably wrong, but a lesson well learnt.  
I chose Jasmine for testing, as I really like that it has spies, expects and everything built in and I don't need mocha, expect, sinon and so forth.  
I'm using Babel to compile my ES6 down.
I went for a BDD approach. The code and test were very slick when it came to just doing the food part. I chose to go back and add the drinks functionality later.
In hindsight I feel it would have been neater to do food and drinks at the same time. Feel free to look through my commits (I'm sure you will) to see how the code changed.  
When I was TDD-ing the "good" path it was looking very slick with a filter. Was less happy with the final result needing `forEach`.

### The brief
I may have misunderstood the brief so please forgive me for that.
I read it as the `wont_eat` as pretty much a life or death food allergy so they cannot eat anywhere their food is served.
And the drinks as "As long as I like 1 drink thats fine by me".  
So if you think I've done things a bit wrong I apologise.

### The good stuff
If you run `npm start` you'll see the small amount of UI I got to.  
If you run `npm test` you'll see all my tests running.  

### If this was for real and on a bigger data set
* I would web worker the `VenueMapper` as it has nothing to do with the dom.
* I would memoize some of the logic, as it will speed up in memory comparisons.
* Remove all magic strings.
* Sort out `main.js` so its a bit tidier and not just functions.
* Minify and sort out all those production like stuff.
* Use webpack and not gulp and `yo webapp`.
* `_getReasonsVenueIsNoGood` is getting a little long. I would probably have a look at that.
* The last tests expect is very long, I would like to tidy that up.

Thanks for this. I've really enjoyed it.
