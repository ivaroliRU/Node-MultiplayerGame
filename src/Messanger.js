//handle recieaving a message from the server
export function reciveMessage(Message){
    var newElement = `<li class="list-group-item message">${Message}</li>`;
    document.getElementById("messages").innerHTML += newElement;
}