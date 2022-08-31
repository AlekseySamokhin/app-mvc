(function (window) {
  class TestData {
    constructor(controller) {
      this.controller = controller;
    }

    maleFirstNames = ["Иван", "Aлексей", "Георгий", "Владимир", "Кирилл"];
    maleLastNames = ["Смирнов", "Самохин", "Иванов", "Путин", "Симонов"];
    maleMiddleNames = ["Алексеевич", "Дмитриевич", "Георгеевич", "Павлович", "Сергеевич"];

    femaleFirstNames = ["Кристина", "Екатерина", "Елизавета", "Юля", "Надежда"];
    femaleLastNames = ["Ковалева", "Павлицкая", "Адисултанова", "Омельян", "Морозова"];
    femaleMiddleNames = ["Алексеевна", "Павловна", "Антоновна", "Сергеевна", "Геннадьевна"];

    getTestData() {
      let rndInt1 = getRandomInt(0, 4);
      let rndInt2 = getRandomInt(0, 4);
      let rndInt3 = getRandomInt(0, 4);
      let rndInt4 = getRandomInt(20, 65);
      let rndInt5 = getRandomInt(1, 12);
      let rndInt6 = getRandomInt(1, 28);

      let education = "";
      let gender = "";
      let status = ""
      let firstNames;
      let lastNames;
      let middleNames;

      if (rndInt5.toString().length == 1) {
        rndInt5 = "0" + rndInt5;
      }

      if (rndInt6.toString().length == 1) {
        rndInt6 = "0" + rndInt6;
      }

      let startWorking = `${2022 - rndInt1}-${rndInt5}-${rndInt6}`
      let endWorking = `${2022}-${rndInt5}-${rndInt6}` 
      let birthDate = `${2022 - rndInt4}-${rndInt5}-${rndInt6}`

      if(endWorking) {
        endWorking = changeValueDate(endWorking)
      } 

      if (rndInt1 % 2 == 0) {
        status = "fire";
      } else {
        status = "working";
        endWorking = null;
      }

      if (rndInt4 % 3) {
        education = "educated";
      }

      if (rndInt1 % 2 == 0) {
        gender = "male";
        firstNames = this.maleFirstNames;
        lastNames = this.maleLastNames;
        middleNames = this.maleMiddleNames;
      } else {
        gender = "female"; firstNames = this.femaleFirstNames;
        lastNames = this.femaleLastNames;
        middleNames = this.femaleMiddleNames;
      }

      const testEmployee = {
        firstName: firstNames[rndInt1],
        lastName: lastNames[rndInt2],
        middleName: middleNames[rndInt3],
        startWorking,
        endWorking,
        status,
        id: getId(),
        birthDate,
        age: getAge(birthDate),
        gender,
        education,
      }

      return testEmployee;
    }

    createTestsData(value) {
      for (let i = 0; i < value; i++) {
        this.controller.addTestEmployees(this.getTestData());
      }
    }

  }

  window.app = window.app || {};
  window.app.TestData = TestData;
})(window);