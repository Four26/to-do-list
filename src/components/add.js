// import today from '../assets/bell.png';
// import week from '../assets/calendar.png';

// export const Section = () => {
//     // Utility function to create elements
//     const createElement = (type, className, textContent = '') => {
//         const element = document.createElement(type);
//         if (className) element.className = className;
//         if (textContent) element.textContent = textContent;
//         return element;
//     };

//     const createImage = (src, alt, className) => {
//         const img = new Image();
//         img.src = src;
//         img.alt = alt;
//         img.className = className;
//         return img;
//     };

//     const createCategoryDiv = (id, imgSrc, imgAlt, text) => {
//         const div = createElement('div', 'category');
//         if (id) div.id = id;

//         const img = createImage(imgSrc, imgAlt, 'category-icon');
//         const span = createElement('span', '', text);

//         div.append(img, span);
//         return div;
//     };

//     // Project Components
//     const createProjectDiv = (projectName) => {
//         const div = createElement('div', 'project-list');
//         const p = createElement('p', 'project', projectName);
//         const spanDelete = createElement('span', 'delete-icon');

//         spanDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
//             <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
//         </svg>`;

//         div.appendChild(p);
//         div.appendChild(spanDelete);
//         return div;
//     };

//     const createProjectContent = (projectName) => {
//         const projectContent = createElement('div', 'project-content');
//         const headerSection = createElement('div', 'project-header');
//         const projectTitle = createElement('h2', '', projectName);
//         const addTodoButton = createElement('button', 'add-todo-btn', '+ Add Todo');

//         headerSection.append(projectTitle, addTodoButton);
//         const todosContainer = createElement('div', 'todos-container');

//         projectContent.append(headerSection, todosContainer);
//         return projectContent;
//     };

//     // Todo Components
//     const createTodoItem = (todo) => {
//         const todoDiv = createElement('div', 'todo-item');

//         const checkbox = createElement('input', 'todo-checkbox');
//         checkbox.type = 'checkbox';
//         checkbox.checked = todo.completed;

//         const todoContent = createElement('div', 'todo-content');
//         const todoTitle = createElement('h3', 'todo-title', todo.name);
//         const todoDescription = createElement('p', 'todo-description', todo.description);

//         const todoMeta = createElement('div', 'todo-meta');
//         const dueDate = createElement('span', 'todo-due-date', `Due: ${todo.dueDate}`);
//         const priority = createElement('span', `todo-priority todo-priority-${todo.priority.toLowerCase()}`, todo.priority);

//         const deleteBtn = createElement('button', 'todo-delete', '×');

//         todoContent.append(todoTitle, todoDescription);
//         todoMeta.append(dueDate, priority);
//         todoDiv.append(checkbox, todoContent, todoMeta, deleteBtn);

//         return todoDiv;
//     };

//     // Modal Component
//     const createTodoModal = () => {
//         const modalCon = createElement('div', 'modal-con');
//         const modalContent = createElement('div', 'modal-content');
//         const form = createElement('form', 'modal-form');

//         const nameInput = createElement('input', 'modal-input');
//         nameInput.placeholder = "Enter todo name";
//         nameInput.required = true;

//         const descriptionInput = createElement('textarea', 'modal-description');
//         descriptionInput.placeholder = "Enter todo description";
//         descriptionInput.required = true;

//         const dueDateInput = createElement('input', 'modal-date');
//         dueDateInput.type = 'date';
//         dueDateInput.required = true;

//         const prioritySelect = createElement('select', 'modal-priority');
//         ['Low', 'Medium', 'High'].forEach(priority => {
//             const option = createElement('option', '', priority);
//             option.value = priority.toLowerCase();
//             prioritySelect.appendChild(option);
//         });

//         const submitBtn = createElement('button', 'modal-submit', 'Submit');
//         submitBtn.type = 'submit';

//         const cancelBtn = createElement('button', 'modal-cancel', 'Cancel');
//         cancelBtn.type = 'button';

//         form.append(nameInput, descriptionInput, dueDateInput, prioritySelect, submitBtn, cancelBtn);
//         modalContent.appendChild(form);
//         modalCon.appendChild(modalContent);

//         return { modalCon, form, nameInput, descriptionInput, dueDateInput, prioritySelect, submitBtn, cancelBtn };
//     };

//     // Create main structure
//     const sectionCon = document.querySelector('.sidebar');
//     const main = document.querySelector('main');

//     // Category container
//     const categoryCon = createElement('div', 'category-con');
//     const addTodoCon = createElement('div', 'add-todo-con');
//     const addTodoBtn = createElement('button', 'add-todo-btn', '+');
//     const span = createElement('span', 'add-todo-span', 'Add New Todo');
//     addTodoCon.append(addTodoBtn, span);

//     // Category sections
//     const todayDiv = createCategoryDiv('today-category', today, 'Today Icon', 'Today');
//     const thisWeekDiv = createCategoryDiv('week-category', week, 'This Week Icon', 'This Week');
//     categoryCon.append(addTodoCon, todayDiv, thisWeekDiv);

//     // Projects section
//     const myProjectsCon = createElement('div', 'projects-con');
//     const myProjectH2 = createElement('h2', '', 'My Projects');
//     const projectListCon = createElement('div', 'project-list-con');
//     const projectList = createElement('div', 'project-list');
//     const defaultProject = createElement('p', 'project', 'Default Project');
//     const addProjectBtn = createElement('button', 'add-project-btn', 'Add New Project');

//     projectList.appendChild(defaultProject);
//     projectListCon.appendChild(projectList);

//     // Save project container
//     const saveProjectCon = createElement('div', 'save-project-con');
//     const input = createElement('input');
//     input.placeholder = "Enter project name";
//     const btnCon = createElement('div', 'btn-con');
//     const saveBtn = createElement('button', '', 'Save');
//     const cancelBtn = createElement('button', '', 'Cancel');

//     btnCon.append(saveBtn, cancelBtn);
//     saveProjectCon.append(input, btnCon);
//     myProjectsCon.append(myProjectH2, projectListCon, addProjectBtn, saveProjectCon);

//     // Final assembly
//     sectionCon.append(categoryCon, myProjectsCon);

//     //Eventlisteners
//     document.querySelector('.add-project-btn').addEventListener("click", () => {

//     });

//     // Return component functions and elements for external use
//     return {
//         // Component creators
//         createProjectDiv,
//         createProjectContent,
//         createTodoItem,
//         createTodoModal,
//         // UI Elements
//         sectionCon,
//         main,
//         addTodoBtn,
//         addProjectBtn,
//         saveProjectCon,
//         projectListCon,
//         input,
//         saveBtn,
//         cancelBtn,
//     };
// };