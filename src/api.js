const BASE_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

// GET - fetches the 20 most recent thoughts from the API. A list of messages will be shown as the app loads. 
export const fetchThoughts = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
};

// POST - creates a new thought. The API wants a JSON body with a "message" property. If it is successful, the API returns a full thought object back. 
export const postThought = async (message) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  const data = await res.json();
  return data;
};

// POST - Like a thought. This function sends a like to the API using the thoughts ID. The API then sends back an updated thought, including a new heart count. 
export const likeThought = async (thoughtId) => {
  const res = await fetch(`${BASE_URL}/${thoughtId}/like`, {
    method: "POST",
  });

  const data = await res.json();
  return data;
};
