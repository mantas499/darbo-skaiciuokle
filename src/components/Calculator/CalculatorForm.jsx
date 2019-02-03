import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Search from "../Search/Search";
import Card from "@material-ui/core/Card/Card";
import LocalStorageService from "../../utils/localStorageService";

class CalculatorForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.LocalStorageService = new LocalStorageService();
    this.state = {
      historyItem: props.historyItem,
      productModel: null,
      count: 0,
      result: null
    }
  }

  onSearchValueChange(result) {
    this.setState({
      productModel: result.value
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onCalculateClick() {
    const model = this.state.productModel;
    if (this.state.count > 0) {
      const result = this.state.count * model.minutePrice * model.manufactoringEstimate / 100;
      this.setState({
        result: result
      })
    }
  }

  onSaveClick() {
    if (this.state.historyItem) {
      let oldInnerItems = [];
      oldInnerItems = this.state.historyItem.items;

      oldInnerItems.push({
        modelId: this.state.productModel.id,
        count: this.state.count,
        sum: this.state.result
      });
      const updatedSum = this.state.historyItem.sum + this.state.result;
      const updatedHistoryItem = Object.assign({}, this.state.historyItem, {
        items: oldInnerItems,
        sum: updatedSum
      });
      this.LocalStorageService.saveDocumentItem('history-item', updatedHistoryItem);
      this.setState({
        historyItem: updatedHistoryItem,
        result: null,
        productModel: null,
        count: 0
      })
    }
  }

  render() {
    return (
      <>
        <div style={{
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          height: '100%',
          paddingLeft: '5%',
          paddingRight: '5%'
        }}>
          <div style={{
            position: 'relative',
            width: '95%',
            display: 'inline-block'
          }}>
            <div style={{width: '90%', left: '50%', position: 'absolute', transform: 'translateX(-50%)'}}>
              {this.state.historyItem && (`Pasirinktas išdirbis: ${this.state.historyItem.name} (nuo ${this.state.historyItem.startDate} iki ${this.state.historyItem.endDate})`)}
              <Search title={'Ieškoti modelio'} height={100} placeholder={"Pradėkite vesti modelio pavadinimą"}
                      for={'product-model'} onSearchValueChange={this.onSearchValueChange.bind(this)}/>
              {this.state.productModel &&
              <>
                <div>
                  {`Pasirinktas modelis: ${this.state.productModel.name}`}
                </div>
                <div>
                  <TextField
                    style={{width: '100%'}}
                    id="outlined-name"
                    label="Kiekis"
                    type={'number'}
                    value={this.state.count}
                    onChange={this.handleChange('count')}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button onClick={this.onCalculateClick.bind(this)} style={{
                    left: '50%',
                    marginTop: 20,
                    transform: 'translateX(-50%)',
                    width: '50%',
                    background: 'mediumseagreen',
                    fontWeight: '350',
                    color: 'white',
                    padding: '1%'
                  }}>Skaičiuoti</Button>
                </div>
              </>
              }
              {(this.state.result) &&
              <>
                <div style={{paddingTop: '2%', paddingBottom: '2%'}}>
                  <Card style={{textAlign: 'center', padding: '2%'}}>
                    {`Suma: ${this.state.result} EUR`}
                  </Card>
                  <Button onClick={this.onSaveClick.bind(this)} style={{
                    left: '50%',
                    marginTop: 20,
                    transform: 'translateX(-50%)',
                    width: '50%',
                    background: 'mediumseagreen',
                    fontWeight: '350',
                    color: 'white',
                    padding: '1%'
                  }}>Saugoti</Button>
                </div>
              </>
              }
              <div style={{paddingTop: 25}}>
                <Card style={{textAlign: 'center', padding: '2%'}}>
                  {this.state.historyItem && `Viso pasirinkto išdirbio suma: ${this.state.historyItem.sum} EUR`}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CalculatorForm;