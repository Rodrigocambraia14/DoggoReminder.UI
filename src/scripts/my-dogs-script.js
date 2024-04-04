import { API_URL } from '../utils/constants.js';
import { showErrorToast, 
    showSuccessToast, 
    showWarningToast,
    showLoader,
    hideLoader} from './ui-control-script.js';

document.addEventListener('DOMContentLoaded', function() {
    let storedUserId = localStorage.getItem('userId');

    if(storedUserId != undefined){
        getDogs(storedUserId);
    }
});

function getDogs(userId){
    fetch(API_URL + `/dog/list/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('dog-table-body');
  
        data.forEach(dog => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><img src="$./media/cute-dog-icon.png" alt="Icone do cão"></td>
            <td>${dog.name}</td>
            <td>${dog.race}</td>
            <td>${dog.age}</td>
            <td>${dog.color}</td>
            <td>${dog.gender}</td>
            <td class="options">
              <span>...</span> <!-- Placeholder for delete/update options -->
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching dogs:', error));
}
  