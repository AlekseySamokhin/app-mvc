(function (window) {
    class Controller {
        constructor(model, view) {
            this.view = view;
            this.model = model;

            this.view.bind("addEmployee", this.addEmployee.bind(this));
            this.view.bind("fireEmployee", this.fireEmployee.bind(this));
            this.view.bind("filtersEmployee", this.filtersEmployee.bind(this));
        }

        addEmployee(event) {
            event.preventDefault();

            const data = getFormData(event);

            if (this.model.isValidForm(data)) {
                this.model.create(data, () => {
                    this.view.render("resetForm");
                    this.showEmployees();
                });
            }
        }

        showEmployees() {
            this.model.read((data) => {
                this.view.render("countEmployees", data);
                this.view.render("showEmployees", data);
            });
        }

        fireEmployee(id) {
            this.model.fire(id, (data) => {
                this.view.render("fireEmployee", data);
                this.showEmployees();
            });
        }

        filtersEmployee(event) {
            event.preventDefault();

            const { sorting, ...filters } = window.getFormData(event);

            this.model.find(sorting, filters, (data) => {
                this.view.render("countEmployees", data);
                this.view.render("showEmployees", data);
            });
        }

        addTestEmployees(data) {
            this.model.createTest(data, () => {
                this.view.render("resetForm");
                this.showEmployees();
            });
        }

        setView() {
            this.showEmployees();
        }
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);
