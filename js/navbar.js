$(document).ready(function() {

    /* --------------------- wide screen nav start --------------------- */
  
    /* >>>>>>>>>>>> global variables <<<<<<<<<<<< */
  
    const wideNavItem = $('nav#wide-screen > .left-column .item');
    const wideSubMenuSubLink = $("nav#wide-screen > .left-column .sub-link");
  
    let wideCurrentItem = null;
    let wideResetItemTimer1;
    let wideCurrentSubLink = null;
    let wideResetSubLinkTimer2;
    
    /* >>>>>>>>>>>> nav appear or disappear <<<<<<<<<<<< */
  
    function navAppears() {
      $(wideNavItem).mouseenter(wideNavItemMouseEnter).mouseleave(wideNavItemMouseLeave);
      $(wideSubMenuSubLink).mouseenter(wideNavSubLinkMouseEnter).mouseleave(wideNavSubLinkMouseLeave);
    }
  
    function navDisappears() {
      $(wideNavItem).off('mouseenter', wideNavItemMouseEnter).off('mouseleave', wideNavItemMouseLeave);
      $(wideSubMenuSubLink).off('mouseenter', wideNavSubLinkMouseEnter).off('mouseleave', wideNavSubLinkMouseLeave);
    }
  
  
    function checkWindowWidthForNavDisplay() {
      var windowWidth = $(window).width();
  
      if (windowWidth >= 1330) {
        navAppears();
      } else {
        navDisappears();
      }
      
    }
  
    // check the current window width 
    $(window).resize(checkWindowWidthForNavDisplay);
    // check the first load window width 
    checkWindowWidthForNavDisplay();
  
  
    /* >>>>>>>>>>>> define mouse events  <<<<<<<<<<<< */
    
    // item mouse enter
    
    function wideNavItemMouseEnter() {
      var navSubMenu = $(this).find('.sub-menu');
      if (wideCurrentItem) {
        clearTimeout(wideResetItemTimer1);
        wideCurrentItem.find('.sub-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
      }
      navSubMenu.removeClass('hide-opacity-visible').addClass('show-opacity-visible');
      wideCurrentItem = $(this);
    }
  
    // item mouse leave
    
    function wideNavItemMouseLeave() {
      wideResetItemTimer1 = setTimeout(() => {
        if (wideCurrentItem && !wideCurrentItem.is(':hover')) {
          wideCurrentItem.find('.sub-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
          wideCurrentItem = null;
        }
      }, 400);
    }
  
    // sub menu sub link mouse enter
  
    function wideNavSubLinkMouseEnter() {
      var childMenu = $(this).find('.child-menu');
      if (wideCurrentSubLink) {
        clearTimeout(wideResetSubLinkTimer2);
        wideCurrentSubLink.find('.child-menu').removeClass('show-opacity-visible').removeClass('sub-menu-slide-left-to-right').addClass('hide-opacity-visible');
      }
      childMenu.removeClass('hide-opacity-visible').addClass('show-opacity-visible').addClass('sub-menu-slide-left-to-right');
      wideCurrentSubLink = $(this);
    }
  
    // sub menu sub link mouse leave
  
    function wideNavSubLinkMouseLeave() {
      wideResetSubLinkTimer2 = setTimeout(() => {
        if (wideCurrentSubLink && !wideCurrentSubLink.is(':hover')) {
          wideCurrentSubLink.find('.child-menu').removeClass('show-opacity-visible').addClass('hide-opacity-visible');
          $('.child-menu').removeClass('sub-menu-slide-left-to-right');
          wideCurrentSubLink = null;
        }
      }, 300);
    }
  
    /* --------------------- wide screen nav end --------------------- */
  
    /* --------------------- mobile screen nav start --------------------- */
  
    /* >>>>>>>>>>>> global variables <<<<<<<<<<<< */
  
    const mobileNavLink = $('nav#mobile-screen > .left-column .item > .link');
    const mobileSubMenu = $("nav#mobile-screen > .left-column .sub-menu");
    const mobileChildMenu = $("nav#mobile-screen > .left-column .sub-link > .child-menu");
    const mobileSubLinkText = $('nav#mobile-screen > .left-column .sub-link > .text');
  
    let mobileCurrentSubMenu = null;
    let mobileCurrentchildMenu = null;
    let mobileCurrentLinkTextDownChevron = null;
  
    /* >>>>>>>>>>>> link click <<<<<<<<<<<< */
  
    mobileNavLink.click(function () {
    
      const subMenu = $(this).parent().find(mobileSubMenu);
    
      // Toggle active class for color change
      $(this).toggleClass('active-link', subMenu.is(':hidden')); // if the second argument is true add the class mentioned, otherwise remove it from the element
  
      // Remove active class from all links and then add to the clicked one if it's being opened
      mobileNavLink.removeClass('active-link');
      mobileSubLinkText.removeClass('active-link'); // Reset sublink text color
      if (subMenu.is(':hidden')) {
        $(this).addClass('active-link');
      }  
  
      if (mobileCurrentSubMenu && mobileCurrentSubMenu[0] !== subMenu[0]) {
        mobileCurrentSubMenu.slideUp();
      }
  
      // Close all child menus and reset their chevrons when any item link is clicked
      if (mobileCurrentchildMenu) {
  
        mobileCurrentchildMenu.slideUp();
        
        $('nav#mobile-screen > .left-column .sub-link .text > svg').css("transform", "");
        mobileCurrentchildMenu = null;
        mobileCurrentLinkTextDownChevron = null;
      
      }
  
      subMenu.slideToggle();
      mobileCurrentSubMenu = subMenu.is(':visible') ? subMenu : null;
    });
  
  
    /* >>>>>>>>>>>> sub link text click <<<<<<<<<<<< */
  
    mobileSubLinkText.click(function () {
  
      const childMenu = $(this).parent().find(mobileChildMenu);
      const downChevron = $(this).find("svg");
  
      // Remove active class from all sublinks and then add to the clicked one if it's being opened
      mobileSubLinkText.removeClass('active-link');
  
      $(this).toggleClass('active-link', childMenu.is(':hidden'));
  
      // Close the previously opened childMenu and reset its chevron
      if (mobileCurrentchildMenu && mobileCurrentchildMenu[0] !== childMenu[0]) {
  
        mobileCurrentchildMenu.slideUp();
  
        if (mobileCurrentLinkTextDownChevron) {
          mobileCurrentLinkTextDownChevron.css("transform", "");
        }
  
      }
  
      // Toggle the clicked childMenu and rotate its chevron
      childMenu.slideToggle(function() {
        // After the toggle action completes, check visibility to set the chevron
        const isChildMenuVisible = $(this).is(':visible');
        downChevron.css("transform", isChildMenuVisible ? "rotate(180deg)" : "rotate(0deg)");
      });
  
      // Update the current childMenu and chevron references
      mobileCurrentchildMenu = childMenu;
      mobileCurrentLinkTextDownChevron = downChevron;
    });
  
    /* --------------------- mobile screen nav end --------------------- */
  
    /* --------------------- hamburger start --------------------- */
  
    /* >>>>>>>>>>>> global variables <<<<<<<<<<<< */
  
    const mobileNav = $('nav#mobile-screen');
    const mobileItemContainer = $('nav#mobile-screen > .left-column > .container');
    const mobileSocialMedia = $('nav#mobile-screen > .left-column > .social-media');
    const mobileContactUs = $('nav#mobile-screen > .right-column > .contact-us');
    const hamburgerIcon = $("nav#wide-screen .hamburger-menu svg");
    const logoClose = $('.logo-close');
    const closeIcon = $(".close");
    const closeSvg = $(".logo-close .close svg");
  
    /* >>>>>>>>>>>> hamburger open click <<<<<<<<<<<< */
  
    hamburgerIcon.click(function () {
  
      $(mobileNav).find("*").removeClass("animate__fadeInDown animate__rotateIn animate__fadeInLeft animate__fadeInUp animate__fadeInRight animate__fadeOutUp animate__rotateOut animate__fadeOutLeft animate__fadeOutDown animate__fadeOutRight");
  
      $(mobileNav).css("opacity", "1");
  
      setTimeout(() => {
  
        logoCloseToggle(mobileNav, logoClose, "animate__fadeInDown", closeSvg, "animate__rotateIn", ".3s")();
      
        mobileNavHamburgerToggle(mobileNav, "0", mobileItemContainer, "animate__fadeInLeft", mobileSocialMedia, "animate__fadeInUp", mobileContactUs, "animate__fadeInRight")();
  
      }, 1);
    
    });
    
    /* >>>>>>>>>>>> hamburger close click <<<<<<<<<<<< */
  
    mobileNav.find(closeIcon).click(function () {
  
      logoCloseToggle(mobileNav, logoClose, "animate__fadeOutUp", closeSvg, "animate__rotateOut", ".1s")();
  
      mobileNavHamburgerToggle(mobileNav, undefined, mobileItemContainer, "animate__fadeOutLeft", mobileSocialMedia, "animate__fadeOutDown", mobileContactUs, "animate__fadeOutRight")(); 
      
      setTimeout(() => {
        $(mobileNav).css("top", "-100vh");
      }, 300);
      
      setTimeout(() => {
        $(mobileNav).css("opacity", "0");
      }, 1000);
    
    });
  
  
    /* >>>>>>>>>>>> open and close function for mobile nav <<<<<<<<<<<< */
  
    function mobileNavHamburgerToggle(element, topValue, mobileItemContainer, animataionName3, mobileSocialMedia, animataionName4, mobileContactUs, animataionName5) {
      return function() {
        $(element).css("top", topValue);
        $(element).find(".left-column").find(mobileItemContainer).addClass(animataionName3);
        $(element).find(".left-column").find(mobileSocialMedia).addClass(animataionName4);
        $(element).find(".right-column").find(mobileContactUs).addClass(animataionName5);
      };
    }
  
    /* --------------------- hamburger end --------------------- */
  
    /* --------------------- open and close function for logo close start --------------------- */
  
    function logoCloseToggle(element, logoClose, animataionName1, closeSvg, animataionName2, animationDelayAll) {
      return function() {
        $(element).find("*").css("animation-delay", animationDelayAll);
        $(element).find(logoClose).addClass(animataionName1);
        $(element).find(logoClose).find(closeSvg).addClass(animataionName2);
      };
    }
  
    /* --------------------- open and close function for logo close end --------------------- */
  
    /* --------------------- search bar start --------------------- */
  
    /* >>>>>>>>>>>> global variables <<<<<<<<<<<< */
  
    const wideNav = $('nav#wide-screen');
    const wideSearchIcon = $("nav#wide-screen .search-icon");
    const searchBar = $("nav#wide-screen .search-bar");
    const searchBarForm = $("nav#wide-screen .search-bar form");
    const navWhiteSpace = $("nav#wide-screen .white-space");
    const navSearchBarWhiteSpace = $("nav#wide-screen .search-bar-white-space");
  
    /* >>>>>>>>>>>> search bar open click <<<<<<<<<<<< */
  
    wideSearchIcon.click(function () {
  
      $(searchBar).find("*").removeClass("animate__fadeInDown animate__rotateIn animate__fadeIn animate__fadeOutUp animate__rotateOut animate__fadeOut");
  
      $(searchBar).css("opacity", "1");
  
      setTimeout(() => {
  
        logoCloseToggle(searchBar, logoClose, "animate__fadeInDown", closeSvg, "animate__rotateIn", ".3s")();
      
        wideSearchBarToggle(searchBar, "0", searchBarForm, "animate__fadeIn")();
  
      }, 1);
  
      navSearchBarWhiteSpace.css("background-color", "#f9f9f924");
      navSearchBarWhiteSpace.fadeIn();
    
    });
  
    /* >>>>>>>>>>>> search bar close click <<<<<<<<<<<< */
  
    function searchBarCloseCaller(topValue) {
      $(searchBar).find(closeIcon).click(function() {
        searchBarClose(topValue);
      });
    }
  
    function checkWindowWidthForSearchBarClose() {
      var windowWidth = $(window).width();
  
      if (windowWidth >= 1330) {
  
        searchBarClose("-500px");
        searchBarCloseCaller("-500px");
  
      } else if (windowWidth <= 1329 && windowWidth > 1021) {

        searchBarClose("-400px");
        searchBarCloseCaller("-400px");
      
      } else if (windowWidth <= 1021 && windowWidth >= 481){
  
        searchBarClose("-300px");
        searchBarCloseCaller("-300px");
  
      } else if (windowWidth <= 480){
  
        searchBarClose("-200px");
        searchBarCloseCaller("-200px");
      
      }
    }
  
    // check the current window width 
    $(window).resize(checkWindowWidthForSearchBarClose);
    // check the first load window width 
    checkWindowWidthForSearchBarClose();
  
  
    function searchBarClose(topValue) {
  
      logoCloseToggle(searchBar, logoClose, "animate__fadeOutUp", closeSvg, "animate__rotateOut", ".1s")();
  
      wideSearchBarToggle(searchBar, undefined, searchBarForm, "animate__fadeOut")(); 
  
      setTimeout(() => {
        $(searchBar).css("top", topValue);
      }, 300);  
  
      setTimeout(() => {
        $(searchBar).css("opacity", "0");
      }, 1100);
    
      navSearchBarWhiteSpace.fadeOut(1200);
  
    };
  
    /* >>>>>>>>>>>> open and close function for search Bar <<<<<<<<<<<< */
  
    function wideSearchBarToggle(element, topValue, searchBarForm, animataionName) {
      return function() {
        $(element).css("top", topValue);
        $(element).find(searchBarForm).addClass(animataionName);
      };
    }
  
    /* >>>>>>>>>>>> search bar white space start <<<<<<<<<<<< */
  
    navSearchBarWhiteSpace.click(function () {
      navSearchBarWhiteSpace.fadeOut(800);
      searchBarClose();
      checkWindowWidthForSearchBarClose();
    })
  
    /* >>>>>>>>>>>> search bar white space end <<<<<<<<<<<< */
  
    /* --------------------- search bar end --------------------- */
  
    /* --------------------- contact us start --------------------- */
  
    /* >>>>>>>>>>>> global variables <<<<<<<<<<<< */
  
    const contactUs = $("nav#wide-screen > .contact-us");
    const contactUsIcon = $("nav#wide-screen > .right-column .contact-us-icon");
  
    /* >>>>>>>>>>>> contact us icon click <<<<<<<<<<<< */
    
    contactUsIcon.click(function () {
      
      $(contactUs).css("opacity", "1");
  
      setTimeout(() => {
      
        wideContactUsToggle(contactUs, "0")();
  
      }, 1);
  
      navWhiteSpace.css("background-color", "");
      navWhiteSpace.fadeIn();
  
    })
  
    /* >>>>>>>>>>>> contact us close icon click <<<<<<<<<<<< */
  
    contactUs.find(closeIcon).click(function () {
      
      $(contactUs).css("right", "-390px");
      
      setTimeout(() => {
        $(contactUs).css("opacity", "0");
      }, 800);
  
      navWhiteSpace.fadeOut(1000);
    
    });
  
    /* >>>>>>>>>>>> open and close function for contact us <<<<<<<<<<<< */
  
    function wideContactUsToggle(element, rightValue) {
      return function() {
        $(element).css("right", rightValue);
      };
    }
  
    /* --------------------- contact us end --------------------- */
  
    /* --------------------- shopping bag start --------------------- */
  
    const shoppingBag = $("nav#wide-screen .shopping-bag");
    const shoppingBagIcon = $("nav#wide-screen .shopping-bag-icon");
  
    /* >>>>>>>>>>>> shopping bag icon click <<<<<<<<<<<< */
    
    shoppingBagIcon.click(function () {
          
      $(shoppingBag).fadeIn();
      $(shoppingBag).css("display", "flex");
  
      navWhiteSpace.css("background-color", "");
      navWhiteSpace.fadeIn();
  
    })
  
    /* >>>>>>>>>>>> shopping bag close icon click <<<<<<<<<<<< */
  
    shoppingBag.find(closeIcon).click(function () {
      
      $(shoppingBag).fadeOut();
  
      navWhiteSpace.fadeOut();
    
    });
  
    /* --------------------- shopping bag end --------------------- */
  
    /* --------------------- white space start --------------------- */
  
      navWhiteSpace.click(function () {
  
        navWhiteSpace.fadeOut();
        $(contactUs).css("right", "-390px");
        $(shoppingBag).fadeOut();
  
      });
  
    /* --------------------- white space end --------------------- */
  
  
    
  });
  