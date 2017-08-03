import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { noop } from 'lodash';

import Textarea from 'elements/Textarea';
import RectangleButton, { RectangleButtonText } from 'elements/RectangleButton';

import messages from './messages';
import Wrapper from './Wrapper';
import NoteComposerActionBar from './NoteComposerActionBar';
import NoteComposerLabel from './NoteComposerLabel';
import NoteComposerSelect from './NoteComposerSelect';
import NoteComposerSelectWrapper from './NoteComposerSelectWrapper';
import NoteComposerTextWrapper from './NoteComposerTextWrapper';
import NoteComposerTo from './NoteComposerTo';

class NoteComposer extends Component {
  static propTypes = {
    caseRecipients: ImmutablePropTypes.map,
    selectedRecipients: PropTypes.arrayOf(PropTypes.object),
    handleChangeRecipient: PropTypes.func.isRequired,
    handleClickCancel: PropTypes.func.isRequired,
    handleClickPostNote: PropTypes.func.isRequired,
    focusTextArea: PropTypes.func,
  };

  static defaultProps = {
    caseRecipients: Map(),
    selectedRecipients: [],
    focusTextArea: noop,
  };

  state = {
    message: '',
  };

  handleChangeMessage = ({ target }) => {
    this.setState({ message: target.value });
  }

  handleClickPostNote = () => {
    const { handleClickPostNote } = this.props;
    const { message } = this.state;
    handleClickPostNote(message);
    this.setState({ message: '' });
  }

  render() {
    const {
      caseRecipients,
      selectedRecipients,
      handleChangeRecipient,
      handleClickCancel,
      focusTextArea,
    } = this.props;
    const { message } = this.state;

    return (
      <Wrapper>
        <NoteComposerLabel modifiers={['block']}>
          <FormattedMessage {...messages.title} />
        </NoteComposerLabel>
        <NoteComposerTo>
          <NoteComposerLabel><FormattedMessage {...messages.to} /></NoteComposerLabel>
          <NoteComposerSelectWrapper>
            <NoteComposerSelect
              caseRecipients={caseRecipients.get('data')}
              handleChangeRecipient={handleChangeRecipient}
              selectedRecipients={selectedRecipients}
            />
          </NoteComposerSelectWrapper>
        </NoteComposerTo>
        <NoteComposerTextWrapper>
          <Textarea
            innerRef={(textarea) => { focusTextArea(textarea); }}
            onChange={this.handleChangeMessage}
            value={message}
          />
        </NoteComposerTextWrapper>
        <NoteComposerActionBar>
          <RectangleButton
            modifiers={[
              'hoverBrandBright',
              'hoverShadow',
              'hoverUnderline',
              'offWhite',
              'normalWidth',
            ]}
            onClick={handleClickCancel}
          >
            <RectangleButtonText modifiers={['small', 'uppercase']}>
              <FormattedMessage {...messages.cancelButton} />
            </RectangleButtonText>
          </RectangleButton>
          <RectangleButton
            modifiers={[
              'hoverShadow',
              'hoverUnderline',
              'green',
              'normalWidth',
              'padLeft',
            ]}
            onClick={this.handleClickPostNote}
          >
            <RectangleButtonText modifiers={['small', 'uppercase']}>
              <FormattedMessage {...messages.postButton} />
            </RectangleButtonText>
          </RectangleButton>
        </NoteComposerActionBar>
      </Wrapper>
    );
  }
}

export default NoteComposer;
