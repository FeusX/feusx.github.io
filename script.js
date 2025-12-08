  (() => {
  const out = document.getElementById('output');
  const input = document.getElementById('cmdInput');
  const term = document.getElementById('term');

  term.addEventListener('click', () => input.focus());
  input.focus();

  const history = []; let hIndex = 0;

  const cmds = {
  help: () => [
    "Available commands: ",
    "  help:      show this message",
    "  ls:        lists projects",
    "  whoami:    a short introduction",
    "  clear:     clear the outputs",
    "  contact:   info for communication",
    "  github:    opens GitHub in a new tab"
  ],
  ls: () => [
    "Projects: ",
    "Fork bomb with C++ for windows operating systems.",
    "Binary counter with esp8266.",
    "Music player based on pygame and tkinter.",
    "This website that you are looking at.",
    "Sorting algorithm visualizer with C++ and SDL2.",
    "An interpeter and operating system for Arduino Nano microprocessor.",
    "And so on... If you want to see more, type 'contact' for my Github page."
  ],
  whoami: () => [
    "About: ",
    "Someone who is interested in programming, maths and electronics.",
    "Studying a program related to software engineering at the university.",
    "I develop my software on Helix Editor and I use Arch Linux with Zsh."
  ],
  contact: () => [
    "Contact:",
    "E-mail: feusuaigax@proton.me",
  ],
  clear: () => { 
    out.innerHTML = ""; 
    return []; 
  },
  github: () => {
    window.open("https://github.com/FeusX", "_blank");
    return ["Launching GitHub..."];
  }
};

  function printLines(lines, className='') {
    if (!lines || lines.length === 0) return;
    lines.forEach(l => {
      const div = document.createElement('div');
      div.className = 'line ' + className;
      div.textContent = l;
      out.appendChild(div);
    });
    term.scrollTop = term.scrollHeight;
  }

  function handleCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    const echo = document.createElement('div');
    echo.className = 'line cmd';
    echo.textContent = '> ' + cmd;
    out.appendChild(echo);

    history.push(cmd);
    hIndex = history.length;

    const fn = cmds[cmd.toLowerCase()];
    if (fn) {
      const result = fn();
      printLines(result);
    } else {
      printLines([`Command not found: ${cmd}`, `Type "help" for a list of commands.`], 'muted');
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && hIndex > 0) { hIndex--; input.value = history[hIndex]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length && hIndex < history.length - 1) { hIndex++; input.value = history[hIndex]; }
      else { hIndex = history.length; input.value = ''; }
    }
  });
})();

