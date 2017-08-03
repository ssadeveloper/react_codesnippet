import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import PropTypes from 'prop-types';

import RefreshBlock from 'components/RefreshBlock';

import {
  SplitBlock,
  SplitBlockPart,
  SplitBlockElement,
} from 'elements/SplitBlock';

import Wrapper from './Wrapper';

function CategoryHeader({
  favoritePagination,
  requesting,
  refresh,
  type,
}) {
  return (
    <Wrapper id="category-header">
      <SplitBlock>
        <SplitBlockPart modifiers={['right']}>
          <SplitBlockElement type="padLeft">
            <RefreshBlock
              type={type}
              count={favoritePagination.get('totalCount')}
              requesting={requesting}
              refresh={refresh}
            />
          </SplitBlockElement>
        </SplitBlockPart>
      </SplitBlock>
    </Wrapper>
  );
}

CategoryHeader.propTypes = {
  requesting: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
  favoritePagination: ImmutablePropTypes.map.isRequired,
  type: PropTypes.string.isRequired,
};

CategoryHeader.defaultProps = {
  requesting: false,
};

export default CategoryHeader;
