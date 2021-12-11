import React, { useState } from "react"
import { Checkbox, Input } from "semantic-ui-react";
import config from './config.json';
import BoostCalc from './features/BoostCalculator'

const calc = new BoostCalc()

const App = () => {
    const [sum, setSum] = useState(0)
    const [beginMMR, setBeginMMR] = useState('')
    const [endMMR, setEndMMR] = useState('')
    const [isParty, setIsParty] = useState()
    const calculateNewPrise = (begin, end, checked) => {
        calc.calculate(
            'RUB', begin, end, checked
        ).then(result => setSum(result))
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <Input style={{ marginTop: '1em' }}
                placeholder='begin mmr' value={beginMMR}
                onChange={(e) => {
                    setBeginMMR(e.target.value)
                    calculateNewPrise(e.target.value, endMMR, isParty)
                }}
            ></Input>
            <br />
            <Input style={{ marginTop: '1em' }}
                placeholder='end mmr' value={endMMR}
                onChange={(e) => {
                    setEndMMR(e.target.value)
                    calculateNewPrise(beginMMR, e.target.value, isParty)
                }}
            ></Input>
            <div>
                <Checkbox value={isParty} label='патибуст'
                    onChange={(e, w) => {
                        setIsParty(w.checked)
                        calculateNewPrise(beginMMR, endMMR, w.checked)
                    }}
                    style={{ marginTop: '1em' }}
                />
            </div>
            <h2>Цена для клиента: {sum}</h2>
            <h2>Цена для бустера: {sum * 0.9}</h2>
        </div>
    )
}

export default App