const stringUseAsync = `function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}


function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const {data, error, status} = state

  const run = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        data => {
          dispatch({type: 'resolved', data})
        },
        error => {
          dispatch({type: 'rejected', error})
        },
      )
    },
    [dispatch],
  )

  const setData = React.useCallback(
    data => dispatch({type: 'resolved', data}),
    [dispatch],
  )
  const setError = React.useCallback(
    error => dispatch({type: 'rejected', error}),
    [dispatch],
  )

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  }
}`

const stringUseAsync2 = `function useAsync(initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer)

  //...do some stuff

  return {
    state,
    dispatch
  }
}`

const stringUseAsync3 = `const [state, dispatch] = useAsync()

React.useEffect(() => {
  dispatch({type: 'pending'})
  fetch("https://api.example.com/items").then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
},[])`

const stringUseAsync4 = `const run = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        data => {
          dispatch({type: 'resolved', data})
        },
        error => {
          dispatch({type: 'rejected', error})
        },
      )
    },
    [dispatch],
  )`

const stringUseAsync5 = `const {state, run} = useAsync()

React.useEffect(() => {
  run(fetch("https://api.example.com/items"))
}, [])`

const stringUseAsync6 = `const setData = React.useCallback(
  data => dispatch({type: 'resolved', data}),
  [dispatch],
)
const setError = React.useCallback(
  error => dispatch({type: 'rejected', error}),
  [dispatch],
)`

const strings = { stringUseAsync, stringUseAsync2, stringUseAsync3 }
export default strings
export {
  stringUseAsync,
  stringUseAsync2,
  stringUseAsync3,
  stringUseAsync4,
  stringUseAsync5,
  stringUseAsync6,
}
