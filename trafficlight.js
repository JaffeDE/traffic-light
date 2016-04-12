$(document).ready(function() {
	init();
});

const TL_WRAPPER = '<td class="border-right"></td>';
const TL_HTML = '<div class="traffic-light off"></div>';
const MAX_STATE = 8;

var currentState = 0;

var stateTable = [
	['green','red','green','red','red','red','red','red'],
	['yellow','red','yellow','red','red','red','red','red'],
	['red','red','red','red','red','green','red','green'],
	['red','red','red','red','red','yellow','red','yellow'],
	['red','red','red','red','green','red','green','red'],
	['red','red','red','red','yellow','red','yellow','red'],
	['red','green','red','green','red','red','red','red'],
	['red','yellow','red','yellow','red','red','red','red'],
]

function doLayout() {
	tlContainer = $('.traffic-light');
	for (var i=0; i<MAX_STATE; i++) {
		var tl = $(TL_WRAPPER);
		tl = tl.append($(TL_HTML).attr('pole', 'light'+i).addClass('red off'));
		tl = tl.append($(TL_HTML).attr('pole', 'light'+i).addClass('yellow off'));
		tl = tl.append($(TL_HTML).attr('pole', 'light'+i).addClass('green off'));
		tlContainer.append(tl);
	}
}

function updateStateText(currentState) {
	$('.current-state').text(currentState);
}

function nextStateClick(currentState) {
	currentState = nextState(currentState);
	updateLights(currentState);
	updateStateText(currentState);
	return currentState;
}

function nextState(currentState) {
	currentState++;
	if (currentState == MAX_STATE) {
		currentState = 0;
	}
	return currentState;
}

function updateLights(state) {
	for (var i=0; i<MAX_STATE; i++) {
		var lights = $('[pole="light'+i+'"]');
		for (var j=0; j<lights.length; j++) {
			var whichLight = stateTable[state][i];
			if ($(lights[j]).hasClass(whichLight)) {
				$(lights[j]).removeClass('off');
			} else {
				$(lights[j]).addClass('off');
			}
		}
	}
}

function init() {
	doLayout();
	updateLights(currentState);
	updateStateText(currentState);
	$('button').click(function() {
		currentState = nextStateClick(currentState);
	});
}