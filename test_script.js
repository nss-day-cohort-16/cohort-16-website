// external js: isotope.pkgd.js, imagesloaded.pkgd.js
$(window).on('load', ()=>{
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $(".meet-us--tiles").offset().top},
          'slow');
  });


  var $grid = $('#cohort-bios').isotope({
    itemSelector: '.card',
    masonry: {
      columnWidth: '.col'  
    }
  });
  $.fn.isotopeImagesReveal = function( $items ) {
      var iso = this.data('isotope');
      console.log(iso);
      var itemSelector = iso.options.itemSelector;
      // hide by default
      $items.hide();
      console.log($items);
      // append to container
      this.append( $items );
      $items.imagesLoaded().progress( function( imgLoad, image ) {
        // get item
        // image is imagesLoaded class, not <img>, <img> is image.img
        var $item = $( image.img ).parents( itemSelector );
        console.log($item.parent());
        // un-hide item
        $item.parent().show();
        // isotope does its thing
        iso.appended( $item );
        iso.layout();
      });
      console.log(this);
      return this;
    };
  getItems().then( (response)=>{
    var list = response;
    var $items = getItem(list);
    console.log($items);
    $grid.isotopeImagesReveal( $items );
  });
  
  
});