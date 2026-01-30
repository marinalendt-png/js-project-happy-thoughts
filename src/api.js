const BASE_URL = "https://js-project-api-e8xy.onrender.com/thoughts/";

// GET - fetches the 20 most recent thoughts from the API. A list of messages will be shown as the app loads. 
export const fetchThoughts = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetching thought failed:", error);
    throw error;
  }
};

// POST - creates a new thought. The API wants a JSON body with a "message" property. If it is successful, the API returns a full thought object back. 
export const postThought = async (message) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("posting thought failed:", error)
    throw error;
  }
};

// POST - Like a thought. This function sends a like to the API using the thoughts ID. The API then sends back an updated thought, including a new heart count. 
export const likeThought = async (thoughtId) => {
  try {
    const res = await fetch(`${BASE_URL}/${thoughtId}/like`, {
      method: "POST",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("liking thought failed:", error);
    throw error;
  }
};

//DELETE - remove a thought
export const deleteThought = async (thoughtId) => {
  try {
    const res = await fetch(`${BASE_URL}/${thoughtId}/delete`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("deleting thought failed:", error);
    throw error;
  }
};

//PATCH - update a thought
export const patchThought = async (thoughtId, updates) => {
  try {
    const res = await fetch(`${BASE_URL}/${thoughtId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("updating thought failed:", error);
    throw error;
  }
};