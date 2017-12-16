


function remapKey(event)
{
	if(activeKey == null)
		return;

	activeKey.innerText = String.fromCharCode(event.keyCode).toLowerCase();

	activeKey.classList.remove('active');
	activeKey = null;
}


var activeKey = null;

function activateKey(element)
{
	if(activeKey != null)
		activeKey.classList.remove('active');

	if(element.classList.contains('key'))
	{
		activeKey = element;
		activeKey.classList.add('active');
		return;
	}

	activeKey = null;
};

function setKeyHandler()
{
	document.addEventListener("keyup", function(event){remapKey(event);}
)};


function setClickHandler()
{
	document.addEventListener("click", function(event){activateKey(event.target);}
)};


var g_op='';

function writeLayoutSection(section)
{
	g_op += '\n\n\n\n* ' + section + ' \n***********\n';
	var keys = document.getElementById(section).getElementsByClassName("key");

	var layout_key = '';
	var user_key = '';

	for(var key of keys)
	{
		layout_key = key.getAttribute('key');
		user_key = key.innerText;

		if(layout_key == user_key)
			continue;

		g_op += '\n' + '[' + layout_key + ']>[' + user_key + ']';
	}
}


//todo: wrap this up in a functioan
function saveLayout()
{
	g_op='';

	writeLayoutSection('leftWell');
	writeLayoutSection('rightWell');
	writeLayoutSection('clusters');

	console.log(g_op);
	//prompt for download here

	var selectedLayout = document.getElementById('layoutSelect').value;

	var dlLink = document.getElementById('dl');
	dlLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(g_op);
	dlLink.download = selectedLayout.replace('ly_', 'c_') + '.txt';
	dlLink.click();
}

function drawKeys(layout)
{
	var out = '<div id="leftWell">';

	for(var keys of window[layout + '_left'])
	{
		for(var key of keys)
		{
			out += '<div class="key" key = "' + key + '">' + key + '</div>';
		}
	}

	out += '</div>';

	out += '<div id="rightWell">';

	for(var keys of window[layout + '_right'])
	{
		for(var key of keys)
		{
			out += '<div class="key" key = "' + key + '">' + key + '</div>';
		}
	}

	out += '</div>';
	document.getElementById("kinesis").innerHTML = out;



	out = '<div class = "leftCluster">';
	for(var keys of window['ly_leftCluster'])
	{
		for(var key of keys)
			{
				out += '<div class="key ' + key + '" key = "' + key + '">' + key + '</div>';
			}
	}
	out += '</div>';


	out += '<div class = "rightCluster">';
	for(var keys of window['ly_rightCluster'])
	{
		for(var key of keys)
			{
				out += '<div class="key ' + key + '" key = "' + key + '">' + key + '</div>';
			}
	}
	out += '</div>';
	document.getElementById("clusters").innerHTML = out;
}

drawKeys('ly_qwerty');

setClickHandler();
setKeyHandler();
