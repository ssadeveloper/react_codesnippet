import styled from 'styled-components';

import dimensions from 'style/dimensions';

// Controls section (right side)
const Wrapper = styled.div`
  display: block;
  > div {
    display: inline-block;
    vertical-align: middle;
    margin-left: ${dimensions.spacingNormal};
  }
  > button {
    margin-left: ${dimensions.spacingNormal};
  }
`;

export default Wrapper;
