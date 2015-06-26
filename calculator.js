$(document).ready(function() {
	$('li.step:first-child').show();
});

$(document).ready(function() {
	$('button.next').on("click",nextStep);
});

$(document).ready(function() {
	$('button.redo').on("click",reStart);
});

$(document).ready(function() {
	$('.fa-question-circle').on("mouseover",showTip);
});

$(document).ready(function() {
	$('.fa-question-circle').on("mouseout",hideTip);
});

$(document).ready(function() {
	$('.fa-arrow-circle-left').on("click",stepBack);
});

function nextStep() {
	var theParent = $(this).parent();
	var theGrandparent = $(theParent).parent();
	var theCurrent = theGrandparent[0];
	var theNext = $(theCurrent).next();
	$(theNext).slideDown();
	$(theCurrent).animate({height: "65px"},"slow").addClass('completed');
	if($(this).is('.lastIns')) {
		calNum();
	}
	if($(this).is('.lastAPR')) {
		calNum2();
	}
}

function reStart() {
	var theListItems = $('ul.calculator-steps').children();
	for(var i = 0; i < 7; i++) {
		$(theListItems[i]).css("height","auto").removeClass('completed').slideUp();
	}
	reStartSecond();
}

function reStartSecond() {
	$('li.step.zero').slideDown(); 
}

function stepBack() {
	var theStep = $($(this).parent()).parent();
	$(theStep).css("height","auto").removeClass('completed').slideUp();
	var thePrevious = $(theStep).prev();
	window.setTimeout(function() {
		$(thePrevious).css("height","auto").removeClass('completed').slideDown();
	}, 500);
	
}

function showTip() {
	var mySibs = $($($(this).parent()).parent()).children();
	var theTip = mySibs[1];
	$(theTip).show("slow");
}

function hideTip() {
	var mySibs = $($($(this).parent()).parent()).children();
	var theTip = mySibs[1];
	$(theTip).hide("slow");	
}

function calNum()
{
    var interest = parseInt(document.getElementById('inter').options[document.getElementById('inter').selectedIndex].value,10);
	var interestRate = 1 + (interest/100);
	var inflation = parseInt(document.getElementById('infl').options[document.getElementById('infl').selectedIndex].value,10);
	var inflateRate = 1 + (inflation/100);
	var dependent = parseInt(document.getElementById('perc').options[document.getElementById('perc').selectedIndex].value,10);
	var income = parseInt(document.getElementById('inc').value,10);
	var dependentNeeds = income * (dependent/100);
	
	var incomeIndex = [];
	incomeIndex[0] = dependentNeeds;
	var incomeInflated = dependentNeeds;
	
	var years = parseInt(document.getElementById('yrs').options[document.getElementById('yrs').selectedIndex].value,10);

	for(i = 0; i < years - 1; i++) {
		incomeInflated = incomeInflated * inflateRate;
		incomeIndex.unshift(incomeInflated);
	}
	
	var invCapital = incomeIndex[0];
	for(i = 0; i < years - 1; i++) {
		var remCapital = invCapital / interestRate;
		invCapital = remCapital + incomeIndex[i + 1];
	}

	finalResult = Math.round(invCapital);
	console.log(finalResult);
	var toPrint = finalResult.toLocaleString('en', {style: 'currency', currency: 'USD'});

	document.getElementById('endval').innerHTML = toPrint;
}
