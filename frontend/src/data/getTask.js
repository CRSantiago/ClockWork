import axios from 'axios'
import { buildPath } from '../utils/buildPath'
import React from 'react'

export const getTask = async (id) =>
{
    let jsonbuffer
    let parsed
    let tasktitle
    try {
        const response = await axios.get(buildPath('api/v1/clockwork/getTask/' + id),
        { headers: 
            { token: localStorage.getItem('token') 
            } 
        })
            jsonbuffer = JSON.stringify(response.data[0])
            parsed = JSON.parse(jsonbuffer)
            tasktitle = parsed.title
            return tasktitle
        } catch (error) {
            console.log(error)
        }
}
