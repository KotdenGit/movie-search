$(function() {
    // Owl Carousel
    var owl = $(".owl-carousel");
    owl.owlCarousel({
        responsive:{
            0:{
                items:1
            },
            425:{
              items:2
            },
            768:{
              items:3
            },
            1180:{
              items:4
            }
          },
      
      margin: 10,
      loop: false,
      nav: true
    });
  });

  