export const BASE_URL = "https://js-project-api-e8xy.onrender.com/thoughts";
export const AUTH_BASE_URL = "https://js-project-api-e8xy.onrender.com";


// GET - fetches the thoughts from the database
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

// POST - creates a new thought. 
export const postThought = async (message, accessToken) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
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

// POST - Like a thought. You dont have to be logged in for this. 
export const likeThought = async (thoughtId) => {
  try {
    const res = await fetch(`${BASE_URL}/${thoughtId}/like`, {
      method: "POST",
    });

    if (!res.ok) throw new Error(`Like failed`);
    return await res.json();
  } catch (error) {
    console.error("liking thought failed:", error);
    throw error;
  }
};

//DELETE - remove a thought
export const deleteThought = async (thoughtId, accessToken) => {
  try {
    const res = await fetch(`${BASE_URL}/${thoughtId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("deleting thought failed:", error);
    throw error;
  }
};

//PATCH - update a thought, when changed. 
export const patchThought = async (thoughtId, updates, accessToken) => {
  try {
    const res = await fetch(`${BASE_URL}/${thoughtId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
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

// AUTH endpoints - for signup and login. 
export const signUp = async (email, password) => {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Sign up failed");
    return res.json();
  } catch (error) {
    console.error("Sign up failed:", error)
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}