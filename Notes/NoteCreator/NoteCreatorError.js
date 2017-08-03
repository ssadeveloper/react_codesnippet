import styled from 'styled-components';

import px2rem from 'utils/px2rem';

// FIXME: Style the error block
const NoteCreatorError = styled.span`
  color: ${props => props.theme.colors.statusRed};
  font-size: ${px2rem(12)};
  font-weight: bold;
  line-height: ${px2rem(18)};
  margin-left: ${px2rem(10)};
`;

export default NoteCreatorError;
