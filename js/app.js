(function (window) {
    class WorkApp {
        constructor(name) {
            this.storage = new app.Store(name);
            this.template = new app.Template();
            this.view = new app.View(this.template);
            this.model = new app.Model(this.storage);
            this.controller = new app.Controller(this.model, this.view);
            this.testData = new app.TestData(this.controller);
        }
    }

    const appEmployees = new WorkApp("app-work-list");

    function setView() {
        appEmployees.controller.setView();
    }

    window.addTestData = function (count) {
        appEmployees.testData.createTestsData(count);
    };

    $on(window, "load", setView);
})(window);
