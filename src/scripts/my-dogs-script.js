import { API_URL } from '../utils/constants.js';
import { showErrorToast, 
    showSuccessToast, 
    showWarningToast,
    showLoader,
    hideLoader} from './ui-control-script.js';

let dogs = undefined;
let chosenDogId = undefined;

document.addEventListener('DOMContentLoaded', function() {
    getDogs()

    setPortionsInputEvent()

    setCloseModalEvent()
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

        const portionNameLabel = document.createElement('label');
        portionNameLabel.for = `portionName${i}`;
        portionNameLabel.textContent = 'Nome'
        div.appendChild(portionNameLabel);

        const portionNameInput = document.createElement('input');
        portionNameInput.type = 'text';
        portionNameInput.name = `portionName${i}`;
        portionNameInput.placeholder = 'Café da manhã';
        div.appendChild(portionNameInput);

        const portionQuantityLabel = document.createElement('label');
        portionQuantityLabel.for = `portionQuantity${i}`;
        portionQuantityLabel.textContent = 'Quantidade em gramas'
        portionQuantityLabel.style.marginTop = '15px';
        div.appendChild(portionQuantityLabel);

        const portionQuantityInput = document.createElement('input');
        portionQuantityInput.type = 'number';
        portionQuantityInput.name = `portionQuantity${i}`;
        portionQuantityInput.placeholder = '400';
        div.appendChild(portionQuantityInput);

        const mealTimeLabel = document.createElement('label');
        mealTimeLabel.for = `mealTime${i}`;
        mealTimeLabel.textContent = 'horário';
        mealTimeLabel.style.marginTop = '15px';
        div.appendChild(mealTimeLabel);

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
            const row = document.createElement('tr');
            row.innerHTML = `
              <td colspan=100%>Nenhum aumigo cadastrado.</td>
            `;
            tableBody.appendChild(row);
        }
        else {

          dogs = data;

          const dogSelect = document.getElementById('dog-select');
          dogs.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td><img src="$../.././media/cute-dog-icon.png" alt="Icone do aumigo"></td>
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


function updateDog(dog_id) {
  // Find the chosen dog by its ID
  console.log('editar')
  chosenDogId = dog_id;
  let chosenDog = dogs.find(dog => dog.id === dog_id);

  // Get the modal element
  let modal = document.getElementById('updateDogModal');

  // Get the form inputs
  let nomeInput = modal.querySelector('#modal-nome');
  let racaSelect = modal.querySelector('#modal-raca');
  let idadeInput = modal.querySelector('#modal-idade');
  let corInput = modal.querySelector('#modal-cor');
  let generoInput = modal.querySelector('#modal-genero');

  nomeInput.value = chosenDog.name;
  idadeInput.value = chosenDog.age;
  corInput.value = chosenDog.color;
  generoInput.value = chosenDog.gender;

  let existingBreedSelect = document.getElementById('raca');
  let racaOptions = existingBreedSelect.innerHTML;
  racaSelect.innerHTML = racaOptions;

  racaSelect.value = chosenDog.race;

  modal.style.display = 'block';
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

            showSuccessToast('Aumigo adicionado com sucesso!')

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

    document.getElementById('updateDogForm').addEventListener('submit', function(event) {
      event.preventDefault();
    
      const data = {
        name: event.target['modal-nome'].value,
        race: event.target['modal-raca'].value,
        age: event.target['modal-idade'].value,
        gender: event.target['modal-genero'].value,
        color: event.target['modal-cor'].value,
        dog_id: chosenDogId,
        user_id: localStorage.getItem('userId')
      }
    
            showLoader()
    
            fetch(API_URL + '/dog/update', {
                method: 'PUT',
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
    
                showSuccessToast(data.message);

                closeModal();

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
        name: event.target['name'].value,
        dog_id: event.target['dog-select'].value,
        portions: event.target['portions'].value,
        portion_details: getPortionDetailValues()
      }
    
            showLoader()
    
            fetch(API_URL + '/food_routine/add', {
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
                showSuccessToast(data.message)
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

function setCloseModalEvent(){
  var modal = document.getElementById("updateDogModal");

  var closeButton = modal.querySelector(".close");

  closeButton.addEventListener("click", closeModal);
}

function closeModal() {
  var modal = document.getElementById("updateDogModal");
  modal.style.display = "none";
}

function getPortionDetailValues() {
  const portionDetails = document.querySelectorAll('.portion-detail');
  const portionDetailsArray = [];

  portionDetails.forEach((portionDetail, index) => {
    const name = portionDetail.querySelector(`input[name="portionName${index + 1}"]`).value;
    const grams = portionDetail.querySelector(`input[name="portionQuantity${index + 1}"]`).value;
    const feedTime = portionDetail.querySelector(`input[name="mealTime${index + 1}"]`).value;

    const portionDetailObject = {
      name: name,
      grams: grams,
      feed_time: feedTime
    };

    portionDetailsArray.push(portionDetailObject);
  });

  return portionDetailsArray;
}