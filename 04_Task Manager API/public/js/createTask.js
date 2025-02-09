import { fetchTasks } from "./main.js";

export const createTasks = async () => {
  const data = await fetchTasks();
  return data.tasks
    .map(
      (taskObj) => `
    <li class="task-manager__task-list-task" data-id="${taskObj._id}">
        <input class="task__name" type="text" value="${taskObj.name}" disabled>
        <div class="flex-group">
            <button class="btn edit-btn">
                <?xml version="1.0" ?><svg class="edit-icon feather feather-edit" fill="none" height="24"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                    width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
            </button>

            <button class="btn delete-btn">
                <?xml version="1.0" ?><svg enable-background="new 0 0 32 32" height="32px" id="svg2"
                    version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    xmlns:svg="http://www.w3.org/2000/svg">
                    <g id="trash">
                        <path
                            d="M28,7.786h-0.002c-0.031-0.976-0.691-1.542-1.351-1.943C24.609,4.659,20.68,4.021,16,4c-3.109,0-5.919,0.315-8.025,0.846   c-1.054,0.27-1.933,0.585-2.625,0.997C4.692,6.244,4.031,6.811,4,7.786c0.001,0.028,0.007,0.053,0.009,0.081l-0.006,0l1.702,20.543   l0.037,0.113c0.142,0.517,1.697,3.523,10.257,3.475h0.218c8.429,0.001,9.909-2.965,10.044-3.495l0.03-0.104l1.704-20.533l-0.005,0   C27.992,7.839,27.999,7.814,28,7.786z M6.102,7.751c0.383-0.354,1.692-0.883,3.45-1.206c1.767-0.34,4.013-0.546,6.448-0.546   c2.966,0,5.655,0.309,7.533,0.785c0.935,0.237,1.667,0.521,2.087,0.774c0.146,0.086,0.251,0.168,0.314,0.228   c-0.011,0.01-0.023,0.021-0.038,0.034c-0.383,0.354-1.692,0.885-3.451,1.207C20.68,9.365,18.434,9.571,16,9.571   c-2.969,0-5.658-0.309-7.533-0.784c-0.937-0.235-1.67-0.521-2.09-0.774c-0.145-0.087-0.25-0.168-0.314-0.229   C6.075,7.774,6.088,7.763,6.102,7.751z M24.324,27.938c-0.25,0.366-1.743,2.044-8.325,2.061c-4.088,0.002-6.251-0.684-7.322-1.271   c-0.538-0.294-0.81-0.56-0.941-0.719c-0.027-0.032-0.048-0.061-0.064-0.083L6.2,10.145c2.182,0.916,5.703,1.408,9.801,1.428   c3.106-0.002,5.917-0.315,8.022-0.849c0.667-0.169,1.255-0.362,1.778-0.582L24.324,27.938z" />
                    </g>
                </svg>
            </button>
        </div>
    </li>
  `
    )
    .join("");
};
