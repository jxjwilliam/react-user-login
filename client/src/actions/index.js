const _common = ary => () => dispatch => {
    return fetch(ary[0])
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: ary[1],
                payload: data
            })
        })
        .catch(e => console.error(e))
}

export const loginAction = (['/api/login', 'USER_LOGIN'])

export const searchAction = keyword => ({
    type: "SEARCH",
    payload: keyword
})

export const sort = {
    type: "SORT"
}