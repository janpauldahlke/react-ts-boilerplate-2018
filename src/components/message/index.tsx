import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export interface IGlobalMessageProps {
  ErrorStore? : ErrorStore;
}
export interface IGlobalMessageState {
  open: boolean;
}

class GlobalMessage extends React.Component<IGlobalMessageProps, IGlobalMessageState> {

  readonly state : IGlobalMessageState = {
    open: false
  };

  private closeModal = () => {
    this.setState({
      open: false
    });
  }

  componentWillReceiveProps(newProps: any) {
    this.setState({
      open: newProps.ErrorStore.isError
    });
  }
 
  render() : JSX.Element {
   
    return(
      <div>
        {(this.props.ErrorStore && this.props.ErrorStore.isError) && (
          <Dialog
          open={this.state.open}
          onClose={() => {
            this.closeModal();
          }}
        >
          <DialogTitle>
          {this.props.ErrorStore.Error.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.ErrorStore.Error.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => {
              e.preventDefault();
              this.closeModal();
            }}>
                schliessen
            </Button>
          </DialogActions>
        </Dialog>
        )}
      </div>
    );
  }
}

export default GlobalMessage;