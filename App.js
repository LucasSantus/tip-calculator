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

const CalcButton = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: #168ACC;
    padding: 10px;
    border-radius: 10px;
`

const ResultArea = styled.View`
    width: 100%;
    margin-top: 30px;
    background-color: #EEEEEE;
    padding: 20px;
    justify-content: center;
    align-items: center;
`

const ResultItemTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
`

const ResultItem = styled.Text`
    font-size: 15px;
    margin-bottom: 30px;
`

const PctArea = styled.View`
    flex-direction: row;
    margin: 20px;
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
    const [value, setValue] = useState('');
    const [tip, setTip] = useState(0);
    const [pct, setPct] = useState(10);
    const [active, setActive] = useState(false);

    const calc = () => {
        if (value) {
            setTip(value * (pct / 100));
        }
    }

    useEffect(() => {
        calc();
    }, [pct])

    return (
        <Page>
            <HeaderText>Calculadora de Gorjeta</HeaderText>
            <Input
                placeholder="Quanto deu a conta?"
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={value}
                onChangeText={(e) => { setValue(e) }}
            />

            <TextB>Deseja gorgeta?</TextB>

            <PctItem onPress={() => { setActive(true) }}>
                <TextW>Sim</TextW>
            </PctItem>

            <PctItem onPress={() => { setActive(false) }} >
                <TextW>Não</TextW>
            </PctItem>

            {active && tip > 0 &&
                <View>
                    <PctArea>
                <PctItem onPress={() => { setPct(5) }}>
                    <TextW>5%</TextW>
                </PctItem>
                <PctItem onPress={() => { setPct(10) }} >
                    <TextW>10%</TextW>
                </PctItem>
                <PctItem onPress={() => { setPct(15) }} >
                    <TextW>15%</TextW>
                </PctItem>
                <PctItem onPress={() => { setPct(20) }}>
                    <TextW>20%</TextW>
                </PctItem>
            </PctArea>

            <CalcButton onPress={calc} >
                <TextW>{`Calcular ${pct}%`}</TextW>
            </CalcButton>

                {tip > 0 &&

                    <ResultArea>
                    <ResultItemTitle>
                        Valor da conta
                    </ResultItemTitle>
                    <ResultItem>R$ {parseFloat(value).toFixed(2)}</ResultItem>

                    <ResultItemTitle>
                        Valor da Gorjeta
                    </ResultItemTitle>
                    <ResultItem>R$ {tip.toFixed(2)} ({`${pct}%`})</ResultItem>

                    <ResultItemTitle>
                        Valor Total
                    </ResultItemTitle>
                    <ResultItem>R$ {(parseFloat(tip) + parseFloat(value)).toFixed(2)}</ResultItem>

                    </ResultArea>
                    }
                </View>
            }
        </Page>
    )
}