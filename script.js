const display = document.getElementById('display');
    const historyPanel = document.getElementById('historyContent');
    const historyPanelMobile = document.getElementById('historyContentMobile');
    const overlay = document.getElementById('fullscreenOverlay');
    let currentInput = '';

    function updateDisplay(value) {
      display.textContent = value;
    }

    function appendNumber(number) {
      if (display.textContent === '0') currentInput = '';
      currentInput += number;
      updateDisplay(currentInput);
    }

    function appendOperator(operator) {
      if (currentInput !== '') {
        currentInput += ` ${operator} `;
        updateDisplay(currentInput);
      }
    }

    function appendDot() {
      currentInput += '.';
      updateDisplay(currentInput);
    }

    function clearDisplay() {
      currentInput = '';
      updateDisplay('0');
    }

    function clearEntry() {
      currentInput = currentInput.trim().split(' ').slice(0, -1).join(' ');
      updateDisplay(currentInput || '0');
    }

    function deleteChar() {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    }

    function toggleSign() {
      if (currentInput) {
        let tokens = currentInput.split(' ');
        let last = tokens[tokens.length - 1];
        if (!isNaN(last)) {
          tokens[tokens.length - 1] = -parseFloat(last);
          currentInput = tokens.join(' ');
          updateDisplay(currentInput);
        }
      }
    }

    function calculate() {
      try {
        const result = eval(currentInput.replace('×', '*').replace('÷', '/'));
        updateDisplay(result);
        if (currentInput !== '') {
          const historyLine = `${currentInput} = ${result}`;
          const p1 = document.createElement('p');
          p1.textContent = historyLine;
          const p2 = document.createElement('p');
          p2.textContent = historyLine;
          historyPanel.appendChild(p1);
          historyPanelMobile.appendChild(p2);
        }
        currentInput = result.toString();
      } catch {
        updateDisplay('Error');
        currentInput = '';
      }
    }

    function appendFunction(func) {
      if (func === '%') {
        currentInput += '/100';
      } else if (func === '1/') {
        currentInput = `1/(${currentInput})`;
      } else if (func === '**2') {
        currentInput = `(${currentInput})**2`;
      } else if (func === 'Math.sqrt(') {
        currentInput = `Math.sqrt(${currentInput})`;
      }
      updateDisplay(currentInput);
    }

    document.addEventListener('keydown', (e) => {
      if (!isNaN(e.key)) appendNumber(e.key);
      else if (["+", "-", "*", "/"].includes(e.key)) appendOperator(e.key);
      else if (e.key === "Enter") calculate();
      else if (e.key === "Backspace") deleteChar();
      else if (e.key === ".") appendDot();
      else if (e.key === "Escape") clearDisplay();
    });

    function toggleOverlay() {
      overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
    }