'use strict';

const getWizardVariables = () => {
    const charactersBlock = document.querySelector('.setup');
    const wizardsListWrapper = document.querySelector('.setup-similar');
    const wizardTemplate = document.querySelector('#similar-wizard-template').content;
    const wizardsList = document.querySelector('.setup-similar-list');
    return { charactersBlock, wizardsListWrapper, wizardTemplate, wizardsList };
};

const { charactersBlock, wizardsListWrapper, wizardTemplate, wizardsList } = getWizardVariables();

const showBlock = block => {
    if (block.classList.contains('hidden')) {
        block.classList.remove('hidden');
    }
};

const randomIndex = (obj) => Math.floor(Math.random() * obj.length);

const wizards = {
    name: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surname: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColor: ['black', 'red', 'blue', 'yellow', 'green'],
    getRandomWizard() {
        return {
            name: `${this.name[randomIndex(this.name)]} ${this.surname[randomIndex(this.surname)]}`,
            coatColor: this.coatColor[randomIndex(this.coatColor)],
            eyesColor: this.eyesColor[randomIndex(this.eyesColor)]
        }
    }
};

const createWizards = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
        let wizard = wizardTemplate.cloneNode(true);
        wizard.querySelector('.setup-similar-label').textContent = wizards.getRandomWizard().name;
        wizard.querySelector('.wizard-coat').style.fill = wizards.getRandomWizard().coatColor;
        wizard.querySelector('.wizard-eyes').style.fill = wizards.getRandomWizard().eyesColor;
        fragment.appendChild(wizard);
    }
    wizardsList.appendChild(fragment);
};


showBlock(charactersBlock);
showBlock(wizardsListWrapper);
createWizards();

