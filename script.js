const API_URL = "https://emoji-api.com/emojis?access_key=3671c480d9e6af663406087c1cc4a054535df718"; // Replace with your actual API key

let emojiDictionary = {};

// Fetch emojis from API and build the emoji dictionary
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    emojiDictionary = data.reduce((dict, emoji) => {
      dict[emoji.slug] = emoji.character; // Map word (slug) to emoji character
      return dict;
    }, {});
    console.log('Emoji Dictionary Loaded:', emojiDictionary); // To check the loaded emojis
  })
  .catch(error => {
    console.error("Error fetching emojis:", error);
  });

// Function to translate text to emojis
function translateToEmojis(text) {
    const words = text.split(' ');
    const emojiText = words.map(word => {
        return emojiDictionary[word.toLowerCase()] || word; // Use API emoji if available, else use the original word
    }).join(' ');
    return emojiText;
}

// Event listener for translation button
document.getElementById('translateBtn').addEventListener('click', function() {
    const userInput = document.getElementById('textInput').value;
    const translatedText = translateToEmojis(userInput);
    document.getElementById('translatedText').textContent = translatedText;
});
