import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export interface IGlobalMessageProps {
  NotificationStore? : NotificationStore;
  resetNotificationStore?: () => void;
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
    if(typeof this.props.resetNotificationStore === 'function') {
      this.props.resetNotificationStore();
    }
  }

  componentWillReceiveProps(newProps: IGlobalMessageProps) {
    this.setState({
      open: newProps.NotificationStore ? newProps.NotificationStore.isNotification : false,
    });
  }
 
  render() : JSX.Element {
      
    return(
      <div>
        {(this.props.NotificationStore && this.props.NotificationStore.isNotification) && (
          <Dialog
          open={this.state.open}
          onClose={() => {
            this.closeModal();
          }}
        >
          <DialogTitle>
          {this.props.NotificationStore.Notification.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.NotificationStore.Notification.text}
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