const button = document.getElementById('search-button');
button.addEventListener('click', getCountryInfo);

const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setQuery)

const container = document.getElementById("countries");

function setQuery(e) {
    search = e.target.value;
    if (e.keyCode === 13) {
        getCountryInfo();
    }
}

async function getCountryInfo() {
    searchBar.value = '';
    removeChildren(countries)
    removeChildren(countries)
    removeChildren(countries)
    try {
        removeError()
        const country = search
        const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
        const response = await axios.get(url)

        const countryData = response.data[0]

        const currencies = countryData.currencies
        const currencyString = getCountryCurrency(currencies)

        const geopgraphy = `${countryData.name} is situated in ${countryData.subregion}. It has a population of ${countryData.population} people`
        const capitalCity = `The capital is ${countryData.capital} ${currencyString}`

        const languages = countryData.languages
        const languagesString = getCountryLangauges(languages)

        const displayCountry = document.getElementById('countries')
        displayCountry.style.border='1px solid lightgray'
        displayCountry.style.padding='20px'

        const countryFlag = document.createElement('IMG')
        countryFlag.setAttribute('src', countryData.flag)
        countryFlag.setAttribute('width', '100px')
        countryFlag.style.border='1px solid lightgray'
        displayCountry.appendChild(countryFlag)

        const displayCountryName = document.createElement('p')
        displayCountryName.textContent = `${geopgraphy}`
        displayCountry.appendChild(displayCountryName)

        const displayCountryInfo = document.createElement('p')
        displayCountryInfo.textContent = `${capitalCity}`
        displayCountry.appendChild(displayCountryInfo)

        const displayCountryLanguage = document.createElement('p')
        displayCountryLanguage.textContent = `${languagesString}`
        displayCountry.appendChild(displayCountryLanguage)

        const displayCountryWiki = document.createElement('a')
        displayCountryWiki.textContent = `More info about ${countryData.name} on Wikipedia`
        displayCountryWiki.href = `https://en.wikipedia.org/wiki/${countryData.name}`
        displayCountryWiki.target = '_blank'
        displayCountry.appendChild(displayCountryWiki)

    } catch {
        invalidCountry();
    }
}

function getCountryLangauges(countryLanguages) {
    const languageOne = countryLanguages[0]
    const languageTwo = countryLanguages[1]
    const languageThree = countryLanguages[2]
    if (countryLanguages.length === 1) {
        return `They speak ${languageOne.name}.`
    }
    if (countryLanguages.length === 2) {
        return `They speak ${languageOne.name} and ${languageTwo.name}.`
    }
    if (countryLanguages.length === 3) {
        return `They speak ${languageOne.name}, ${languageTwo.name} and ${languageThree.name}.`
    }
}

function getCountryCurrency(inputCurrency) {
    const countryCurrencyOne = inputCurrency[0]
    const countryCurrencyTwo = inputCurrency[1]
    if (inputCurrency.length === 1) {
        return `and you can pay with ${countryCurrencyOne.name}'s`
    }
    if (inputCurrency.length > 1) {
        return `and you can pay ${countryCurrencyOne.name}'s and ${countryCurrencyTwo.name}'s`
    }
}

function removeChildren() {
    for (const containerNode of container.childNodes) {
        container.removeChild(containerNode);
    }
}

function invalidCountry() {
        const errorMessage = document.getElementById('errormessage')
        const errorCountryMessage = document.createElement('p')
        errorCountryMessage.textContent = 'This is not a valid country in this database, try something else?';
        errorMessage.appendChild(errorCountryMessage)
}

function removeError(){
    const removeMessage = document.getElementById('errormessage')
    removeMessage.innerHTML = '';
}



