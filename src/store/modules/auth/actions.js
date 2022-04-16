let timer;

export default { 
    async login(context, payload) {
        // return a promise
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode
        let ep = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz-qJLk4AZuegnNxbUEj_cwCDkmVy1HbU'
        if (mode === 'signup') {
            ep = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz-qJLk4AZuegnNxbUEj_cwCDkmVy1HbU'
        }
        const response = await fetch(ep, {
            method: 'POST',
            // USE JSON STRINGIFY
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const data = await response.json();

        if (!response.ok) {
            const e = new Error(data.message) || 'Failed to log in';
            throw e;
        }
        const expiresIn = data.expiresIn * 1000; // convert to num
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function () {
            context.dispatch('autoLogout')
        }, expiresIn)

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            // tokenExpiration: data.expiresIn
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();
        // convert to num by +

        if (expiresIn < 0) return;

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);
        
        if (token && userId ) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                // tokenExpiration: null,
            })
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');


        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
            // tokenExpiration: null
        })
    },
    autoLogout(context) {
        // call another action inside an action
        context.dispatch('logout')
        context.commit('setAutoLogout')
    }
}