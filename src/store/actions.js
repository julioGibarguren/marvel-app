export const INCREMENT = 'INCREMENT'
export const OFFSET = 'OFFSET'
export const LIMIT = 'LIMIT'

export const hero = hero => {
    return {
        type: INCREMENT,
        hero
    }
}

export const offset = offset => {
    return {
        type: OFFSET,
        offset
    }
}

export const limit = limit => {
    return {
        type: LIMIT,
        limit
    }
}
