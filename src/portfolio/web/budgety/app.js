// BUDGET MODEL
var model = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calculatePercentage = function() {
			if(data.totals.inc > 0) this.percentage = Math.round(this.value / data.totals.inc * 100);
			else 					this.percentage = -1;
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	}

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type) {
		var total = 0;
		data.allItems[type].forEach(function(current){
				total += Number(current.value);
		});

		data.totals[type] = total;
	};


	var data = {
		
		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		},

		budget: 0,
		percentage: -1

	};

	return {

		addItem: function(type, des, val) {

			var newItem, ID;

			// Create new ID
			if(data.allItems[type].length > 0) ID = data.allItems[type][data.allItems[type].length -1].id + 1
			else 							   ID = 0;
			
			// Create new item based on 'inc' or 'exp' type
			if      (type === 'exp') newItem = new Expense(ID, des, val)
	   		else if (type === 'inc') newItem = new Income(ID, des, val);

			// Push it into the data structure
			data.allItems[type].push(newItem);
			
			// Retrun the new element
			return newItem;

		},

		deleteItem: function(type, id) {

			var ids, index;

			ids = data.allItems[type].map(function(current) {
				return current.id;
			});

			index = ids.indexOf(id);

			if(index !== -1) data.allItems[type].splice(index, 1);

		},

		calculateBudget: function() {

			var budget;

			// Calculate totals
			calculateTotal('inc');
			calculateTotal('exp');

			// Calculate the budget
			data.budget = data.totals.inc - data.totals.exp;
			if(data.totals.inc > 0) data.percentage = Math.round(data.totals.exp/data.totals.inc * 100);
			else                    data.percentage = -1;
		},

		calculatePercentages: function() {

			data.allItems.exp.forEach(function(current) {
				current.calculatePercentage();
			});

		},

		getPercentages: function() {
			
			var allPerc = data.allItems.exp.map(function(current) {
				return current.getPercentage();
			});

			return allPerc;
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: function() {
			console.log(data);
		}
	};

})();

// UI CONTROLLER
var view = (function() {

	var DOMstring = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',

		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		budgetLabel: '.budget__value',
		percentageLabel: '.budget__expenses--percentage',

		container: '.container',

		expensesPercLabel: '.item__percentage',

		dateLabel: '.budget__title--month'
	}

	var formatNumber = function(num, type) {

		var numSplit, int, dec;

		num = Math.abs(num);
		num = num.toFixed(2);

		numSplit = num.split('.');
		int = numSplit[0];
		dec = numSplit[1];

		if (int.length > 3) int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length); // input 23510, output 23,510
		
		if(num == 0)  return num; 

		return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

		

	};

	var nodeListForEach = function(list, callback) {

		for (var i = 0; i < list.length; i++) {
			callback(list[i], i);
		}

	};

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstring.inputType).value, // 'inc' or 'exp'
				description: document.querySelector(DOMstring.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstring.inputValue).value)
			};
			
		},

		addListItem: function(obj, type) {

			var html, newHtml, element;

			// Create HTML string with placeholder text
			if (type === 'inc') {
				element = DOMstring.incomeContainer;
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstring.expensesContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

				// Replace percentage placeholder for expenses
				if (obj.percentage > 0) html = html.replace('%percentage%', obj.percentage + '%');
				else                    html = html.replace('%percentage%', '---');
			}

			// Replace the placeholder text with some actual data
			newHtml =    html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type)); 

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},

		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function() {

			var fields, fielsArr;

			fields = document.querySelectorAll(DOMstring.inputDescription + ', ' + DOMstring.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();
		},

		displayBudget: function(budget) {

			var type = budget.budget > 0 ? 'inc' : 'exp';

			document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(budget.totalInc, 'inc');
			document.querySelector(DOMstring.expenseLabel).textContent = formatNumber(budget.totalExp, 'exp');
			document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(budget.budget, type);

			if(budget.percentage > 0) document.querySelector(DOMstring.percentageLabel).textContent = budget.percentage + '%';
			else    				  document.querySelector(DOMstring.percentageLabel).textContent = '---';
		},

		displayPercentages: function(percentages) {
			
			var fields;

			fields = document.querySelectorAll(DOMstring.expensesPercLabel);

			nodeListForEach(fields, function(current, index) {

				if (percentages[index] > 0) current.textContent = percentages[index] + '%'
				else 						current.textContent = '---';
			});

		},

		displayMonth: function() {
			var now, year, month, months;
			
			now = new Date();

			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			month = months[now.getMonth()-1];

			year = now.getFullYear();

			document.querySelector(DOMstring.dateLabel).textContent = month + ' ' + year;
		},

		changedType: function(event) {

			var fields = document.querySelectorAll(
				DOMstring.inputType + ',' +
				DOMstring.inputDescription + ',' +
				DOMstring.inputValue
			);

			nodeListForEach(fields, function(current) {
				current.classList.toggle('red-focus');
			});

			document.querySelector(DOMstring.inputBtn).classList.toggle('red');
		},

		getDomStrings: function() {
			return DOMstring;
		}
	}

})();


// GLOBAL APP CONTROLLER
var controller = (function(model, view) {

	var DOM = view.getDomStrings();

	// Set the default type to income 
	// so that if we refresh the browser after added a new expense the toggle of the changeType function works as expected
	var setDefaultType = function() {
		document.querySelector(DOM.inputType).value = 'inc';
	};

	var setupEventListeners = function() {

		

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.wich === 13) ctrlAddItem();
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

		document.querySelector(DOM.inputType).addEventListener('change', view.changedType);
	};

	var updateBudget = function() {
		// 1. Calculate the budget
		model.calculateBudget();

		// 3. Display the budget on the UI
		view.displayBudget(model.getBudget());
	};

	var updatePercentages = function() {
		var percentages;
		// Calculate percentages
		model.calculatePercentages();

		// Read percentages from the model
		percentages = model.getPercentages();

		// Update the UI width the new percentages
		view.displayPercentages(percentages);
	};

	var ctrlAddItem = function() {

		// 1. Get the field input data
		var input = view.getInput();

		if(input.description && input.value) {
			// 2. Add the item to the budget controller
			var newItem = model.addItem(input.type, input.description, input.value);
			var incomeList = document.querySelector('.income__list');

			// 3. Add the item to the UI
			view.addListItem(newItem, input.type);

			// 4. Clear input fields
			view.clearFields();

			// 5. Calculate and update budget
			updateBudget();
			updatePercentages();
		}

	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			
			//inc-1
			splitID = itemID.split('-');
			type = splitID[0];
			id = parseInt(splitID[1]);

			// Delete item from the data model
			model.deleteItem(type, id);

			// Delete item from the UI
			view.deleteListItem(itemID);

			// Update budget
			updateBudget();
			updatePercentages();
		}

	}

	return {
		init: function() {
			view.displayBudget(model.getBudget());
			view.displayMonth();
			setDefaultType();
			setupEventListeners();
		}
	};

})(model, view);

controller.init();