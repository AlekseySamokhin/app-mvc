(function (window) {
  class Template {
    constructor() {
      this.defaultTemplate = (data) => `
        <tr data-id={{id}}>
            <th> {{number}} </th>
            <th> {{lastName}} {{firstName}} {{middleName}} </th> 
            <th> {{gender}} </th>
            <th> {{birthDate}} </th>
            <th> {{age}} </th> 
            <th> {{education}} </th>
            <th> {{startWorking}} </th>
            <th> ${data.endWorking ? `{{endWorking}}` : `Отсутствует`} </th>
            <th> ${data.endWorking ? `<div> Уволен </div>` : `<div> Работает </div>`} </th>
            <th> ${data.endWorking ? `<button disabled class="btn btn-primary btn-m"> Уволен </button>` : `<button class="delete btn btn-error btn-m"> Уволить </button>`} </th>
        </tr>
      `;

      this.countTemplate = `
        <div>
          <p> Всего сотрудников в системе: {{count}} </p>
          <p> Уволенных: {{fired}} </p>
          <p> Работающих: {{working}} </p>
        </div>
      `;
    }

    showEmployees(data, temp) {
      let i, l;
      let view = "";
      for (i = 0, l = data.length; i < l; i++) {
        let template = temp || this.defaultTemplate(data[i]);

        if (data[i].gender === "male") {
          template = template.replace("{{gender}}", "Мужской");
        } else {
          template = template.replace("{{gender}}", "Женский");
        }

        if (data[i].education === "educated") {
          template = template.replace("{{education}}", "Есть");
        } else {
          template = template.replace("{{education}}", "Нет");
        }

        template = template.replace("{{number}}", i + 1);
        template = template.replace("{{id}}", data[i].id);
        template = template.replace("{{lastName}}", data[i].lastName);
        template = template.replace("{{firstName}}", data[i].firstName);
        template = template.replace("{{middleName}}", data[i].middleName);
        template = template.replace("{{age}}", data[i].age);
        template = template.replace("{{birthDate}}", data[i].birthDate);
        template = template.replace("{{startWorking}}", data[i].startWorking);
        template = template.replace("{{endWorking}}", data[i].endWorking);

        view = view + template;
      }

      return view;
    }

    fireEmployee(data) {
      const template = this.defaultTemplate(data);

      return this.showEmployees(data, template);
    }

    showCount(data) {
      const count = data.length;
      let working = 0;
      let fired = 0;

      let template = this.countTemplate;

      for (let i = 0; i < count; i++) {
        if (data[i].status === "working") {
          working++
        } else if (data[i].status === "fire") {
          fired++
        }
      }

      template = template.replace("{{count}}", count);
      template = template.replace("{{working}}", working);
      template = template.replace("{{fired}}", fired);

      return template;
    }
  }

  window.app = window.app || {};
  window.app.Template = Template;
})(window);
