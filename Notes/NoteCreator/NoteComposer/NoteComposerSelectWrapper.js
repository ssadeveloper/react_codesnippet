// FIXME: Uncomment commented lines below once NoteComposerSelect is implemented correctly
// in which case will probably require correct style wrapper height and border
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// import defaultTheme from 'style/theme';
import px2rem from 'utils/px2rem';

const NoteComposerSelectWrapper = styled.div`
  flex: 1;
  margin-left: ${px2rem(3)};
  border-radius: 2px;

  /* height: ${px2rem(28)};
  border: 1px solid ${({ theme }) => theme.colors['#cccccc']}; */

  /* FIXME: Remove the line below once multi-select is implemented correctly */
  font-size: 14px;
`;

// NoteComposerSelectWrapper.propTypes = {
//   theme: PropTypes.shape({
//     colors: PropTypes.shape({
//       '#cccccc': PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

// NoteComposerSelectWrapper.defaultProps = {
//   theme: defaultTheme,
// };

export default NoteComposerSelectWrapper;
