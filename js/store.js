(function (window) {
  class Store {
    constructor(name) {
      this._dbName = name;

      if (!localStorage.getItem(name)) {
        const employees = [];

        localStorage.setItem(name, JSON.stringify(employees));
      }

    }

    create(data, callback) {
      callback = callback || function () { };

      const employees = JSON.parse(localStorage.getItem(this._dbName));

      data.id = getId();
      data.startWorking = getCurrentTime();
      data.endWorking = null;
      data.status = "working";

      employees.push(data);

      localStorage.setItem(this._dbName, JSON.stringify(employees));

      callback(employees);
    }

    createTest(data, callback) {
      callback = callback || function () { };

      const employees = JSON.parse(localStorage.getItem(this._dbName));

      employees.push(data);

      localStorage.setItem(this._dbName, JSON.stringify(employees));

      callback(employees);
    }

    update(updateData, id, callback) {
      const employees = JSON.parse(localStorage.getItem(this._dbName)) || [];

      callback = callback || function () { };

      let item;

      for (var i = 0; i < employees.length; i++) {
        if (employees[i].id === id) {
          for (var key in updateData) {
            employees[i][key] = updateData[key];
          }
          item = employees[i];
          break;
        }
      }

      localStorage.setItem(this._dbName, JSON.stringify(employees));
      callback(item);
    }

    find(sorting, filters, callback) {
      let employees = JSON.parse(localStorage.getItem(this._dbName));

      if (filters) {
        employees = employees.filter(function (item) {
          let _return = true;

          for (let key in filters) {
            let value = filters[key];

            if (typeof value === "function") {
              _return = _return && value(item[key]);
            } else {
              _return = _return && item[key] === filters[key];
            }
          }
          return _return;
        });

      }

      if (sorting) {
        employees = employees.sort(sorting);
      }

      callback(employees);
    }

    findAll(callback) {
      const employees = JSON.parse(localStorage.getItem(this._dbName));

      callback(employees);
    }
  }

  window.app = window.app || {};
  window.app.Store = Store;
})(window);
