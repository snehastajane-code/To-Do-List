const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load all tasks when page opens
window.onload = getTasks;

// Get all tasks
async function getTasks() {
    const res = await fetch("/api/tasks");
    const tasks = await res.json();

    listContainer.innerHTML = "";

    tasks.forEach(task => {
        let li = document.createElement("li");

        li.innerHTML = task.task;

        if (task.status) {
            li.classList.add("checked");
        }

        // Mark Complete / Incomplete
        li.addEventListener("click", async function () {
            await fetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task: task.task,
                    status: !task.status
                })
            });

            getTasks();
        });

        // Delete Button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        span.addEventListener("click", async function (e) {
            e.stopPropagation();

            await fetch(`/api/tasks/${task.id}`, {
                method: "DELETE"
            });

            getTasks();
        });

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Add Task
async function addTask() {

    console.log("Button Clicked");

    if (inputBox.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    console.log("Sending:", inputBox.value);

    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: inputBox.value
            })
        });

        const data = await response.json();

        console.log("Server Response:", data);

        inputBox.value = "";

        getTasks();

    } catch (err) {
        console.error("Error:", err);
    }
}
async function getTasks() {
    try {
        const res = await fetch("/api/tasks");

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const tasks = await res.json();

        listContainer.innerHTML = "";

        tasks.forEach(task => {

            const li = document.createElement("li");
            li.innerHTML = task.task;

            if(task.status){
                li.classList.add("checked");
            }

            li.onclick = async () => {

                await fetch(`/api/tasks/${task.id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        task:task.task,
                        status:!task.status
                    })
                });

                getTasks();
            };

            const span=document.createElement("span");
            span.innerHTML="\u00d7";

            span.onclick=async(e)=>{

                e.stopPropagation();

                await fetch(`/api/tasks/${task.id}`,{
                    method:"DELETE"
                });

                getTasks();
            };

            li.appendChild(span);

            listContainer.appendChild(li);

        });

    } catch(err){
        console.log(err);
    }
}