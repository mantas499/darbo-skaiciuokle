import React from 'react';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
import LocalStorageService from "../../utils/localStorageService";
import Delete from '@material-ui/icons/Delete';
import Link from "@material-ui/core/Link/Link";
import Plus from '@material-ui/icons/Add';
import { navigate } from "gatsby"

class ProductsList extends React.Component {

  constructor(props) {
    super(props);
    this.LocalStorageService = new LocalStorageService();
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.setState({
      products: this.LocalStorageService.getDocument('product-model')
    })
  }

  handleDelete(index) {
    const productId = this.state.products[index].id;
    this.LocalStorageService.deleteItem(productId, 'product-model');
    this.setState({
      products: this.LocalStorageService.getDocument('product-model')
    })
  }

  render() {
    if (this.state.products.length == 0) {
      return (
        <>
          <div align="center" style={{padding: '5%', fontSize: '1.15em', paddingBottom: '2%'}}>
            Nėra sukurtų modelių, kad pridėti spauskite čia
          </div>
          <div align="center">
            <Plus onClick={() => navigate('/products-form')} style={{cursor: 'pointer', fontSize: '2em', color: 'black'}}/>
          </div>
        </>
      )
    }

    return (
      <List>
        {this.state.products.map((product, index) => {
          return (
            <ListItem key={index}>
              <ListItemText
                primary={`Pavadinimas: ${product.name}, minutės įkainis: ${product.minutePrice}, gaminimo laikas: ${product.manufactoringEstimate}`}
              />
              <Delete style={{right: 5, cursor: 'pointer'}} onClick={this.handleDelete.bind(this, index)}/>
            </ListItem>
          )
        })}
      </List>
    )
  }
}

export default ProductsList;