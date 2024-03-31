const languages = {
  "en-GB": "English",
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
  };
// Function to update language selection dropdowns
function updateLanguageDropdowns() {
  const lang1Select = document.getElementById('lang1Select');
  const lang2Select = document.getElementById('lang2Select');

  for (let lang_code in languages) {
      let selectedLang1 = lang_code === localStorage.getItem('lang1') ? 'selected' : '';
      let selectedLang2 = lang_code === localStorage.getItem('lang2') ? 'selected' : '';

      let option1 = `<option ${selectedLang1} value="${lang_code}">${languages[lang_code]}</option>`;
      let option2 = `<option ${selectedLang2} value="${lang_code}">${languages[lang_code]}</option>`;

      lang1Select.insertAdjacentHTML('beforeend', option1);
      lang2Select.insertAdjacentHTML('beforeend', option2);
  }
}

// Call the function to populate language dropdowns
updateLanguageDropdowns();

// Event listener for language selection change
document.getElementById('lang1Select').addEventListener('change', (event) => {
  localStorage.setItem('lang1', event.target.value);
});

document.getElementById('lang2Select').addEventListener('change', (event) => {
  localStorage.setItem('lang2', event.target.value);
});

const languageSelection = document.getElementById('languageSelection');
  if (languageSelection.style.display === 'none') {
      languageSelection.style.display = 'block';
  } else {
      languageSelection.style.display = 'none';
  }

// Update the popup with the detected input
function updatePopup(input) {
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerText = input;

    const text = inputContainer.innerText;
    const translateFrom = localStorage.getItem('lang1');
    const translateTo = localStorage.getItem('lang2');
  
    if (!text) return;
    document.querySelector('.to-text').setAttribute('placeholder', 'Translating...');
    const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  
  fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
          if (data.responseData && data.responseData.translatedText) {
              document.querySelector('.to-text').value = data.responseData.translatedText;
          } else {
              document.querySelector('.to-text').value = 'Translation not available';
          }
          document.querySelector('.to-text').setAttribute('placeholder', 'Translation');
      })
      .catch((error) => {
          console.error('Error fetching translation:', error);
          document.querySelector('.to-text').value = 'Error fetching translation';
          document.querySelector('.to-text').setAttribute('placeholder', 'Translation');
      });
}
  
  // Get the active tab and execute the content script to monitor input
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: contentScript
    });
  });
  
  // Content script to monitor input on web pages
  function contentScript() {
    // Track input events on the page
    document.addEventListener('input', function(event) {
      const input = event.target.value;
      // Send input to the background script
      chrome.runtime.sendMessage({ input });
    });
  }
  
  // Listen for messages from the content script and update the popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    updatePopup(request.input);
  });
  