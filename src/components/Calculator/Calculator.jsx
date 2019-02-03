import React from 'react';
import Search from "../Search/Search";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import LocalStorageService from "../../utils/localStorageService";
import CalculatorForm from "./CalculatorForm";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.LocalStorageService = new LocalStorageService();
    this.state = {
      historyItem: null,
      name: '',
      startDate: null,
      endDate: null,
      items: [],
      initState: true
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSelect() {
    if (this.state.historyItem) {
      this.setState({
        initState: false
      });
    } else if (this.state.name && this.state.startDate && this.state.endDate) {
      const newItem = this.LocalStorageService.addNewItem('history-item', {
        name: this.state.name,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        items: this.state.items,
        sum: 0
      });
      this.setState({
        historyItem: newItem
      }, () => {
        this.setState({
          initState: false
        })
      })
    }
  }

  onSearchValueChange(searchResult) {
    this.setState({
      historyItem: searchResult.value
    })
  }

  render() {
    const textFieldStyle = {
      width: '100%',
      paddingBottom: 20
    };

    const datePickerStyle = {
      width: '50%',
      display: 'inline-block'
    };

    if (!this.state.initState) {
      console.log(this.state.historyItem);
      return (
        <CalculatorForm historyItem={this.state.historyItem}/>
      )
    }

    return (
      this.state.initState && <div style={{padding: '5%'}}>
        <div>
          Sukurti naują išdirbį arba ieškoti esamo
        </div>
        <div style={{paddingBottom: '50px'}}>
          <TextField
            style={textFieldStyle}
            id="outlined-name"
            label="Pavadinimas"
            value={this.state.history}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="date"
            label="Išdirbio pradžios data"
            type="date"
            value={this.state.history}
            onChange={this.handleChange('startDate')}
            style={datePickerStyle}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="Išdirbio pabaigos data"
            type="date"
            value={this.state.history}
            onChange={this.handleChange('endDate')}
            style={datePickerStyle}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Search for={'history-item'} label={'Ieškoti išdirbio:'} placeholder={'Ieškoti pagal pavadinimą'}
                onSearchValueChange={this.onSearchValueChange.bind(this)}/>
        <Button onClick={this.onSelect.bind(this)} style={{
          left: '50%',
          marginTop: 20,
          transform: 'translateX(-50%)',
          width: '50%',
          background: 'mediumseagreen',
          fontWeight: '350',
          color: 'white',
          padding: '1%'
        }}>
          Tęsti
        </Button>
      </div>
    )
  }
}

export default Calculator