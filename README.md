Bootstrap : Columns same height
===================

# Why ?
When you're working with Bootstrap and developping a responsive website, you may have notice a little unexpected thing when displaying many columns with differents heights in a row :

![Image](./demo.png?raw=true)

Here's a [plunker](http://plnkr.co/edit/C2OPwjetflgmC7WnoWBx?p=preview) demo.

# Getting Started
You can get it straight from the repository : 
```
git clone https://github.com/maxime1992/jQueryBootstrapColumnsSameHeight
```

Include jQuery module in your HTML.

Then you just need to :  

- Add the class **same-height** into your html, to every row where you want your columns to have the same height :
```
<div class="container" >
  <div class="row same-height">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
      // content
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
      // content
    </div>
    ...
  </div>
</div>
```

- Call the jQuery plugin :  
```
// launch the script once document is ready
$( document ).ready(function() {
  // pass workOnColumnWrapper option to true
  // if you prefer to set the size on .row.same-height > .col-*-* > div
  // instead of                       .row.same-height > .col-*-*
  $('.same-height').columnsSameHeight({workOnColumnWrapper: false});
});
```

You are using Angular in your project and you would like to avoid jQuery dependency ?  
Here is the original Angular plugin : [https://github.com/maxime1992/angularBootstrapColumnsSameHeight](https://github.com/maxime1992/angularBootstrapColumnsSameHeight).

# Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

In order to contribute, please run `npm test` and check you don't have any JSHint error :tada:.  
