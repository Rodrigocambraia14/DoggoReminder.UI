import { API_URL } from '../utils/constants.js';
import { showErrorToast, 
    showSuccessToast, 
    showWarningToast,
    showLoader,
    hideLoader} from './ui-control-script.js';

document.addEventListener('DOMContentLoaded', function() {
    getDogs()

    setPortionsInputEvent()
});

function setPortionsInputEvent(){
  const portionsInput = document.getElementById('portions');
  portionsInput.addEventListener('input', () => {
    const portions = parseInt(portionsInput.value);
    const portionDetails = document.getElementById('portionDetails');
    portionDetails.innerHTML = ''; // Clear previous inputs

    if (portions > 0) {
      for (let i = 1; i <= portions; i++) {
        const div = document.createElement('div');
        div.classList.add('portion-detail');

        const title = document.createElement('h3');
        title.textContent = `Detalhe da Porção ${i}`;
        div.appendChild(title);

        const portionNameInput = document.createElement('input');
        portionNameInput.type = 'text';
        portionNameInput.name = `portionName${i}`;
        portionNameInput.placeholder = 'Nome da Porção';
        div.appendChild(portionNameInput);

        const portionQuantityInput = document.createElement('input');
        portionQuantityInput.type = 'number';
        portionQuantityInput.name = `portionQuantity${i}`;
        portionQuantityInput.placeholder = 'Quantidade em gramas';
        div.appendChild(portionQuantityInput);

        const mealTimeInput = document.createElement('input');
        mealTimeInput.type = 'time';
        mealTimeInput.name = `mealTime${i}`;
        div.appendChild(mealTimeInput);

        portionDetails.appendChild(div);
      }
    }
  });
}

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
          const dogSelect = document.getElementById('dog-select');
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
              </td>
            `;
            tableBody.appendChild(row);

            const option = document.createElement('option');
            option.value = dog.id;
            option.textContent = dog.name;
            dogSelect.appendChild(option);
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

document.getElementById('dogForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const data = {
    name: event.target['nome'].value,
    race: event.target['raca'].value,
    age: event.target['idade'].value,
    gender: event.target['genero'].value,
    color: event.target['cor'].value,
    user_id: localStorage.getItem('userId')
  }

        showLoader()

        fetch(API_URL + '/dog/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.Error);
            }
        })
        .then(data => {

            showSuccessToast('Cão adicionado com sucesso!')

            getDogs();
        })
        .catch(error => {
            // Handle login error
            console.error('Register error:', error);
            showErrorToast('Erro ao se comunicar com o servidor, tente novamente mais tarde.');
        }).finally( () =>{
            hideLoader()

            const targetDiv = document.getElementById('meus-caes');
            targetDiv.scrollIntoView({ behavior: 'smooth' });
        });
    });



document.getElementById('routineForm').addEventListener('submit', function(event) {
      event.preventDefault();
    
      const data = {
        name: event.target['nome'].value,
        race: event.target['raca'].value,
        age: event.target['idade'].value,
        gender: event.target['genero'].value,
        color: event.target['cor'].value,
        user_id: localStorage.getItem('userId')
      }
    
            showLoader()
    
            fetch(API_URL + '/dog/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
    
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.Error);
                }
            })
            .then(data => {
    
                showSuccessToast('Cão adicionado com sucesso!')
    
                getDogs();
            })
            .catch(error => {
                // Handle login error
                console.error('Register error:', error);
                showErrorToast('Erro ao se comunicar com o servidor, tente novamente mais tarde.');
            }).finally( () =>{
                hideLoader()
    
                const targetDiv = document.getElementById('meus-caes');
                targetDiv.scrollIntoView({ behavior: 'smooth' });
            });
        });