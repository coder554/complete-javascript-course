// Budget Controller
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, description, value) {
      var newItem, ID;
      var dataLength = data.allItems[type].length;
      if (dataLength > 0) {
        ID = data.allItems[type][dataLength - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "inc") {
        newItem = new Income(ID, description, Number(value));
      } else if (type === "exp") {
        newItem = new Expense(ID, description, Number(value));
      }
      data.totals[type] = data.totals[type] + Number(value);
      data.allItems[type].push(newItem);
      return newItem;
    }
  };
})();

// UI Controller
var UIController = (function() {
  var domQueryNames = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  return {
    getInputs: function() {
      return {
        type: document.querySelector(domQueryNames.inputType).value,
        description: document.querySelector(domQueryNames.inputDescription)
          .value,
        value: document.querySelector(domQueryNames.inputValue).value
      };
    },
    getDomQueries: function() {
      return domQueryNames;
    },
    addListItem: function(obj, type) {
      var firstWrapper = document.createElement("div");
      firstWrapper.className = "item clearfix";
      firstWrapper.id = type + "-" + obj.id;
      var descriptionTag = document.createElement("div");
      descriptionTag.className = "item__description";
      descriptionTag.innerText = obj.description;
      var valueWrapper = document.createElement("div");
      valueWrapper.className = "right clearfix";
      var inputValueElement = document.createElement("div");
      inputValueElement.className = "item__value";
      inputValueElement.innerText = obj.value;
      var deleteBtnWrapper = document.createElement("div");
      deleteBtnWrapper.className = "item__delete";
      var deleteBtnElement = document.createElement("button");
      deleteBtnElement.className = "item__delete--btn";
      var deleteIconElement = document.createElement("i");
      deleteIconElement.className = "ion-ios-close-outline";
      deleteBtnElement.appendChild(deleteIconElement);
      deleteBtnWrapper.appendChild(deleteBtnElement);
      valueWrapper.appendChild(inputValueElement);
      valueWrapper.appendChild(deleteBtnWrapper);
      firstWrapper.appendChild(descriptionTag);
      firstWrapper.appendChild(valueWrapper);
      if (type === "inc") {
        var incWrapper = document.querySelector(".income__list");
        incWrapper.appendChild(firstWrapper);
      } else if (type === "exp") {
        var expWrapper = document.querySelector(".expenses__list");
        expWrapper.appendChild(firstWrapper);
      }
    }
  };
})();

// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var domQueryNames = UICtrl.getDomQueries();

    document
      .querySelector(domQueryNames.inputBtn)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    // Get the field input data
    var inputs = UICtrl.getInputs();

    // Add the item to the budget controller
    var newItem = budgetCtrl.addItem(
      inputs.type,
      inputs.description,
      inputs.value
    );
    UICtrl.addListItem(newItem, inputs.type);
  };

  return {
    init: function() {
      console.log("Application has been started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
