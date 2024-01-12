/*************************************************************************
 * For loading the menu.
 * The menu will not work if you open the file directly rather than on a web server.
 *************************************************************************/
(function () {
  "use strict";

  $(function () {
    // Load menu.html into .menu-container
    $(".menu-container").load("menu.html");

    // Add a scroll function
    $(window).scroll(function () {
      // Get the scroll position
      var scrollPosition = $(window).scrollTop();
      var shrinkHeight = 10; // Adjust this value as needed
      if (scrollPosition > shrinkHeight) {
        // Add a class to the header for styling changes
        $(".menu-container").addClass("shrink");
      } else {
        // Remove the class if the scroll position is above the shrink height
        $(".menu-container").removeClass("shrink");
      }
    });
  });
})();


