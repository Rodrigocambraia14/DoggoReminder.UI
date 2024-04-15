import { API_URL } from '../utils/constants.js';
import { showErrorToast, 
    showSuccessToast, 
    showWarningToast,
    showLoader,
    hideLoader} from './ui-control-script.js';

document.addEventListener('DOMContentLoaded', function() {
    getDogs()
});

export function getDogs(){

  let storedUserId = localStorage.getItem('userId');

    if(storedUserId == undefined){
      return;
    }

    fetch(API_URL + `/dog/list?user_id=${storedUserId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
      .then(response =>  response.json()
        )
      .then(data => {
        const tableBody = document.getElementById('dog-table-body');
  
        // Limpar todas as linhas da tabela
        while (tableBody.firstChild) {
          tableBody.removeChild(tableBody.firstChild);
        }

        if(data.length == 0){
          data.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td colspan=100%>Nenhum animal cadastrado.</td>
            `;
            tableBody.appendChild(row);
          });
        }
        else {
          data.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td><img src="$../.././media/cute-dog-icon.png" alt="Icone do cão"></td>
              <td>${dog.name}</td>
              <td>${dog.race}</td>
              <td>${dog.age} ano${dog.age > 1 ? 's' : ''}</td>
              <td>${dog.color}</td>
              <td>${dog.gender}</td>
              <td class="options">
                  <span class="editar inner-option" data-dog-id="${dog.id}">Editar</span>
                  <span class="excluir inner-option" data-dog-id="${dog.id}">Excluir</span>
                  <span class="visualizar-rotinas inner-option" data-dog-id="${dog.id}">Visualizar Rotinas</span>
                  <span class="criar-nova-rotina inner-option" data-dog-id="${dog.id}">Criar rotina</span>
              </td>
            `;
            tableBody.appendChild(row);
          });

          setModal();
        }

        

      })
      .catch(error => console.error('Error fetching dogs:', error));
}

function setModal() {
  var options = document.querySelectorAll(".inner-option");


  options.forEach(function(option) {
      option.addEventListener("click", function() {

          var dogId = option.getAttribute("data-dog-id");

          if (option.classList.contains("excluir")) {
              removeDog(dogId);
          } else if (option.classList.contains("editar")) {
              updateDog(dogId);
          } else if (option.classList.contains("visualizar-rotinas")) {
              viewDogRoutines(dogId);
          } else if (option.classList.contains("criar-nova-rotina")) {
              createNewDogRoutine(dogId);
          }

      });
  });

}

function removeDog(dog_id) {
  const data = { dog_id: dog_id };

  fetch(API_URL + '/dog/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      showSuccessToast(data.message);
      getDogs()

    })
    .catch(error => console.error('Error fetching dogs:', error));
}


function updateDog(dog_id){

}

function viewDogRoutines(dog_id){
  
}

function createNewDogRoutine(dog_id){
  
}
  
document.getElementById('dogForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aqui você pode adicionar a lógica para lidar com o envio do formulário
  // Por exemplo, enviar os dados para o servidor via AJAX
});