/**
 * @file
 * Custom scripts for theme.
 */


// Taking care of flickering controls on touch devices.
// https://github.com/Leaflet/Leaflet/issues/1198
window.L_DISABLE_3D = 'ontouchstart' in document.documentElement;


(function ($, Drupal, window, document) {

  $(document).ready(function() {

    // Sticky map on top.
    var $stickyElement = $('#map, #geolocation-nominatim-map');
    var sticky;
    if ($stickyElement.length) {
      sticky = new Waypoint.Sticky({
        element: $stickyElement[0],
        wrapper: '<div class="sticky-wrapper waypoint" />'
      });
    }
    
    // Add a close button to exposed filter.
    $('.bef-exposed-form').append('<a data-toggle="filter" class="btn btn-default close fa fa-close"><span>' +  Drupal.t('Close') + '</span></a>')
  
  
  });
  
  
  //  Handle Result filter click
  $( document ).ajaxStop(function() {
    $('[data-toggle="filter"]').click(function () {
      
      $('.view__filters').toggleClass('exposed ajax');
      
    });
    
    // Add a button to toggle map display;
    
    $('#map,  #geolocation-nominatim-map').once().each(function () {
      var $stickyElement = $('#map, #geolocation-nominatim-map');
      $stickyElement.append('<div class="grippie leaflet-touch leaflet-bar easy-button-button leaflet-bar-part"><button><span class="fa fa-map"></span></button></div>');
      $( '.grippie' ).click(function() {
        $( "#map, #geolocation-nominatim-map" ).toggle( "fold" );
      });
      
    });
    
  });
  
  
  // NavSidebar scripts
  var trigger = $('.hamburger'),
  overlay = $('.overlay'),
  isClosed = false;

  trigger.click(function () {
    hamburger_cross();
  });

  function hamburger_cross() {
    var $map = $('#map');

    if (isClosed == true) {
      overlay.hide();
      if ($map.is(':hidden')) {
        $map.toggle("fold");
      }
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      overlay.show();
      if ($map.is(':visible')) {
        $map.toggle("fold");
      }
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });
  
  // Footer
  
  // hide our element on page load
  // $('.scroll-to-top').removeClass('show');
  
  var waypoints = $('.scroll-to-top').waypoint({
    handler: function(direction) {
      if (direction == "down") {
        $('.scroll-to-top').toggleClass('show');
        
        $('.scroll-to-top').on('click', function(e){
          var href = $(this).attr('href');
          $('html, body').animate({
            scrollTop:$(this).offset().top
          },'slow');
          e.preventDefault();
        });
        
      }
    },
    offset: '75%'
    
  })
  
  


})(jQuery, Drupal, this, this.document);
