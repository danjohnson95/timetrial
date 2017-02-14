# timetrial
A native app used for benchmarking JavaScript snippets.

---

Ever found yourself wondering which way would be more efficient, but don't want to waste time writing your own test suite?

## Get timetrial!

It's easy to install! (Well, it will be once I've compiled it).
For the moment, just grab the source and compile it yourself.

    $ git clone https://github.com/danjohnson95/timetrial
    $ cd timetrial && npm install && npm run
    
If you get an error doing that, it might be because you haven't got electron installed.

    $ npm install -g electron
    $ npm run
    
### Current features

- Run tests, see which is faster

### Coming soon

- Import libraries (such as jQuery) to your tests
- Define code to run on initialisation of a test
- Define HTML for tests
- Syntax colouring
- Save your tests
- View, modify and rerun your existing tests
- Search tests by keywords

