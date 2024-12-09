import checklistImg from '../assets/check-list.png';
import todayImg from '../assets/bell.png';
import weekImg from '../assets/calendar.png';

// DOM Elements
const saveProjectCon = document.querySelector('.save-project-con');
const projectListCon = document.querySelector('.project-list-con');
const addNewProject = document.querySelector('.add-project-btn');
const cancelBtn = document.getElementById('cancel-project-btn');
const projectElements = document.querySelectorAll('.project');
const closeModalBtn = document.querySelector('.close-modal');
const saveBtn = document.getElementById('save-project-btn');
const addTodoBtn = document.querySelector('.add-todo-btn');
const saveInput = document.getElementById('saveInput');
const todoModal = document.getElementById('todoModal');
const todoForm = document.getElementById('todoForm');

// Modal and Todo Variables
let currentProject = null;

// Function to set image sources
const setImageSources = () => {
    const checklistImgElement = document.getElementById('checklistImg');
    if (checklistImgElement) checklistImgElement.src = checklistImg;

    const todayImgElement = document.getElementById('todayImg');
    if (todayImgElement) todayImgElement.src = todayImg;

    const weekImgElement = document.getElementById('weekImg');
    if (weekImgElement) weekImgElement.src = weekImg;
};

// Helper function to create elements
const createElement = (type, className, textContent = '') => {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
};

// Helper function to create a project div
const createProjectDiv = (projectName) => {
    const div = createElement('div', 'project-list');
    const p = createElement('p', 'project', projectName);
    const spanDelete = createElement('span', 'delete-icon');
    spanDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
        <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
    </svg>`;

    // Prevent deletion of the default project
    spanDelete.addEventListener("click", (e) => {
        if (projectName === 'Default Project') {
            // Prevent delete action if it's the default project
            e.stopPropagation();  // Prevent the event from propagating
            alert("You cannot delete the Default Project.");
            return;
        }

        // Confirmation before deleting
        const confirmed = confirm("Are you sure you want to delete this project and its todos?");
        if (confirmed) {
            deleteProject(projectName);
            projectListCon.removeChild(div);
        }
    });

    // Add click event to display todos for the clicked project
    div.addEventListener('click', () => {
        // Remove 'selected-project' class from any other project
        const allProjects = document.querySelectorAll('.project-list');
        allProjects.forEach((projectDiv) => {
            projectDiv.classList.remove('selected-project');
            projectDiv.style.background = 'none';
        });

        // Add 'selected-project' class to the clicked project
        div.classList.add('selected-project');
        div.style.background = '#F56D91';

        currentProject = projectName; // Update the current project
        displayTodos(projectName);   // Display todos for this project
    });

    div.appendChild(p);
    div.appendChild(spanDelete);
    return div;
};

// Display the "Save Project" container and hide the "Add New Project" button
const displaySaveProjectCon = () => {
    addNewProject.style.display = "none";
    saveProjectCon.style.display = "flex";
};

// Display the "Add New Project" button and hide the "Save Project" container
const displayAddNewProjectBtn = () => {
    addNewProject.style.display = "block";
    saveProjectCon.style.display = "none";
};

// Display a project in the project list
const displayProject = (projectName) => {
    const existingProject = Array.from(projectListCon.children).some(
        (child) => child.querySelector('.project').textContent === projectName
    );
    if (!existingProject) {
        const projectDiv = createProjectDiv(projectName);
        projectListCon.appendChild(projectDiv);
    }
}

// Ensure the "Default Project" is added if it doesn't exist
const addDefaultProject = () => {
    const defaultProjectName = 'Default Project';
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    // If the default project doesn't already exist, add it
    if (!projects.includes(defaultProjectName)) {
        projects.push(defaultProjectName);
        localStorage.setItem('projects', JSON.stringify(projects));
    }
};

// Select the "Default Project" after loading
const selectDefaultProject = () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const defaultProjectName = 'Default Project';

    if (projects.includes(defaultProjectName)) {
        currentProject = defaultProjectName; // Set current project to default
        displayTodos(defaultProjectName);   // Display todos for the default project

        // Select the default project in the UI
        const allProjects = document.querySelectorAll('.project-list');
        allProjects.forEach((projectDiv) => {
            const projectTitle = projectDiv.querySelector('.project').textContent;
            if (projectTitle === defaultProjectName) {
                projectDiv.classList.add('selected-project');
                projectDiv.style.background = '#F56D91'; // Default project background
            }
        });
    }
};

// Save a new project to localStorage
const saveProjectClick = () => {
    const projectName = saveInput.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (projectName) {
        //Get existing project
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const isDuplicate = projects.includes(projectName);

        if (!isDuplicate) {
            projects.push(projectName);

            //Save to local storage
            localStorage.setItem('projects', JSON.stringify(projects));
            saveInput.value = '';

            displayProject(projectName);
            displayAddNewProjectBtn();
        } else {
            errorMessage.textContent = 'Project name already exists. Please enter a different name.';
            errorMessage.style.display = 'block'; // Show the message

            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 2000);
        }
    }
}

// Delete a project and its associated todos
const deleteProject = (projectName) => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    const updatedProjects = projects.filter((project) => project !== projectName);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    // Remove the related todos
    const todos = JSON.parse(localStorage.getItem('todos')) || {};
    delete todos[projectName]; // Remove todos for this project
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load and display projects from localStorage
const loadProjects = () => {
    projectListCon.innerHTML = ''; // Clear existing projects from the DOM
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach((projectName) => displayProject(projectName));

    // Select default project after loading the projects
    addDefaultProject(); // Ensure the default project is added
    selectDefaultProject(); // Select the default project after loading
}

// Date Utilities
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const getStartOfWeek = () => {
    const today = new Date();
    const day = today.getDay(); // Sunday = 0, Monday = 1, etc.
    const diff = today.getDate() - day; // Adjust the date to the start of the week
    today.setDate(diff);
    return today;
}

const getEndOfWeek = () => {
    const startOfWeek = getStartOfWeek();
    startOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get the end of the week
    return startOfWeek;
}

const filterTodosByDate = (todos, filterType) => {
    const filteredTodos = [];
    const todayDate = getTodayDate();
    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();

    todos.forEach((todo) => {
        const todoDate = todo.dueDate;

        if (filterType === 'today' && todoDate === todayDate) {
            filteredTodos.push(todo);
        }

        if (filterType === 'week' && todoDate >= startOfWeek.toISOString().split('T')[0] && todoDate <= endOfWeek.toISOString().split('T')[0]) {
            filteredTodos.push(todo);
        }
    });

    return filteredTodos;
}
//End of date utilities

//Display todo by project name or by date
const displayTodos = (projectName = '', filterType = '') => {
    // currentProject = projectName;
    const main = document.querySelector('.main');
    main.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    //const projectTodos = todos[projectName] || [];

    let allTodos = [];
    // If projectName is specified, filter by that project
    if (projectName) {
        allTodos = todos[projectName] || [];
    } else {
        // Collect all todos from all projects if no specific project is selected
        for (const project in todos) {
            allTodos = allTodos.concat(todos[project]);
        }
    }

    let todosToDisplay = allTodos;

    // If filterType is specified (Today or Week), filter todos by date
    if (filterType === 'today') {
        todosToDisplay = filterTodosByDate(allTodos, 'today');
    } else if (filterType === 'week') {
        todosToDisplay = filterTodosByDate(allTodos, 'week');
    }

    todosToDisplay.forEach((todo) => {
        const todoDiv = createElement('div', 'todo-item');
        todoDiv.innerHTML = `
            <h3>${todo.title}</h3>
            <p class="description">Description: ${todo.description}</p>
            <p>Due-date: ${todo.dueDate}</p>
            <p>Priority: ${todo.priority}</p>
        `;

        const spanDelete = createElement('span', 'delete-icon');
        spanDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
        <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
    </svg>`;

        spanDelete.addEventListener('click', () => {
            deleteTodo(todo.title);
            main.removeChild(todoDiv);
        });

        todoDiv.appendChild(spanDelete);
        main.appendChild(todoDiv);
    });
}


//Add todo for the selected project
const addTodo = (todo) => {
    if (!currentProject) {
        alert("Please select a project before adding todos.");
        return;
    }

    const todos = JSON.parse(localStorage.getItem('todos')) || {};
    if (!todos[currentProject]) {
        todos[currentProject] = [];
    }

    todos[currentProject].push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos(currentProject); // Refresh todos for the current project
};

//Delete todo for the selected project
const deleteTodo = (todoTitle) => {
    const todos = JSON.parse(localStorage.getItem('todos')) || {};
    todos[currentProject] = todos[currentProject].filter((todo) => todo.title !== todoTitle);
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Event listeners ---------------------------------------------------------------

// Event listener for clicking on project names to filter by project

projectElements.forEach((projectElement) => {
    projectElement.addEventListener('click', () => {
        const projectName = projectElement.dataset.projectName; // Assuming you store project name in data attribute
        displayTodos('', projectName);
    });
});
// Open modal
addTodoBtn.addEventListener('click', () => {
    todoModal.style.display = 'flex';
});
// Close modal
closeModalBtn.addEventListener('click', () => {
    todoModal.style.display = 'none';
});
// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === todoModal) {
        todoModal.style.display = 'none';
    }
});

// Handle form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentProject) {
        alert("Please select a project before adding todos.");
        return;
    }

    const title = document.getElementById('todoTitle').value.trim();
    const description = document.getElementById('todoDescription').value.trim();
    const dueDate = document.getElementById('todoDueDate').value;
    const priority = document.getElementById('todoPriority').value;

    if (title && description && dueDate && priority) {
        const newTodo = { title, description, dueDate, priority };

        // Add the new todo to the current project
        addTodo(newTodo);

        // Reset form and close modal
        todoForm.reset();
        todoModal.style.display = 'none';
    }
});
// Event listeners for filtering buttons
document.getElementById('today-category').addEventListener('click', () => {
    displayTodos('', 'today');
});
document.getElementById('week-category').addEventListener('click', () => {
    displayTodos('', 'week');
});
addNewProject.addEventListener("click", displaySaveProjectCon);
cancelBtn.addEventListener("click", displayAddNewProjectBtn);
saveBtn.addEventListener("click", saveProjectClick);
//// End of EventListeners --------------------------------------------------------

// const removeProjectData = () => {
//     localStorage.removeItem('projects');
//     localStorage.removeItem('todos'); // If you have associated todos to remove
// };

document.addEventListener('DOMContentLoaded', loadProjects);

// Main Section function to initialize everything
export const Section = () => {
    setImageSources();
};

