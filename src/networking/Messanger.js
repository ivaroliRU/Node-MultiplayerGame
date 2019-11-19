//handle recieaving a message from the server
export function reciveMessage(Message){
    var msg = `
    <li class="list-group-item message">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${Message}</h5>
      <small>3 days ago</small>
    </div>
    <small>name</small>
    </li>
    `;
    document.getElementById("messages").innerHTML += msg;
}