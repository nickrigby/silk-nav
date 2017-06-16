"use strict";
exports.__esModule = true;
var default_1 = (function () {
    /**
     * Contructor
     * @param element
     */
    function default_1(element) {
        var _this = this;
        this.moveClass = 'silc-nav__move';
        this.itemsClass = 'silc-nav__items';
        this.itemClass = 'silc-nav__item';
        this.linkClass = 'silc-nav__link';
        // Save shortcut to element
        this.element = element;
        // Add BEM classes
        this.addBemClasses();
        // Save shortcut to root items
        this.rootItems = element.querySelector('.' + this.itemsClass);
        // Set initial position
        this.position = 0;
        // Create move controle
        this.createMoveControls();
        // Attach click listener
        this.element.addEventListener('click', function (event) {
            _this.moveListener(event);
        });
    }
    /**
     * Add BEM classes
     */
    default_1.prototype.addBemClasses = function () {
        var _this = this;
        [].forEach.call(this.element.querySelectorAll('ul'), function (el) {
            el.classList.add(_this.itemsClass);
        });
        [].forEach.call(this.element.querySelectorAll('li'), function (el) {
            el.classList.add(_this.itemClass);
        });
        [].forEach.call(this.element.querySelectorAll('a'), function (el) {
            el.classList.add(_this.linkClass);
        });
    };
    /**
     * Create controls for moving forward and backward
     */
    default_1.prototype.createMoveControls = function () {
        var _this = this;
        // For each nav items
        [].forEach.call(this.rootItems.querySelectorAll('.' + this.itemsClass), function (items) {
            // Get elements
            var item = items.parentNode;
            var link = item.querySelector('.' + _this.linkClass);
            var childItems = item.querySelector('.' + _this.itemsClass);
            var childItemsFirstItem = childItems.querySelector('.' + _this.itemClass);
            // Get link text
            var linkText = link.innerText;
            // Add parent class
            item.classList.add(_this.itemClass + '--parent');
            // Create more element
            var forward = document.createElement('span');
            forward.classList.add(_this.moveClass, _this.moveClass + '--forward');
            forward.innerHTML = 'More ' + linkText;
            // Create back element
            var back = document.createElement('li');
            back.classList.add(_this.itemClass, _this.moveClass, _this.moveClass + '--back');
            back.innerHTML = linkText;
            // Add forward and back link
            link.appendChild(forward);
            childItems.insertBefore(back, childItemsFirstItem);
        });
    };
    /**
     * Listen for clicks on move elements
     * @param event
     */
    default_1.prototype.moveListener = function (event) {
        var target = event.target;
        if (target.classList.contains(this.moveClass + '--forward') || target.classList.contains(this.moveClass + '--back')) {
            event.preventDefault();
            if (target.classList.contains(this.moveClass + '--forward')) {
                this.position++;
            }
            else {
                this.position--;
            }
            this.move(target);
        }
        event.stopPropagation();
    };
    /**
     * Move through navigation when collapsed
     * @param target
     */
    default_1.prototype.move = function (target) {
        var _this = this;
        // Get parent item
        var parentItem = target.parentNode.parentNode;
        // Hide everything
        [].forEach.call(this.rootItems.querySelectorAll('.' + this.itemsClass), function (el) {
            el.classList.add(_this.itemsClass + '--hidden');
        });
        // Show selected branch
        [].forEach.call(parentItem.querySelectorAll('.' + this.itemsClass), function (el) {
            el.classList.remove(_this.itemsClass + '--hidden');
        });
        // Show selected branch parent tree
        [].forEach.call(this.getParents(target, '.' + this.itemsClass), function (el) {
            el.classList.remove(_this.itemsClass + '--hidden');
        });
        // Get parent items
        var parentItems = parentItem.querySelector('.' + this.itemsClass);
        // Add CSS for move
        this.rootItems.style.left = (this.position * -100) + '%';
        // Add CSS for height
        this.rootItems.style.height = parentItems.offsetHeight + 'px';
    };
    /**
     * Get parent elements of passed in selector
     * @param elem
     * @param selector
     */
    default_1.prototype.getParents = function (elem, selector) {
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
    return default_1;
}());
exports["default"] = default_1;