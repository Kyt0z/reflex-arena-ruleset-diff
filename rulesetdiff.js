const sign = [
  {'symbol': '-', 'literal': 'negative', 'change': 'decreased', 'absolute': 'disabled'},
  {'symbol': '+', 'literal': 'positive', 'change': 'increased', 'absolute': 'enabled'}
];
const shape = ['pill', 'bullet'];

let ruleset = {
  '1': {'name': 'Ruleset 1', 'file': null, 'str': null, 'gconstVals': null, 'gconstDefs': null},
  '2': {'name': 'Ruleset 2', 'file': null, 'str': null, 'gconstVals': null, 'gconstDefs': null}
};

function countDecimals(num)
{
  if(num === undefined)
    return 0;

  const numStrs = num.toString().split('.');
  if(numStrs.length < 2)
    return 0;

  return numStrs[1].length;
}

function parseRuleset(rulesetVars, rulesetStr)
{
  for(let line of rulesetStr.split('\n'))
  {
    line = line.trim();
    if(line.length > 0 && line.substring(0, 7) == 'gconst_')
    {
      line = line.split(' ');
      rulesetVars[line[0]] = line[1];
    }
  }
}

function formatNumber(num, decimals)
{
  if(!convertToNumbers.checked)
    return num;

  num = Number(num);
  return roundNumbers.checked && decimals ? num.toFixed(decimals) : num;
}

function updateDiffCell(varName, gconstVal1, gconstVal2, resetOnly, decimals)
{
  const diffCell = document.getElementById(varName).getElementsByClassName('diff')[0];
  diffCell.classList.remove('negative', 'positive');
  diffCell.innerText = '';

  if(resetOnly)
    return;

  const gconstNum1 = Number(gconstVal1);
  const gconstNum2 = Number(gconstVal2);

  const gconstDiff = formatNumber(gconstNum2 - gconstNum1, decimals);
  if(gconstDiff == 0)
    return;

  const diffSign = +(gconstDiff > 0);

  diffCell.classList.add(sign[diffSign].literal);
  diffCell.innerText = `${sign[diffSign].symbol}${Math.abs(gconstDiff)}`;

  switch(varName)
  {
    case 'gconst_player_isbullet':
      changelog.textContent += `Player hitbox changed from ${shape[gconstNum1]} to ${shape[gconstNum2]}`;
      break;
    case 'gconst_expose_timers_to_lua':
    case 'gconst_powerups_drop':
    case 'gconst_wallclipping':
      changelog.textContent += `${varName} ${sign[diffSign].absolute}`;
      break;
    default:
      const diffRelative = Number(gconstDiff / gconstNum1 * 100);
      const decimalsRelative = Math.min(countDecimals(diffRelative), 2);
      changelog.textContent += `${varName} ${sign[diffSign].change} from ${gconstVal1} to ${gconstVal2}`
      changelog.textContent += ` (${sign[diffSign].symbol}${Math.abs(diffRelative.toFixed(decimalsRelative))}%)`;
  }
  changelog.textContent += '\n';
}

function updateColumns(num)
{
  for(const varGroup of gconstVars)
  {
    let groupDefaults = null;
    for(const [varName, defaultVal] of Object.entries(varGroup))
    {
      const gconstRow = document.getElementById(varName);
      const gconstCell0 = gconstRow.getElementsByClassName('val0')[0];
      const gconstCell1 = gconstRow.getElementsByClassName(`val${num}`)[0];
      const gconstCell2 = gconstRow.getElementsByClassName(`val${num % 2 + 1}`)[0];

      let gconstVal = null;
      if(ruleset[num].gconstVals[varName] !== undefined)
      {
        gconstVal = formatNumber(ruleset[num].gconstVals[varName]);
        gconstCell1.classList.remove('unset');
      }
      else
      {
        gconstVal = formatNumber(defaultVal);
        gconstCell1.classList.add('unset');
        if(!groupDefaults)
          groupDefaults = {};
        groupDefaults[varName] = gconstVal;
      }

      if(gconstCell1.classList.contains('unset') || gconstCell2.classList.contains('unset'))
        gconstCell0.classList.remove('unset');
      else
        gconstCell0.classList.add('unset');

      const decimals = Math.max(countDecimals(gconstVal), countDecimals(gconstCell2.innerText))
      gconstCell1.innerText = formatNumber(gconstVal, decimals);

      const resetOnly = gconstCell2.innerText == '';
      if(!resetOnly)
        gconstCell2.innerText = formatNumber(gconstCell2.innerText, decimals);

      if(num == 1)
        updateDiffCell(varName, gconstCell1.innerText, gconstCell2.innerText, resetOnly, decimals);
      else
        updateDiffCell(varName, gconstCell2.innerText, gconstCell1.innerText, resetOnly, decimals);
    }

    if(groupDefaults)
      ruleset[num].gconstDefs.push(groupDefaults);

    if(changelog.textContent.slice(-2) != '\n\n')
      changelog.textContent += '\n';
  }
}

const fileSelect1 = document.getElementById('fileSelect1');
const fileSelect2 = document.getElementById('fileSelect2');
const showDefaults = document.getElementById('showDefaults');
const convertToNumbers = document.getElementById('convertToNumbers');
const roundNumbers = document.getElementById('roundNumbers');
const saveButton1 = document.getElementById('saveButton1');
const saveButton2 = document.getElementById('saveButton2');
const changelog = document.getElementById('changelog');

convertToNumbers.checked = true;
roundNumbers.checked = true;
saveButton1.disabled = true;
saveButton2.disabled = true;

function selectFile(num, fileSelect, saveButton, callback)
{
  if(num != 1 && num != 2)
    return;

  if(!fileSelect)
    return;

  if(!saveButton)
    saveButton = {'disabled': false};
  saveButton.disabled = true;

  if(!callback)
    callback = function() {};

  ruleset[num].file = fileSelect.files[0];
  if(!ruleset[num].file)
    return;

  ruleset[num].name = ruleset[num].file.name.slice(8, -4);
  for(const elem of document.getElementsByClassName(`rulesetName${num}`))
    elem.innerText = ruleset[num].name;

  changelog.textContent = `Changes from ${ruleset[1].name} to ${ruleset[2].name}:\n\n`;
  ruleset[num].gconstVals = {};
  ruleset[num].gconstDefs = [];

  const fileReader = new FileReader();
  fileReader.onload = function(event)
  {
    ruleset[num].str = event.target.result;
    parseRuleset(ruleset[num].gconstVals, ruleset[num].str);
    updateColumns(num);
    saveButton.disabled = false;
    callback();
  };
  fileReader.readAsText(ruleset[num].file);
}

function toggleDefaults(showDefaults)
{
  for(const elem of document.getElementsByClassName('val0'))
    elem.style.display = showDefaults.checked ? 'table-cell' : 'none';
}

function toggleRounding(convertToNumbers, roundNumbers, fileSelect1, fileSelect2, saveButton1, saveButton2)
{
  if(convertToNumbers.checked)
  {
    roundNumbers.disabled = false;
  }
  else
  {
    roundNumbers.checked = false
    roundNumbers.disabled = true;
  }

  selectFile(1, fileSelect1, saveButton1, () => selectFile(2, fileSelect2, saveButton2));
}

function saveRuleset(num)
{
  if(num != 1 && num != 2)
    return;

  if(!ruleset[num].file)
    return;

  let rulesetFullStr = ruleset[num].str;
  if(ruleset[num].gconstDefs.length)
  {
    rulesetFullStr += '\n\n// default values (Competitive) appended by rulesetdiff';
    for(const varGroup of ruleset[num].gconstDefs)
    {
      rulesetFullStr += '\n';
      for(const [varName, defaultVal] of Object.entries(varGroup))
        rulesetFullStr += `${varName} ${defaultVal}\n`;
    }

    if(rulesetFullStr.slice(-1)[0] == '\n')
      rulesetFullStr = rulesetFullStr.slice(0, -1);
  }

  const elem = document.createElement('a');
  elem.style.display = 'none';
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rulesetFullStr));
  elem.setAttribute('download', `ruleset_${ruleset[num].name}_full.cfg`);

  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

fileSelect1.addEventListener('change', (event) => selectFile(1, event.currentTarget, saveButton1));
fileSelect2.addEventListener('change', (event) => selectFile(2, event.currentTarget, saveButton2));
showDefaults.addEventListener('change', (event) => toggleDefaults(event.currentTarget));
convertToNumbers.addEventListener('change', (event) => toggleRounding(event.currentTarget, roundNumbers, fileSelect1, fileSelect2, saveButton1, saveButton2));
roundNumbers.addEventListener('change', (event) => toggleRounding(convertToNumbers, event.currentTarget, fileSelect1, fileSelect2, saveButton1, saveButton2));
saveButton1.addEventListener('click', () => saveRuleset(1));
saveButton2.addEventListener('click', () => saveRuleset(2));

for(const varGroup of gconstVars)
{
  let varCell = null;
  let valCell0 = null;
  let valCell1 = null;
  let valCell2 = null;
  let diffCell = null;
  for(const [varName, defaultVal] of Object.entries(varGroup))
  {
    const row = document.createElement('tr');
    row.id = varName;

    varCell = document.createElement('td');
    varCell.innerText = varName;
    varCell.classList.add('variable');

    valCell0 = document.createElement('td');
    valCell0.innerText = defaultVal;
    valCell0.classList.add('val0');

    valCell1 = document.createElement('td');
    valCell1.classList.add('val1');

    valCell2 = document.createElement('td');
    valCell2.classList.add('val2');

    diffCell = document.createElement('td');
    diffCell.classList.add('diff');

    row.appendChild(varCell);
    row.appendChild(valCell0);
    row.appendChild(valCell1);
    row.appendChild(valCell2);
    row.appendChild(diffCell);

    document.getElementById('gconstTable').appendChild(row);
  }
  varCell.classList.add('bottom');
  valCell0.classList.add('bottom');
  valCell1.classList.add('bottom');
  valCell2.classList.add('bottom');
  diffCell.classList.add('bottom');
}
toggleDefaults(showDefaults);
toggleRounding(convertToNumbers, roundNumbers, fileSelect1, fileSelect2, saveButton1, saveButton2);