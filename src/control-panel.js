import { Dispatcher, Store } from './flux';

const controlPanelDispatcher = new Dispatcher();

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_FONTSIZE_PREFERENCE = 'UPDATE_FONTSIZE_PREFERENCE';


const userNameUpdateAction = (name) => {
    return {
        type: UPDATE_USERNAME,
        value: name
    };
};

const fontsizePreferenceUpdateAction = (size) => {
    return {
        type: UPDATE_FONTSIZE_PREFERENCE,
        value: size
    };
};

document.getElementById('userNameInput').addEventListener('input', ({ target }) => {
    controlPanelDispatcher.dispatch(userNameUpdateAction(target.value));
});

document.forms.fontSizeForm.fontSize.forEach(element => {
    element.addEventListener('change', ({ target }) => {
        controlPanelDispatcher.dispatch(fontsizePreferenceUpdateAction(target.value));
    });
});

class UserPrefsStore extends Store {
    getInitialState() {
        return localStorage['preferences'] ? JSON.parse(localStorage['preferences']) : {
            userName: "Mikel",
            fontSize: "small"
        };
    }

    __onDispatch(action) {
        switch(action.type) {
            case UPDATE_USERNAME:
                this.__state.userName = action.value;
                this.__emitChange(); 
                break;
            case UPDATE_FONTSIZE_PREFERENCE:
                this.__state.fontSize = action.value;
                this.__emitChange(); 
                break;
        };
    }

    getUserPreferences() {
        return this.__state;
    }
}

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

userPrefsStore.addListener((state) => {
    render(state);
    localStorage['preferences'] = JSON.stringify(state);
})

const render = ({userName, fontSize}) => {
    document.getElementById('userName').innerText = userName;
    document.getElementsByClassName('container')[0].style.fontSize = fontSize === 'small' ? '16px' : '32px';
    document.forms.fontSizeForm.fontSize.value = fontSize;
};

render(userPrefsStore.getUserPreferences());