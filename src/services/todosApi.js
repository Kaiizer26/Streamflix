const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Récupérer tous les todos (limité à 20)
export async function getTodos() {
  try {
    const response = await fetch(`${BASE_URL}?_limit=20`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des todos:', error);
    return [];
  }
}

// Ajouter un todo
export async function addTodo(title) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    return null;
  }
}

// Mettre à jour un todo
export async function updateTodo(id, completed) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return null;
  }
}

// Supprimer un todo
export async function deleteTodo(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }
}
