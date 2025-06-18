import { reduxGet, reduxPut } from 'utils/ajax'

export const autotesterConfigLoaded = (c) => {
  return ({
    type: 'AUTOTESTER_CONFIG_LOADED',
    payload: c
  })
}

export const fetchAutotesterConfig = () => {
  return reduxGet({
    url: '/api/autotester/config',
    success: autotesterConfigLoaded
  })
}

export const updateAutotesterConfig = (c) => {
  return reduxPut({
    url: '/api/autotester/config',
    data: c,
    success: fetchAutotesterConfig
  })
}
