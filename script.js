/*----------------------------------------------------------*/

const root = document.body;
const mode=document.querySelector('.darkmode');
let isDark = JSON.parse(localStorage.getItem("isDark")) || false;

if(isDark)
{
   root.classList.add("modes");
   mode.textContent = "Light";
   isDark = isDark;
   localStorage.setItem("isDark",isDark);
}

mode.addEventListener('click',()=>
{
   if(!isDark)
   {
      root.classList.add("modes");
      mode.textContent = "Light";
      isDark = !isDark;
      localStorage.setItem("isDark",isDark);
   }
   else
   {
      root.classList.remove("modes");
      mode.textContent = "Dark";
      isDark = !isDark;
      localStorage.setItem("isDark",isDark);
   }
})
/*----------------------------------------------------------*/

let greeting = document.querySelector('.greeting');
const time = new Date();
let hr = time.getHours();

if(hr<12)
{
   greeting.innerHTML = "Good Morning,";
}   
else if(hr > 12 && hr < 18)
{
   greeting.innerHTML = "Good Afternoon,";
}
else 
{
    greeting.innerHTML = "Good Evening,";
}

/*----------------------------------------------------------*/
const btn = document.querySelector('#addtask');
const taskInput = document.querySelector('.input');
const filters = document.querySelectorAll('.option p');
const clear = document.querySelector('.clr');
const taskArea = document.querySelector('.box');
let clears = document.querySelector('.clr')

//active for option
filters.forEach(btn =>
   {
      btn.addEventListener('click',()=>
      {
         document.querySelector('p.active').classList.remove('active');
         btn.classList.add('active');
      });
   });

function getTask()
{
   const taskString = localStorage.getItem('tasks');
   return taskString ? JSON.parse(taskString) : [];
}   
function setTask()
{
   localStorage.setItem('tasks',JSON.stringify(tasks))
}
let tasks = getTask();
//task method
function rendertask()
{
   taskArea.innerHTML='';
   tasks.forEach((task,index)=>
   {
      const li = document.createElement('li');
      li.classList.toggle('completed',task.completed);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.onchange =() => toggleTask(index);
      li.appendChild(checkbox);

      const taskName = document.createElement('p');
      taskName.classList.add('name');
      taskName.textContent = task.name;
      li.appendChild(taskName);

      const deletebtn = document.createElement('button');
      deletebtn.classList.add('delete');
      deletebtn.textContent = 'Delete';
      deletebtn.onclick = () => deletetask(index);
      li.appendChild(deletebtn);

      taskArea.appendChild(li);
   }) 
   setTask(tasks)
}
//adding task
btn.addEventListener('submit',(e)=>
{
   e.preventDefault();
   taskName = taskInput.value.trim();
   if(taskName !=='')
   {
   tasks.push({name:taskName,completed:false})
   rendertask();
   taskInput.value = '';
   }
})
rendertask();
//clear all task
clears.addEventListener('click',()=>
{
   tasks = [];
   rendertask();
})
//toggling task
function toggleTask (index)
{
tasks[index].completed = !tasks[index].completed;
rendertask();
}
//delete
function deletetask(index)
{
   tasks.splice(index,1);
   rendertask();
}
//filter
function filtertasks(filtertype)
{
switch(filtertype)
{
   case 'All':
      rendertask();
      break;
   case 'Pending':
      filtertask(false);
      break;
   case 'Completed':
      filtertask(true);
      break; 
   default:
      break;    
}
}

function filtertask(completed)
   {
      taskArea.innerHTML='';
      const filtertask = tasks.filter(task => task.completed === completed)
      filtertask.forEach((task,index)=>
      {
         const li = document.createElement('li');
         li.classList.toggle('completed',task.completed);

         const checkbox = document.createElement('input');
         checkbox.type = 'checkbox';
         checkbox.onchange = () => toggleTask(index);
         checkbox.checked = task.completed;
         li.appendChild(checkbox);

         const taskName = document.createElement('p');
         taskName.textContent = task.name;
         taskName.classList.add('name');
         li.appendChild(taskName);
         
         const deletebtn = document.createElement('button');
         deletebtn.textContent = 'Delete';
         deletebtn.classList.add('delete');
         deletebtn.onclick = () =>deletetask(index);
         li.appendChild(deletebtn)

         taskArea.appendChild(li)
      })
}
rendertask();