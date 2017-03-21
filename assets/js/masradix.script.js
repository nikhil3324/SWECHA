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

    // toggle report map;
    $('.mas-button .fa-map').click(function () {
      $('#geolocation-nominatim-map').toggle('fold');
    });

    $('.btn-default, .add-block p a').click(function(e){
      var rippler = $(this);
      // create .ink element if it doesn't exist
      if(rippler.find(".ink").length == 0) {
        rippler.append("<span class='ink'></span>");
      }

      var ink = rippler.find(".ink");

      // prevent quick double clicks
      ink.removeClass("animate");

      // set .ink diametr
      if(!ink.height() && !ink.width())
      {
        var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
        ink.css({height: d, width: d});
      }

      // get click coordinates
      var x = e.pageX - rippler.offset().left - ink.width()/2;
      var y = e.pageY - rippler.offset().top - ink.height()/2;

      // set .ink position and add class .animate
      ink.css({
        top: y+'px',
        left:x+'px'
      }).addClass("animate");
    })



    // https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
    $(':file').on('fileselect', function (event, numFiles, label) {

      var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

      if (input.length) {
        input.val(log);
      }

    });

    $('.button-add p a').click(function (e) {
      if (!$(".page--logged-in")[0]) {
        e.preventDefault();
        hamburger_cross();
        $('#wrapper').toggleClass('toggled');
      }
    });

    // NavSidebar scripts.
    var trigger = $('.hamburger'),
      isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (isClosed == true) {
        document.ontouchmove = function (event) {
          return true;
        };
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;

      }
      else {
        document.ontouchmove = function (event) {
          event.preventDefault();
        };
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
    $('.views-exposed-form')
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

    search.click(function () {
      map.animate({height:'400px'}, 100);
    });

    search.blur(function () {
      map.height('210px');
    });
    form.focus(function () {
      map.height('210px');
    });

  });

  // Handle Result filter click.
  $(document).ajaxStop(function () {
    $('[data-toggle="filter"]').click(function () {
      $('.view__filters').toggleClass('exposed ajax');
    });

    if($('[data-drupal-selector="edit-reset"]')[0]) {
      $('.view__filters').addClass('exposed ajax');
    }
    // Add a button to toggle map display;.
    $('#map').once().each(function () {
      // var $stickyElement = $('#map');
      $('.mas-button .fa-map').click(function () {
        $("#map").toggle("fold");
      });

    });

  });

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });

})(jQuery, Drupal, this, this.document);
