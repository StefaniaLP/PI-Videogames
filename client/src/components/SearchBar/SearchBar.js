import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName , getVideogames} from '../../actions';
import './SearchBarc.css'

export default function SearchBar ({SetActualPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState ('');


    useEffect (()=>{
        dispatch(getVideogames())
    },[dispatch])

    function handleInputChange (e){
        dispatch(getName(e))
        SetActualPage(1)

    }
    
    
    return (
        <div >
            <div>
                <input 
                    type='text' 
                    placeholder='Buscar...'
                    value={name}
                    onChange={(e)=> {setName(e.target.value); handleInputChange(e.target.value);}} className='inp'
                /> 
            </div>
            
           
        </div>
    )
}