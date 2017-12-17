
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



function writeLayoutSection(section)
{
	out = '\n\n\n\n* ' + section + ' \n***********\n';
	var keys = document.getElementById(section).getElementsByClassName("key");

	var layout_key = '';
	var user_key = '';

	for(var key of keys)
	{
		layout_key = key.getAttribute('key');
		user_key = key.innerText;

		if(layout_key == user_key)
			continue;

		out += '\n' + '[' + layout_key + ']>[' + user_key + ']';
	}
	return out;
}


//todo: wrap this up in a functioan
function saveLayout()
{
	out = '';

	out += writeLayoutSection('leftWell');
	out += writeLayoutSection('rightWell');
	out += writeLayoutSection('clusters');

	console.log(out);
	//prompt for download here

	var selectedLayout = document.getElementById('layoutSelect').value;

	var dlLink = document.getElementById('dl');
	dlLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(out);
	dlLink.download = selectedLayout.replace('ly_', 'c_') + '.txt';
	dlLink.click();
}


function drawGroup(group)
{
	var layout = document.getElementById('layoutSelect').value;
	var out = '<div id="'+ group + '">';

	for(var row = 0; row < layouts[layout][group].length; row++)
	{
		for(var idx = 0; idx < layouts[layout][group][row].length; idx++)
		{
			var qwt = layouts['ly_qwerty'][group][row][idx];
			var dvk = layouts['ly_dvorak'][group][row][idx];
			var selected = layouts[layout][group][row][idx];
		
			out += '<div class="key" qwerty = "' + qwt + '" dvorak = "' + dvk + '">' + selected + '</div>';
		}
	}

	out += '</div>';
	
	return out;
}


function drawKeys(layout)
{
	var out = '';
	
	document.getElementById("kinesis").innerHTML = '';
	document.getElementById("clusters").innerHTML = '';

	for(var group of Object.keys(layouts[layout]))
	{
		if(group.includes('Well'))
			document.getElementById("kinesis").innerHTML += drawGroup(group);
		else
			document.getElementById("clusters").innerHTML += drawGroup(group);
	}
}

drawKeys('ly_qwerty');

setClickHandler();
setKeyHandler();
