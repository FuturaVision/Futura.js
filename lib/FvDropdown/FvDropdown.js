/*---------------------------------------------------------------------
	FvDropdown  (FuturaJS)
-----------------------------------------------------------------------*/

/**
 * @class : FvCarousel
 * @classdesc : Easily build your multi-level dropdown menu
 * @site : https://github.com/FuturaVision/FuturaJS.git
 * @licence : MIT
 * @version : v1.0.0
 */

class Dropdown {

    DEFAULT_EVENT = 'click';

    EVENT_LIST = ['fvMenuOpened', 'fvMenuClosed'];

    CONTAINER_CLASS = '.fv-dropdown';

    ACTIVE_DROPDOWN_ATTR = 'data-fv-dropdown-active';

    MENU_ISOPENED_ATTR = 'data-fv-opened-class';

    MENU_ISCLOSED_ATTR = 'data-fv-closed-class';

    EVENT_ATTR = 'data-fv-dropdown-event';

    MENU_CLASS = '.fv-dropdown-menu';

    ITEM_CLASS = '.fv-dropdown-item';

    LINK_CLASS = '.fv-dropdown-link';

    DISPLAY_NONE_CLASS = 'fv-d-none';


    constructor() {

        const menuList = document.querySelectorAll(this.CONTAINER_CLASS);

        menuList.forEach((menu) => {
            menu.getAttribute(this.ACTIVE_DROPDOWN_ATTR) != "false" && this.build(menu);
        })

    }

    getSiblings(elem) {

        let siblings = [], sibling = elem.parentNode.firstChild;

        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling
        }
        return siblings;

    }
    
}

window.Dropdown = Dropdown;

new Dropdown()