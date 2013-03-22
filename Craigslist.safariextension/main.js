var text;
var number="";
var firstMatchLoc;
var lastMatchLoc;
var maxDelta;

window.addEventListener('DOMContentLoaded', function() {
  
  var elm = document.getElementById('postingbody');
  if (null == elm)
    return;

  text = elm.innerText;
  var pos=0, len=text.length, loc, match;
  
  //console.log("Scanning...");
  var counts = 100;
  
  while (pos < len && counts-- >=0)
  {
    loc = text.search(/\d|eight|five|four|nine|one|six|seven|two|three|zero/i);
    if (loc < 0)
      break;
     
    
    if (text[loc].match(/\d/))
    {
      emitDigit(text[loc], pos+loc);
      loc += 1; // length of digit
    }
    else 
    if (match = text.match(/^(eight|five|four|nine|one|six|seven|two|three|zero)/i))
    {
      emitTextDigit(match[0], pos+loc);

      loc += match[0].length;
    }

    pos += loc;
    text = text.slice(loc);
  }
  
  checkNumber(-1);
  
  
}, false);


function checkNumber(loc)
{
  // //console.log("Check %d (%d)", loc, number.length);
  if (loc > 0 && loc - lastMatchLoc <= maxDelta)
    return;

  
  if (number.length == 10)
  {
    //console.log("---- Number at (%d..%d): %s ----", firstMatchLoc, lastMatchLoc, number);
    number = number.replace(/(\d{3})(\d{3})(\d{4})/i, "($1) $2-$3");
    var elm = document.getElementById('postingbody');
    var st = elm.innerText.substr(0,firstMatchLoc);
    var en = elm.innerText.slice(lastMatchLoc+maxDelta);
    elm.innerText = st + number + en;
  }
  
  //console.log("---- Resetting (MaxDelta: %d, delta:%d)----", maxDelta, loc - lastMatchLoc);

  number = "";
  firstMatchLoc = loc;
}


function emitDigit(digit, loc)
{
  checkNumber(loc);
  maxDelta = 1+1;
  
  number += digit;
  //console.log("Found i Digit: %d at %d; delta: %d", digit, loc, loc - lastMatchLoc);

  lastMatchLoc = loc;
}

function emitTextDigit(str, loc)
{
  checkNumber(loc);
  maxDelta = str.length + 1;
  
  //console.log("Found s Digit: %s at %d", str, loc);
  switch(str.toLowerCase())
  {
    case 'one':   number += 1; break;
    case 'two':   number += 2; break;
    case 'three': number += 3; break;
    case 'four':  number += 4; break;
    case 'five':  number += 5; break;
    case 'six':   number += 6; break;
    case 'seven': number += 7; break;
    case 'eight': number += 8; break;
    case 'nine':  number += 9; break;
    case 'zero':  number += 0; break;
    default: break;
  }

  lastMatchLoc = loc;
}