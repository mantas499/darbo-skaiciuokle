import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import LocalStorageService from '../../utils/localStorageService';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Link from "@material-ui/core/Link/Link";
import { navigate } from "gatsby"

class ProductsForm extends React.Component {
  constructor(props) {
    super(props);
    this.LocalStorageService = new LocalStorageService();
    this.state = {
      name: '',
      minutePrice: null,
      manufactoringEstimate: null
    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  onSave() {
    if (this.isNumber(this.state.minutePrice) && this.isNumber(this.state.manufactoringEstimate) && this.state.name) {
      this.LocalStorageService.saveDocumentItem('product-model', {
        name: this.state.name,
        minutePrice: this.state.minutePrice,
        manufactoringEstimate: this.state.manufactoringEstimate
      })
      navigate('products');
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const textFieldStyle = {
      width: '100%'
    };

    return (
      <>
        <div style={{width: '100%', minHeight: '500px', paddingLeft: '5%', paddingRight: '5%'}}>
          <div style={{
            position: 'relative',
            width: '95%',
            display: 'inline-block'
          }}>
            <div style={{width: '90%', left: '50%', position: 'absolute', transform: 'translateX(-50%)'}}>
              <TextField
                style={textFieldStyle}
                id="outlined-name"
                label="Pavadinimas"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                style={textFieldStyle}
                id="outlined-name"
                label="Minutės įvertis"
                value={this.state.minutePrice}
                onChange={this.handleChange('minutePrice')}
                margin="normal"
                type={'number'}
                variant="outlined"
              />
              <TextField
                style={textFieldStyle}
                id="outlined-name"
                label="Laiko norma min."
                type={'number'}
                value={this.state.manufactoringEstimate}
                onChange={this.handleChange('manufactoringEstimate')}
                margin="normal"
                variant="outlined"
              />
              <Button onClick={this.onSave.bind(this)} variant={"raised"} style={{
                left: '50%',
                marginTop: 20,
                transform: 'translateX(-50%)',
                width: '50%',
                background: 'mediumseagreen',
                fontWeight: '350',
                color: 'white',
                padding: '1%'
              }}>
                Išsaugoti
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ProductsForm;