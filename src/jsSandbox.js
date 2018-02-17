/**
 * the DOM hooks
 */
const response = document.getElementById('response');
const sandbox = document.getElementById('sandbox');
const title = document.getElementById('title');
const button = document.getElementById('submit');
const destroy = document.getElementById('destroy');
const random = document.getElementById('random');
const exampleOne = document.getElementById('exampleOne');
const exampleTwo = document.getElementById('exampleTwo');

/**
 * Our main on run function.
 */
const evaluate = () => {
  // start a timer
  let start = new Date().valueOf();
  // if both values are full continue
  if (title.value && sandbox.value) {
    // start creating a work object
    let work = {
      // just a couple things in the work object
      id: Math.random().toString(32).substr(2, 32),
      start: new Date().toLocaleString(),
      name: title.value.trim(),
      work: sandbox.value.trim(),
    };
    const evaluation = (work) => {
        // attempt the work
        let expression = work.work;
        const result = () => {
            return eval.call(null, expression);
          }
          // stop the timer
        let stop = new Date().valueOf();
        let timer = (stop - start);
        // the work was completed
        if (result) {
          let completed = {
              status: 202,
              id: work.id,
              data: {
                name: work.name,
                time: timer + 'ms',
                work: work.work,
                eval: result(),
              },
              completed: true,
            }
            // work seemed to have went well.
          response.innerHTML = JSON.stringify((completed), null, 2);
        }
      }
      // running function above.
    evaluation(work);
  } else {
    // missing information.
    let stop = new Date().valueOf();
    let timer = (stop - start);
    let error = {
      error: 9001,
      data: {
        execution: timer + 'ms',
        message: 'You\'re missing input...',
      },
      completed: false,
    };
    response.innerHTML = JSON.stringify(error, null, 2);
  }
};

/**
 * A lame random title generator.
 */
const randomTitle = () => {
  return Math.random().toString(16).substr(2, 16) + "-v" + (Math.random() * (0.35 - (-0.35)) + (-0.35)).toFixed(2);
};

/**
 * Displaying Examples
 */
const displayExampleOne = () => {
  let string = `'use strict';

const add = (a, b) => {
  return a + b;
};

add(5123, 58923);`;
  return string;
};

const displayExampleTwo = () => {
  let string = `'use strict';
const multiply = (a, b) => {
  return a * b;
};
const run = () => {
  let number = multiply(7, 1);
  if (number >= 14) { return 'number was greater or equal to 14' };
  if (number <= 13) { return 'number was lower or equal to 13' };
};
run();`;
  return string;
};

// load example 1 code into sandbox.
exampleOne.addEventListener('click', () => {
  sandbox.innerHTML = displayExampleOne();
});

// load example 2 code into sandbox.
exampleTwo.addEventListener('click', () => {
  sandbox.innerHTML = displayExampleTwo();
  return false;
});

// add trash for just sandbox
trash.addEventListener('click', () => {
	sandbox.innerHTML = '';
  return false;
});

// initiate random title generator.
random.addEventListener('click', () => {
  title.value = randomTitle();
  return false;
});

// to clear out said data easily
destroy.addEventListener('click', () => {
  response.innerHTML = 'destroyed';
  sandbox.value = '';
  title.value = '';
  return false;
});

// to submit and evaluate
submit.addEventListener('click', () => {
  evaluate();
  return false;
});

// save to google cloud db
save.addEventListener('click', () => {
  return false;
});
