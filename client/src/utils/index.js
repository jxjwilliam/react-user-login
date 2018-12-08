export const loadingDefer = ms => {
    return new Promise((resolve, reject) => {
        ms = ms || 2000; //default is 2 seconds
        setTimeout(() => resolve('user-login'), ms);
    })
}

export const filterData = (state, items) => {
    if (Array.isArray(items)) {
        let ss = {}
        items.forEach(item => (ss[item] = state[item]))
        ss['loggedIn'] = state.loggedIn
        return ss;
    }
    else {
        return {[items]: state[items], loggedIn: state.loggedIn}
    }
}

export const displayReduxData = data => {
    let displayData = null;
    if (Array.isArray(data)) {
        displayData = data.reduce((memo, d, i) => {
            memo.push(
                <code key={`d${i}`}>
                    {JSON.stringify(d)}
                </code>
            )
            return memo;
        }, [])
    }
    else {
        displayData = (
            <code>
                {JSON.stringify(data)}
            </code>
        )
    }
    return (
        <blockquote>
            <pre>
                {displayData}
            </pre>
        </blockquote>
    )
}

export const isEmpty = prop => {
    return prop === null || prop === undefined ||
        (prop.hasOwnProperty("length") && prop.length === 0) ||
        (prop.constructor === Object && Object.keys(prop).length === 0)
}
