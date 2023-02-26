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

    build(menu) {

        const dropdownOptions = {
            event: menu.getAttribute(this.EVENT_ATTR) ?? this.DEFAULT_EVENT,
        }

        const dropdownItems = menu.querySelectorAll(`${this.ITEM_CLASS}`);

        const allSubMenu = menu.querySelectorAll(`${this.MENU_CLASS} ${this.MENU_CLASS}`);


        allSubMenu.forEach((subMenu) =>
            subMenu.classList.add(this.DISPLAY_NONE_CLASS)
        );

        dropdownItems.forEach((elt) => {

            let link = elt.querySelector(`${this.LINK_CLASS}`);

            let toggleCurrentMenu;

            link.addEventListener(dropdownOptions.event, (e) => {

                e.preventDefault();

                let sblingEltOfParent = this.getSiblings(link.parentElement);

                if (sblingEltOfParent.length) { // All Sub Menu

                    for (let se of sblingEltOfParent) {

                        se.classList.contains(this.ITEM_CLASS.slice(1)) && se.querySelector(this.MENU_CLASS)?.classList.add(this.DISPLAY_NONE_CLASS)
                    }

                    toggleCurrentMenu = link.parentElement.querySelector(this.MENU_CLASS)


                } else { // The Firsts menu

                    for (let e of this.getSiblings(elt.parentElement)) {
                        for (let el of e.querySelectorAll(this.MENU_CLASS)) {
                            el.classList.add(this.DISPLAY_NONE_CLASS)
                        }
                    }
                    toggleCurrentMenu = elt.querySelector(this.MENU_CLASS)

                }

                this.toggleMenuManager(toggleCurrentMenu);

            })

        })
    }

    toggleMenuManager(currentMenu) {

        const [openEvent, closeEvent] = this.createEvent();

        if (currentMenu.classList.contains(this.DISPLAY_NONE_CLASS)) {
            const classToAppend = currentMenu.getAttribute(this.MENU_ISOPENED_ATTR);
            currentMenu.classList.remove(this.DISPLAY_NONE_CLASS);
            classToAppend && currentMenu.classList.add(classToAppend);
            currentMenu.dispatchEvent(openEvent);

        } else {
            const classToAppend = currentMenu.getAttribute(this.MENU_ISCLOSED_ATTR);
            currentMenu.classList.add(this.DISPLAY_NONE_CLASS);
            classToAppend && currentMenu.classList.add(classToAppend);
            currentMenu.dispatchEvent(closeEvent);

        }

    }

}

window.Dropdown = Dropdown;

new Dropdown()