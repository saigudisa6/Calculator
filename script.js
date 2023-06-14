
// setting up the document
document.querySelectorAll('.block').forEach( (el) => el.addEventListener('click', (e) => {numFound(e)}));
document.querySelector('.zero').addEventListener('click', (e) => {numFound(e)});

document.querySelectorAll('.op-block').forEach( (el) => el.addEventListener('click', (e) => {operandFound(e)}));

document.querySelector('.clear').addEventListener('click', (e) => {clear(e)});
document.querySelector('.enter').addEventListener('click', (e) => {enter(e)});


let display = document.querySelector('.container');
let outDisplay = document.querySelector('.output');

let strFunc = '';
let nums = [];
let opCt = 0;
let prevOperand = '';
let numStr = '';


// functions for the buttons
function numFound(e)
{
    let num;
    if(typeof e.target.childNodes[1] != "undefined")
        num = parseInt(e.target.childNodes[1].textContent);
    else 
        num = parseInt(e.target.textContent);

    strFunc += '' + num;
    numStr += ''+num;
    // nums.push(num);
    display.innerHTML = '<div>'+strFunc+'</div';
}

function operandFound(e)
{
    opCt++;
    let op;
    if(typeof e.target.childNodes[1] != "undefined")
        op = e.target.childNodes[1].textContent;
    else 
        op = e.target.textContent;

    nums.push(parseInt(numStr));
    numStr = '';
    
    if(opCt > 1)
    { 
        evaluate(prevOp);
        opCt = 1;
    }
    prevOp = op;

    if(strFunc != 'NaN')
    {
        strFunc += op;

        console.log(strFunc);
        display.innerHTML = '<div>'+strFunc+'</div';
    }
    else clear();
}

function evaluate(operand)
{
    
    if(!check(operand))
    {
        let result = operate(nums[0], operand, nums[1]);
        display.innerHTML = '<div>' + result + '</div>';
        strFunc = '' + result;

        nums[0] = result;
        nums.pop();
    }
}

function clear(e)
{
    strFunc = '';
    display.innerHTML = '<div>0</div>';
    nums = [];
    prevOp = '';
    opCt = 0;
    numStr = '';
    if(e != null) outDisplay.innerHTML = '';
}

function enter(e)
{
    if(numStr != '' || nums.length < 2) nums.push(parseInt(numStr));
    let result = operate(nums[0], prevOp, nums[1]);
    console.log(nums);
    outDisplay.innerHTML = '';
    outDisplay.innerHTML = '<div>' + result + '</div>';
    clear();
}

function check(op)
{
    if(op == '/' && nums[1] == 0) 
    {
        alert('THERE WAS AN ERROR, TRY AGAIN');
        clear('hi');
    }
}

// all basic functions
function multiply(...nums)
{
    let prod = 1;
    nums.map((e) => prod *= e);
    return prod;
}

function divide(num1, num2)
{
    return num1/num2;
}

function add(...nums)
{
    let sum = 0;
    nums.map((e) => sum += e);
    return sum;
}

function subtract(num1, num2)
{
    let sum = 0;
    sum = num1 - num2;
    return sum;
}

function operate(num1, operand, num2)
{
    if(operand == '+')
        return add(num1, num2);
    
    if(operand == '-')
        return subtract(num1, num2);

    if(operand == '*')
        return multiply(num1,num2);

    if(operand == '/')
    { 
        return divide(num1,num2);
    }
        
}
