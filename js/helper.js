(function (window) {
    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    window.$on = function (element, type, callback) {
        element.addEventListener(type, callback);
    };

    window.getElById = function (id) {
        return document.getElementById(id);
    };

    window.capitalizeFirstLetter = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    window.changeValueDate = function (date) {
        return date.split('-').reverse().join('-');
    }

    window.getCurrentTime = function () {
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        const year = today.getFullYear();
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        const currentTime = `${day}-${month}-${year}`;
        return currentTime;
    };

    window.getAge = function (birthDay) {
        const dateOfBirth = new Date(birthDay);
        const today = new Date();
        const diff = new Date(today.getTime() - dateOfBirth.getTime());
        const age = Number(diff.getUTCFullYear() - 1970);
        return age;
    };

    window.getFormData = function (event) {
        const formData = new FormData(event.target);

        let alldata = (formData) => {
            const obj = {};

            for (let key of formData.keys()) {
                obj[key] = formData.get(key);
            }

            return obj;
        };

        const data = alldata(formData);

        return data;
    };

    window.getId = function () {
        return new Date().getTime().toString(36);
    };

    window.parentFind = function (element, tagName) {
        if (!element.parentNode) {
            return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            return element.parentNode;
        }
        return window.parentFind(element.parentNode, tagName);
    };

    window.$ppevent = function (target, selector, type, callback) {
        function findElem(event) {
            const targetElement = event.target.closest(selector);
            const potentialElements = window.qsa(selector, target);
            hasIn = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
            if (hasIn) {
                callback.call(targetElement, event);
            }
        }
        window.$on(target, type, findElem);
    };

    window.createElementFromHTML = function (htmlString) {
        const div = document.createElement("div");
        div.innerHTML = htmlString.trim();

        return div.firstChild;
    };

    window.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    (window.maxValueBirthDay = function () {
        const today = getCurrentTime();
        const array = today.split("-");
        const tmp = array[0];
        array[0] = array[2];
        array[2] = tmp;
        array[0] = array[0] - 18;
        const value = array.join("-");
        getElById("birthDay").setAttribute("max", value);
    })();

})(window);
