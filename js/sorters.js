(function (window) {
  function age(sortOrder) {
    return (a, b) => {
      a = a.age;
      b = b.age;

      if (a > b) {
        return sortOrder === "DESC" ? -1 : 1;
      }

      if (a < b) {
        return sortOrder === "DESC" ? 1 : -1;
      }

      return 0;
    };
  }

  function fullName(sortOrder) {
    const fullName = (item) => item.lastName + item.firstName + item.middleName;

    return (a, b) => {
      a = fullName(a);
      b = fullName(b);

      if (sortOrder === "DESC") {
        return b.localeCompare(a);
      } else {
        return a.localeCompare(b);
      }
    };
  }

  window.app = window.app || {};
  window.app.sorters = {
    age,
    fullName,
  };
})(window);
