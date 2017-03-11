/**
 * @file
 * Custom scripts for theme.
 */


// Taking care of flickering controls on touch devices.
// https://github.com/Leaflet/Leaflet/issues/1198
window.L_DISABLE_3D = 'ontouchstart' in document.documentElement;


(function ($, Drupal, window, document) {

  // https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
  $(document).on('change', ':file', function () {
    var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  $(document).ready(function () {

    // https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
    $(':file').on('fileselect', function (event, numFiles, label) {

      var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

      if (input.length) {
        input.val(log);
      }

    });


    // NavSidebar scripts
    var trigger = $('.hamburger'),
      isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      var $map = $('#map');

      if (isClosed == true) {
        if ($map.is(':hidden')) {
          $map.toggle("fold");
        }
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      }
      else {
        if ($map.is(':visible')) {
          $map.toggle("fold");
        }
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }

    // Sticky map on top.
    var $stickyElement = $('#map');
    if ($stickyElement.length) {
      var sticky = new Waypoint.Sticky({
        element: $stickyElement[0],
        wrapper: '<div class="sticky-wrapper waypoint" />'
      });
    }

    // Add a close button to exposed filter.
    $('.bef-exposed-form')
      .append('<a data-toggle="filter" class="btn btn-default close fa fa-close"><span>' + Drupal.t('Close') + '</span></a>')
    if ($('#map').length > 0) {

      var mapInview = new Waypoint.Inview({
        element: $('#map'),
        enter: function (direction) {
          $('#map').show('fold');
        }
      })
    }
    if ($('.pager__item').length > 0) {
      var topInview = new Waypoint.Inview({
        element: $('.pager__item'),
        entered: function (direction) {
          $('.scroll-to-top').show().on('click', function (e) {
            var href = $(this).attr('href');
            $('html, body').animate({
              scrollTop: $('body').offset().top
            }, 500);
            e.preventDefault();
          });
        },
        exited: function (direction) {
          if (direction === "up") {
            $('.scroll-to-top').hide();
          }
        }
      });
    }


    // Map resizing:
    var map = $('div#geolocation-nominatim-map');
    var form = $('.node-service-request-form input');
    var search = $('.leaflet-control-geocoder.leaflet-bar input');
    var locateControl = $('.leaflet-control-locate a');
    map.height('210px');
    locateControl.click(function () {
      map.height('400px');
    });
    search.focus(function () {
      map.height('400px');
    });

    search.blur(function () {
      map.height('210px');
    });
    form.focus(function () {
      map.height('210px');
    });


  });


  //  Handle Result filter click
  $(document).ajaxStop(function () {
    $('[data-toggle="filter"]').click(function () {
      $('.view__filters').toggleClass('exposed ajax');
    });

    // Add a button to toggle map display;

    $('#map').once().each(function () {
      var $stickyElement = $('#map');
      $('.mas-button .fa-map').click(function () {
        $("#map").toggle("fold");
      });

    });

  });


  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });

  // Footer


  /*
   $(".form-type-file").fileinput({
   uploadUrl: '?element_parents=field_request_image/widget/0&ajax_form=1&_wrapper_format=drupal_ajax&_wrapper_format=drupal_ajax',
   uploadAsync: true
   });
   */


})(jQuery, Drupal, this, this.document);
