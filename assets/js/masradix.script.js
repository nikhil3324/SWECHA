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
    var $stickyElement = $('#map');
    if ($stickyElement.length) {
      var sticky = new Waypoint.Sticky({
        element: $stickyElement[0],
        wrapper: '<div class="sticky-wrapper waypoint" />'
      });
    }

    // Add a close button to exposed filter.
    $('.bef-exposed-form').append('<a data-toggle="filter" class="btn btn-default close fa fa-close"><span>' +  Drupal.t('Close') + '</span></a>')
    if($('#map').length > 0) {
  
      var mapInview = new Waypoint.Inview({
        element: $('#map'),
        enter: function (direction) {
          $('#map').show('fold');
        }
      })
    }
    if($('.pager__item').length > 0){
      console.log("length set");
      var topInview = new Waypoint.Inview({
        element: $('.pager__item'),
        entered: function(direction) {
          $('.scroll-to-top').show().on('click', function(e){
            var href = $(this).attr('href');
            $('html, body').animate({
              scrollTop:$('body').offset().top
            },500);
            e.preventDefault();
          });
        },
        exited: function(direction) {
          if (direction === "up") {
            $('.scroll-to-top').hide();
          }
        }
      });
    }
  
  });
  
  
  //  Handle Result filter click
  $( document ).ajaxStop(function() {
    $('[data-toggle="filter"]').click(function () {
      
      $('.view__filters').toggleClass('exposed ajax');
      
    });
    
    // Add a button to toggle map display;
    
    $('#map').once().each(function () {
      var $stickyElement = $('#map');
      $( '.mas-button .fa-map' ).click(function() {
        $( "#map" ).toggle( "fold" );
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

  
  
  $("#edit-field-request-image-0-upload").fileinput({
    previewFileType: "image",
    browseClass: "btn btn-success",
    browseLabel: "Pick Image",
    browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
    removeClass: "btn btn-danger",
    removeLabel: "Delete",
    removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
    uploadClass: "btn btn-info",
    uploadLabel: "Upload",
    uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i> "
  });
  
  
  
  
})(jQuery, Drupal, this, this.document);
