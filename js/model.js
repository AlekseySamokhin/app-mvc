(function (window) {
  class Model {
    constructor(storage) {
      this.storage = storage;
    }

    create(data, callback) {
      callback = callback || function () { };

      data = {
        lastName: capitalizeFirstLetter(data.lastName),
        firstName: capitalizeFirstLetter(data.firstName),
        middleName: capitalizeFirstLetter(data.middleName),
        birthDate: changeValueDate(data.birthDate),
        age: getAge(data.birthDate),
        gender: data.gender,
        education: data.education,
      }

      this.storage.create(data, callback);
    }

    createTest(data, callback) {
      callback = callback || function () { };

      data = {
        lastName: capitalizeFirstLetter(data.lastName),
        firstName: capitalizeFirstLetter(data.firstName),
        middleName: capitalizeFirstLetter(data.middleName),
        birthDate: changeValueDate(data.birthDate),
        age: getAge(data.birthDate),
        gender: data.gender,
        education: data.education,
        id: data.id,
        startWorking: changeValueDate(data.startWorking),
        endWorking: data.endWorking,
        status: data.status,
      }



      this.storage.createTest(data, callback);
    }

    read(callback) {
      this.storage.findAll(callback);
    }

    fire(id, callback) {
      const updateData = {
        status: "fire",
        endWorking: getCurrentTime(),
      };

      this.update(updateData, id, callback);
    }

    find(sorting, filters, callback) {
      if (filters) {
        for (let key in filters) {
          if (filters[key] === "all") {
            delete filters[key];
            continue;
          }

          if (key === "age") {
            filters[key] = app.filters[filters[key]];
          }
        }
      }

      if (sorting) {
        const arr = sorting.split(" ");

        const sort = arr[0];
        const sortOrder = arr[1];

        sorting = app.sorters[sort](sortOrder);
      }

      this.storage.find(sorting, filters, callback);
    }

    update(updateData, id, callback) {
      this.storage.update(updateData, id, callback);
    }

    remove(id, callback) {
      this.storage.remove(id, callback);
    }

    isValidForm(data) {
      if (
        data.lastName.trim() &&
        data.firstName.trim() &&
        data.middleName.trim() &&
        data.birthDate != ""
      ) {
        return true;
      }

      alert("Заполните, пожалуйста, все поля формы");

      return false;
    }
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
