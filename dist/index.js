"use strict";
var SilkNav = (function () {
    function SilkNav(element) {
        var _this = this;
        // Save shortcut to element
        this.element = element;
        // Save shortcut to root items
        this.rootItems = element.querySelector('.silk-nav__items');
        // Set initial position
        this.position = 0;
        // For each nav items
        [].forEach.call(this.rootItems.querySelectorAll('.silk-nav__items'), function (items) {
            // Get elements
            var item = items.parentNode;
            var link = item.querySelector('.silk-nav__link');
            // Get link text
            var linkText = link.innerText;
            // Add parent class
            item.classList.add('silk-nav__item--parent');
            // Create more element
            var forward = document.createElement('span');
            forward.classList.add('silk-nav__move', 'silk-nav__move--forward');
            forward.innerHTML = 'More ' + linkText;
            // Create back element
            var back = document.createElement('li');
            back.classList.add('silk-nav__item', 'silk-nav__move', 'silk-nav__move--back');
            back.innerHTML = linkText;
            // Add forward and back link
            link.appendChild(forward);
            item.querySelector('.silk-nav__items').prepend(back);
        });
        // Attach click behaviour to forward links
        [].forEach.call(element.querySelectorAll('.silk-nav__move--forward'), function (moreLink) {
            moreLink.addEventListener('click', function (event) {
                _this.position++;
                _this.move(event);
            });
        });
        // Attach click behaviour to back links
        [].forEach.call(element.querySelectorAll('.silk-nav__move--back'), function (backLink) {
            backLink.addEventListener('click', function (event) {
                _this.position--;
                _this.move(event);
            });
        });
    }
    SilkNav.prototype.move = function (event) {
        event.preventDefault();
        // Get parent item
        var parentItem = event.target.parentNode.parentNode;
        // Hide everything
        [].forEach.call(this.rootItems.querySelectorAll('.silk-nav__items'), function (el) {
            el.classList.add('silk-nav__items--hidden');
        });
        // Show selected branch
        [].forEach.call(parentItem.querySelectorAll('.silk-nav__items'), function (el) {
            el.classList.remove('silk-nav__items--hidden');
        });
        // Show selected branch parent tree
        [].forEach.call(this.getParents(event.target, '.silk-nav__items'), function (el) {
            el.classList.remove('silk-nav__items--hidden');
        });
        // Get parent items
        var parentItems = parentItem.querySelector('.silk-nav__items');
        // Add CSS for move
        this.rootItems.style.left = (this.position * -100) + '%';
        // Add CSS for height
        this.rootItems.style.height = parentItems.offsetHeight + 'px';
    };
    SilkNav.prototype.getParents = function (elem, selector) {
        // Element.matches() polyfill for IE and Safari
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        // Setup parents array
        var parents = [];
        // Get matching parent elements
        for (; elem && elem !== document; elem = elem.parentNode) {
            // Add matching parents to array
            if (selector && elem.matches(selector)) {
                parents.push(elem);
            }
        }
        return parents;
    };
    return SilkNav;
}());
exports.SilkNav = SilkNav;
