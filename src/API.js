const BASE_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

// GET- get thoughts
//Fetch är som en liten robot som hämtar lådan med tankar. json gör det läsbart. lådan skickas tillbaka till app.js som visar tankarna. 
export const fetchThoughts = () => {
  return fetch(BASE_URL)
    .then((res) => rex.json());
};

//POST - send a new thought
//när en tanke skrivs i formuläret, tar jag texten och skickar till api-servern. servern lägger den i databasen och skickar tillbaka en ny tanke-låda. app.js visar nu den hya lådan och den nyaste tanken lägst upp i listan. 
export const postThoughts = () => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  })
    .then((res) => res.json());
};

// POST - send a like to a thought
//när hjärtat klickas skickas en signal till api:t. Den säger öka antalet hjärtan på denna tanken. Servern gör det och skickar tillbaka den uppdaterade tanken. 
export const likeThought = (thoughtId) => {
  return fetch(`${BASE_URL}/${thoughtId}/like`, {
    method: "POST"
  })
    .then((res) => res.json());
};