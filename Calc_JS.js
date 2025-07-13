
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        const val = e.target.innerHTML;
        handleInput(val);
    });
});

// ✅ Keyboard functionality
document.addEventListener('keydown', function (e) {
    const key = e.key;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%', '.'].includes(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('DEL');
    } else if (key === 'Escape') {
        handleInput('AC');
    }
});

// ✅ Centralized input handler (used by both buttons and keyboard)
function handleInput(val) {
    const lastChar = string[string.length - 1];
    const operators = ['+', '-', '*', '/', '%', '.'];

    if (val === '=') {
        try {
            string = eval(string).toString();
            input.value = string;

            // ✅ Align result to left
            input.style.textAlign = "left";
            input.scrollLeft = 0;
        } catch {
            input.value = "Error";
        }
    }

    else if (val === 'AC') {
        string = "";
        input.value = "";

        // ✅ Reset alignment
        input.style.textAlign = "right";
    }

    else if (val === 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;

        // ✅ Align right & auto-scroll
        input.style.textAlign = "right";
        input.scrollLeft = input.scrollWidth;
    }

    else {
        // Optional: prevent multiple operators
        if (operators.includes(val) && operators.includes(lastChar)) return;

        string += val;
        input.value = string;

        // ✅ Align right & auto-scroll
        input.style.textAlign = "right";
        input.scrollLeft = input.scrollWidth;
    }
}
