import React from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Delete from "@material-ui/icons/Delete";
import List from "@material-ui/core/List/List";
import LocalStorageService from "../../utils/localStorageService";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Button from "@material-ui/core/Button/Button";

class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.LocalStorageService = new LocalStorageService();
    this.state = {
      open: false,
      deleteEnabled: false,
      historyItems: [],
      itemToDelete: -1
    }
  }

  componentDidMount() {
    this.setState({
      historyItems: this.LocalStorageService.getDocument('history-item')
    })
  }

  handleDelete(index) {
    this.setState({
      open: true,
      itemToDelete: index
    });
  }

  handleClose(result) {
    const index = this.state.itemToDelete;
    if (result && index >= 0) {
      const historyItemId = this.state.historyItems[index].id;
      this.LocalStorageService.deleteItem(historyItemId, 'history-item');
      this.setState({
        historyItems: this.LocalStorageService.getDocument('history-item'),
        open: false,
        deleteEnabled: false,
        itemToDelete: -1
      });
      return;
    }
    this.setState({
      open: false,
      itemToDelete: -1,
      deleteEnabled: false
    });
  }

  render() {
    if (this.state.historyItems.length == 0) {
      return (
        <>
          {`Išdirbio istorija tuščia`}
        </>
      )
    }

    return (
      <div>
        <List>
          {this.state.historyItems.map((historyItem, index) => {
            return (
              <ListItem key={index}>
                <ListItemText
                  primary={`Pavadinimas: ${historyItem.name}, pradžios data: ${historyItem.startDate}, pabaigos data: ${historyItem.endDate}`}
                />
                <Delete style={{right: 5, cursor: 'pointer'}} onClick={this.handleDelete.bind(this, index)}/>
              </ListItem>
            )
          })}
        </List>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this, false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ar tikrai norite ištrinti išdirbio įrašą?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this, false)} color="primary">
              Atšaukti
            </Button>
            <Button onClick={this.handleClose.bind(this, true)} color="primary" autoFocus>
              Ištrinti
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default HistoryList;