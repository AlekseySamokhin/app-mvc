(function (window) {
  class View {
    constructor(template) {
      this.template = template;

      this.$workList = getElById("workList");

      this.$add = getElById("add");
      this.$form = getElById("form");
      this.$clear = getElById("clear");
      this.$count = getElById("count");
      this.$filter = getElById("filter");
    }

    _fireEmployee = function (data) {
      const element = qs('[data-id="' + data.id + '"]');
      if (data.endWorking) {
        element.replaceWith(
          createElementFromHTML(this.template.fireEmployee(data))
        );
      }
    };

    render(viewCmd, parameter) {
      const self = this;
      const viewCommands = {
        showEmployees: function () {
          self.$workList.innerHTML = self.template.showEmployees(parameter);
        },

        resetForm: function () {
          self.$form.reset();
        },

        resetFilter: function () {
          self.$filter.reset();
        },

        fireEmployee: function () {
          self._fireEmployee(parameter);
        },

        countEmployees: function () {
          self.$count.innerHTML = self.template.showCount(parameter);
        }
      }

      viewCommands[viewCmd]();
    }

    _employeeId = function (element) {
      const parentElement = parentFind(element, "tr");
      return parentElement.dataset.id;
    };

    bind(type, handler) {
      const self = this;
      if (type === "addEmployee") {
        $on(self.$form, "submit", handler)
      }

      if (type === "filtersEmployee") {
        $on(self.$filter, "submit", handler)
      }

      if (type === "fireEmployee") {
        $ppevent(this.$workList, ".delete", "click", function () {
          handler(self._employeeId(this));
        });
      }

    }
  }

  window.app = window.app || {};
  window.app.View = View;
})(window);
