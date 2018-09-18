# BigNightOut

A vanilla js application to show off to Timeout.

### Timings
To be honest I've run out of time. I got carries away with writing tests and didn't get all the integration ones done.
I enjoyed it so much, I carried on refactoring to make it better.

### My Choices
I started out on the wrong foot with `yo webapp` as I thought that would get me going fast! This was probably wrong, but a lesson well learnt.  
I chose Jasmine for testing with Karma, as I really like that it has spies, expects and everything built in and I don't need mocha, expect, sinon and so forth.  
I'm using Babel to compile my ES6 down. 
I'm using ESLint for linting.
I went for a BDD approach. The code and test were very slick when it came to just doing the food part. I chose to go back and add the drinks functionality later.
In hindsight I feel it would have been neater to do food and drinks at the same time. Feel free to look through my commits (I'm sure you will) to see how the code changed.  
When I was TDD-ing the "good" path it was looking very slick with a filter. Was less happy with the final result needing `forEach`.
`UserState` and `VenueMapper` were create with TDD the `App` was plumbed together testing after.  
I have started writing integration tests for `App` however I did not get time to finish all the interactivity.

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
* Minify and sort out all those production like stuff.
* Use React and webpack and not gulp and `yo webapp`.
* There is no reason for user facing text to be mixed in with logic. If formed naturally with my TDD, but really I would move that out to be someone elses concern.
* Finish writing integration tests, and write some e2e tests with Protractor.

Thanks for this. I've really enjoyed it.
