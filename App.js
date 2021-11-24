import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native'

const Page = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    margin-top: 25px;
`

const HeaderText = styled.Text`
    font-size: 25px;
    margin: 10px;
`

const Input = styled.TextInput`
    height: 50px;
    font-size: 18px;
    background-color: #EEEEEE;
    width: 90%;
    margin-top: 20px;
    border-radius: 10px;
    padding: 10px;
`

const Row = styled.View`
    flex-direction: row;
`

const ResultArea = styled.View`
    width: 100%;
    margin-top: 30px;
    background-color: #EEEEEE;
    padding: 20px;
    justify-content: center;
    align-items: center;
`


const ResultItem = styled.Text`
    font-size: 15px;
    margin-bottom: 30px;
`

const PctArea = styled.View`
    flex-direction: row;
    margin: 20px;
`

const Button = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: #168ACC;
    padding: 10px;
    border-radius: 10px;
    margin: 3px;
`

const PctItem = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: #168ACC;
    padding: 10px;
    border-radius: 10px;
    margin: 0px 10px;
`

const TextW = styled.Text`
    color: #FFF;
`

const TextB = styled.Text`
    color: black;
`

export default () => {
    const [result, setResult] = useState('');
    const [tip, setTip] = useState(0);
    const [pct, setPct] = useState(10);
    const [active, setActive] = useState(false);
    const [is_input, setIsInput] = useState(true);

    const calc = () => {
        if (result) {
            setTip(result * (pct / 100));
        }
    }

    useEffect(() => {
        calc();
    }, [pct])

    return (
        <Page>
            <HeaderText>Tip Calculator</HeaderText>

            {is_input &&
                <View>
                    <Input
                        placeholder = "Insira o valor total da conta: "
                        placeholderTextColor = "#000"
                        keyboardType = "numeric"
                        value = {result}
                        onChangeText = {
                            (e) => { setResult(e) }
                        }
                    />

                    <TextB>Deseja entregar gorgeta ao garçon?</TextB>

                    <Row>
                        <Button onPress={() => { 
                            setActive(true)
                            setIsInput(false)
                        }}>
                            <TextW>Sim</TextW>
                        </Button>

                        <Button onPress={() => { 
                            setActive(false) 
                            setIsInput(true)
                        }} >
                            <TextW>Não</TextW>
                        </Button>
                    </Row>
                </View>
            }

            {active &&
                <View>
                    <Button onPress={() => { 
                            setActive(false) 
                            setIsInput(true)
                        }} >
                            <TextW>Retornar</TextW>
                        </Button>

                    <PctArea>
                        <PctItem onPress={() => { setPct(5) }}>
                            <TextW>05%</TextW>
                        </PctItem>
                        <PctItem onPress={() => { setPct(10) }} >
                            <TextW>10%</TextW>
                        </PctItem>
                        <PctItem onPress={() => { setPct(15) }} >
                            <TextW>15%</TextW>
                        </PctItem>
                    </PctArea>

                    {
                        tip > 0 &&
                        <ResultArea>
                            <ResultItem>Valor da conta: R$ {parseFloat(result).toFixed(2)}</ResultItem>
                            <ResultItem>Porcentagem da gorgeta: {`${pct}%`}</ResultItem>
                            <ResultItem>Valor da gorjeta: R$ {tip.toFixed(2)} ({`${pct}%`})</ResultItem> 
                            <ResultItem>Valor total: R$ {(parseFloat(tip) + parseFloat(result)).toFixed(2)}</ResultItem>
                        </ResultArea>
                    }
                </View>
            }
        </Page>
    )
}