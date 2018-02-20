'use strict';
/**
 * The JAVASCRIPT SECTION :D
 * The DOM hooks
 */
const responsed = document.getElementById('responsed');
const sandbox = document.getElementById('editor');
const title = document.getElementById('title');
const button = document.getElementById('submit');
const destroy = document.getElementById('destroy');
const random = document.getElementById('random');
const notifications = document.getElementById('notifications');
const exampleOne = document.getElementById('exampleOne');
const exampleTwo = document.getElementById('exampleTwo');
const exampleThree = document.getElementById('exampleThree');
const loadbutton = document.getElementById('load');
const trashbutton = document.getElementById('trash');

/** 
 * Quotes that change, wooooo.
 */
window.onload = () => {
  const facts = [
    'Functions are their finest.',
    'These get sent off to a place that doesn\'nt exist.',
    'Did you know you could actually write code here?...',
    'This is like a fancy notepad with smart stuff in it.',
  ];
  let fact = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById('fact').innerHTML = fact;
};

/**
 * A good posting setup.
 */
const promisedFetch = (url, method, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let body = JSON.stringify(data);
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(body);
    xhr.onerror = (err) => {
      reject({"error":err})
    };
    xhr.onload = () => {
      resolve(xhr.response);
    };
  });
};

/**
 * Our main on run function.
 */
let evaluate = () => {
  // start a timer
  let start = new Date().valueOf();
  // if both values are full continue
  if (title.value && sandbox.innerHTML) {
    // start creating a work object
    let work = {
      // just a couple things in the work object
      id: Math.random().toString(32).substr(2, 32),
      start: new Date().toLocaleString(),
      name: title.value.trim(),
      work: sandbox.value.trim(),
    };
    let evaluation = (work) => {
        // attempt the work
        let expression = work.work;
        let result = () => {
            return eval.call(null, expression);
          }
          // stop the timer
        let stop = new Date().valueOf();
        let timer = (stop - start);
        // the work was completed
        if (result) {
          let completed = {
              id: work.id,
              data: {
                name: work.name,
                time: new Date().valueOf(),
                exec: timer + 'ms',
                work: work.work,
                eval: result(),
              },
              status: true,
            }
            // work seemed to have went well.
          responsed.innerHTML = JSON.stringify((completed), null, 2);
        }
      }
      // running function above.
    evaluation(work);
  } else {
    // errors missing information.
    let errors = [];
    if (sandbox.value === '') {
      errors.push('There was no function input.');
    };
    if (title.value === '') {
      errors.push('There was no title input.');
    };
    // stop timer and throw dumb error.
    let stop = new Date().valueOf();
    let timer = (stop - start);
    let error = {
      error: 9001,
      data: {
        execution: timer + 'ms',
        message: errors,
        time: new Date().valueOf(),
      },
      status: false,
    };
    errors = [];
    // put error inside the DOM.
    responsed.innerHTML = JSON.stringify(error, null, 2);
  }
  return false;
};

/**
 * A lame random title generator.
 */
const randomTitle = () => {
  return Math.random().toString(16).substr(6, 6) + "-v" + (Math.random() * ((0.35) - (-0.35)) + -0.35).toFixed(2);
};

/**
 * Saving into the cloud, eventually then a load function.
 */
const saveFunction = () => {
  // organize our data we want to send.
  let data = {
    id: Math.random().toString(32).substr(2, 32),
    data: {
      date: new Date().valueOf(),
      name: title.value.trim(),
      code: sandbox.innerHTML.toString(),
    },
  };
  // error checking
  if (data.data.name.length < 2) {
    notifications.innerHTML = 'The name was not long enough...';
    return;
  };
  if (data.data.code.length < 2) {
    notifications.innerHTML = 'The code was not long enough...';
    return;
  }
  // we'll save it i guess
  if (data.data.code.length && data.data.name.length) {
    notifications.innerHTML = 'Saving function with the ID: ' + data.id;
    responsed.innerHTML = JSON.stringify(data, null, 2);
  }

  /**
    * Sending the function via post.
    */
  promisedFetch('https://us-central1-dev-box-175801.cloudfunctions.net/savefunc', "POST", data)
  .then((json) => {
    let usable = JSON.parse(json);
    if (usable["code"] === 400) {
      notifications.innerHTML = 'You did not successfully save.<br />Hamsters may be warming up, try again...';
      responsed.innerHTML = JSON.stringify(usable, null, 2);
    };
    if (usable["code"] === 200) {
      notifications.innerHTML = 'You successfully saved as ID: ' + data.id;
      responsed.innerHTML = JSON.stringify(usable, null, 2);
    };
  });
};

/**
 * Loading from cloud function.
 */ 
const loadFunction = () => {
  let input = prompt('What is the ID of the requested function?');
  if (input) {
    input = input.toString().trim();
  } else {
    return;
  };
  notifications.innerHTML = 'Loading from DB...';
  promisedFetch('https://us-central1-dev-box-175801.cloudfunctions.net/getfunc?id=' + input, "GET", true)
    .then((json) => {
      let usable = JSON.parse(json);
      if (usable.id !== undefined) {
        title.value = usable.data.name;
        sandbox.innerHTML = usable.data.code;
        responsed.innerHTML = JSON.stringify(usable, null, 2);
        notifications.innerHTML = 'You successfully loaded ID: ' + usable.id;
      } else {
        notifications.innerHTML = 'That ID is not valid yet.';
        responsed.innerHTML = JSON.stringify(usable, null, 2);
      }
    })
  // :D
};

/**
 * Displaying Examples
 */
const displayExampleOne = () => {
  let string = `'use strict';

const add = (a, b) => {
  return a + b;
};

add(1, 5);`;
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

const displayExampleThree = () => {
  let string = `'use strict';
const colors = [
  '#d0c2e1',
  '#bdb6d0',
  '#abaabe',
  '#989ead',
  '#86939c'
];
const select = (array, callback) => {
  let selected = array[Math.floor(Math.random() * array.length)];
  callback(selected);
};
const main = () => {
  setTimeout(() => {
    select(colors, (color) => {
      document.body.style.background = color;
      main();
    });
  }, 2500);
  return 'ultra color changing awesome stuff';
};
main();`;
  return string;
};

// load button to give input dialog.
loadbutton.addEventListener('click', () => {
  loadFunction();
  return false;
});

// load example 1 code into sandbox.
exampleOne.addEventListener('click', () => {
  sandbox.innerHTML = displayExampleOne();
  return false;
});

// load example 2 code into sandbox.
exampleTwo.addEventListener('click', () => {
  sandbox.innerHTML = displayExampleTwo();
  return false;
});

// load example 3 code into sandbox.
exampleThree.addEventListener('click', () => {
  sandbox.innerHTML = displayExampleThree();
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

trash.addEventListener('click', () => {
  responsed.innerHTML = 'cleared';
  sandbox.value = '';
  return false;
})

// to clear out said data easily
destroy.addEventListener('click', () => {
  responsed.innerHTML = 'erased';
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
  saveFunction();
  return false;
});