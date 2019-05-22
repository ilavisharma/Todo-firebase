export const signIn= (uid) => {
    return {
        type: 'SIGN_IN',
        payload: uid
    }
}

export const signOut= () => {
    return {
        type: 'SIGN_OUT'
    }
}

